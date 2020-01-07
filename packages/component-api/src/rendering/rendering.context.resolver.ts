import {
  DeliveryContentItem,
  DeliveryGroupElement,
  DeliveryReferenceElement,
  RenderingContextProviderV2,
  RenderingContextV2
} from '@acoustic-content-sdk/api';
import { Observable } from 'rxjs';

export type RenderingContextInput =
  | string
  | DeliveryContentItem
  | DeliveryGroupElement
  | DeliveryReferenceElement;

/**
 * Constructs a rendering context
 */
export interface RenderingContextResolver {
  /**
   * Returns the layout selector based on the rendering context
   *
   * @param aLayoutMode -         the layout mode
   * @param aRenderingContext -   the rendering context
   * @returns the layout selector or undefined
   */
  resolveRenderingContext: (
    aItem: RenderingContextInput,
    aProvider: RenderingContextProviderV2
  ) => Observable<RenderingContextV2>;
}
