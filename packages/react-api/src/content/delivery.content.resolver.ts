import { DeliveryContentResolver } from '@acoustic-content-sdk/component-api';

import { createReactContext } from '../utils/context';

/**
 * Injection token for the page service
 */
export const WCH_CONTEXT_DELIVERY_CONTENT_RESOLVER = createReactContext<
  DeliveryContentResolver
>('WCH_CONTEXT_DELIVERY_CONTENT_RESOLVER');

/**
 * Injection token for the page service
 */
export const WCH_CONTEXT_DELIVERY_CONTENT_SEED = createReactContext<string>(
  'WCH_CONTEXT_DELIVERY_CONTENT_SEED'
);
