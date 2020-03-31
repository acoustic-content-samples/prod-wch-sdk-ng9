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
  luceneEscapeKeyValueOr,
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
   * @param aPath - the path to the page
   *
   * @returns an observable of the content item
   */
  getDeliveryPage: (aPath: string) => Observable<DeliveryContentItem>;
  /**
   * Returns the error page
   *
   * @returns an observable of the content item
   */
  getErrorPage: () => Observable<DeliveryContentItem>;

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
    // callback
    const findErrorContentItem = createResolverFromSearch<
      ContentItemWithLayout
    >(
      aSearch,
      CLASSIFICATION_CONTENT,
      () => ({
        ...query,
        q: luceneEscapeKeyValueOr('tags', ERROR_TAG)
      }),
      aLogSvc
    );
    // convert to the new format
    const getDeliveryPage = (id: string) =>
      rxPipe(findPageContentItem(id), map(createDeliveryContentItem));
    const getErrorPage = () =>
      rxPipe(findErrorContentItem(ERROR_TAG), map(createDeliveryContentItem));

    // create a cache wrapper
    this.getDeliveryPage = rxCachedFunction(
      getDeliveryPage,
      createCache(logger)
    );
    // no need to cache
    this.getErrorPage = getErrorPage;
  }
}
