import { PreRenderingResolver } from '@acoustic-content-sdk/component-api';
import { InjectionToken } from '@angular/core';

/**
 * Injection token for the pre rendering service
 */
export const ACOUSTIC_TOKEN_PRE_RENDERING_RESOLVER = new InjectionToken<
  PreRenderingResolver
>('ACOUSTIC_TOKEN_PRE_RENDERING_RESOLVER');
