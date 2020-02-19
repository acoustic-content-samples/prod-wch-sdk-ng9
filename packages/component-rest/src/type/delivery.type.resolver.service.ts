import {
  CLASSIFICATION_CONTENT_TYPE,
  DeliveryType,
  KEY_ID,
  LoggerService,
  SEARCH_FL_DOCUMENT
} from '@acoustic-content-sdk/api';
import {
  DeliverySearchResolver,
  DeliveryTypeResolver
} from '@acoustic-content-sdk/component-api';
import {
  luceneEscapeKeyValue,
  NOOP_LOGGER_SERVICE,
  rxCachedFunction
} from '@acoustic-content-sdk/utils';
import { Observable } from 'rxjs';

import { createCache } from '../utils/cache.utils';
import { createResolverFromSearch } from '../utils/resolver.utils';

const LOGGER = 'AbstractDeliveryTypeResolverService';

/**
 * Base class to implement `DeliveryTypeResolver`
 */
export class AbstractDeliveryTypeResolverService
  implements DeliveryTypeResolver {
  getDeliveryType: (aId: string) => Observable<DeliveryType>;

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
      fl: SEARCH_FL_DOCUMENT
    };

    // load the type
    const getDeliveryType = createResolverFromSearch<DeliveryType>(
      aSearch,
      CLASSIFICATION_CONTENT_TYPE,
      (id) => ({ ...query, q: luceneEscapeKeyValue(KEY_ID, id) }),
      aLogSvc
    );

    // return a cached version
    this.getDeliveryType = rxCachedFunction(
      getDeliveryType,
      createCache(logger)
    );
  }
}
