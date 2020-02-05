import {
  Logger,
  LoggerService,
  REL_PATH_CURRENT_USER
} from '@acoustic-content-sdk/api';
import { ItemWithId } from '@acoustic-content-sdk/redux-utils';
import { FETCH_PRIORITY, FetchText } from '@acoustic-content-sdk/rest-api';
import { rxReadTextFile } from '@acoustic-content-sdk/rx-utils';
import {
  createReadDirectory,
  createReadTextFile,
  JsonEntry,
  ReadDirectory,
  ReadTextFile,
  rxFindAuthoringAssets,
  rxFindAuthoringContent,
  rxFindAuthoringLayouts,
  rxFindAuthoringTypes,
  WCHTOOLS_FOLDER_ASSET
} from '@acoustic-content-sdk/tooling';
import {
  isEqual,
  isNotEmpty,
  jsonStringify,
  NOOP_LOGGER_SERVICE,
  rxPipe
} from '@acoustic-content-sdk/utils';
import { join } from 'path';
import { Observable, of, pipe } from 'rxjs';
import { filter, map } from 'rxjs/operators';

import { CURRENT_USER } from './../current-user/current.user';

const LOGGER = 'FetchText';

const AUTH_CONTENT = /^authoring\/v1\/content\/([^?]*)(?:\?.*)?$/;
const AUTH_LAYOUT = /^authoring\/v1\/layouts\/([^?]*)(?:\?.*)?$/;
const AUTH_ASSET = /^authoring\/v1\/assets\/([^?]*)(?:\?.*)?$/;
const DELIVERY_TYPE = /^delivery\/v1\/rendering\/type\/([^?]*)(?:\?.*)?$/;
const DELIVERY_ASSET_TYPE = /^(?:my)?delivery\/v1\/resources\?path=(.*)$/;

const byId = <T extends ItemWithId>(aId: string) =>
  pipe(
    map<JsonEntry<T>, T>(({ entry }) => entry),
    filter((entry) => isEqual(entry.id, aId)),
    map((entry) => jsonStringify(entry))
  );

function findAuthContent(
  aTree: ReadDirectory,
  aId: string
): Observable<string> {
  // root folder
  return rxPipe(rxFindAuthoringContent('', aTree), byId(aId));
}

function findDeliveryAsset(
  aReader: ReadTextFile,
  aPath: string,
  aLogger: Logger
): Observable<string> {
  // log this
  const path = `${WCHTOOLS_FOLDER_ASSET}${aPath}`;
  aLogger.info('findDeliveryAsset', path);
  // root folder
  return aReader(path);
}

function findAuthAsset(aTree: ReadDirectory, aId: string): Observable<string> {
  // root folder
  return rxPipe(rxFindAuthoringAssets('', aTree), byId(aId));
}

function findAuthLayout(aTree: ReadDirectory, aId: string): Observable<string> {
  // root folder
  return rxPipe(rxFindAuthoringLayouts('', aTree), byId(aId));
}

function findAuthType(aTree: ReadDirectory, aId: string): Observable<string> {
  // root folder
  return rxPipe(rxFindAuthoringTypes('', aTree), byId(aId));
}

export function createFetchTextOnFolder(
  aFolder: string,
  aLogSvc?: LoggerService
): FetchText {
  // logger
  const logSvc = aLogSvc || NOOP_LOGGER_SERVICE;
  const logger = logSvc.get(LOGGER);
  // the read callback
  const readDir = createReadDirectory(aFolder);
  const readFile = createReadTextFile(aFolder);

  return (aUrl: string, aPriority?: FETCH_PRIORITY): Observable<string> => {
    // log this
    logger.info(aUrl);
    // special cases
    if (isEqual(aUrl, REL_PATH_CURRENT_USER)) {
      return of(jsonStringify(CURRENT_USER));
    }
    // test auth content
    const authContent = AUTH_CONTENT.exec(aUrl);
    if (isNotEmpty(authContent)) {
      return findAuthContent(readDir, authContent[1]);
    }
    // test auth type
    const deliveryType = DELIVERY_TYPE.exec(aUrl);
    if (isNotEmpty(deliveryType)) {
      return findAuthType(readDir, deliveryType[1]);
    }
    // test auth layout
    const authLayout = AUTH_LAYOUT.exec(aUrl);
    if (isNotEmpty(authLayout)) {
      return findAuthLayout(readDir, authLayout[1]);
    }
    // test auth asset
    const authAsset = AUTH_ASSET.exec(aUrl);
    if (isNotEmpty(authAsset)) {
      return findAuthAsset(readDir, authAsset[1]);
    }
    // test delivery asset
    const deliveryAsset = DELIVERY_ASSET_TYPE.exec(aUrl);
    if (isNotEmpty(deliveryAsset)) {
      return findDeliveryAsset(
        readFile,
        decodeURIComponent(deliveryAsset[1]),
        logger
      );
    }

    logger.info('Carsten', 'URL', aUrl);
    return rxReadTextFile(join(aFolder, aUrl));
  };
}
