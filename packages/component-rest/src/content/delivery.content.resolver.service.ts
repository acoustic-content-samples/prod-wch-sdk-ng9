import {
  CLASSIFICATION_CONTENT,
  ContentItemWithLayout,
  DeliveryContentItem,
  KEY_ID,
  LoggerService
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

export class AbstractDeliveryContentResolverService
  implements DeliveryContentResolver {
  getDeliveryContentItem: (aID: string) => Observable<DeliveryContentItem>;

  protected constructor(
    aSearch: DeliverySearchResolver,
    aLogSvc: LoggerService = NOOP_LOGGER_SERVICE
  ) {
    // logging
    const logger = aLogSvc.get(LOGGER);
    // base keys
    const query = {
      fl: 'document:[json]',
      fq: luceneEscapeKeyValue('classification', CLASSIFICATION_CONTENT)
    };
    // callback
    const getContentItemWithLayout = createResolverFromSearch<
      ContentItemWithLayout
    >(
      aSearch,
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
