import { LayoutResolver } from '@acoustic-content-sdk/component-api';

import { createReactContext } from '../utils/context';

/**
 * Injection token for the LayoutResolver
 */
export const ACOUSTIC_CONTEXT_LAYOUT_RESOLVER = createReactContext<LayoutResolver>(
  'ACOUSTIC_CONTEXT_LAYOUT_RESOLVER'
);
