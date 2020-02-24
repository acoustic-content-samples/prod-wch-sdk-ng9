import { RenderingContextProviderV2 } from '@acoustic-content-sdk/api';

import { createReactContext } from '../utils/context';

/**
 * Injection token for the RenderingContextProviderV2
 */
export const ACOUSTIC_CONTEXT_RENDERING_CONTEXT_PROVIDER = createReactContext<
  RenderingContextProviderV2
>('ACOUSTIC_CONTEXT_RENDERING_CONTEXT_PROVIDER');
