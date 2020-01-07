import { MonoTypeOperatorFunction } from 'rxjs';

import { RenderingContext } from './../../interfaces/delivery/v1/rendering/context/rendering.context';

/**
 * Interceptor that can expose transforms for the rendering
 * contexts.
 */
export interface RenderingContextInterceptor {
  /**
   * operator to intercept a single rendering context
   */
  opRenderingContext?: MonoTypeOperatorFunction<RenderingContext>;
  /**
   * operator to intercept a multiple rendering contexts
   */
  opRenderingContexts?: MonoTypeOperatorFunction<RenderingContext[]>;
}
