import {
  CLASSIFICATION_LAYOUT_MAPPING,
  DeliveryLayoutMapping,
  LoggerService,
  SEARCH_FL_DOCUMENT
} from '@acoustic-content-sdk/api';
import {
  DeliveryLayoutMappingResolver,
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

const LOGGER = 'AbstractDeliveryLayoutMappingResolverService';

/**
 * Base class to implement `DeliveryLayoutMappingResolver`
 */
export class AbstractDeliveryLayoutMappingResolverService
  implements DeliveryLayoutMappingResolver {
  getDeliveryLayoutMapping: (
    aTypeId: string
  ) => Observable<DeliveryLayoutMapping>;

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
    const getDeliveryLayoutMapping = createResolverFromSearch<
      DeliveryLayoutMapping
    >(
      aSearch,
      CLASSIFICATION_LAYOUT_MAPPING,
      (typeId) => ({ ...query, q: luceneEscapeKeyValue('typeId', typeId) }),
      aLogSvc
    );

    // return a cached version
    this.getDeliveryLayoutMapping = rxCachedFunction(
      getDeliveryLayoutMapping,
      createCache(logger)
    );
  }
}
