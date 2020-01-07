import {
  createVersionString,
  DeliveryContentItem,
  LoggerService
} from '@acoustic-content-sdk/api';
import { DeliveryContentResolver } from '@acoustic-content-sdk/component-api';
import { guaranteeAuthoringContentBatchAction } from '@acoustic-content-sdk/redux-feature-batch';
import {
  selectDeliveryContentFeature,
  selectDeliveryContentItem
} from '@acoustic-content-sdk/redux-feature-delivery-content';
import {
  ReduxRootStore,
  rxSelect,
  rxStore
} from '@acoustic-content-sdk/redux-store';
import {
  createDeliveryContentItem,
  isNil,
  NOOP_LOGGER_SERVICE,
  opCacheLast,
  rxCachedFunction,
  rxNext,
  rxPipe,
  UNDEFINED$
} from '@acoustic-content-sdk/utils';
import { MonoTypeOperatorFunction, Observable, UnaryFunction } from 'rxjs';
import { map } from 'rxjs/operators';

import { createCache } from '../../utils/cache.utils';
import { logDispatch } from '../../utils/store.utils';
import { MODULE, VERSION } from './../../version';

const LOGGER = 'DeliveryContentResolverService';

export class AbstractDeliveryContentResolverService
  implements DeliveryContentResolver {
  getDeliveryContentItem: (aID: string) => Observable<DeliveryContentItem>;

  protected constructor(aStore: ReduxRootStore, aLogSvc?: LoggerService) {
    // logger
    const logSvc = aLogSvc || NOOP_LOGGER_SERVICE;
    // construct a logger
    const logger = logSvc.get(LOGGER);
    // next logger
    const log: <T>(...v: any[]) => MonoTypeOperatorFunction<T> = rxNext(logger);
    // cache

    const store$ = rxStore(aStore);
    const deliveryContent$ = rxPipe(
      store$,
      rxSelect(selectDeliveryContentFeature)
    );
    // dispatch callback
    const dispatch = logDispatch(aStore, logger);

    // log this service
    logger.info(MODULE, createVersionString(VERSION));

    // convert to the new format
    const getDeliveryContentItem: UnaryFunction<
      string,
      Observable<DeliveryContentItem>
    > = (id) => {
      // quick check for the impossible case
      if (isNil(id)) {
        return UNDEFINED$;
      }
      // make sure we have a content item in the parent hub
      dispatch(guaranteeAuthoringContentBatchAction(id));
      // attach to the store
      return rxPipe(
        deliveryContent$,
        rxSelect(selectDeliveryContentItem(id)), // removed isEqualRev, otherwise we are missing updates without revision change, i.e. merged asset information
        map(createDeliveryContentItem),
        log('deliveryContentItem'),
        opCacheLast
      );
    };
    // expose this as a cached function
    this.getDeliveryContentItem = rxCachedFunction(
      getDeliveryContentItem,
      createCache(logger)
    );
  }
}
