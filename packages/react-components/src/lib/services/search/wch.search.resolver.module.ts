import { LoggerService } from '@acoustic-content-sdk/api';
import {
  ProtectedContent,
  SeedResolver
} from '@acoustic-content-sdk/component-api';
import {
  createInjectableReactProvider,
  ACOUSTIC_CONTEXT_DELIVERY_SEARCH_RESOLVER,
  ACOUSTIC_CONTEXT_LOGGER_SERVICE,
  ACOUSTIC_CONTEXT_PROTECTED_CONTENT,
  ACOUSTIC_CONTEXT_SEED_RESOLVER
} from '@acoustic-content-sdk/react-api';
import { ACOUSTIC_CONTEXT_FETCH_TEXT } from '@acoustic-content-sdk/react-rest-api';
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
export const ACOUSTIC_PROVIDER_DELIVERY_SEARCH_RESOLVER = createInjectableReactProvider(
  createDeliverySearchResolver,
  ACOUSTIC_CONTEXT_DELIVERY_SEARCH_RESOLVER,
  [ACOUSTIC_CONTEXT_FETCH_TEXT, ACOUSTIC_CONTEXT_PROTECTED_CONTENT],
  [ACOUSTIC_CONTEXT_SEED_RESOLVER, ACOUSTIC_CONTEXT_LOGGER_SERVICE]
);
