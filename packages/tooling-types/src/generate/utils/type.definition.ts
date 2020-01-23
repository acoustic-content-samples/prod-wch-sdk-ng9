import {
  ELEMENT_TYPE_GROUP,
  MODULE as API_MODULE
} from '@acoustic-content-sdk/api';
import { TemplateType } from '@acoustic-content-sdk/hbs-tooling';
import { rxForkJoin } from '@acoustic-content-sdk/rx-utils';
import {
  camelCase,
  classCase,
  constantCase,
  createFileDescriptor,
  FileDescriptor,
  relativePath
} from '@acoustic-content-sdk/tooling';
import {
  cloneDeep,
  MODULE as UTILS_MODULE,
  objectKeys,
  opShareLast,
  rxPipe
} from '@acoustic-content-sdk/utils';
import { combineLatest, EMPTY, merge, Observable, of } from 'rxjs';
import { map, mergeMap, mergeMapTo, shareReplay } from 'rxjs/operators';

import { BUILT_IN_TYPES, TYPES } from './constants';
import { getIdentifierFrom } from './identifiers';
import { Imports, registerImport } from './imports';
import { getBaseName, getExpression, toComment } from './names';
import { TypeClass, TypeRegistry } from './type.reg';

const DEP_RXJS = 'rxjs';

/**
 * Get the type dependencies
 *
 * @param aTypeClass
 */
function getTypeDependencies(
  aTypeClass: TypeClass,
  aTypeReg: TypeRegistry
): Observable<TypeClass> {
  // type
  const type = aTypeClass.type;
  // analyze the elements
  return merge(
    ...type.elements
      .filter((el: any) => el.elementType === ELEMENT_TYPE_GROUP)
      .map((el: any) => aTypeReg.findTypeClassById(el.typeRef.id))
  );
}

function createTypeDefinitionContext(
  aTypeClass: TypeClass,
  aTypeReg: TypeRegistry
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
  const importIsNotNil = getIdentifierFrom('isNotNil', UTILS_MODULE);
  registerImport(`isNotNil as ${importIsNotNil}`, UTILS_MODULE, imports);
  const importIsArrayOf = getIdentifierFrom('isArrayOf', UTILS_MODULE);
  const importIsOptionalArrayOf = getIdentifierFrom(
    'isOptionalArrayOf',
    UTILS_MODULE
  );
  const importIsOptional = getIdentifierFrom('isOptional', UTILS_MODULE);

  registerImport('DeliveryGroupElementMetadata', API_MODULE, imports);

  const rxBindings: Observable<any>[] = cloned.elements.map((el: any) => {
    // result
    const binding: any = {};
    // class name
    binding.key = el.key;
    binding.constant =
      'KEY_' + typeDef.constantPrefix + '_' + constantCase(el.key);
    binding.observableKey = camelCase(el.key) + '$';
    binding.expression = getExpression(el);
    binding.comment = toComment(el);
    binding.required = !!el.required;
    binding.optional = !!!el.required;
    binding.multi = el.allowMultipleValues;
    binding.helpText = el.helpText;

    binding.selectMethod = camelCase(
      'select ' + typeDef.constantPrefix + ' ' + el.key
    );
    binding.rxSelectMethod = camelCase(
      'rx select ' + typeDef.constantPrefix + ' ' + el.key
    );

    registerImport('pluckProperty', UTILS_MODULE, imports);
    registerImport('partialLeft', UTILS_MODULE, imports);
    registerImport('rxSelectProperty', UTILS_MODULE, imports);
    registerImport('EqualsPredicate', UTILS_MODULE, imports);
    registerImport('UnaryFunction', DEP_RXJS, imports);
    registerImport('OperatorFunction', DEP_RXJS, imports);

    if (binding.multi) {
      if (binding.optional) {
        registerImport(
          `isOptionalArrayOf as ${importIsOptionalArrayOf}`,
          UTILS_MODULE,
          imports
        );
      } else {
        registerImport(
          `isArrayOf as ${importIsArrayOf}`,
          UTILS_MODULE,
          imports
        );
      }
    } else {
      if (binding.optional) {
        registerImport(
          `isOptional as ${importIsOptional}`,
          UTILS_MODULE,
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
      const rxRefType = aTypeReg.findTypeClassById(typeId).pipe(shareReplay());
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

            registerImport(baseName, fromType, imports);
            registerImport(
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
        registerImport(elementBaseName, API_MODULE, imports);
      }
      // import
      const capElementBaseName = classCase(elementBaseName);
      const isImport = getIdentifierFrom(
        `is${capElementBaseName}`,
        UTILS_MODULE
      );
      // import the type check
      registerImport(
        `is${capElementBaseName} as ${isImport}`,
        UTILS_MODULE,
        imports
      );
      // decode the type name
      const simpleName = TYPES[el.elementType];
      if (BUILT_IN_TYPES.indexOf(simpleName) < 0) {
        // register the import
        registerImport(simpleName, API_MODULE, imports);
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

      cloned.constantPrefix = typeDef.constantPrefix;
      cloned.baseElementClass = typeDef.baseElementClass;
      cloned.singleElementClass = typeDef.singleElementClass;
      cloned.multiElementClass = typeDef.multiElementClass;

      // ok
      return cloned;
    })
  );
}

export function createTypeDefinition(
  aTypeDef: TypeClass,
  aTypeReg: TypeRegistry,
  aTemplate$: Observable<TemplateType>
): Observable<FileDescriptor<string>> {
  // check for dups
  if (!aTypeReg.registerType(aTypeDef.type)) {
    return EMPTY;
  }
  // the def
  const typeDef = aTypeDef;
  // prepare the context
  const rxCtx = createTypeDefinitionContext(typeDef, aTypeReg);
  // target name
  const dstFile = `${typeDef.folder}/${typeDef.typeElementFile}`;
  // execute the template
  const newContent = rxPipe(
    rxCtx,
    mergeMap((ctx) => aTemplate$.pipe(map((tmp) => tmp(ctx))))
  );
  // write the content
  const rxResult = rxPipe(
    newContent,
    map((data) => createFileDescriptor(dstFile, data))
  );
  // generate all transitive types
  const rxDependencies = rxPipe(
    getTypeDependencies(typeDef, aTypeReg),
    mergeMap((aDepType) => createTypeDefinition(aDepType, aTypeReg, aTemplate$))
  );
  // merge together
  return merge(rxResult, rxDependencies);
}
