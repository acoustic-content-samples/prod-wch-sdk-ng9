/**
 * @jest-environment jsdom
 */
import { DeliveryType } from '@acoustic-content-sdk/api';
import { createReduxRootStore } from '@acoustic-content-sdk/redux-store';
import {
  NOOP_LOGGER_SERVICE,
  rxCachedFunction
} from '@acoustic-content-sdk/utils';
import { Observable, of } from 'rxjs';

import { createCache } from '../../utils/cache.utils';

describe('delivery.type.resolver.service.spec', () => {
  const store = createReduxRootStore({});

  it('should be able to load a type', () => {
    const logSvc = NOOP_LOGGER_SERVICE;
    const logger = logSvc.get('test');

    const getDeliveryType = (aTypeId: string): Observable<DeliveryType> =>
      of({ id: aTypeId } as any);

    const fct = rxCachedFunction(getDeliveryType, createCache(logger));

    const test$ = fct('abc');
    return test$.toPromise();
  });
});
