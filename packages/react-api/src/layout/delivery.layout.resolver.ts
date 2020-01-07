import { DeliveryLayoutResolver } from '@acoustic-content-sdk/component-api';

import { createReactContext } from '../utils/context';

/**
 * Injection token for the page service
 */
export const WCH_CONTEXT_DELIVERY_LAYOUT_RESOLVER = createReactContext<
  DeliveryLayoutResolver
>('WCH_CONTEXT_DELIVERY_LAYOUT_RESOLVER');

/**
 * Injection token for the page service
 */
export const WCH_CONTEXT_DELIVERY_LAYOUT_SEED = createReactContext<string>(
  'WCH_CONTEXT_DELIVERY_LAYOUT_SEED'
);
