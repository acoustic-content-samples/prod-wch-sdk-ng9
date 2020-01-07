import { Layout, RenderingContextV2 } from '@acoustic-content-sdk/api';
import { Observable } from 'rxjs';

/**
 * Callback that finds the layout assigned to the object in the current
 * rendering context.
 */
export interface LayoutResolver {
  /**
   * Returns the layout layout object based on the rendering context and the mode
   *
   * @param aLayoutMode - the layout mode
   * @param aRenderingContext - the rendering context
   *
   * @returns the resolved layout
   */
  resolveLayout: (
    aLayoutMode: string,
    aRenderingContext: RenderingContextV2
  ) => Observable<Layout>;
}
