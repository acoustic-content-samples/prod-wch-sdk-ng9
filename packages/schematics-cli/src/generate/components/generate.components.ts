/* Copyright IBM Corp. 2017 */
import { join, normalize, Path } from '@angular-devkit/core';
import {
  branchAndMerge,
  chain,
  Rule,
  SchematicContext,
  Tree
} from '@angular-devkit/schematics';
import {
  AuthoringLayout,
  AuthoringLayoutMapping,
  AuthoringType,
  ELEMENT_TYPE_CATEGORY,
  ELEMENT_TYPE_DATE,
  ELEMENT_TYPE_FILE,
  ELEMENT_TYPE_FORMATTED_TEXT,
  ELEMENT_TYPE_GROUP,
  ELEMENT_TYPE_IMAGE,
  ELEMENT_TYPE_LINK,
  ELEMENT_TYPE_LOCATION,
  ELEMENT_TYPE_NUMBER,
  ELEMENT_TYPE_OPTION_SELECTION,
  ELEMENT_TYPE_REFERENCE,
  ELEMENT_TYPE_TEXT,
  ELEMENT_TYPE_TOGGLE,
  ELEMENT_TYPE_VIDEO
} from '@acoustic-content-sdk/api';
import {
  buildDefaultPath,
  canonicalizeJSON,
  findDataDir,
  findProject,
  readDirectoryOnTree
} from '@acoustic-content-sdk/schematics-utils';
import {
  blackWhiteList,
  camelCase,
  classCase,
  JsonEntry,
  kebabCase,
  rxFindAuthoringLayoutMappings,
  rxFindAuthoringLayouts,
  rxFindAuthoringTypes
} from '@acoustic-content-sdk/tooling';
import {
  arrayPush,
  assignObject,
  cloneDeep,
  cmpStrings,
  forEach,
  getPath,
  isNil,
  isNotNil,
  LAYOUT_TYPE_ANGULAR,
  objectAssign,
  objectKeys,
  opFilterNotNil,
  opShareLast,
  Predicate,
  reduceForIn,
  rxPipe
} from '@acoustic-content-sdk/utils';
import { parse } from 'path';
import {
  asyncScheduler,
  combineLatest,
  concat,
  EMPTY,
  from,
  merge,
  Observable,
  Observer,
  of,
  OperatorFunction
} from 'rxjs';
import {
  distinct,
  filter,
  first,
  map,
  mapTo,
  mergeMap,
  mergeMapTo,
  reduce,
  shareReplay
} from 'rxjs/operators';
import { ClassDeclaration, SourceFile } from 'typescript';

import { ASSETS_DIR$, rxJoin } from '../../utilities/assets';
import {
  ComponentClass,
  ComponentOptions,
  ComponentRegistry
} from '../../utilities/component.reg';
import { relativePath } from '../../utilities/file.utils';
import { getIdentifierFrom } from '../../utilities/identifiers';
import {
  findLayoutComponent,
  getLayoutComponents,
  resolveClassHierarchy
} from '../../utilities/layout.component';
import { getLayoutModules } from '../../utilities/layout.module';
import {
  LayoutClass,
  LayoutOptions,
  LayoutRegistry
} from '../../utilities/layout.reg';
import { hbsCompile } from '../../utilities/rx.hbs';
import { rxForkJoin } from '../../utilities/rx.utils';
import { writeTextSafe } from '../../utilities/tree';
import { TypeClass, TypeOptions, TypeRegistry } from '../../utilities/type.reg';
import { readSourceFiles } from '../../utilities/typescript';
import { Schema } from './schema';
import { addModulesToAppModule, APP_MODULE } from './update.app.module';

export const TEMPLATES_DIR$ = rxPipe(ASSETS_DIR$, rxJoin('templates'));

const TYPE_GROUP = 'Group';
const TYPE_BINDING = 'RenderingContextBinding';
const TYPE_CONTEXT = 'RenderingContext';
const TYPE_ABSTRACT_COMPONENT = 'AbstractRenderingComponent';

const DEP_SDK = '@acoustic-content-sdk/ng';
const DEP_API = '@acoustic-content-sdk/api';
const DEP_UTILS = '@acoustic-content-sdk/utils';
const DEP_NG_UTILS = '@acoustic-content-sdk/ng-utils';
const DEP_WC = '@acoustic-content-sdk/web-components';
const DEP_RXJS = 'rxjs';
const DEP_RXJS_OPS = 'rxjs/operators';

interface WchTools {
  types: Record<string, AuthoringType>;
  layouts: Record<string, AuthoringLayout>;
  layoutMappings: Record<string, AuthoringLayoutMapping>;
  tree: Tree;
}

export interface Options extends TypeOptions, LayoutOptions, ComponentOptions {
  project?: string;
  data?: string;
  layoutHtmlTemplate?: string;
  webComponents?: boolean;
  editable?: boolean;
  force?: boolean;
  include?: string[];
  exclude?: string[];
}

function _camelCase(aValue: string): string {
  return camelCase(aValue);
}

function _plural(aKey: string) {
  return aKey + 's';
}

function _toComment(aValue: any): string {
  return JSON.stringify(canonicalizeJSON(aValue), undefined, 2)
    .split('\n')
    .map((line) => '     * ' + line)
    .join('\n');
}

const TYPES: { [key: string]: string } = {};
TYPES[ELEMENT_TYPE_TEXT] = 'string';
TYPES[ELEMENT_TYPE_NUMBER] = 'number';
TYPES[ELEMENT_TYPE_TOGGLE] = 'boolean';
TYPES[ELEMENT_TYPE_FORMATTED_TEXT] = 'string';
TYPES[ELEMENT_TYPE_LINK] = 'Link';
TYPES[ELEMENT_TYPE_DATE] = 'string';
TYPES[ELEMENT_TYPE_FILE] = 'File';
TYPES[ELEMENT_TYPE_VIDEO] = 'Video';
TYPES[ELEMENT_TYPE_IMAGE] = 'Image';
TYPES[ELEMENT_TYPE_OPTION_SELECTION] = 'string';
TYPES[ELEMENT_TYPE_REFERENCE] = 'DeliveryReferenceElement';
TYPES[ELEMENT_TYPE_CATEGORY] = 'Category';
TYPES[ELEMENT_TYPE_LOCATION] = 'Location';

const AUGMENTED_TYPES: { [key: string]: string } = {};
AUGMENTED_TYPES['Image'] = 'SingleImageElement';
AUGMENTED_TYPES['Video'] = 'SingleVideoElement';
AUGMENTED_TYPES['File'] = 'SingleFileElement';
AUGMENTED_TYPES['Link'] = 'SingleLinkElement';
AUGMENTED_TYPES['Category'] = 'CategoryElement';
AUGMENTED_TYPES['Location'] = 'LocationElement';

const DEFAULT_VALUES: { [key: string]: string } = {};
DEFAULT_VALUES[ELEMENT_TYPE_TEXT] = '\u0027\u0027';
DEFAULT_VALUES[ELEMENT_TYPE_NUMBER] = '0';
DEFAULT_VALUES[ELEMENT_TYPE_TOGGLE] = 'false';
DEFAULT_VALUES[ELEMENT_TYPE_FORMATTED_TEXT] = '\u0027\u0027';

const BUILT_IN_TYPES = ['string', 'number', 'boolean', 'Date'];

export interface Templates {
  abstractComponent: Observable<HandlebarsTemplateDelegate>;
  typeComponent: Observable<HandlebarsTemplateDelegate>;
  typeInterface: Observable<HandlebarsTemplateDelegate>;
  typeDefinition: Observable<HandlebarsTemplateDelegate>;
  typeHtml: Observable<HandlebarsTemplateDelegate>;
  typeCss: Observable<HandlebarsTemplateDelegate>;

  layoutModule: Observable<HandlebarsTemplateDelegate>;
  layoutComponent: Observable<HandlebarsTemplateDelegate>;
  layoutHtml: Observable<HandlebarsTemplateDelegate>;
  layoutCss: Observable<HandlebarsTemplateDelegate>;

  layoutOverview: Observable<HandlebarsTemplateDelegate>;
  layoutExports: Observable<HandlebarsTemplateDelegate>;

  moduleOverview: Observable<HandlebarsTemplateDelegate>;
  moduleExports: Observable<HandlebarsTemplateDelegate>;
}

function _createTemplate(aOptions: Options): Templates {
  // check the target type
  const bWebComponents = !!aOptions.webComponents;

  // filenames
  const fileBaseComponent = bWebComponents
    ? 'wc.component.hbs'
    : 'component.hbs';

  const fileTypeComponent = bWebComponents
    ? 'wc.type.component.hbs'
    : 'type.component.hbs';

  const fileLayoutComponent = bWebComponents
    ? 'wc.layout.component.hbs'
    : 'layout.component.hbs';

  const fileLayoutComponentHtml = bWebComponents
    ? 'wc.layout.component.html.hbs'
    : 'layout.component.html.hbs';

  const rxBaseComponent = rxPipe(
    TEMPLATES_DIR$,
    rxJoin(fileBaseComponent),
    mergeMap(hbsCompile)
  );
  const rxTypeComponent = rxPipe(
    TEMPLATES_DIR$,
    rxJoin(fileTypeComponent),
    mergeMap(hbsCompile)
  );
  const rxTypeInterface = rxPipe(
    TEMPLATES_DIR$,
    rxJoin('type.interface.hbs'),
    mergeMap(hbsCompile)
  );
  const rxTypeDefinition = rxPipe(
    TEMPLATES_DIR$,
    rxJoin('type.definition.hbs'),
    mergeMap(hbsCompile)
  );
  const rxTypeHtml = rxPipe(
    TEMPLATES_DIR$,
    rxJoin('type.component.html.hbs'),
    mergeMap(hbsCompile)
  );
  const rxTypeCss = rxPipe(
    TEMPLATES_DIR$,
    rxJoin('type.component.css.hbs'),
    mergeMap(hbsCompile)
  );

  const rxLayoutComponent = rxPipe(
    TEMPLATES_DIR$,
    rxJoin(fileLayoutComponent),
    mergeMap(hbsCompile)
  );

  const rxLayoutModule = rxPipe(
    TEMPLATES_DIR$,
    rxJoin('layout.module.hbs'),
    mergeMap(hbsCompile)
  );

  // allow to override the template
  const layoutHtmlFile = aOptions.layoutHtmlTemplate
    ? of(normalize(aOptions.layoutHtmlTemplate))
    : rxPipe(TEMPLATES_DIR$, rxJoin(fileLayoutComponentHtml));

  const rxLayoutHtml = rxPipe(layoutHtmlFile, mergeMap(hbsCompile));
  const rxLayoutCss = rxPipe(
    TEMPLATES_DIR$,
    rxJoin('layout.component.css.hbs'),
    mergeMap(hbsCompile)
  );

  const rxModuleOverview = rxPipe(
    TEMPLATES_DIR$,
    rxJoin('module.overview.hbs'),
    mergeMap(hbsCompile)
  );

  const rxModuleExports = rxPipe(
    TEMPLATES_DIR$,
    rxJoin('module.export.hbs'),
    mergeMap(hbsCompile)
  );

  const rxLayoutOverview = rxPipe(
    TEMPLATES_DIR$,
    rxJoin('layout.overview.hbs'),
    mergeMap(hbsCompile)
  );

  const rxLayoutExports = rxPipe(
    TEMPLATES_DIR$,
    rxJoin('layout.export.hbs'),
    mergeMap(hbsCompile)
  );

  // return
  return {
    abstractComponent: rxBaseComponent,
    typeComponent: rxTypeComponent,
    typeInterface: rxTypeInterface,
    typeDefinition: rxTypeDefinition,
    typeHtml: rxTypeHtml,
    typeCss: rxTypeCss,
    layoutComponent: rxLayoutComponent,
    layoutModule: rxLayoutModule,
    layoutHtml: rxLayoutHtml,
    layoutCss: rxLayoutCss,
    layoutOverview: rxLayoutOverview,
    layoutExports: rxLayoutExports,
    moduleOverview: rxModuleOverview,
    moduleExports: rxModuleExports
  };
}

function _getExpression(aElement: any) {
  const type = aElement.allowMultipleValues
    ? _plural(aElement.elementType)
    : aElement.elementType;
  return type + '.' + aElement.key;
}

function _createTypeComponentContext(aClass: ComponentClass): any {
  // clone the type
  const cloned = cloneDeep(aClass.typeDef.type);
  const types: { [key: string]: string } = {};
  // set class name
  cloned.baseClassName = aClass.abstractComponentClass;
  cloned.className = aClass.typeComponentClass;
  cloned.baseFileName = './' + aClass.abstractComponentRef;
  cloned.templateUrl = './' + aClass.typeTemplateFile;
  cloned.styleUrl = './' + aClass.typeStyleFile;
  cloned.selector = aClass.typeSelector;

  // the imports
  cloned.imports = objectKeys(types).sort();

  return cloned;
}

function _createLayoutComponentContext(
  aClass: LayoutClass,
  aOptions: Options
): any {
  const cloned = cloneDeep(aClass.layout);

  // check the editable flag
  cloned.editable = aOptions.editable || false;
  // classname
  cloned.className = aClass.layoutClass;
  cloned.baseClassName = aClass.component.typeComponentClass;
  cloned.selector = aClass.layoutSelector;
  cloned.layoutTemplate = aClass.layoutTemplate;
  cloned.templateUrl = './' + aClass.layoutTemplateFile;
  cloned.styleUrl = './' + aClass.layoutStyleFile;
  // path to the layout
  const layoutPath = aClass.folder;
  const componentPath = aClass.component.folder;
  // compute the relative path
  const relPath = relativePath(layoutPath, componentPath);
  cloned.baseFileName =
    './' + relPath + '/' + aClass.component.typeComponentRef;

  return cloned;
}

function _createLayoutModuleContext(
  aClass: LayoutClass,
  aOptions: Options
): any {
  // dispatch
  const ctx = _createLayoutComponentContext(aClass, aOptions);

  // augment the context
  const moduleClassName = aClass.moduleClass;
  ctx.moduleClassName = moduleClassName;
  ctx.layoutClassName = aClass.layoutClass;

  // path to the layout and module
  const layoutPath = aClass.folder;
  const modulePath = aClass.folder;

  // remember
  ctx.layoutPath = layoutPath;
  ctx.layoutModulePath = modulePath;

  // compute the relative path
  ctx.layoutFileName = './' + aClass.layoutRef;

  return ctx;
}

function _createAbstractComponentContext(
  aClass: ComponentClass,
  aTools: WchTools,
  aComponentReg: ComponentRegistry,
  aOptions: Options
): Observable<any> {
  // check for the web components
  const bWebComponents = !!aOptions.webComponents;
  // clone the type
  const cloned = cloneDeep(aClass.typeDef.type);
  // set class name
  cloned.className = aClass.abstractComponentClass;
  // set class name
  cloned.interfacesName = aClass.typeInterfaceClass;
  // target name
  cloned.interfacesFileName = aClass.typeInterfaceRef;
  // path to the type interface
  const interfacePath = aClass.folder;
  // type checks
  const typeChecks = (cloned.typeChecks = {});
  // produce the bindings
  const imports: Imports = {};
  // always add rendering context
  _registerImport('Observable', DEP_RXJS, imports);
  _registerImport(
    TYPE_ABSTRACT_COMPONENT,
    bWebComponents ? DEP_WC : DEP_NG_UTILS,
    imports
  );

  // register the type checks
  const interfaceImport = `./${aClass.typeInterfaceRef}`;
  _registerImport(cloned.interfacesName, interfaceImport, imports);

  // organize
  const otherImports: { [key: string]: string[] } = {};
  objectKeys(imports)
    .sort()
    .forEach((key) => (otherImports[key] = objectKeys(imports[key]).sort()));
  // update
  cloned.otherImports = otherImports;
  // add the types
  // ok
  return of(cloned);
}

function _createConstantName(aKey: string): string {
  return kebabCase(aKey)
    .toUpperCase()
    .replace(/\-/g, '_');
}

interface ImportedClasses {
  [key: string]: string;
}

interface Imports {
  [from: string]: ImportedClasses;
}

function _registerImport(aClass: string, aFrom: string, aImports: Imports) {
  // create the hook
  const imp: ImportedClasses = aImports[aFrom] || (aImports[aFrom] = {});
  // add
  imp[aClass] = aClass;
}

function _createTypeInterfaceContext(
  aClass: ComponentClass,
  aTools: WchTools,
  aComponentReg: ComponentRegistry
): Observable<any> {
  // clone the type
  const typeDef = aClass.typeDef;
  const cloned = cloneDeep(aClass.typeDef.type);
  // set class name
  cloned.interfacesName = aClass.typeInterfaceClass;
  cloned.definitionName = aClass.typeDef.typeElementClass;

  // path to the type interface
  const interfacePath = aClass.folder;
  const definitionPath = aClass.typeDef.folder;
  // compute the relative path
  const relPath = relativePath(interfacePath, definitionPath);
  const definitionRef = './' + relPath + '/' + aClass.typeDef.typeElementRef;

  // top level fields
  const expressions: any = {};

  // produce the bindings
  const imports: Imports = {};

  _registerImport('DeliveryContentMetadata', DEP_API, imports);
  _registerImport('RenderingContextV2', DEP_API, imports);

  // the well known type
  _registerImport(cloned.definitionName, definitionRef, imports);

  const rxBindings: Observable<any>[] = cloned.elements.map((el: any) => {
    // result
    const binding: any = {};
    // class name
    binding.constant = 'KEY_' + _createConstantName(el.key);
    binding.key = el.key;
    binding.observableKey = _camelCase('on ' + el.key);
    binding.pluckMethod = _camelCase('pluck ' + el.key);
    binding.selectMethod = _camelCase('select ' + el.key);
    binding.rxSelectMethod = _camelCase('rx select ' + el.key);
    binding.expression = _getExpression(el);
    binding.comment = _toComment(el);
    binding.required = !!el.required;
    binding.optional = !!!el.required;

    let rxTypeName: Observable<string>;

    const bIsGroup = el.elementType === ELEMENT_TYPE_GROUP;
    if (bIsGroup) {
      // type id
      const typeId = el.typeRef.id;
      // locate the type
      const rxRefType = aComponentReg
        .findTypeClass(aTools.types[typeId])
        .pipe(shareReplay());
      // the from statement
      const rxFrom = rxRefType.pipe(
        map(
          (def) =>
            './' +
            relativePath(interfacePath, def.folder) +
            '/' +
            def.typeElementRef
        )
      );
      // the type name
      const rxType = rxRefType.pipe(map((def) => def.simpleTypeClass));
      // register the import
      const rxImportType = combineLatest(rxFrom, rxType).pipe(
        map(
          ([fromType, name]) =>
            name /* _registerImport(name, fromType, imports) */
        )
      );
      // the type name
      rxTypeName = rxImportType.pipe(mergeMapTo(rxType));
    } else {
      const directType = TYPES[el.elementType];
      const augType = AUGMENTED_TYPES[directType];
      const expElType = augType || directType;
      if (BUILT_IN_TYPES.indexOf(expElType) < 0) {
        // _registerImport(expElType, DEP_API, imports);
      }

      rxTypeName = of(expElType);
    }

    // get the top level entry
    const expType: string = el.allowMultipleValues
      ? _plural(el.elementType)
      : el.elementType;
    const exp: any = expressions[expType] || (expressions[expType] = {});

    // handle
    return rxTypeName.pipe(
      map((typeName) => {
        // update the expression
        exp[el.key] = {
          key: el.key,
          constant: el.constant,
          comment: _toComment(el),
          type: el.allowMultipleValues ? typeName + '[]' : typeName,
          optional: !!!el.required,
          binding: binding
        };

        binding.elType = exp[el.key].type;
        binding.expType = expType;

        // _registerImport('pluckPath', DEP_UTILS, imports);
        // _registerImport('UnaryFunction', DEP_RXJS, imports);

        // returns the binding
        return binding;
      })
    );
  });

  // wait
  return rxPipe(
    rxForkJoin(rxBindings),
    map((bindings) => {
      // update
      cloned.bindings = bindings;
      // the imports
      cloned.expressions = expressions;
      // organize
      const otherImports: { [key: string]: string[] } = {};
      objectKeys(imports)
        .sort()
        .forEach(
          (key) => (otherImports[key] = objectKeys(imports[key]).sort())
        );
      // update
      cloned.otherImports = otherImports;

      // ok
      return cloned;
    })
  );
}

function getBaseName(aName: string): string {
  return aName.endsWith('[]') ? aName.substr(0, aName.length - 2) : aName;
}

function _createTypeDefinitionContext(
  aTypeClass: TypeClass,
  aTools: WchTools,
  aComponentReg: ComponentRegistry
): Observable<any> {
  // clone the type
  const typeDef = aTypeClass;
  const cloned = cloneDeep(typeDef.type);
  // set class name
  cloned.definitionName = typeDef.typeElementClass;

  // path to the type interface
  const definitionPath = typeDef.folder;

  // produce the bindings
  const imports: Imports = {};

  // default imports
  const importIsNotNil = getIdentifierFrom('isNotNil', DEP_UTILS);
  _registerImport(`isNotNil as ${importIsNotNil}`, DEP_UTILS, imports);
  const importIsArrayOf = getIdentifierFrom('isArrayOf', DEP_UTILS);
  const importIsOptionalArrayOf = getIdentifierFrom(
    'isOptionalArrayOf',
    DEP_UTILS
  );
  const importIsOptional = getIdentifierFrom('isOptional', DEP_UTILS);

  _registerImport('DeliveryGroupElementMetadata', DEP_API, imports);

  const rxBindings: Array<Observable<any>> = cloned.elements.map((el: any) => {
    // result
    const binding: any = {};
    // class name
    binding.key = el.key;
    binding.constant = 'KEY_' + _createConstantName(el.key);
    binding.observableKey = _camelCase('on ' + el.key);
    binding.expression = _getExpression(el);
    binding.comment = _toComment(el);
    binding.required = !!el.required;
    binding.optional = !!!el.required;
    binding.multi = el.allowMultipleValues;

    binding.selectMethod = _camelCase('select ' + el.key);
    binding.rxSelectMethod = _camelCase('rx select ' + el.key);

    _registerImport('pluckProperty', DEP_UTILS, imports);
    _registerImport('partialLeft', DEP_UTILS, imports);
    _registerImport('rxSelectProperty', DEP_UTILS, imports);
    _registerImport('EqualsPredicate', DEP_UTILS, imports);
    _registerImport('UnaryFunction', DEP_RXJS, imports);
    _registerImport('OperatorFunction', DEP_RXJS, imports);

    if (binding.multi) {
      if (binding.optional) {
        _registerImport(
          `isOptionalArrayOf as ${importIsOptionalArrayOf}`,
          DEP_UTILS,
          imports
        );
      } else {
        _registerImport(`isArrayOf as ${importIsArrayOf}`, DEP_UTILS, imports);
      }
    } else {
      if (binding.optional) {
        _registerImport(
          `isOptional as ${importIsOptional}`,
          DEP_UTILS,
          imports
        );
      }
    }

    let rxElementName: Observable<string>;
    let rxValidator: Observable<string>;

    const bIsGroup = el.elementType === ELEMENT_TYPE_GROUP;
    if (bIsGroup) {
      // type id
      const typeId = el.typeRef.id;
      // locate the type
      const rxRefType = aComponentReg
        .findTypeClass(aTools.types[typeId])
        .pipe(shareReplay());
      // the from statement
      const rxFrom = rxRefType.pipe(
        map(
          (def) =>
            './' +
            relativePath(definitionPath, def.folder) +
            '/' +
            def.typeElementRef
        )
      );
      // the type name
      const rxNameEl = rxRefType.pipe(
        map((def) =>
          el.allowMultipleValues
            ? `${def.typeElementClass}[]`
            : def.typeElementClass
        ),
        shareReplay()
      );
      // register the import
      const rxImportElement: Observable<string> = combineLatest(
        rxFrom,
        rxNameEl,
        rxRefType
      ).pipe(
        map(([fromType, name, def]) => {
          const baseName = getBaseName(name);
          const capBaseName = classCase(baseName);
          // test for idempotent imports
          if (definitionPath !== def.folder) {
            const isImport = getIdentifierFrom(`is${capBaseName}`, fromType);

            _registerImport(baseName, fromType, imports);
            _registerImport(
              `is${capBaseName} as ${isImport}`,
              fromType,
              imports
            );

            return isImport;
          }
          // import from self
          return getIdentifierFrom(`is${capBaseName}`, '.');
        }),
        opShareLast
      );
      // the type name
      rxElementName = rxImportElement.pipe(mergeMapTo(rxNameEl));
      rxValidator = rxImportElement;
    } else {
      // decode the type name
      const elementName = el.allowMultipleValues
        ? `${TYPES[el.elementType]}[]`
        : TYPES[el.elementType];
      const elementBaseName = TYPES[el.elementType];
      if (BUILT_IN_TYPES.indexOf(elementBaseName) < 0) {
        // register the import
        _registerImport(elementBaseName, DEP_API, imports);
      }
      // import
      const capElementBaseName = classCase(elementBaseName);
      const isImport = getIdentifierFrom(`is${capElementBaseName}`, DEP_UTILS);
      // import the type check
      _registerImport(
        `is${capElementBaseName} as ${isImport}`,
        DEP_UTILS,
        imports
      );
      // decode the type name
      const simpleName = TYPES[el.elementType];
      if (BUILT_IN_TYPES.indexOf(simpleName) < 0) {
        // register the import
        _registerImport(simpleName, DEP_API, imports);
      }
      // ok
      rxElementName = of(elementName);
      rxValidator = of(isImport);
    }

    // handle
    return combineLatest([rxElementName, rxValidator]).pipe(
      map(([elName, validator]) => {
        // update the binding
        binding.type = elName;
        binding.validator = validator;

        // returns the binding
        return binding;
      })
    );
  });

  // wait
  return rxPipe(
    rxForkJoin(rxBindings),
    map((bindings) => {
      // update
      cloned.bindings = bindings;
      cloned.hasBindings = objectKeys(bindings).length > 0;
      cloned.isNotNil = importIsNotNil;
      cloned.isArrayOf = importIsArrayOf;
      cloned.isOptionalArrayOf = importIsOptionalArrayOf;
      cloned.isOptional = importIsOptional;
      // organize
      const otherImports: { [key: string]: string[] } = {};
      objectKeys(imports)
        .sort()
        .forEach(
          (key) => (otherImports[key] = objectKeys(imports[key]).sort())
        );
      // update
      cloned.otherImports = otherImports;

      cloned.baseElementClass = typeDef.baseElementClass;
      cloned.singleElementClass = typeDef.singleElementClass;
      cloned.multiElementClass = typeDef.multiElementClass;

      // ok
      return cloned;
    })
  );
}

function _createAbstractComponent(
  aClass: ComponentClass,
  aTemplate: Observable<HandlebarsTemplateDelegate>,
  aTools: WchTools,
  aOptions: Options,
  aComponentReg: ComponentRegistry
): Observable<string> {
  // prepare the context
  const rxCtx$ = _createAbstractComponentContext(
    aClass,
    aTools,
    aComponentReg,
    aOptions
  );
  // target name
  const dstFile = join(aClass.folder, aClass.abstractComponentFile);
  // execute the template
  const newContent$ = rxPipe(
    combineLatest(rxCtx$, aTemplate, asyncScheduler),
    map(([ctx, tmp]) => tmp(ctx))
  );
  // write the content
  return rxPipe(
    newContent$,
    map((data) => writeTextSafe(aTools.tree, data, dstFile, true)),
    mapTo(dstFile)
  );
}

function _createTypeInterface(
  aClass: ComponentClass,
  aTemplate: Observable<HandlebarsTemplateDelegate>,
  aTools: WchTools,
  aOptions: Options,
  aComponentReg: ComponentRegistry
): Observable<string> {
  // prepare the context
  const rxCtx = _createTypeInterfaceContext(aClass, aTools, aComponentReg);
  // target name
  const dstFile = join(aClass.folder, aClass.typeInterfaceFile);
  // execute the template
  const newContent = rxCtx.pipe(
    mergeMap((ctx) => aTemplate.pipe(map((tmp) => tmp(ctx))))
  );
  // write the content
  return newContent.pipe(
    map((data) => writeTextSafe(aTools.tree, data, dstFile, true)),
    mapTo(dstFile)
  );
}

/**
 * Get the type dependencies
 *
 * @param aTypeClass
 */
function _getTypeDependencies(
  aTypeClass: TypeClass,
  aTools: WchTools,
  aComponentReg: ComponentRegistry
): Observable<TypeClass> {
  // type
  const type = aTypeClass.type;
  // analyze the elements
  return merge(
    ...type.elements
      .filter((el: any) => el.elementType === ELEMENT_TYPE_GROUP)
      .map((el: any) =>
        aComponentReg.findTypeClass(aTools.types[el.typeRef.id])
      )
  );
}

function _createTypeDefinition(
  aTypeClass: TypeClass,
  aTemplate: Observable<HandlebarsTemplateDelegate>,
  aTools: WchTools,
  aOptions: Options,
  aComponentReg: ComponentRegistry
): Observable<string> {
  // check for dups
  if (!aComponentReg.registerType(aTypeClass.type)) {
    return EMPTY;
  }
  // the def
  const typeDef = aTypeClass;
  // prepare the context
  const rxCtx = _createTypeDefinitionContext(typeDef, aTools, aComponentReg);
  // target name
  const dstFile = join(typeDef.folder, typeDef.typeElementFile);
  // execute the template
  const newContent = rxPipe(
    rxCtx,
    mergeMap((ctx) => aTemplate.pipe(map((tmp) => tmp(ctx))))
  );
  // write the content
  const rxResult = rxPipe(
    newContent,
    map((data) => writeTextSafe(aTools.tree, data, dstFile, true)),
    mapTo(dstFile)
  );
  // generate all transitive types
  const rxDependencies = rxPipe(
    _getTypeDependencies(typeDef, aTools, aComponentReg),
    mergeMap((aDepType) =>
      _createTypeDefinition(
        aDepType,
        aTemplate,
        aTools,
        aOptions,
        aComponentReg
      )
    )
  );
  // merge together
  return merge(rxResult, rxDependencies);
}

function _createTypeComponent(
  aClass: ComponentClass,
  aTemplate: Observable<HandlebarsTemplateDelegate>,
  aTools: WchTools,
  aOptions: Options
): Observable<string> {
  // override flag
  const bOverride = !!aOptions.force;
  // prepare the context
  const ctx = _createTypeComponentContext(aClass);
  // target name
  const dstFile = join(aClass.folder, aClass.typeComponentFile);
  // execute the template
  const newContent = rxPipe(aTemplate, map((tmp) => tmp(ctx)));
  // write the content
  return newContent.pipe(
    map((data) => writeTextSafe(aTools.tree, data, dstFile, bOverride)),
    mapTo(dstFile)
  );
}

function _createTypeHtmlContext(aClass: ComponentClass) {
  return {
    className: aClass.typeComponentClass
  };
}

/**
 * Constructs the context to generate a layout sample
 *
 * @param aLayout   the layout
 * @param aMapping  the layout mapping
 * @param aType     the type
 * @param aTools    access to the tools
 */
function _createLayoutHtmlContext(aClass: LayoutClass, aOptions: Options) {
  // elements
  const el = cloneDeep(aClass.type.elements);
  // iterate and add the propery name
  forEach(el, (e: any) => {
    e.prop = _camelCase(e.key);
    e.onprop = _camelCase('on ' + e.key);
  });

  return {
    className: aClass.layoutClass,
    editable: !!aOptions.editable || false,
    elements: el
  };
}

function _createTypeHtml(
  aClass: ComponentClass,
  aTemplate: Observable<HandlebarsTemplateDelegate>,
  aTools: WchTools,
  aOptions: Options
): Observable<string> {
  // override flag
  const bOverride = !!aOptions.force;
  // prepare the context
  const ctx = _createTypeHtmlContext(aClass);
  // target name
  const dstFile = join(aClass.folder, aClass.typeTemplateFile);
  // execute the template
  const newContent = rxPipe(aTemplate, map((tmp) => tmp(ctx)));
  // write the content
  return rxPipe(
    newContent,
    map((data) => writeTextSafe(aTools.tree, data, dstFile, bOverride)),
    mapTo(dstFile)
  );
}

function _createTypeCssContext(aClass: ComponentClass) {
  return {
    className: aClass.typeComponentClass
  };
}

function _createLayoutCssContext(aClass: LayoutClass) {
  return {
    className: aClass.layoutClass
  };
}

function _createTypeCss(
  aClass: ComponentClass,
  aTemplate: Observable<HandlebarsTemplateDelegate>,
  aTools: WchTools,
  aOptions: Options
): Observable<string> {
  // override flag
  const bOverride = !!aOptions.force;
  // prepare the context
  const ctx = _createTypeCssContext(aClass);
  // target name
  const dstFile = join(aClass.folder, aClass.typeStyleFile);
  // execute the template
  const newContent = rxPipe(aTemplate, map((tmp) => tmp(ctx)));
  // write the content
  return newContent.pipe(
    map((data) => writeTextSafe(aTools.tree, data, dstFile, bOverride)),
    mapTo(dstFile)
  );
}

function _createComponent(
  aClass: ComponentClass,
  aTemplate: Templates,
  aTools: WchTools,
  aOptions: Options,
  aComponentReg: ComponentRegistry
): Observable<string> {
  // construct the base class
  const baseClass$ = _createAbstractComponent(
    aClass,
    aTemplate.abstractComponent,
    aTools,
    aOptions,
    aComponentReg
  );
  const typeClass$ = _createTypeComponent(
    aClass,
    aTemplate.typeComponent,
    aTools,
    aOptions
  );
  const typeInterface$ = _createTypeInterface(
    aClass,
    aTemplate.typeInterface,
    aTools,
    aOptions,
    aComponentReg
  );
  const typeDefinition$ = _createTypeDefinition(
    aClass.typeDef,
    aTemplate.typeDefinition,
    aTools,
    aOptions,
    aComponentReg
  );
  const typeHtml$ = _createTypeHtml(
    aClass,
    aTemplate.typeHtml,
    aTools,
    aOptions
  );
  const typeCss$ = _createTypeCss(aClass, aTemplate.typeCss, aTools, aOptions);
  // merge the results
  return merge(
    baseClass$,
    typeClass$,
    typeInterface$,
    typeHtml$,
    typeCss$,
    typeDefinition$,
    asyncScheduler
  );
}

/**
 * Construct the base components
 *
 * @param aTools
 * @param aSource
 * @param aTemplate
 * @param aMatcher
 * @param aOptions
 * @param aLogger
 */
function _createComponents(
  aTemplate: Templates,
  aMatcher: Predicate<AuthoringType>,
  aTools: WchTools,
  aOptions: Options,
  aCmpReg: ComponentRegistry
): Observable<string> {
  // iterate
  return rxPipe(
    from(objectKeys(aTools.types), asyncScheduler),
    map((id) => aTools.types[id]),
    filter(aMatcher),
    mergeMap((type) => aCmpReg.findComponentClass(type)),
    mergeMap((clz) =>
      _createComponent(clz, aTemplate, aTools, aOptions, aCmpReg)
    )
  );
}

function _createLayoutComponent(
  aClass: LayoutClass,
  aTemplate: Templates,
  aTools: WchTools,
  aOptions: Options,
  aLayoutReg: LayoutRegistry
): Observable<string> {
  // cycle check
  if (!aLayoutReg.registerLayout(aClass.layout)) {
    // do not create a layout, twice
    return EMPTY;
  }

  // override flag
  const bOverride = !!aOptions.force;
  // code
  const dstLayoutFile = join(aClass.folder, aClass.layoutFile);
  const layoutCtx = _createLayoutComponentContext(aClass, aOptions);
  const layoutModuleCtx = _createLayoutModuleContext(aClass, aOptions);

  const layoutContent = aTemplate.layoutComponent.pipe(
    map((tmp) => tmp(layoutCtx))
  );
  const layoutModule = aTemplate.layoutModule.pipe(
    map((tmp) => tmp(layoutModuleCtx))
  );

  const layoutFile = layoutContent.pipe(
    map((data) => writeTextSafe(aTools.tree, data, dstLayoutFile, bOverride)),
    mapTo(dstLayoutFile)
  );

  // module
  const dstModuleFileName = join(aClass.folder, aClass.moduleFile);
  const layoutModuleFile = layoutModule.pipe(
    map((data) =>
      writeTextSafe(aTools.tree, data, dstModuleFileName, bOverride)
    ),
    mapTo(dstModuleFileName)
  );

  // html
  const dstHtmlFile = join(aClass.folder, aClass.layoutTemplateFile);
  const htmlCtx = _createLayoutHtmlContext(aClass, aOptions);
  const htmlContent = aTemplate.layoutHtml.pipe(
    map((tmp) => tmp(htmlCtx).replace(/^\s*[\r\n]/gm, ''))
  );
  const htmlFile = htmlContent.pipe(
    map((data) => writeTextSafe(aTools.tree, data, dstHtmlFile, bOverride)),
    mapTo(dstHtmlFile)
  );

  // css
  const dstCssFile = join(aClass.folder, aClass.layoutStyleFile);
  const cssCtx = _createLayoutCssContext(aClass);
  const cssContent = aTemplate.layoutCss.pipe(map((tmp) => tmp(cssCtx)));
  const cssFile = cssContent.pipe(
    map((data) => writeTextSafe(aTools.tree, data, dstCssFile, bOverride)),
    mapTo(dstCssFile)
  );

  // handle the module file option
  const files: Observable<string>[] = [
    layoutFile,
    htmlFile,
    cssFile,
    layoutModuleFile
  ];
  // merge
  return merge(...files);
}

/**
 * Get all layouts for a particular layout mapping
 *
 * @param aMapping  the mapping
 * @param aTools    the tools
 *
 * @return the observable with the layouts
 */
function _getLayouts(
  aMapping: AuthoringLayoutMapping,
  aTools: WchTools
): Observable<any> {
  const mappings = aMapping.mappings;

  return Observable.create((observer: Observer<any>) => {
    forEach(mappings, (mapping) => {
      const layouts = mapping.layouts;
      forEach(layouts, (layout) => observer.next(aTools.layouts[layout.id]));
    });
    // done
    observer.complete();
  });
}

function _getAllLayouts(aMapping: any, aTools: WchTools): Observable<string> {
  // iterate
  return rxPipe(
    from(objectKeys(aTools.layoutMappings), asyncScheduler),
    map((id) => aTools.layoutMappings[id]),
    mergeMap((mapping) => _getLayouts(mapping, aTools)),
    filter(
      (layout) => layout != null && layout.templateType === LAYOUT_TYPE_ANGULAR
    ),
    distinct((layout) => layout.id),
    // is name unique??
    distinct((layout) => layout.name)
  );
}

function _createLayout(
  aMapping: any,
  aTools: WchTools,
  aTemplate: Templates,
  aOptions: Options,
  aLayoutReg: LayoutRegistry
): Observable<string> {
  // decode the type
  const typeId = aMapping.type.id;
  const type = aTools.types[typeId];
  // check
  if (!type) {
    return EMPTY;
  }

  // check the layouts
  return rxPipe(
    _getLayouts(aMapping, aTools),
    // allow to work on all kinds of layouts
    opFilterNotNil,
    // make sure not to operate on layouts twice
    distinct((layout) => layout.id),
    // is name unique??
    distinct((layout) => layout.name),
    // resolve the layout class
    mergeMap((layout) => aLayoutReg.findLayoutClass(layout, aMapping, type)),
    // produce the layout
    mergeMap((clz) =>
      _createLayoutComponent(clz, aTemplate, aTools, aOptions, aLayoutReg)
    )
  );
}

function _extractClass(aFile: SourceFile): ClassDeclaration {
  return findLayoutComponent(aFile);
}

interface ClassDescriptor {
  class: string;
  path: string;
}

function compareClassDescriptor(
  aLeft: ClassDescriptor,
  aRight: ClassDescriptor
): number {
  return cmpStrings(aLeft.class, aRight.class);
}

/**
 * Computes the class descriptors
 *
 * @param aRootDir  - target root directory
 * @param aClasses - the classes
 *
 * @returns the descriptors
 */
function getClassDescriptors(
  aRootDir: string,
  aClasses: Record<string, ClassDeclaration>
): ClassDescriptor[] {
  // build the context
  const ctx = reduceForIn(
    aClasses,
    (dst: ClassDescriptor[], clz: ClassDeclaration, path: string) => {
      // compute the relative path
      const parsed = parse(path);
      const relPath = relativePath(aRootDir, parsed.dir);
      const relName = `./${relPath}/${parsed.name}`;
      // update
      return arrayPush({ class: clz.name.text, path: relName }, dst);
    },
    []
  );
  ctx.sort(compareClassDescriptor);
  // ok
  return ctx;
}

/**
 * Constructs a file that lists all of the Angular modules in an array
 *
 * @param aDstDir  - target directory to create the file in
 * @param aTree  - the tree to write the content to
 * @param aTemplate  - the template
 * @param aLayoutComponents  - the components to export
 *
 * @returns an observable with the export
 */
function _createClassOverview(
  aDstDir: string,
  aDstFileName: string,
  aTree: Tree,
  aTemplate: Observable<HandlebarsTemplateDelegate>,
  aModules: Record<string, ClassDeclaration>
): Observable<string> {
  // dst name
  const dstName = join(normalize(aDstDir), aDstFileName);
  // analyze the dst file
  const dstFile = parse(dstName);
  // build the context
  const ctx = getClassDescriptors(dstFile.dir, aModules);
  // apply the context
  return rxPipe(
    aTemplate,
    map((tmp) => tmp(ctx)),
    map((data) => writeTextSafe(aTree, data, dstName, true)),
    mapTo(dstName)
  );
}

/**
 * Constructs a file that lists all of the Angular layouts in an array
 *
 * @param aDstDir  - target directory to create the file in
 * @param aTree  - the tree to write the content to
 * @param aTemplate  - the template
 * @param aLayoutComponents  - the components to export
 *
 * @returns an observable with the export
 */
function _createLayoutExports(
  aDstDir: string,
  aTree: Tree,
  aTemplates: Templates,
  aComponents: Record<string, ClassDeclaration>
): Observable<string> {
  // just dispatch
  return _createClassOverview(
    aDstDir,
    'layouts.exports.ts',
    aTree,
    aTemplates.layoutExports,
    aComponents
  );
}

/**
 * Constructs a file that lists all of the Angular layouts in an array
 *
 * @param aDstDir  - target directory to create the file in
 * @param aTree  - the tree to write the content to
 * @param aTemplate  - the template
 * @param aLayoutComponents  - the components to export
 *
 * @returns an observable with the export
 */
function _createLayoutOverview(
  aDstDir: string,
  aTree: Tree,
  aTemplates: Templates,
  aLayoutComponents: Record<string, ClassDeclaration>
): Observable<string> {
  // just dispatch
  return _createClassOverview(
    aDstDir,
    'layouts.ts',
    aTree,
    aTemplates.layoutOverview,
    aLayoutComponents
  );
}

/**
 * Constructs a file that lists all of the Angular modules in an array
 *
 * @param aDstDir  - target directory to create the file in
 * @param aTree  - the tree to write the content to
 * @param aTemplate  - the template
 * @param aLayoutComponents  - the components to export
 *
 * @returns an observable with the export
 */
function _createModuleOverview(
  aDstDir: string,
  aTree: Tree,
  aTemplates: Templates,
  aModules: Record<string, ClassDeclaration>
): Observable<string> {
  // just dispatch
  return _createClassOverview(
    aDstDir,
    'modules.ts',
    aTree,
    aTemplates.moduleOverview,
    aModules
  );
}

/**
 * Constructs a file that lists all of the Angular modules in an array
 *
 * @param aDstDir  - target directory to create the file in
 * @param aTree  - the tree to write the content to
 * @param aTemplate  - the template
 * @param aLayoutComponents  - the components to export
 *
 * @returns an observable with the export
 */
function _createModuleExports(
  aDstDir: string,
  aTree: Tree,
  aTemplates: Templates,
  aModules: Record<string, ClassDeclaration>
): Observable<string> {
  // just dispatch
  return _createClassOverview(
    aDstDir,
    'modules.exports.ts',
    aTree,
    aTemplates.moduleExports,
    aModules
  );
}

function _createOverview(
  aSource: Observable<string[]>,
  aTemplate: Templates,
  aTools: WchTools,
  aOptions: Options
): Observable<string> {
  // web component case
  const bWebComponents = !!aOptions.webComponents;

  // first directory is the application target
  const dstDir$ = rxPipe(
    aSource,
    mergeMap((sources) => from(sources)),
    first(),
    opShareLast
  );

  // read and parse all typescript files
  const tsFiles$ = rxPipe(
    aSource,
    mergeMap((sources) => from(sources)),
    map((src) => readSourceFiles(normalize(src), aTools.tree)),
    reduce<Record<string, SourceFile>>(assignObject, {}),
    shareReplay()
  );

  // extractor
  const extractor = _extractClass; //bWebComponents ? _extractClassWebComponent : _extractClass;

  // extract the layout components from these files
  const layoutComponentClasses$ = rxPipe(
    tsFiles$,
    map(getLayoutComponents),
    shareReplay()
  );

  // extract the layout modules
  const layoutModules$ = rxPipe(
    combineLatest(tsFiles$, layoutComponentClasses$),
    map(([tsFiles, layoutComponentClasses]) =>
      getLayoutModules(tsFiles, layoutComponentClasses)
    ),
    shareReplay()
  );

  // resolve all classes
  const allClasses$ = rxPipe(
    combineLatest(layoutComponentClasses$, tsFiles$),
    map(([layoutComponentClasses, tsFiles]) =>
      reduceForIn(
        layoutComponentClasses,
        (res, component) =>
          assignObject(res, resolveClassHierarchy(tsFiles, component)),
        {}
      )
    ),
    shareReplay()
  );

  const layoutOverview$ = rxPipe(
    combineLatest(dstDir$, layoutComponentClasses$),
    mergeMap(([dstDir, layoutComponentClasses]) =>
      _createLayoutOverview(
        dstDir,
        aTools.tree,
        aTemplate,
        layoutComponentClasses
      )
    )
  );

  const layoutExports$ = rxPipe(
    combineLatest(dstDir$, allClasses$),
    mergeMap(([dstDir, allClasses]) =>
      _createLayoutExports(dstDir, aTools.tree, aTemplate, allClasses)
    )
  );

  const moduleOverview$ = rxPipe(
    combineLatest(dstDir$, layoutModules$),
    mergeMap(([dstDir, layoutModules]) =>
      _createModuleOverview(dstDir, aTools.tree, aTemplate, layoutModules)
    )
  );

  const moduleExports$ = rxPipe(
    combineLatest(dstDir$, layoutModules$),
    mergeMap(([dstDir, layoutModules]) =>
      _createModuleExports(dstDir, aTools.tree, aTemplate, layoutModules)
    )
  );

  // app module
  const appModulePath$ = rxPipe(
    dstDir$,
    map((dstDir) => join(normalize(dstDir), APP_MODULE)),
    shareReplay()
  );

  const appModule$ = rxPipe(
    combineLatest(appModulePath$, tsFiles$),
    map(([appModulePath, tsFiles]) => tsFiles[appModulePath]),
    filter(isNotNil),
    map(addModulesToAppModule)
  );

  const updatedAppModule$ = rxPipe(
    combineLatest(appModulePath$, appModule$),
    map(([appModulePath, appModule]) =>
      writeTextSafe(aTools.tree, appModule, appModulePath, true)
    ),
    mergeMapTo(appModulePath$)
  );

  /** Export all */
  return merge(
    layoutOverview$,
    layoutExports$,
    moduleOverview$,
    moduleExports$,
    updatedAppModule$
  );
}

function _isNotNil(aMapping: any): boolean {
  return !!aMapping;
}

function _getTypeFromMapping(aMapping: any, aTools: WchTools): any {
  // get the ID
  if (aMapping.type && aMapping.type.id) {
    // get the type
    return aTools.types[aMapping.type.id];
  }
}

function _createLayouts(
  aTools: WchTools,
  aTemplate: Templates,
  aMatcher: Predicate<AuthoringType>,
  aOptions: Options,
  aLayoutReg: LayoutRegistry
): Observable<string> {
  // iterate
  const layouts$ = rxPipe(
    from(objectKeys(aTools.layoutMappings), asyncScheduler),
    map((id) => aTools.layoutMappings[id]),
    filter(_isNotNil),
    filter((mapping) => aMatcher(_getTypeFromMapping(mapping, aTools))),
    mergeMap((mapping) =>
      _createLayout(mapping, aTools, aTemplate, aOptions, aLayoutReg)
    )
  );
  // concat
  return layouts$;
}

function _rewriteAppModule(
  aLayoutExports: string,
  aModuleFile: string,
  aOptions: Options
): Observable<string> {
  // just dispatch
  /*  return !aOptions.skipRegistration
    ? addLayoutToModule(aLayoutExports, aModuleFile).pipe(
        catchError(() => EMPTY)
      )
    : EMPTY;*/
  return EMPTY;
}

function _matches(aName: string, aMatcher: Predicate<string>): boolean {
  // check
  return aMatcher(aName);
}

/**
 * Selects components by applying a matching function
 *
 * @param aMatcher  the matcher
 * @param aLogger   the logger
 */
function _byMatcher(aMatcher: Predicate<string>): Predicate<AuthoringType> {
  // execute the check
  return (aType: AuthoringType) =>
    aType && aType.name && _matches(aType.name, aMatcher);
}

function reduceToRecord<T>(): OperatorFunction<
  JsonEntry<T>,
  Record<string, T>
> {
  return (entries$) =>
    rxPipe(
      entries$,
      reduce(
        (res: Record<string, T>, entry: JsonEntry<T>) =>
          objectAssign(entry.id, entry.entry, res),
        {}
      )
    );
}

/**
 * Reads the data structures for the tools
 *
 * @param aDataDir -  root data path
 * @param tree  -  the tree
 *
 * @returns the populated tools
 */
function readWchTools(aDataDir: Path, tree: Tree): Observable<WchTools> {
  // callback
  const readDir = readDirectoryOnTree(tree);
  // visit
  const types$ = rxPipe(rxFindAuthoringTypes(aDataDir, readDir), reduceToRecord());
  const layouts$ = rxPipe(
    rxFindAuthoringLayouts(aDataDir, readDir),
    reduceToRecord()
  );
  const layoutMappings$ = rxPipe(
    rxFindAuthoringLayoutMappings(aDataDir, readDir),
    reduceToRecord()
  );
  // combine
  return rxPipe(
    combineLatest(types$, layouts$, layoutMappings$),
    map(([types, layouts, layoutMappings]) => ({
      types,
      layouts,
      layoutMappings,
      tree
    })),
    opShareLast
  );
}

const DEFAULT_CSS_STYLE = 'css';

function createComponents(options: Options): Rule {
  // construct the matchers
  const matcher = blackWhiteList(options.include, options.exclude);
  const typeMatcher = _byMatcher(matcher);

  return (host: Tree, context: SchematicContext): Observable<Tree> => {
    // locate the project to work with
    const project = findProject(host, options);
    // get the style
    const cssStyle = getPath(
      project,
      ['schematics', '@schematics/angular:component', 'style'],
      DEFAULT_CSS_STYLE
    );
    if (isNil(options.style)) {
      options.style = cssStyle;
    }
    // source directory
    const srcPath = buildDefaultPath(project);
    const rxSrcDirs = of([srcPath], asyncScheduler);
    // locate the data directory
    const dataDir = normalize(findDataDir(host, options));
    // the compiled template
    const templates = _createTemplate(options);
    // the tools
    const wchTools$ = readWchTools(dataDir, host);
    // the registries
    const typeReg = new TypeRegistry(rxSrcDirs, options, host);
    const cmpReg = new ComponentRegistry(rxSrcDirs, options, host, typeReg);
    const layoutReg = new LayoutRegistry(rxSrcDirs, options, host, cmpReg);

    // construct the components
    const components$ = rxPipe(
      wchTools$,
      mergeMap((tools) =>
        _createComponents(templates, typeMatcher, tools, options, cmpReg)
      )
    );

    // construct the layouts
    const layouts$ = rxPipe(
      wchTools$,
      mergeMap((tools) =>
        _createLayouts(tools, templates, typeMatcher, options, layoutReg)
      )
    );

    // construct the overview
    const overview$ = rxPipe(
      wchTools$,
      mergeMap((tools) => _createOverview(rxSrcDirs, templates, tools, options))
    );

    // all code
    const code$ = merge(components$, layouts$);

    // first construct the code artifacts, then the overview
    const all$ = concat(code$, overview$);

    // merge
    return rxPipe(all$, mapTo(host));
  };
}

/**
 * Construct the components
 *
 * @param options - our options
 * @returns the new rule
 */
export function generateComponents(options: Schema): Rule {
  // normalize the options
  const opts: Schema = { flat: false, ...options };

  return (host: Tree, context: SchematicContext) =>
    chain([branchAndMerge(chain([createComponents(opts)]))])(host, context);
}
