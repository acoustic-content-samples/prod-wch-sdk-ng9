import { DeliveryContentItem, LoggerService } from '@acoustic-content-sdk/api';
import {
  DeliveryPageResolver,
  DeliverySearchResolver
} from '@acoustic-content-sdk/component-api';
import { AbstractDeliveryPageResolverService } from '@acoustic-content-sdk/component-redux';
import {
  WCH_TOKEN_DELIVERY_SEARCH_RESOLVER,
  WCH_TOKEN_LOGGER_SERVICE
} from '@acoustic-content-sdk/ng-api';
import { WCH_TOKEN_REDUX_STORE } from '@acoustic-content-sdk/ng-redux-api';
import { ReduxRootStore } from '@acoustic-content-sdk/redux-store';
import { NOOP_LOGGER_SERVICE } from '@acoustic-content-sdk/utils';
import { Inject, Injectable, Optional } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class DeliveryPageResolverService
  extends AbstractDeliveryPageResolverService
  implements DeliveryPageResolver {
  getDeliveryPage: (aPath: string) => Observable<DeliveryContentItem>;

  constructor(
    @Inject(WCH_TOKEN_REDUX_STORE)
    aStore: ReduxRootStore,
    @Inject(WCH_TOKEN_DELIVERY_SEARCH_RESOLVER)
    aSearchResolver: DeliverySearchResolver,
    @Optional()
    @Inject(WCH_TOKEN_LOGGER_SERVICE)
    aLogSvc: LoggerService = NOOP_LOGGER_SERVICE
  ) {
    super(aStore, aSearchResolver, aLogSvc);
  }
}
