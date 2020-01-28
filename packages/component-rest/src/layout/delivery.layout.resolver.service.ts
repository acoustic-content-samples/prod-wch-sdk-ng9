import {
  CLASSIFICATION_LAYOUT,
  DeliveryLayout,
  KEY_ID,
  LoggerService,
  SEARCH_FL_DOCUMENT
} from '@acoustic-content-sdk/api';
import {
  DeliveryLayoutResolver,
  DeliverySearchResolver
} from '@acoustic-content-sdk/component-api';
import {
  luceneEscapeKeyValue,
  NOOP_LOGGER_SERVICE,
  rxCachedFunction
} from '@acoustic-content-sdk/utils';
import { Observable } from 'rxjs';

import { createCache } from '../utils/cache.utils';
import { createResolverFromSearch } from '../utils/resolver.utils';

const LOGGER = 'AbstractDeliveryLayoutResolverService';

/**
 * Base class to implement `DeliveryLayoutResolver`
 */
export class AbstractDeliveryLayoutResolverService
  implements DeliveryLayoutResolver {
  getDeliveryLayout: (aID: string) => Observable<DeliveryLayout>;

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

    // load the layout
    const getDeliveryLayout = createResolverFromSearch<DeliveryLayout>(
      aSearch,
      CLASSIFICATION_LAYOUT,
      (id) => ({ ...query, q: luceneEscapeKeyValue(KEY_ID, id) }),
      aLogSvc
    );

    // return a cached version
    this.getDeliveryLayout = rxCachedFunction(
      getDeliveryLayout,
      createCache(logger)
    );
  }
}
