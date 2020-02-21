import { RenderingContextResolver } from '@acoustic-content-sdk/component-api';
import { InjectionToken } from '@angular/core';

/**
 * Injection token for the RenderingContextResolver
 */
export const ACOUSTIC_TOKEN_RENDERING_CONTEXT_RESOLVER = new InjectionToken<
  RenderingContextResolver
>('ACOUSTIC_TOKEN_RENDERING_CONTEXT_RESOLVER');
