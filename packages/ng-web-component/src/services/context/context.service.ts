import {
  AuthStatus,
  LoggerService,
  UrlConfig
} from '@acoustic-content-sdk/api';
import {
  DeliverySearchResolver,
  DeliverySiteResolver
} from '@acoustic-content-sdk/component-api';
import {
  ACOUSTIC_TOKEN_AUTH_STATUS,
  ACOUSTIC_TOKEN_DELIVERY_SEARCH_RESOLVER,
  ACOUSTIC_TOKEN_DELIVERY_SITE_RESOLVER,
  ACOUSTIC_TOKEN_LOGGER_SERVICE,
  ACOUSTIC_TOKEN_URL_CONFIG
} from '@acoustic-content-sdk/ng-api';
import { boxLoggerService } from '@acoustic-content-sdk/utils';
import { MODULE as KEY_WEB_COMPONENTS_SERVICE } from '@acoustic-content-sdk/web-components-services';
import { Inject, Injectable, Optional } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class AcNgContextService {
  /**
   * Exposes some vital services
   */
  context: Record<string, any>;

  constructor(
    @Inject(ACOUSTIC_TOKEN_DELIVERY_SITE_RESOLVER)
    aSiteResolver: DeliverySiteResolver,
    @Inject(ACOUSTIC_TOKEN_AUTH_STATUS)
    aAuthStatus: AuthStatus,
    @Inject(ACOUSTIC_TOKEN_URL_CONFIG)
    aConfig: Observable<UrlConfig>,
    @Inject(ACOUSTIC_TOKEN_DELIVERY_SEARCH_RESOLVER)
    aDeliverySearchResolver: DeliverySearchResolver,
    @Optional()
    @Inject(ACOUSTIC_TOKEN_LOGGER_SERVICE)
    aLogSvc?: LoggerService
  ) {
    // box the logger
    const logSvc = boxLoggerService(aLogSvc);

    this.context = {
      [KEY_WEB_COMPONENTS_SERVICE]: {
        ACOUSTIC_LOGGER_SERVICE: logSvc,
        ACOUSTIC_DELIVERY_SEARCH_RESOLVER: aDeliverySearchResolver,
        ACOUSTIC_URL_CONFIG: aConfig,
        ACOUSTIC_AUTH_STATUS: aAuthStatus,
        ACOUSTIC_DELIVERY_SITE_RESOLVER: aSiteResolver
      }
    };
  }
}
