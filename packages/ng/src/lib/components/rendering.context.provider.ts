import { RenderingContextProviderV2 } from '@acoustic-content-sdk/api';
import { hashRandomIdentifier } from '@acoustic-content-sdk/utils';
import { EMPTY } from 'rxjs';

export const KEY_DEBUG = '$debug';

/**
 * Coonstructs a new proxy
 */
export function createRenderingContextProviderV2Proxy(): RenderingContextProviderV2 & {
  [KEY_DEBUG]: string;
} {
  return {
    [KEY_DEBUG]: hashRandomIdentifier(),
    renderingContext$: EMPTY
  };
}
