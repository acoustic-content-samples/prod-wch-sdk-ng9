import { RenderingContextResolver } from '@acoustic-content-sdk/component-api';
import { InjectionToken } from '@angular/core';

/**
 * Injection token for the RenderingContextResolver
 */
export const WCH_TOKEN_RENDERING_CONTEXT_RESOLVER = new InjectionToken<
  RenderingContextResolver
>('WCH_TOKEN_RENDERING_CONTEXT_RESOLVER');
