import { LoggerService } from '@acoustic-content-sdk/api';
import { AbstractDeliveryLayoutMappingResolverService } from '@acoustic-content-sdk/component-redux';
import { WCH_TOKEN_LOGGER_SERVICE } from '@acoustic-content-sdk/ng-api';
import { WCH_TOKEN_REDUX_STORE } from '@acoustic-content-sdk/ng-redux-api';
import { ReduxRootStore } from '@acoustic-content-sdk/redux-store';
import { Inject, Injectable, Optional } from '@angular/core';

@Injectable()
export class DeliveryLayoutMappingResolverService extends AbstractDeliveryLayoutMappingResolverService {
  constructor(
    @Inject(WCH_TOKEN_REDUX_STORE)
    aStore: ReduxRootStore,
    @Optional()
    @Inject(WCH_TOKEN_LOGGER_SERVICE)
    aLogSvc: LoggerService
  ) {
    super(aStore, aLogSvc);
  }
}
