import {
  CLASSIFICATION_CONTENT,
  ContentItemWithLayout,
  DeliveryContentItem,
  KEY_ID,
  LoggerService,
  SEARCH_FL_DOCUMENT
} from '@acoustic-content-sdk/api';
import {
  DeliveryContentResolver,
  DeliverySearchResolver
} from '@acoustic-content-sdk/component-api';
import {
  createDeliveryContentItem,
  luceneEscapeKeyValue,
  NOOP_LOGGER_SERVICE,
  rxCachedFunction,
  rxPipe
} from '@acoustic-content-sdk/utils';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { createCache } from '../utils/cache.utils';
import { createResolverFromSearch } from '../utils/resolver.utils';

const LOGGER = 'AbstractDeliveryContentResolverService';

/**
 * Base class to implement `DeliveryContentResolver`
 */
export class AbstractDeliveryContentResolverService
  implements DeliveryContentResolver {
  getDeliveryContentItem: (aID: string) => Observable<DeliveryContentItem>;

  /**
   * Initialization
   *
   * @param aSearch - search service that is uses to back the content service
   * @param aLogSvc - logger service
   */
  protected constructor(
    aSearch: DeliverySearchResolver,
    aLogSvc: LoggerService = NOOP_LOGGER_SERVICE
  ) {
    // logging
    const logger = aLogSvc.get(LOGGER);
    // base keys
    const query = {
      fl: SEARCH_FL_DOCUMENT
    };
    // callback
    const getContentItemWithLayout = createResolverFromSearch<
      ContentItemWithLayout
    >(
      aSearch,
      CLASSIFICATION_CONTENT,
      (id) => ({ ...query, q: luceneEscapeKeyValue(KEY_ID, id) }),
      aLogSvc
    );
    // convert to the new format
    const getDeliveryContentItem = (id: string) =>
      rxPipe(getContentItemWithLayout(id), map(createDeliveryContentItem));

    // return a cached version
    this.getDeliveryContentItem = rxCachedFunction(
      getDeliveryContentItem,
      createCache(logger)
    );
  }
}
