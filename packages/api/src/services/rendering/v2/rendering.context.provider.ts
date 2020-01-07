import { Observable } from 'rxjs';

import { RenderingContextV2 } from './../../../interfaces/delivery/v2/rendering.context';

export interface RenderingContextProviderV2 {
  /**
   * Retrieves the rendering context for the content item.
   */
  renderingContext$: Observable<RenderingContextV2>;
}
