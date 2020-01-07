import {
  CLASSIFICATION_CONTENT_TYPE,
  DeliveryType,
  KEY_ID,
  LoggerService
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

export class AbstractDeliveryTypeResolverService
  implements DeliveryTypeResolver {
  getDeliveryType: (aId: string) => Observable<DeliveryType>;

  protected constructor(
    aSearch: DeliverySearchResolver,
    aLogSvc: LoggerService = NOOP_LOGGER_SERVICE
  ) {
    // some logging
    const logger = aLogSvc.get(LOGGER);
    // base keys
    const query = {
      fl: 'document:[json]',
      fq: luceneEscapeKeyValue('classification', CLASSIFICATION_CONTENT_TYPE)
    };

    // load the type
    const getDeliveryType = createResolverFromSearch<DeliveryType>(
      aSearch,
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
