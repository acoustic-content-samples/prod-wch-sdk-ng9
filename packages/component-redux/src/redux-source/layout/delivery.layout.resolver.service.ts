import {
  createVersionString,
  DeliveryLayout,
  LoggerService
} from '@acoustic-content-sdk/api';
import { DeliveryLayoutResolver } from '@acoustic-content-sdk/component-api';
import {
  guaranteeAuthoringLayoutAction,
  selectAuthLayoutFeature,
  selectAuthoringLayout
} from '@acoustic-content-sdk/redux-feature-auth-layout';
import {
  ReduxRootStore,
  rxSelect,
  rxStore
} from '@acoustic-content-sdk/redux-store';
import {
  authoringLayoutToDeliveryLayout,
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
import { isEqualRev } from '../../utils/selection.utils';
import { logDispatch } from '../../utils/store.utils';
import { MODULE, VERSION } from './../../version';

const LOGGER = 'DeliveryLayoutResolverService';

export class AbstractDeliveryLayoutResolverService
  implements DeliveryLayoutResolver {
  getDeliveryLayout: (aID: string) => Observable<DeliveryLayout>;

  protected constructor(aStore: ReduxRootStore, aLogSvc?: LoggerService) {
    // logger
    const logSvc = aLogSvc || NOOP_LOGGER_SERVICE;
    // construct a logger
    const logger = logSvc.get(LOGGER);
    // next logger
    const log: <T>(...v: any[]) => MonoTypeOperatorFunction<T> = rxNext(logger);

    const store$ = rxStore(aStore);
    const authLayout$ = rxPipe(store$, rxSelect(selectAuthLayoutFeature));

    // dispatch callback
    const dispatch = logDispatch(aStore, logger);

    // select the layout
    const getDeliveryLayout = (
      aLayoutId: string
    ): Observable<DeliveryLayout> => {
      // quick check for the impossible case
      if (isNil(aLayoutId)) {
        return UNDEFINED$;
      }
      // make sure we have a layout
      dispatch(guaranteeAuthoringLayoutAction(aLayoutId));
      // actually load the layout
      return rxPipe(
        authLayout$,
        rxSelect(selectAuthoringLayout(aLayoutId), isEqualRev),
        map(authoringLayoutToDeliveryLayout),
        log('layout', aLayoutId),
        opCacheLast
      );
    };

    // log this service
    logger.info(MODULE, createVersionString(VERSION));

    // load the layout
    this.getDeliveryLayout = rxCachedFunction(
      getDeliveryLayout,
      createCache(logger)
    );
  }
}
