import { DeliveryPageResolver } from '@acoustic-content-sdk/component-api';

import { createReactContext } from '../utils/context';

/**
 * Injection token for the DeliveryPageResolver
 */
export const WCH_CONTEXT_DELIVERY_PAGE_RESOLVER = createReactContext<
  DeliveryPageResolver
>('WCH_CONTEXT_DELIVERY_PAGE_RESOLVER');

/**
 * Injection token for the page seed
 */
export const WCH_CONTEXT_DELIVERY_PAGE_SEED = createReactContext<string>(
  'WCH_CONTEXT_DELIVERY_PAGE_SEED'
);
