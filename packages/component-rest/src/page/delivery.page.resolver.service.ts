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
  boxLoggerService,
  createDeliveryContentItem,
  luceneEscapeKeyValue,
  luceneEscapeKeyValueOr,
  rxCachedFunction,
  rxPipe
} from '@acoustic-content-sdk/utils';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { createCache } from '../utils/cache.utils';
import { createResolverFromSearch } from '../utils/resolver.utils';

function removeTrailingSlash(aPath: string): string {
  return aPath === '/'
    ? aPath
    : aPath.endsWith('/')
      ? aPath.substr(0, aPath.length - 1)
      : aPath;
}

const ERROR_TAG = 'errorPage';

function ensureTrailingSlash(aPath: string): string {
  return aPath === '/' ? aPath : aPath.endsWith('/') ? aPath : `${aPath}/`;
}

const LOGGER = 'AbstractDeliveryPageResolverService';

/**
 * Base class to implement `DeliveryPageResolver`
 */
export class AbstractDeliveryPageResolverService
  implements DeliveryPageResolver {
  /**
   * Locates a page given the path
   *
   * @param aCompoundPath - a potentially compound path
   *
   * @returns an observable of the content item
   */
  getDeliveryPage: (aCompoundPath: string) => Observable<DeliveryContentItem>;
  /**
   * Returns the error page
   *
   * @param aSiteId - the current siteId
   *
   * @returns an observable of the content item
   */
  getErrorPage: (aSiteId?: string) => Observable<DeliveryContentItem>;

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
    const logSvc = boxLoggerService(aLogSvc);
    const logger = logSvc.get(LOGGER);
    // base keys
    const query = {
      fl: SEARCH_FL_DOCUMENT,
      rows: 1
    };
    // callback
    const findPageContentItem = createResolverFromSearch<ContentItemWithLayout>(
      aSearch,
      CLASSIFICATION_CONTENT,
      (path, siteId) => {

        const searchQuery: any = {
          ...query,
          q: luceneEscapeKeyValueOr(
            'path',
            removeTrailingSlash(path),
            ensureTrailingSlash(path)
          )
        }
        if (siteId) {
          searchQuery.fq = luceneEscapeKeyValue('siteId', siteId)
        }

        return searchQuery;
      },
      aLogSvc
    );
    // callback
    const findErrorContentItem = createResolverFromSearch<
      ContentItemWithLayout
    >(
      aSearch,
      CLASSIFICATION_CONTENT,
      (errorTag, siteId) => {
        const searchQuery: any = {
          ...query,
          q: luceneEscapeKeyValueOr('tags', errorTag)
        }
        if (siteId) {
          searchQuery.fq = luceneEscapeKeyValue('siteId', siteId);
        }

        return searchQuery;
      },
      aLogSvc
    );
    // convert to the new format
    const getDeliveryPage = (aCompoundPath: string) => {
      const [path, siteId] = aCompoundPath.split('#');
      return rxPipe(findPageContentItem(path, siteId), map(createDeliveryContentItem));
    }

    const getErrorPage = (siteId?: string) =>
      rxPipe(findErrorContentItem(ERROR_TAG, siteId), map(createDeliveryContentItem));

    // create a cache wrapper
    this.getDeliveryPage = rxCachedFunction(
      getDeliveryPage,
      createCache(logger)
    );
    // no need to cache
    this.getErrorPage = getErrorPage;
  }
}
