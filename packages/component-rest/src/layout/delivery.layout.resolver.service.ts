import {
  CLASSIFICATION_LAYOUT,
  DeliveryLayout,
  KEY_ID,
  LoggerService
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

export class AbstractDeliveryLayoutResolverService
  implements DeliveryLayoutResolver {
  getDeliveryLayout: (aID: string) => Observable<DeliveryLayout>;

  protected constructor(
    aSearch: DeliverySearchResolver,
    aLogSvc: LoggerService = NOOP_LOGGER_SERVICE
  ) {
    // logging
    const logger = aLogSvc.get(LOGGER);
    // base keys
    const query = {
      fl: 'document:[json]',
      fq: luceneEscapeKeyValue('classification', CLASSIFICATION_LAYOUT)
    };

    // load the layout
    const getDeliveryLayout = createResolverFromSearch<DeliveryLayout>(
      aSearch,
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
