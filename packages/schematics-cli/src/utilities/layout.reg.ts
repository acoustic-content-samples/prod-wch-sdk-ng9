import { join, normalize, Path } from '@angular-devkit/core';
import { Tree } from '@angular-devkit/schematics';
import {
  AuthoringLayout,
  AuthoringLayoutMapping,
  AuthoringType
} from '@acoustic-content-sdk/api';
import {
  isNotEmpty,
  isString,
  LAYOUT_TYPE_ANGULAR,
  rxPipe
} from '@acoustic-content-sdk/utils';
import { toWords } from 'number-to-words';
import { Observable } from 'rxjs';
import { first, map, mergeMap, shareReplay } from 'rxjs/operators';

import { ComponentClass, ComponentRegistry } from './component.reg';
import { camelCase, classCase, dotCase, kebabCase } from '@acoustic-content-sdk/tooling';
import { rxFindDir } from './rx.dir';
import { getStyleExtension } from './style.utils';

const COMPONENT_SUFFIX = 'Component';

export interface LayoutOptions {
  style?: string;
  flat?: boolean;
}

function _getStyleExtension(aOptions: LayoutOptions): string {
  return getStyleExtension(aOptions.style);
}

function _camelCase(aValue: string): string {
  return camelCase(aValue);
}

function _dotCase(aValue: string): string {
  return dotCase(aValue);
}

function _kebabCase(aValue: string): string {
  return kebabCase(aValue);
}

const LEADING_DIGIT = /^(\d*)/g;

const LAYOUT_SUFFIX = 'Layout';
const MODULE_SUFFIX = 'Module';

const LAYOUTS_PATH = normalize('layouts');
const MODULES_PATH = normalize('modules');

function _createLayoutComponentName(aName: string): string {
  // trim
  const trimmedName = aName.trim();
  const fixed = trimmedName.replace(LEADING_DIGIT, (m, p) =>
    p && p.length > 0 ? toWords(p) + ' ' : ''
  );
  /** check if the layout component starts with a number, in this case
   * convert the number to a string */
  const name = classCase(_camelCase(fixed));
  return name.endsWith(LAYOUT_SUFFIX) ? name : name + LAYOUT_SUFFIX;
}

function _createLayoutModuleName(aName: string): string {
  // derive from layout name
  const layoutName = _createLayoutComponentName(aName);
  // replace the word 'layout'
  return (
    layoutName.substr(0, layoutName.length - LAYOUT_SUFFIX.length) +
    MODULE_SUFFIX
  );
}

function _getPathForLayoutModule(
  aName: string,
  aType: AuthoringType,
  aOptions: LayoutOptions
): Path {
  // name of the layout folder segment
  let moduleName = _createLayoutModuleName(aName);
  if (moduleName.endsWith(MODULE_SUFFIX)) {
    moduleName = moduleName.substr(0, moduleName.length - MODULE_SUFFIX.length);
  }
  // layout folder
  const moduleFolder = _kebabCase(moduleName);
  // access the type properties
  const tags: string[] = aType.tags || [];
  // convert tags into segments
  const segments = aOptions.flat ? [] : tags.map(_kebabCase).sort();
  segments.push(moduleFolder);
  // return this path
  return normalize(segments.join('/'));
}

function _getPathForLayout(
  aName: string,
  aType: AuthoringType,
  aOptions: LayoutOptions
): Path {
  // name of the layout folder segment
  let layoutName = _createLayoutComponentName(aName);
  if (layoutName.endsWith(LAYOUT_SUFFIX)) {
    layoutName = layoutName.substr(0, layoutName.length - LAYOUT_SUFFIX.length);
  }
  // layout folder
  const layoutFolder = _kebabCase(layoutName);
  // access the type properties
  const tags: string[] = aType.tags || [];
  // convert tags into segments
  const segments = aOptions.flat ? [] : tags.map(_kebabCase).sort();
  segments.push(layoutFolder);
  // return this path
  return normalize(segments.join('/'));
}

function _getLayoutModulePath(
  aLayout: AuthoringLayout,
  aType: AuthoringType,
  aOptions: LayoutOptions
): Path {
  // join
  return join(
    MODULES_PATH,
    _getPathForLayoutModule(aLayout.name, aType, aOptions)
  );
}

function _getLayoutPath(
  aLayout: AuthoringLayout,
  aType: AuthoringType,
  aOptions: LayoutOptions
): Path {
  // join
  return join(LAYOUTS_PATH, _getPathForLayout(aLayout.name, aType, aOptions));
}

export interface LayoutClass {
  // directory for layout
  folder: Path;

  // component class
  component: ComponentClass;

  // selection coordinates
  type: AuthoringType;
  layout: AuthoringLayout;
  mapping: AuthoringLayoutMapping;

  // class names
  layoutClass: string;
  moduleClass: string;

  // file names
  layoutFile: string;
  moduleFile: string;

  layoutTemplateFile: string;
  layoutStyleFile: string;

  // file references
  layoutRef: string;
  moduleRef: string;

  // selector
  layoutSelector: string;
  layoutTemplate: string;
}

/**
 * Returns the template identifier from the authoring layout. For an angular
 * layout this is the template, else it is the name or the id as a fallback
 *
 * @param aLayout - the layout
 *
 * @returns the template
 */
function _getLayoutTemplate(aLayout: AuthoringLayout): string {
  // for the angular case, use the template string
  const layout: any = aLayout;
  const { templateType, template } = layout;
  if (
    templateType === LAYOUT_TYPE_ANGULAR &&
    isString(template) &&
    isNotEmpty(template)
  ) {
    // use the template string as is
    return template;
  }
  // else use the kebab case name or ID
  const { name, id } = aLayout;
  const fallback = name || id;
  // use this one
  return _kebabCase(fallback);
}

/**
 * Constructs the relevant information for a components class
 *
 * @param aDir - base directory
 * @param aType - type object
 * @param aOptions - options
 * @param aLogger - logger
 *
 * @returns the component object
 */
function _initLayoutClass(
  aDir: Path,
  aCmpClass: ComponentClass,
  aLayout: AuthoringLayout,
  aMapping: AuthoringLayoutMapping,
  aOptions: LayoutOptions
): LayoutClass {
  // access the type object
  const type = aCmpClass.typeDef.type;

  // check for the path suffix
  const layoutPath = _getLayoutPath(aLayout, type, aOptions);

  const layout = aLayout;
  const mapping = aMapping;
  const typeName = type.name;
  const layoutName = layout.name || typeName;
  const component = aCmpClass;

  // component names
  const layoutBaseName = _createLayoutComponentName(layoutName);
  const layoutClass = layoutBaseName + COMPONENT_SUFFIX;
  const moduleClass = _createLayoutModuleName(layoutName);

  // references
  const layoutBaseRef = _dotCase(layoutBaseName);
  const layoutRef = layoutBaseRef;
  const moduleRef = _dotCase(moduleClass);

  // file names
  const layoutFile = layoutRef + '.ts';
  const moduleFile = moduleRef + '.ts';

  // template and style
  const layoutTemplateFile = layoutBaseRef + '.html';
  const layoutStyleFile = layoutBaseRef + _getStyleExtension(aOptions);

  // selector
  const layoutSelector = _kebabCase('app ' + layoutClass);
  const layoutTemplate = _getLayoutTemplate(layout);

  // the base path for the layout
  const folder = normalize(join(aDir, layoutPath));

  const result: LayoutClass = {
    component,
    type,
    mapping,
    layout,
    folder,
    layoutClass,
    moduleClass,
    layoutRef,
    moduleRef,
    layoutFile,
    moduleFile,
    layoutTemplateFile,
    layoutStyleFile,
    layoutSelector,
    layoutTemplate
  };

  // ok
  return result;
}

interface LayoutMap {
  byId: { [id: string]: AuthoringLayout };
  byName: { [id: string]: AuthoringLayout };
  dirById: { [id: string]: string };
}

/**
 * Finds the directory tha the component should be created in. Tests
 * each potential source directory for an existing component file. If non exists, uses the
 * first source directory
 *
 * @param aType - type
 * @param aSources - sources directory
 *
 * @returns the selected source directory
 */
function _getLayoutsDir(
  aLayout: AuthoringLayout,
  aMapping: AuthoringLayoutMapping,
  aType: AuthoringType,
  aSources: Observable<string[]>,
  aOptions: LayoutOptions,
  aTree: Tree
): Observable<Path> {
  // check for the path suffix
  const typePath = _getLayoutPath(aLayout, aType, aOptions);
  const className = _createLayoutComponentName(aLayout.name);
  const relPath = join(typePath, _camelCase(className) + '.ts');
  // map each source to a check
  return rxFindDir(aSources, relPath, aTree);
}

function _createLayoutClass(
  aLayout: AuthoringLayout,
  aMapping: AuthoringLayoutMapping,
  aSources: Observable<string[]>,
  aCmpClass: ComponentClass,
  aOptions: LayoutOptions,
  aTree: Tree
): Observable<LayoutClass> {
  // the type
  const type = aCmpClass.typeDef.type;
  // locate the component directory
  return rxPipe(
    _getLayoutsDir(aLayout, aMapping, type, aSources, aOptions, aTree),
    first(),
    map((dir) => _initLayoutClass(dir, aCmpClass, aLayout, aMapping, aOptions)),
    shareReplay()
  );
}

export class LayoutRegistry {
  private layoutMap: LayoutMap = {
    byId: {},
    byName: {},
    dirById: {}
  };

  private layoutRegistry: {
    [layoutName: string]: Observable<LayoutClass>;
  } = {};

  constructor(
    private aBaseFolders: Observable<string[]>,
    private aOptions: LayoutOptions,
    private aTree: Tree,
    private aComponentRegistry: ComponentRegistry
  ) {}

  registerLayout(aLayout: AuthoringLayout): boolean {
    const layout = aLayout;
    const lid = layout.id;
    const lname = layout.name;

    if (this.layoutMap.byId[lid] || this.layoutMap.byName[lname]) {
      // do not create a layout, twice
      return false;
    }

    // register
    this.layoutMap.byId[lid] = layout;
    this.layoutMap.byName[lname] = layout;

    // ok
    return true;
  }

  findLayoutClass(
    aLayout: AuthoringLayout,
    aMapping: AuthoringLayoutMapping,
    aType: AuthoringType
  ): Observable<LayoutClass> {
    // the name
    const layoutId = aLayout.id;
    // check if we are already searching
    let rxRunning = this.layoutRegistry[layoutId];
    if (!rxRunning) {
      // find the component
      const rxComponent = this.aComponentRegistry.findComponentClass(aType);
      // try to find the folder
      rxRunning = this.layoutRegistry[layoutId] = rxPipe(
        rxComponent,
        mergeMap((cmp) =>
          _createLayoutClass(
            aLayout,
            aMapping,
            this.aBaseFolders,
            cmp,
            this.aOptions,
            this.aTree
          )
        )
      );
    }
    // ok
    return rxRunning;
  }
}
