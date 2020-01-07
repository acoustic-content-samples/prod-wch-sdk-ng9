import { DeliveryLayoutMappingResolver } from '@acoustic-content-sdk/component-api';

import { createReactContext } from '../utils/context';

/**
 * Injection token for the page service
 */
export const WCH_CONTEXT_DELIVERY_LAYOUT_MAPPING_RESOLVER = createReactContext<
  DeliveryLayoutMappingResolver
>('WCH_CONTEXT_DELIVERY_LAYOUT_MAPPING_RESOLVER');

/**
 * Injection token for the page service
 */
export const WCH_CONTEXT_DELIVERY_LAYOUT_MAPPING_SEED = createReactContext<
  string
>('WCH_CONTEXT_DELIVERY_LAYOUT_MAPPING_SEED');
