import { DeliveryContentItem, LoggerService } from '@acoustic-content-sdk/api';
import {
  DeliveryPageResolver,
  DeliverySearchResolver
} from '@acoustic-content-sdk/component-api';
import { AbstractDeliveryPageResolverService } from '@acoustic-content-sdk/component-redux';
import {
  ACOUSTIC_TOKEN_DELIVERY_SEARCH_RESOLVER,
  ACOUSTIC_TOKEN_LOGGER_SERVICE
} from '@acoustic-content-sdk/ng-api';
import { ACOUSTIC_TOKEN_REDUX_STORE } from '@acoustic-content-sdk/ng-redux-api';
import { ReduxRootStore } from '@acoustic-content-sdk/redux-store';
import { Inject, Injectable, Optional } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class DeliveryPageResolverService
  extends AbstractDeliveryPageResolverService
  implements DeliveryPageResolver {
  getDeliveryPage: (aPath: string, siteId?: string) => Observable<DeliveryContentItem>;

  constructor(
    @Inject(ACOUSTIC_TOKEN_REDUX_STORE)
    aStore: ReduxRootStore,
    @Inject(ACOUSTIC_TOKEN_DELIVERY_SEARCH_RESOLVER)
    aSearchResolver: DeliverySearchResolver,
    @Optional()
    @Inject(ACOUSTIC_TOKEN_LOGGER_SERVICE)
    aLogSvc?: LoggerService
  ) {
    super(aStore, aSearchResolver, aLogSvc);
  }
}
