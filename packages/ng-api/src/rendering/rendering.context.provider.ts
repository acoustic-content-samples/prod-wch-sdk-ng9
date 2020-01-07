import { RenderingContextProviderV2 } from '@acoustic-content-sdk/api';
import { InjectionToken } from '@angular/core';

/**
 * Injection token for the rendering context provider
 */
export const WCH_TOKEN_RENDERING_CONTEXT_PROVIDER = new InjectionToken<
  RenderingContextProviderV2
>('WCH_TOKEN_RENDERING_CONTEXT_PROVIDER');
