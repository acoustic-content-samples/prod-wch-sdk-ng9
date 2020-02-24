import { LayoutMappingResolver } from '@acoustic-content-sdk/component-api';

import { createReactContext } from '../utils/context';

/**
 * Injection token for the LayoutMappingResolver
 */
export const ACOUSTIC_CONTEXT_LAYOUT_MAPPING_RESOLVER = createReactContext<
  LayoutMappingResolver
>('ACOUSTIC_CONTEXT_LAYOUT_MAPPING_RESOLVER');
