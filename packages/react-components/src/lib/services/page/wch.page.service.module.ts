import { LoggerService, UrlConfig } from '@acoustic-content-sdk/api';
import { DeliveryPageResolver, DeliverySiteResolver } from '@acoustic-content-sdk/component-api';
import {
  createInjectableReactProvider,
  ACOUSTIC_CONTEXT_DELIVERY_PAGE_RESOLVER,
  ACOUSTIC_CONTEXT_DELIVERY_SITE_RESOLVER,
  ACOUSTIC_CONTEXT_LOGGER_SERVICE,
  ACOUSTIC_CONTEXT_PAGE_SERVICE,
  ACOUSTIC_CONTEXT_URL_CONFIG,
} from '@acoustic-content-sdk/react-api';
import { Observable } from 'rxjs';

import { ReactPageService } from './wch.page.service';

const createPageService = (
  [deliveryPageResolver, deliverySiteResolver, urlConfig$]: [
    DeliveryPageResolver,
    DeliverySiteResolver,
    Observable<UrlConfig>
  ],
  [logSvc]: [LoggerService?]
) => new ReactPageService(deliveryPageResolver, deliverySiteResolver, urlConfig$, logSvc);

/**
 * Declares the provider
 */
export const ACOUSTIC_PROVIDER_PAGE_SERVICE = createInjectableReactProvider(
  createPageService,
  ACOUSTIC_CONTEXT_PAGE_SERVICE,
  [ACOUSTIC_CONTEXT_DELIVERY_PAGE_RESOLVER, ACOUSTIC_CONTEXT_DELIVERY_SITE_RESOLVER, ACOUSTIC_CONTEXT_URL_CONFIG],
  [ACOUSTIC_CONTEXT_LOGGER_SERVICE]
);
