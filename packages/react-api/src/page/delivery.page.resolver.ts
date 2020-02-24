import { DeliveryPageResolver } from '@acoustic-content-sdk/component-api';

import { createReactContext } from '../utils/context';

/**
 * Injection token for the DeliveryPageResolver
 */
export const ACOUSTIC_CONTEXT_DELIVERY_PAGE_RESOLVER = createReactContext<
  DeliveryPageResolver
>('ACOUSTIC_CONTEXT_DELIVERY_PAGE_RESOLVER');

/**
 * Injection token for the page seed
 */
export const ACOUSTIC_CONTEXT_DELIVERY_PAGE_SEED = createReactContext<string>(
  'ACOUSTIC_CONTEXT_DELIVERY_PAGE_SEED'
);
