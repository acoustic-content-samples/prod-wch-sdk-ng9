import { AuthoringType, LoggerService } from '@acoustic-content-sdk/api';
import { TemplateType } from '@acoustic-content-sdk/hbs-tooling';
import {
  ensureDirPath,
  FileDescriptor,
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
import {
  from,
  merge,
  MonoTypeOperatorFunction,
  Observable,
  of,
  UnaryFunction
} from 'rxjs';
import { filter, map, mergeMap, pluck, reduce, tap } from 'rxjs/operators';

import { rxReadTemplate } from './templates';
import { createTypeDefinition } from './type.definition';
import { createTypeIndex } from './type.index';
import { createTypeInterface } from './type.interface';
import { TypeOptions, TypeRegistry } from './type.reg';

const LOGGER = 'GenerateTypes';

/**
 * Generates all files that make up the typings
 *
 * @param aDataDir  - data directory for the wchtools artifacts used as a baseline
 * @param aTypeFilter  - filter that will filter down the generated types
 * @param aReadDir - callback used to read content of a directory
 * @param aReadText - callback used to read a text file
 * @param aCompiler - template compiler to compile a template source into a template function
 * @param logSvc - logger service
 *
 * @returns a stream of generated files
 */
export function generate(
  aDataDir: string,
  aTypeFilter: Predicate<AuthoringType>,
  aReadDir: ReadDirectory,
  aReadText: ReadTextFile,
  aCompiler: UnaryFunction<string, TemplateType>,
  logSvc: LoggerService = NOOP_LOGGER_SERVICE
): Observable<FileDescriptor<string>> {
  // base folders
  const base$ = of(['/src']);
  // logging
  const logger = logSvc.get(LOGGER);
  // next logger
  const log: <T>(...v: any[]) => MonoTypeOperatorFunction<T> = rxNext(logger);
  // log the filename
  const logFile = () =>
    tap<FileDescriptor<string>>(([name]) => logger.info(name));
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
    ),
    logFile()
  );
}
