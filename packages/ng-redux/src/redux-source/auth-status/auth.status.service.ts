import { AuthStatus, LoggerService } from '@acoustic-content-sdk/api';
import { AbstractAuthStatusService } from '@acoustic-content-sdk/component-redux';
import { WCH_TOKEN_LOGGER_SERVICE } from '@acoustic-content-sdk/ng-api';
import { WCH_TOKEN_REDUX_STORE } from '@acoustic-content-sdk/ng-redux-api';
import { ReduxRootStore } from '@acoustic-content-sdk/redux-store';
import { Inject, Injectable, Optional } from '@angular/core';

@Injectable()
export class AuthStatusService extends AbstractAuthStatusService
  implements AuthStatus {
  constructor(
    @Inject(WCH_TOKEN_REDUX_STORE)
    aStore: ReduxRootStore,
    @Optional()
    @Inject(WCH_TOKEN_LOGGER_SERVICE)
    aLogSvc: LoggerService
  ) {
    // dispatch
    super(aStore, aLogSvc);
  }
}
