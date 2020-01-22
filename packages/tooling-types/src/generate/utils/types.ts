import {
  AuthoringLayoutItem,
  AuthoringLayoutMapping,
  AuthoringType,
  Logger,
  LoggerService
} from '@acoustic-content-sdk/api';
import {
  rxReadBinaryFile,
  rxReadTextFile
} from '@acoustic-content-sdk/rx-utils';
import {
  getPath,
  isEqual,
  isNil,
  isNotNil,
  isString,
  LAYOUT_TYPE_HANDLEBARS,
  NOOP_LOGGER_SERVICE,
  objectAssign,
  opShareLast,
  Predicate,
  reduceForIn,
  rxNext,
  rxPipe
} from '@acoustic-content-sdk/utils';
import { join } from 'path';
import {
  combineLatest,
  EMPTY,
  merge,
  MonoTypeOperatorFunction,
  Observable,
  of,
  UnaryFunction
} from 'rxjs';
import { filter, map, mergeMap, pluck } from 'rxjs/operators';

import { ReadDirectory } from '@acoustic-content-sdk/tooling';
import {
  createFileDescriptor,
  FileDescriptor
} from '@acoustic-content-sdk/tooling';
import { ASSET_ROOT$, ASSETS_FOLDER } from '../../utils/assets';
import { ensureDirPath } from '@acoustic-content-sdk/tooling';
import {
  JsonEntryMap,
  rxFindAuthoringTypes,
  rxReadAuthoringLayoutMappings,
  rxReadAuthoringLayouts
} from '@acoustic-content-sdk/tooling';
import {
  wchToolsCleanup,
  wchToolsFileDescriptor
} from '@acoustic-content-sdk/tooling';

const LOGGER = 'GenerateTypes';

export function generate(
  aDataDir: string,
  aTypeFilter: Predicate<AuthoringType>,
  aReadDir: ReadDirectory,
  logSvc: LoggerService = NOOP_LOGGER_SERVICE
) {
  // logging
  const logger = logSvc.get(LOGGER);
  // next logger
  const log: <T>(...v: any[]) => MonoTypeOperatorFunction<T> = rxNext(logger);
  // make sure the data dir does not end with a slash
  const dataDir = ensureDirPath(aDataDir);
  // log this
  logger.info('dataDir', dataDir);
  // find types
  const types$ = rxPipe(
    rxFindAuthoringTypes(dataDir, aReadDir),
    pluck('entry'),
    filter(aTypeFilter),
    log('type')
  );

  return types$;
}
