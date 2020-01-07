import { LayoutMappingResolver } from '@acoustic-content-sdk/component-api';

import { createReactContext } from '../utils/context';

/**
 * Injection token for the page service
 */
export const WCH_CONTEXT_LAYOUT_MAPPING_RESOLVER = createReactContext<
  LayoutMappingResolver
>('WCH_CONTEXT_LAYOUT_MAPPING_RESOLVER');
