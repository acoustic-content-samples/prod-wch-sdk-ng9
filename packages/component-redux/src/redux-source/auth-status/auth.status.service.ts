import { AuthStatus, LoggerService } from '@acoustic-content-sdk/api';
import { selectLoggedInFeature } from '@acoustic-content-sdk/redux-feature-login';
import {
  ReduxRootStore,
  rxSelect,
  rxStore
} from '@acoustic-content-sdk/redux-store';
import {
  NOOP_LOGGER_SERVICE,
  rxNext,
  rxPipe
} from '@acoustic-content-sdk/utils';
import { MonoTypeOperatorFunction, Observable } from 'rxjs';

const LOGGER = 'AbstractAuthStatusService';

export class AbstractAuthStatusService implements AuthStatus {
  // API
  authenticated$: Observable<boolean>;

  protected constructor(aStore: ReduxRootStore, aLogSvc?: LoggerService) {
    // logger
    const logSvc = aLogSvc || NOOP_LOGGER_SERVICE;
    // construct a logger
    const logger = logSvc.get(LOGGER);
    // next logger
    const log: <T>(...v: any[]) => MonoTypeOperatorFunction<T> = rxNext(logger);
    // attach to the logged in feature
    const store$ = rxStore(aStore);
    // check if we are logged in
    this.authenticated$ = rxPipe(
      store$,
      rxSelect(selectLoggedInFeature),
      log('authenticated')
    );
  }
}
