import { RenderingContextResolver } from '@acoustic-content-sdk/component-api';

import { createReactContext } from '../utils/context';

/**
 * Injection token for the RenderingContextResolver
 */
export const ACOUSTIC_CONTEXT_RENDERING_CONTEXT_RESOLVER = createReactContext<
  RenderingContextResolver
>('ACOUSTIC_CONTEXT_RENDERING_CONTEXT_RESOLVER');
