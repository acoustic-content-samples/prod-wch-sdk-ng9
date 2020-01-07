import { RenderingContextProviderV2 } from '@acoustic-content-sdk/api';

import { createReactContext } from '../utils/context';

/**
 * Injection token for the rendering context provider
 */
export const WCH_CONTEXT_RENDERING_CONTEXT_PROVIDER = createReactContext<
  RenderingContextProviderV2
>('WCH_CONTEXT_RENDERING_CONTEXT_PROVIDER');
