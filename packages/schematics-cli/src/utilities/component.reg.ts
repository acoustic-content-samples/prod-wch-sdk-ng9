import { join, normalize, Path } from '@angular-devkit/core';
import { Tree } from '@angular-devkit/schematics';
import { AuthoringType } from '@acoustic-content-sdk/api';
import { camelCase, classCase, dotCase, kebabCase } from '@acoustic-content-sdk/tooling';
import { rxPipe } from '@acoustic-content-sdk/utils';
import { Observable } from 'rxjs';
import { first, map, mergeMap, shareReplay } from 'rxjs/operators';

import { rxFindDir } from './rx.dir';
import { getStyleExtension } from './style.utils';
import { TypeClass, TypeRegistry } from './type.reg';

export interface ComponentOptions {
  style?: string;
  flat?: boolean;
}

function _getStyleExtension(aOptions: ComponentOptions): string {
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

const COMPONENT_SUFFIX = 'Component';
const RENDERING_CONTEXT_SUFFIX = 'RenderingContext';
const COMPONENTS_PATH = normalize('components');

/**
 * Returns the directory name for the type
 *
 * @param aType     the type
 * @return the directory name
 */
function _getPathForType(
  aType: AuthoringType,
  aOptions: ComponentOptions
): Path {
  // access the type properties
  const name: string = aType.name;
  const tags: string[] = aType.tags || [];
  // convert tags into segments
  const segments = aOptions.flat ? [] : tags.map(_kebabCase).sort();
  segments.push(_kebabCase(name));
  // return this path
  return normalize(segments.join('/'));
}

function _createAbstractComponentName(aTypeName: string): string {
  const name = classCase(_camelCase('abstract ' + aTypeName));
  return name.endsWith(COMPONENT_SUFFIX) ? name : name + COMPONENT_SUFFIX;
}

function _createTypeInterfaceName(aTypeName: string): string {
  const name = classCase(_camelCase(aTypeName));
  return name.endsWith(RENDERING_CONTEXT_SUFFIX)
    ? name
    : name + RENDERING_CONTEXT_SUFFIX;
}

function _createTypeComponentName(aTypeName: string): string {
  const name = classCase(_camelCase('type ' + aTypeName));
  return name.endsWith(COMPONENT_SUFFIX) ? name : name + COMPONENT_SUFFIX;
}

function _getTypeComponentPath(
  aType: AuthoringType,
  aOptions: ComponentOptions
): Path {
  // prepend by component
  return join(COMPONENTS_PATH, _getPathForType(aType, aOptions));
}

/**
 * Finds the directory tha the component should be created in. Tests
 * each potential source directory for an existing component file. If non exists, uses the
 * first source directory
 *
 * @param aType        type
 * @param aSources     sources directory
 *
 * @return the selected source directory
 */
function _getComponentsDir(
  aType: AuthoringType,
  aSources: Observable<string[]>,
  aOptions: ComponentOptions,
  aTree: Tree
): Observable<Path> {
  // check for the path suffix
  const typePath = _getTypeComponentPath(aType, aOptions);
  const className = _createAbstractComponentName(aType.name);
  const relPath = join(typePath, _camelCase(className) + '.ts');
  // map each source to a check
  return rxFindDir(aSources, relPath, aTree);
}

export interface ComponentClass {
  // directory for layout
  folder: Path;

  // the type for the component
  typeDef: TypeClass;

  // class names
  abstractComponentClass: string;
  typeComponentClass: string;
  typeInterfaceClass: string;

  // file names
  abstractComponentFile: string;
  typeComponentFile: string;
  typeInterfaceFile: string;

  typeTemplateFile: string;
  typeStyleFile: string;

  // file references
  abstractComponentRef: string;
  typeComponentRef: string;
  typeInterfaceRef: string;

  // selector
  typeSelector: string;
}

/**
 * Constructs the relevant information for a components class
 *
 * @param aDir      base directory
 * @param aType     type object
 * @param aOptions  options
 * @param aLogger   logger
 *
 * @return the component object
 */
function _initComponentClass(
  aDir: Path,
  aTypeDef: TypeClass,
  aOptions: ComponentOptions
): ComponentClass {
  // type object
  const type = aTypeDef.type;

  // check for the path suffix
  const typePath = _getTypeComponentPath(type, aOptions);
  const typeName = type.name;

  // component names
  const abstractComponentClass = _createAbstractComponentName(typeName);
  const typeComponentClass = _createTypeComponentName(typeName);
  const typeInterfaceClass = _createTypeInterfaceName(typeName);

  // references
  const abstractComponentRef = _dotCase(abstractComponentClass);
  const typeComponentRef = _dotCase(typeComponentClass);
  const typeInterfaceRef = _dotCase(typeInterfaceClass);

  // file names
  const abstractComponentFile = abstractComponentRef + '.ts';
  const typeComponentFile = typeComponentRef + '.ts';
  const typeInterfaceFile = typeInterfaceRef + '.ts';

  // template and style
  const typeTemplateFile = typeComponentRef + '.html';
  const typeStyleFile = typeComponentRef + _getStyleExtension(aOptions);

  // selector
  const typeSelector = _kebabCase('app ' + typeComponentClass);

  // the base path
  const folder = normalize(join(aDir, typePath));

  const result: ComponentClass = {
    typeDef: aTypeDef,
    folder,
    typeSelector,
    typeTemplateFile,
    typeStyleFile,
    abstractComponentRef,
    typeComponentRef,
    typeInterfaceRef,
    abstractComponentClass,
    typeComponentClass,
    typeInterfaceClass,
    abstractComponentFile,
    typeComponentFile,
    typeInterfaceFile
  };

  // ok
  return result;
}

function _createComponentClass(
  aTypeDef: TypeClass,
  aSources: Observable<string[]>,
  aOptions: ComponentOptions,
  aTree: Tree
): Observable<ComponentClass> {
  // locate the component directory
  return rxPipe(
    _getComponentsDir(aTypeDef.type, aSources, aOptions, aTree),
    first(),
    map((dir) => _initComponentClass(dir, aTypeDef, aOptions)),
    shareReplay()
  );
}

export class ComponentRegistry {
  private componentRegistry: {
    [typeId: string]: Observable<ComponentClass>;
  } = {};

  constructor(
    private aBaseFolders: Observable<string[]>,
    private aOptions: ComponentOptions,
    private aTree: Tree,
    private aTypeRegistry: TypeRegistry
  ) {}

  registerType(aType: AuthoringType): boolean {
    return this.aTypeRegistry.registerType(aType);
  }

  findTypeClass(aType: AuthoringType): Observable<TypeClass> {
    return this.aTypeRegistry.findTypeClass(aType);
  }

  findComponentClass(aType: AuthoringType): Observable<ComponentClass> {
    // the name
    const typeId = aType.id;
    // check if we are already searching
    let rxRunning = this.componentRegistry[typeId];
    if (!rxRunning) {
      // find the type
      const rxType = this.aTypeRegistry.findTypeClass(aType);
      // try to find the folder
      rxRunning = rxType.pipe(
        mergeMap(
          (type) =>
            (this.componentRegistry[typeId] = _createComponentClass(
              type,
              this.aBaseFolders,
              this.aOptions,
              this.aTree
            ))
        )
      );
    }
    // ok
    return rxRunning;
  }
}
