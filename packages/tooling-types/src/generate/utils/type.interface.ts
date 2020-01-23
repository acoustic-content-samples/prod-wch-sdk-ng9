import {
  ELEMENT_TYPE_GROUP,
  MODULE as API_MODULE
} from '@acoustic-content-sdk/api';
import { TemplateType } from '@acoustic-content-sdk/hbs-tooling';
import { rxForkJoin } from '@acoustic-content-sdk/rx-utils';
import {
  camelCase,
  constantCase,
  createFileDescriptor,
  FileDescriptor,
  relativePath
} from '@acoustic-content-sdk/tooling';
import { cloneDeep, objectKeys, rxPipe } from '@acoustic-content-sdk/utils';
import { combineLatest, Observable, of } from 'rxjs';
import { map, mergeMap, mergeMapTo, shareReplay } from 'rxjs/operators';

import { AUGMENTED_TYPES, BUILT_IN_TYPES, TYPES } from './constants';
import { Imports, registerImport } from './imports';
import { getExpression, plural, toComment } from './names';
import { TypeClass, TypeRegistry } from './type.reg';

function createTypeInterfaceContext(
  aTypeDef: TypeClass,
  aTypeReg: TypeRegistry
): Observable<any> {
  // clone the type
  const typeDef = aTypeDef;
  const cloned = cloneDeep(typeDef.type);
  // set class name
  cloned.definitionName = typeDef.typeElementClass;

  // path to the type interface
  // compute the relative path
  const definitionRef = './' + typeDef.typeElementRef;

  // top level fields
  const expressions: any = {};

  // produce the bindings
  const imports: Imports = {};

  registerImport('DeliveryContentMetadata', API_MODULE, imports);
  registerImport('RenderingContextV2', API_MODULE, imports);

  // the well known type
  registerImport(cloned.definitionName, definitionRef, imports);

  const rxBindings: Observable<any>[] = cloned.elements.map((el: any) => {
    // result
    const binding: any = {};
    // class name
    binding.constant =
      'KEY_' + typeDef.constantPrefix + '_' + constantCase(el.key);
    binding.key = el.key;
    binding.observableKey = camelCase(el.key + '$');
    binding.pluckMethod = camelCase('pluck ' + el.key);
    binding.selectMethod = camelCase('select ' + el.key);
    binding.rxSelectMethod = camelCase('rx select ' + el.key);
    binding.expression = getExpression(el);
    binding.comment = toComment(el);
    binding.required = !!el.required;
    binding.optional = !!!el.required;

    let rxTypeName: Observable<string>;

    const bIsGroup = el.elementType === ELEMENT_TYPE_GROUP;
    if (bIsGroup) {
      // type id
      const typeId = el.typeRef.id;
      // locate the type
      const rxRefType = rxPipe(
        aTypeReg.findTypeClassById(typeId),
        shareReplay()
      );
      // the from statement
      const rxFrom = rxPipe(
        rxRefType,
        map(
          (def) =>
            './' + relativePath('.', def.folder) + '/' + def.typeElementRef
        )
      );
      // the type name
      const rxType = rxPipe(
        rxRefType,
        map((def) => def.simpleTypeClass)
      );
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
      ? plural(el.elementType)
      : el.elementType;
    const exp: any = expressions[expType] || (expressions[expType] = {});

    // handle
    return rxTypeName.pipe(
      map((typeName) => {
        // update the expression
        exp[el.key] = {
          key: el.key,
          constant: el.constant,
          comment: toComment(el),
          type: el.allowMultipleValues ? typeName + '[]' : typeName,
          optional: !!!el.required,
          binding
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

export function createTypeInterface(
  aTypeDef: TypeClass,
  aTypeReg: TypeRegistry,
  aTemplate$: Observable<TemplateType>
): Observable<FileDescriptor<string>> {
  // prepare the context
  const rxCtx = createTypeInterfaceContext(aTypeDef, aTypeReg);
  // target name
  const dstFile = `${aTypeDef.folder}/${aTypeDef.typeInterfaceFile})`;
  // execute the template
  const newContent = rxPipe(
    rxCtx,
    mergeMap((ctx) =>
      rxPipe(
        aTemplate$,
        map((tmp) => tmp(ctx))
      )
    )
  );
  // write the content
  return rxPipe(
    newContent,
    map((data) => createFileDescriptor(dstFile, data))
  );
}
