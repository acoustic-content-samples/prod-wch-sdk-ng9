import { AuthStatus, LoggerService } from '@acoustic-content-sdk/api';
import { AbstractAuthStatusService } from '@acoustic-content-sdk/component-rest';
import { WCH_TOKEN_LOGGER_SERVICE } from '@acoustic-content-sdk/ng-api';
import { WCH_TOKEN_FETCH_TEXT } from '@acoustic-content-sdk/ng-rest-api';
import { FetchText } from '@acoustic-content-sdk/rest-api';
import { Inject, Injectable, Optional } from '@angular/core';

@Injectable()
export class AuthStatusService extends AbstractAuthStatusService
  implements AuthStatus {
  constructor(
    @Inject(WCH_TOKEN_FETCH_TEXT)
    aFetchText: FetchText,
    @Optional()
    @Inject(WCH_TOKEN_LOGGER_SERVICE)
    aLogSvc: LoggerService
  ) {
    // dispatch
    super(aFetchText, aLogSvc);
  }
}