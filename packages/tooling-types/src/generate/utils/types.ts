import { AuthoringType, LoggerService } from '@acoustic-content-sdk/api';
import { TemplateType } from '@acoustic-content-sdk/hbs-tooling';
import {
  ensureDirPath,
  ReadDirectory,
  ReadTextFile,
  rxFindAuthoringTypes
} from '@acoustic-content-sdk/tooling';
import {
  NOOP_LOGGER_SERVICE,
  objectAssign,
  opShareLast,
  Predicate,
  rxNext,
  rxPipe
} from '@acoustic-content-sdk/utils';
import { from, merge, MonoTypeOperatorFunction, of, UnaryFunction } from 'rxjs';
import { filter, map, mergeMap, pluck, reduce } from 'rxjs/operators';

import { rxReadTemplate } from './templates';
import { createTypeDefinition } from './type.definition';
import { createTypeInterface } from './type.interface';
import { TypeOptions, TypeRegistry } from './type.reg';
import { createTypeIndex } from './type.index';

const LOGGER = 'GenerateTypes';

export function generate(
  aDataDir: string,
  aTypeFilter: Predicate<AuthoringType>,
  aReadDir: ReadDirectory,
  aReadText: ReadTextFile,
  aCompiler: UnaryFunction<string, TemplateType>,
  logSvc: LoggerService = NOOP_LOGGER_SERVICE
) {
  // base folders
  const base$ = of(['/src']);
  // logging
  const logger = logSvc.get(LOGGER);
  // next logger
  const log: <T>(...v: any[]) => MonoTypeOperatorFunction<T> = rxNext(logger);
  // the options
  const options: TypeOptions = {
    flat: true
  };
  // make sure the data dir does not end with a slash
  const dataDir = ensureDirPath(aDataDir);
  // log this
  logger.info('dataDir', dataDir);
  // templates
  const interfaceTemplate$ = rxReadTemplate(
    '/templates/type.interface.hbs',
    aCompiler
  );
  const definitionTemplate$ = rxReadTemplate(
    '/templates/type.definition.hbs',
    aCompiler
  );
  const indexTemplate$ = rxReadTemplate('/templates/type.index.hbs', aCompiler);
  // find types
  const allTypes$ = rxPipe(
    rxFindAuthoringTypes(dataDir, aReadDir),
    pluck('entry'),
    reduce(
      (aDst: Record<string, AuthoringType>, aType: AuthoringType) =>
        objectAssign(aType.id, aType, aDst),
      {}
    ),
    opShareLast
  );
  // extract all types that we are interested in
  const types$ = rxPipe(
    allTypes$,
    mergeMap((all) => from(Object.values(all))),
    filter(aTypeFilter),
    log('type')
  );
  // the type registry
  const typeReg$ = rxPipe(
    allTypes$,
    map((allTypes) => new TypeRegistry(base$, options, aReadText, allTypes))
  );
  // generate all types
  return rxPipe(
    typeReg$,
    mergeMap((typeReg) =>
      rxPipe(
        types$,
        mergeMap((type) => typeReg.findTypeClass(type)),
        mergeMap((typeCls) =>
          merge(
            createTypeDefinition(typeCls, typeReg, definitionTemplate$),
            createTypeInterface(typeCls, typeReg, interfaceTemplate$),
            createTypeIndex(typeCls, typeReg, indexTemplate$)
          )
        )
      )
    )
  );
}
