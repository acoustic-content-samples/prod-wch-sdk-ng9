import { DeliverySearchResolver } from '@acoustic-content-sdk/component-api';

import { createReactContext } from '../utils/context';

/**
 * Injection token for the DeliverySearchResolver
 */
export const ACOUSTIC_CONTEXT_DELIVERY_SEARCH_RESOLVER = createReactContext<
  DeliverySearchResolver
>('ACOUSTIC_CONTEXT_DELIVERY_SEARCH_RESOLVER');
