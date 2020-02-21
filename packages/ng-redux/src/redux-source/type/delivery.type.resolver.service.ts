import { LoggerService } from '@acoustic-content-sdk/api';
import { AbstractDeliveryTypeResolverService } from '@acoustic-content-sdk/component-redux';
import { ACOUSTIC_TOKEN_LOGGER_SERVICE } from '@acoustic-content-sdk/ng-api';
import { ACOUSTIC_TOKEN_REDUX_STORE } from '@acoustic-content-sdk/ng-redux-api';
import { ReduxRootStore } from '@acoustic-content-sdk/redux-store';
import { Inject, Injectable, Optional } from '@angular/core';

@Injectable()
export class DeliveryTypeResolverService extends AbstractDeliveryTypeResolverService {
  constructor(
    @Inject(ACOUSTIC_TOKEN_REDUX_STORE)
    aStore: ReduxRootStore,
    @Optional()
    @Inject(ACOUSTIC_TOKEN_LOGGER_SERVICE)
    aLogSvc: LoggerService
  ) {
    super(aStore, aLogSvc);
  }
}
