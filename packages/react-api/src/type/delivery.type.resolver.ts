import { DeliveryTypeResolver } from '@acoustic-content-sdk/component-api';

import { createReactContext } from '../utils/context';

/**
 * Injection token for the DeliveryTypeResolver
 */
export const ACOUSTIC_CONTEXT_DELIVERY_TYPE_RESOLVER = createReactContext<
  DeliveryTypeResolver
>('ACOUSTIC_CONTEXT_DELIVERY_TYPE_RESOLVER');

/**
 * Injection token for the type seed
 */
export const ACOUSTIC_CONTEXT_DELIVERY_TYPE_SEED = createReactContext<string>(
  'ACOUSTIC_CONTEXT_DELIVERY_TYPE_SEED'
);
