import { DeliveryContentResolver } from '@acoustic-content-sdk/component-api';

import { createReactContext } from '../utils/context';

/**
 * Injection token for the DeliveryContentResolver
 */
export const ACOUSTIC_CONTEXT_DELIVERY_CONTENT_RESOLVER = createReactContext<
  DeliveryContentResolver
>('ACOUSTIC_CONTEXT_DELIVERY_CONTENT_RESOLVER');

/**
 * Injection token for the content seed
 */
export const ACOUSTIC_CONTEXT_DELIVERY_CONTENT_SEED = createReactContext<string>(
  'ACOUSTIC_CONTEXT_DELIVERY_CONTENT_SEED'
);
