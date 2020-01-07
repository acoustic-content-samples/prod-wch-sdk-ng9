import {
  CLASSIFICATION_CONTENT,
  CLASSIFICATION_CONTENT_TYPE,
  CLASSIFICATION_LAYOUT,
  CLASSIFICATION_LAYOUT_MAPPING,
  CLASSIFICATION_PAGE,
  Logger,
  LoggerService
} from '@acoustic-content-sdk/api';
import { SeedResolver } from '@acoustic-content-sdk/component-api';
import {
  WCH_TOKEN_DELIVERY_CONTENT_SEED,
  WCH_TOKEN_DELIVERY_LAYOUT_MAPPING_SEED,
  WCH_TOKEN_DELIVERY_LAYOUT_SEED,
  WCH_TOKEN_DELIVERY_PAGE_SEED,
  WCH_TOKEN_DELIVERY_TYPE_SEED,
  WCH_TOKEN_LOGGER_SERVICE
} from '@acoustic-content-sdk/ng-api';
import {
  assertFromGenerator,
  hashRandomIdentifier,
  isNotNil,
  lazyGenerator,
  NOOP_LOGGER_SERVICE
} from '@acoustic-content-sdk/utils';
import { DOCUMENT } from '@angular/common';
import { Inject, Injectable, Optional } from '@angular/core';
import { defer, Observable, of } from 'rxjs';

const LOGGER = 'WchSeedResolver';

/**
 * Decodes the seed
 *
 * @param aSeed - the injected seed
 * @param aToken - the injection token
 * @param aDocument - optionally the document to read the token from
 *
 * @returns the seed
 */
function getSeed(
  aSeed: string,
  aClassification: string,
  aLogger: Logger,
  aDocument?: Document
) {
  // check if we have a value
  if (isNotNil(aSeed)) {
    // log this
    aLogger.info('Injected seed', aClassification, aSeed);
    // injected seed
    return aSeed;
  }
  // read from document as fallback
  if (isNotNil(aDocument)) {
    // decode the metadata
    const meta = aDocument.querySelector<HTMLMetaElement>(
      `meta[name="wch-config-seed-${aClassification}"][content]`
    );
    if (isNotNil(meta)) {
      // log this
      const metaSeed = meta.content;
      aLogger.info('Seed from metadata', aClassification, metaSeed);
      // from metadata
      return metaSeed;
    }
  }
  // just a random value
  const rndSeed = hashRandomIdentifier();
  aLogger.info('Random seed', aClassification, rndSeed);
  // from metadata
  return rndSeed;
}

function addSeed(
  aResult: Record<string, Observable<string>>,
  aSeed: string,
  aClassification: string,
  aLogger: Logger,
  aDocument?: Document
) {
  // lazy seed creation
  const seed = lazyGenerator(() =>
    getSeed(aSeed, aClassification, aLogger, aDocument)
  );
  // returns the seed
  aResult[aClassification] = defer(() => of(seed()));
}

@Injectable({ providedIn: 'root' })
export class WchSeedResolver implements SeedResolver {
  getSeed: (aID: string, aClassification: string) => Observable<string>;

  constructor(
    @Optional()
    @Inject(WCH_TOKEN_DELIVERY_CONTENT_SEED)
    aContentSeed: string,
    @Optional()
    @Inject(WCH_TOKEN_DELIVERY_TYPE_SEED)
    aTypeSeed: string,
    @Optional()
    @Inject(WCH_TOKEN_DELIVERY_LAYOUT_SEED)
    aLayoutSeed: string,
    @Optional()
    @Inject(WCH_TOKEN_DELIVERY_LAYOUT_MAPPING_SEED)
    aLayoutMappingSeed: string,
    @Optional()
    @Inject(WCH_TOKEN_DELIVERY_PAGE_SEED)
    aPageSeed: string,
    @Optional()
    @Inject(DOCUMENT)
    aDocument: any,
    @Optional()
    @Inject(WCH_TOKEN_LOGGER_SERVICE)
    aLogSvc: LoggerService = NOOP_LOGGER_SERVICE
  ) {
    // construct the logger
    const logger = aLogSvc.get(LOGGER);
    // our seed cache
    const cache: Record<string, Observable<string>> = {};
    addSeed(cache, aContentSeed, CLASSIFICATION_CONTENT, logger, aDocument);
    addSeed(cache, aTypeSeed, CLASSIFICATION_CONTENT_TYPE, logger, aDocument);
    addSeed(cache, aLayoutSeed, CLASSIFICATION_LAYOUT, logger, aDocument);
    addSeed(
      cache,
      aLayoutMappingSeed,
      CLASSIFICATION_LAYOUT_MAPPING,
      logger,
      aDocument
    );
    addSeed(cache, aPageSeed, CLASSIFICATION_PAGE, logger, aDocument);

    // generates a random seed
    const randomGenerator = () => of(hashRandomIdentifier());

    // attach the callback
    this.getSeed = (aID: string, aClassification: string): Observable<string> =>
      assertFromGenerator(aClassification, cache, randomGenerator);
  }
}
