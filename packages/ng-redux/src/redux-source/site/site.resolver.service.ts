import { LoggerService } from '@acoustic-content-sdk/api';
import { DeliveryContentResolver } from '@acoustic-content-sdk/component-api';
import { AbstractSiteResolverService } from '@acoustic-content-sdk/component-redux';
import {
  ACOUSTIC_TOKEN_DELIVERY_CONTENT_RESOLVER,
  ACOUSTIC_TOKEN_LOGGER_SERVICE
} from '@acoustic-content-sdk/ng-api';
import { ACOUSTIC_TOKEN_REDUX_STORE } from '@acoustic-content-sdk/ng-redux-api';
import { ReduxRootStore } from '@acoustic-content-sdk/redux-store';
import { Inject, Injectable, Optional } from '@angular/core';

@Injectable()
export class SiteResolverService extends AbstractSiteResolverService {
  constructor(
    @Inject(ACOUSTIC_TOKEN_REDUX_STORE)
    aStore: ReduxRootStore,
    @Inject(ACOUSTIC_TOKEN_DELIVERY_CONTENT_RESOLVER)
    aContentResolver: DeliveryContentResolver,
    @Optional()
    @Inject(ACOUSTIC_TOKEN_LOGGER_SERVICE)
    aLogSvc: LoggerService
  ) {
    super(aStore, aContentResolver, aLogSvc);
  }
}
