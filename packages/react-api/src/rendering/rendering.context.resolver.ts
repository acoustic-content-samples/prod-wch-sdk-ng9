import { RenderingContextResolver } from '@acoustic-content-sdk/component-api';

import { createReactContext } from '../utils/context';

/**
 * Injection token for the RenderingContextResolver
 */
export const WCH_CONTEXT_RENDERING_CONTEXT_RESOLVER = createReactContext<
  RenderingContextResolver
>('WCH_CONTEXT_RENDERING_CONTEXT_RESOLVER');
