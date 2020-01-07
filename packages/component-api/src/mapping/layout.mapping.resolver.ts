import { RenderingContextV2 } from '@acoustic-content-sdk/api';

export interface LayoutMappingResolver {
  /**
   * Returns the layout selector based on the rendering context
   *
   * @param aLayoutMode -         the layout mode
   * @param aRenderingContext -   the rendering context
   * @returns the layout selector or undefined
   */
  getSelector: (
    aLayoutMode: string,
    aRenderingContext: RenderingContextV2
  ) => string | undefined;
}
