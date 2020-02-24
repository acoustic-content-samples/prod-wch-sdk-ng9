import { DeliveryLayoutResolver } from '@acoustic-content-sdk/component-api';

import { createReactContext } from '../utils/context';

/**
 * Injection token for the DeliveryLayoutResolver
 */
export const ACOUSTIC_CONTEXT_DELIVERY_LAYOUT_RESOLVER = createReactContext<
  DeliveryLayoutResolver
>('ACOUSTIC_CONTEXT_DELIVERY_LAYOUT_RESOLVER');

/**
 * Injection token for the layout seed
 */
export const ACOUSTIC_CONTEXT_DELIVERY_LAYOUT_SEED = createReactContext<string>(
  'ACOUSTIC_CONTEXT_DELIVERY_LAYOUT_SEED'
);
