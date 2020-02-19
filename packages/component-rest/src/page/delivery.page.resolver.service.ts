import {
  CLASSIFICATION_CONTENT,
  ContentItemWithLayout,
  DeliveryContentItem,
  LoggerService,
  SEARCH_FL_DOCUMENT
} from '@acoustic-content-sdk/api';
import {
  DeliveryPageResolver,
  DeliverySearchResolver
} from '@acoustic-content-sdk/component-api';
import {
  createDeliveryContentItem,
  luceneEscapeKeyValueOr,
  NOOP_LOGGER_SERVICE,
  rxCachedFunction,
  rxPipe
} from '@acoustic-content-sdk/utils';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { createCache } from '../utils/cache.utils';
import { createResolverFromSearch } from '../utils/resolver.utils';

function removeTrailingSlash(aPath: string): string {
  return aPath === '/'
    ? aPath
    : aPath.endsWith('/')
    ? aPath.substr(0, aPath.length - 1)
    : aPath;
}

function ensureTrailingSlash(aPath: string): string {
  return aPath === '/' ? aPath : aPath.endsWith('/') ? aPath : `${aPath}/`;
}

const LOGGER = 'AbstractDeliveryPageResolverService';

/**
 * Base class to implement `DeliveryPageResolver`
 */
export class AbstractDeliveryPageResolverService
  implements DeliveryPageResolver {
  getDeliveryPage: (aPath: string) => Observable<DeliveryContentItem>;

  /**
   * Initialization
   *
   * @param aSearch - search service that is uses to back the content service
   * @param aLogSvc - logger service
   */
  protected constructor(
    aSearch: DeliverySearchResolver,
    aLogSvc?: LoggerService
  ) {
    // resolve the logger
    const logSvc = aLogSvc || NOOP_LOGGER_SERVICE;
    const logger = logSvc.get(LOGGER);
    // base keys
    const query = {
      fl: SEARCH_FL_DOCUMENT,
      rows: 1
    };
    // callback
    const getContentItemWithLayout = createResolverFromSearch<
      ContentItemWithLayout
    >(
      aSearch,
      CLASSIFICATION_CONTENT,
      (path) => ({
        ...query,
        q: luceneEscapeKeyValueOr(
          'path',
          removeTrailingSlash(path),
          ensureTrailingSlash(path)
        )
      }),
      aLogSvc
    );
    // convert to the new format
    const getDeliveryPage = (id: string) =>
      rxPipe(getContentItemWithLayout(id), map(createDeliveryContentItem));

    this.getDeliveryPage = rxCachedFunction(
      getDeliveryPage,
      createCache(logger)
    );
  }
}
