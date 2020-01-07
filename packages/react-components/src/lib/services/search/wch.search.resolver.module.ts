import { LoggerService } from '@acoustic-content-sdk/api';
import {
  ProtectedContent,
  SeedResolver
} from '@acoustic-content-sdk/component-api';
import {
  createInjectableReactProvider,
  WCH_CONTEXT_DELIVERY_SEARCH_RESOLVER,
  WCH_CONTEXT_LOGGER_SERVICE,
  WCH_CONTEXT_PROTECTED_CONTENT,
  WCH_CONTEXT_SEED_RESOLVER
} from '@acoustic-content-sdk/react-api';
import { WCH_CONTEXT_FETCH_TEXT } from '@acoustic-content-sdk/react-rest-api';
import { FetchText } from '@acoustic-content-sdk/rest-api';

import { DeliverySearchResolverService } from './search.resolver.service';

const createDeliverySearchResolver = (
  [aFetchText, aProtectedContent]: [FetchText, ProtectedContent],
  [seedResolver, logSvc]: [SeedResolver, LoggerService?]
) =>
  new DeliverySearchResolverService(
    aFetchText,
    aProtectedContent,
    seedResolver,
    logSvc
  );

/**
 * Declares the provider
 */
export const WCH_PROVIDER_DELIVERY_SEARCH_RESOLVER = createInjectableReactProvider(
  createDeliverySearchResolver,
  WCH_CONTEXT_DELIVERY_SEARCH_RESOLVER,
  [WCH_CONTEXT_FETCH_TEXT, WCH_CONTEXT_PROTECTED_CONTENT],
  [WCH_CONTEXT_SEED_RESOLVER, WCH_CONTEXT_LOGGER_SERVICE]
);
