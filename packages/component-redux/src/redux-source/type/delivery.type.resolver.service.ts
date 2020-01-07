import { DeliveryType, LoggerService } from '@acoustic-content-sdk/api';
import { DeliveryTypeResolver } from '@acoustic-content-sdk/component-api';
import {
  guaranteeAuthoringContentTypeAction,
  selectAuthType,
  selectAuthTypeFeature
} from '@acoustic-content-sdk/redux-feature-auth-type';
import {
  ReduxRootStore,
  rxSelect,
  rxStore
} from '@acoustic-content-sdk/redux-store';
import {
  authoringTypeToDeliveryType,
  isNil,
  NOOP_LOGGER_SERVICE,
  opCacheLast,
  rxCachedFunction,
  rxNext,
  rxPipe,
  UNDEFINED$
} from '@acoustic-content-sdk/utils';
import { MonoTypeOperatorFunction, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { createCache } from '../../utils/cache.utils';
import { logDispatch } from '../../utils/store.utils';

const LOGGER = 'DeliveryTypeResolverService';

export class AbstractDeliveryTypeResolverService
  implements DeliveryTypeResolver {
  getDeliveryType: (aId: string) => Observable<DeliveryType>;

  protected constructor(aStore: ReduxRootStore, aLogSvc?: LoggerService) {
    // logger
    const logSvc = aLogSvc || NOOP_LOGGER_SERVICE;
    // construct a logger
    const logger = logSvc.get(LOGGER);
    // next logger
    const log: <T>(...v: any[]) => MonoTypeOperatorFunction<T> = rxNext(logger);

    const store$ = rxStore(aStore);
    const authTypes$ = rxPipe(store$, rxSelect(selectAuthTypeFeature));

    // dispatch callback
    const dispatch = logDispatch(aStore, logger);

    // select the layout
    const getDeliveryType = (aTypeId: string): Observable<DeliveryType> => {
      // quick check for the impossible case
      if (isNil(aTypeId)) {
        return UNDEFINED$;
      }
      // make sure the type is there
      dispatch(guaranteeAuthoringContentTypeAction(aTypeId));
      // actually load the mapping
      return rxPipe(
        authTypes$,
        rxSelect(selectAuthType(aTypeId)),
        map(authoringTypeToDeliveryType),
        log('type', aTypeId),
        opCacheLast
      );
    };

    // load the layout
    this.getDeliveryType = rxCachedFunction(
      getDeliveryType,
      createCache(logger)
    );
  }
}
