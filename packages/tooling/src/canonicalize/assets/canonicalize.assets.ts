import { BaseAuthoringItem, LoggerService } from '@acoustic-content-sdk/api';
import {
  jsonParse,
  NOOP_LOGGER_SERVICE,
  Predicate,
  rxPipe
} from '@acoustic-content-sdk/utils';
import { Observable } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';

import { ReadDirectory } from '../../dir/dir';
import { createFileDescriptor, FileDescriptor } from '../../file/file';
import { createRevision } from '../../utils/guid';
import { canonicalizeJson } from '../../utils/json';
import { createAuthPredicate } from '../../utils/predicates';
import { ensureDirPath } from '../../utils/url.utils';
import { acceptJsonFile } from '../../utils/wch.tools';
import { Schema } from './schema';

const LOGGER = 'CanonicalizeAssets';

/**
 * Sort and create revision ID
 *
 * @param aData - the item data
 * @returns the item
 */
function fixJson(aData: BaseAuthoringItem): BaseAuthoringItem {
  // delete the revison
  const { rev, ...data } = aData;
  // canonicalize
  const canonical: BaseAuthoringItem = canonicalizeJson(data);
  canonical.rev = createRevision(canonical);
  // done
  return canonical;
}

function generate(
  aDataDir: string,
  aItemFilter: Predicate<BaseAuthoringItem>,
  aReadDir: ReadDirectory,
  logSvc: LoggerService = NOOP_LOGGER_SERVICE
): Observable<FileDescriptor<BaseAuthoringItem>> {
  // logging
  const logger = logSvc.get(LOGGER);
  // make sure the data dir does not end with a slash
  const dataDir = ensureDirPath(aDataDir);
  // log this
  logger.info('dataDir', dataDir);

  return rxPipe(
    aReadDir(aDataDir, acceptJsonFile),
    map(([name, buffer]) =>
      createFileDescriptor(
        name,
        jsonParse<BaseAuthoringItem>(buffer.toString())
      )
    ),
    filter(([, item]) => aItemFilter(item)),
    // log this
    tap(([name]) => logger.info('Processing', name)),
    // fix
    map(([name, item]) => createFileDescriptor(name, fixJson(item)))
  );
}

export function canonicalizeAssets(options: Schema) {
  // data directory
  const { data } = options;

  // validation
  const filterItem = createAuthPredicate(options);

  return (aReadDir: ReadDirectory, logSvc?: LoggerService) =>
    generate(data, filterItem, aReadDir, logSvc);
}
