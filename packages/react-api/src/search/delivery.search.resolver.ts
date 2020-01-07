import { DeliverySearchResolver } from '@acoustic-content-sdk/component-api';

import { createReactContext } from '../utils/context';

/**
 * Injection token for the navigation service
 */
export const WCH_CONTEXT_DELIVERY_SEARCH_RESOLVER = createReactContext<
  DeliverySearchResolver
>('WCH_CONTEXT_DELIVERY_SEARCH_RESOLVER');
