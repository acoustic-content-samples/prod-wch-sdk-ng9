import { DeliveryTypeResolver } from '@acoustic-content-sdk/component-api';

import { createReactContext } from '../utils/context';

/**
 * Injection token for the page service
 */
export const WCH_CONTEXT_DELIVERY_TYPE_RESOLVER = createReactContext<
  DeliveryTypeResolver
>('WCH_CONTEXT_DELIVERY_TYPE_RESOLVER');

/**
 * Injection token for the page service
 */
export const WCH_CONTEXT_DELIVERY_TYPE_SEED = createReactContext<string>(
  'WCH_CONTEXT_DELIVERY_TYPE_SEED'
);
