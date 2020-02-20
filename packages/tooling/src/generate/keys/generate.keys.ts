import {
  AuthoringContentItem,
  AuthoringElement,
  AuthoringGroupElement,
  AuthoringType,
  BaseAuthoringItem,
  ELEMENT_TYPE_GROUP,
  ELEMENT_TYPE_TEXT,
  Logger,
  LoggerService
} from '@acoustic-content-sdk/api';
import {
  boxLoggerService,
  getPath,
  isArray,
  isNil,
  isNotNil,
  mapArray,
  reduceArray,
  rxNext,
  rxPipe
} from '@acoustic-content-sdk/utils';
import { MonoTypeOperatorFunction } from 'rxjs';
import { filter, map, mergeMap } from 'rxjs/operators';
import { v4 } from 'uuid';

import { ReadDirectory } from '../../dir/dir';
import { createContentPredicate } from '../../utils/content';
import { createRevision } from '../../utils/guid';
import { canonicalizeJson } from '../../utils/json';
import { ensureDirPath } from '../../utils/url.utils';
import {
  JsonEntry,
  JsonEntryMap,
  rxFindAuthoringContent,
  rxReadAuthoringTypes
} from '../../utils/wch.tools';
import {
  wchToolsCleanup,
  wchToolsFileDescriptor
} from './../../utils/wchtools';
import { Schema } from './schema';

const LOGGER = 'generate.keys';

const KEY_KEY = 'key';

/**
 * Canonicalize and add revision
 *
 * @param aValue - value
 * @returns the canonicalized version
 */
function normalizeArtifact<T extends BaseAuthoringItem>(aValue: T): T {
  // normalize
  const canon = canonicalizeJson(aValue);
  canon.rev = createRevision(canon);
  return canon;
}

function isGroup(
  aElement: AuthoringElement
): aElement is AuthoringGroupElement {
  return isNotNil(aElement) && aElement.elementType === ELEMENT_TYPE_GROUP;
}

function isKey(aElement: AuthoringElement): boolean {
  return (
    isNotNil(aElement) &&
    aElement.key === KEY_KEY &&
    aElement.elementType === ELEMENT_TYPE_TEXT
  );
}

function insertKey(aDst: Record<string, any>) {
  aDst[KEY_KEY] = {
    elementType: ELEMENT_TYPE_TEXT,
    value: v4()
  };
}

export function generateKeys(options: Schema) {
  // data directory
  const { data } = options;

  const isValidContentItem = createContentPredicate(options);

  const filterEntry = (aType: JsonEntry<AuthoringContentItem>) =>
    isValidContentItem(aType.entry);

  function rewriteElement(
    aDst: Record<string, any>,
    aElement: AuthoringElement,
    aTypes: JsonEntryMap<AuthoringType>,
    aLogger: Logger
  ): Record<string, any> {
    // check if this is a key
    if (isKey(aElement)) {
      // insert a new key
      insertKey(aDst);
    } else if (isGroup(aElement)) {
      // recurse
      const { key } = aElement;
      const groupElement = aDst[key];
      // only if we have a group element
      if (isNotNil(groupElement)) {
        // check for single vs multi value
        if (isNotNil(groupElement.value) && !aElement.allowMultipleValues) {
          // rewrite the value
          aDst[key] = {
            ...groupElement,
            value: rewriteKeys(
              groupElement.value,
              aElement.typeRef.id,
              aTypes,
              aLogger
            ),
            typeRef: {
              id: aElement.typeRef.id
            }
          };
        } else if (
          isArray(groupElement.values) &&
          aElement.allowMultipleValues
        ) {
          // rewrite the value
          aDst[key] = {
            ...groupElement,
            values: mapArray(groupElement.values, (value) =>
              rewriteKeys(value, aElement.typeRef.id, aTypes, aLogger)
            ),
            typeRef: {
              ...aElement.typeRef
            }
          };
        }
      }
    }
    // returns the target
    return aDst;
  }

  function rewriteKeys(
    aElements: Record<string, any>,
    aTypeId: string,
    aTypes: JsonEntryMap<AuthoringType>,
    aLogger: Logger
  ): Record<string, any> {
    // check if we know the type
    const type = getPath<AuthoringType>(aTypes, [aTypeId, 'entry']);
    if (isNil(type)) {
      // warn
      aLogger.warn('Unable to find type', aTypeId);
      // nothing to rewrite
      return aElements;
    }
    // reduce
    return reduceArray(
      type.elements,
      (aDst: Record<string, any>, aElement: AuthoringElement) =>
        rewriteElement(aDst, aElement, aTypes, aLogger),
      { ...aElements }
    );
  }

  function createKeys(
    aEntry: JsonEntry<AuthoringContentItem>,
    aTypes: JsonEntryMap<AuthoringType>,
    aLogger: Logger
  ): AuthoringContentItem {
    // extract the content
    const content = aEntry.entry;
    // rewrite
    return {
      ...content,
      elements: rewriteKeys(content.elements, content.typeId, aTypes, aLogger)
    };
  }

  return (aReadDir: ReadDirectory, aLogSvc?: LoggerService) => {
    // logger
    const logSvc = boxLoggerService(aLogSvc);
    const logger = logSvc.get(LOGGER);
    // next logger
    const log: <T>(...v: any[]) => MonoTypeOperatorFunction<T> = rxNext(logger);
    // make sure the data dir does not end with a slash
    const dataDir = ensureDirPath(data);
    // log this
    logger.info('dataDir', dataDir);
    // read the types
    const types$ = rxReadAuthoringTypes(dataDir, aReadDir);
    // read content
    const content$ = rxPipe(
      rxFindAuthoringContent(dataDir, aReadDir),
      filter(filterEntry)
    );
    // process
    return rxPipe(
      types$,
      mergeMap((types) =>
        rxPipe(
          content$,
          map((content) => createKeys(content, types, logger))
        )
      ),
      log('content'),
      map((artifact) => wchToolsFileDescriptor(normalizeArtifact(artifact))),
      map(wchToolsCleanup)
    );
  };
}
