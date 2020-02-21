import { RenderingContextProviderV2 } from '@acoustic-content-sdk/api';
import { InjectionToken } from '@angular/core';

/**
 * Injection token for the rendering context provider
 */
export const ACOUSTIC_TOKEN_RENDERING_CONTEXT_PROVIDER = new InjectionToken<
  RenderingContextProviderV2
>('ACOUSTIC_TOKEN_RENDERING_CONTEXT_PROVIDER');
