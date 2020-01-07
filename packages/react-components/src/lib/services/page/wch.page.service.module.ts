import { LoggerService, UrlConfig } from '@acoustic-content-sdk/api';
import { DeliveryPageResolver } from '@acoustic-content-sdk/component-api';
import {
  createInjectableReactProvider,
  WCH_CONTEXT_DELIVERY_PAGE_RESOLVER,
  WCH_CONTEXT_LOGGER_SERVICE,
  WCH_CONTEXT_PAGE_SERVICE,
  WCH_CONTEXT_URL_CONFIG
} from '@acoustic-content-sdk/react-api';
import { Observable } from 'rxjs';

import { ReactPageService } from './wch.page.service';

const createPageService = (
  [deliveryPageResolver, urlConfig$]: [
    DeliveryPageResolver,
    Observable<UrlConfig>
  ],
  [logSvc]: [LoggerService?]
) => new ReactPageService(deliveryPageResolver, urlConfig$, logSvc);

/**
 * Declares the provider
 */
export const WCH_PROVIDER_PAGE_SERVICE = createInjectableReactProvider(
  createPageService,
  WCH_CONTEXT_PAGE_SERVICE,
  [WCH_CONTEXT_DELIVERY_PAGE_RESOLVER, WCH_CONTEXT_URL_CONFIG],
  [WCH_CONTEXT_LOGGER_SERVICE]
);
