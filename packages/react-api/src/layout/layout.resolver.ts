import { LayoutResolver } from '@acoustic-content-sdk/component-api';

import { createReactContext } from '../utils/context';

/**
 * Injection token for the LayoutResolver
 */
export const WCH_CONTEXT_LAYOUT_RESOLVER = createReactContext<LayoutResolver>(
  'WCH_CONTEXT_LAYOUT_RESOLVER'
);
