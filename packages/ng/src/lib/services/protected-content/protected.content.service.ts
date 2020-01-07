import {
  AuthStatus,
  LoggerService,
  UrlConfig
} from '@acoustic-content-sdk/api';
import { ProtectedContent } from '@acoustic-content-sdk/component-api';
import { AbstractProtectedContentService } from '@acoustic-content-sdk/component-utils';
import {
  WCH_TOKEN_AUTH_STATUS,
  WCH_TOKEN_LOGGER_SERVICE,
  WCH_TOKEN_URL_CONFIG
} from '@acoustic-content-sdk/ng-api';
import { Inject, Injectable, Optional } from '@angular/core';
import { Observable } from 'rxjs';

/**
 * Implementation of a service that resolves the outbound parts of a rendering context
 */
@Injectable()
export class ProtectedContentService extends AbstractProtectedContentService
  implements ProtectedContent {
  constructor(
    @Inject(WCH_TOKEN_URL_CONFIG)
    aUrlConfig: Observable<UrlConfig>,
    @Inject(WCH_TOKEN_AUTH_STATUS)
    aAuthStatus: AuthStatus,
    @Optional()
    @Inject(WCH_TOKEN_LOGGER_SERVICE)
    aLogSvc: LoggerService
  ) {
    super(aUrlConfig, aAuthStatus, aLogSvc);
  }
}
