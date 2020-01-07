import { Observable } from 'rxjs';

import { RenderingContextV2 } from '../../../interfaces/delivery/v2/rendering.context';
import { RenderingContextProviderV2 } from '../../rendering/v2/rendering.context.provider';

export interface ActivePageV2 extends RenderingContextProviderV2 {
  /**
   * Retrieves the rendering context for the content item rendered for the
   * currently selected page.
   */
  renderingContext$: Observable<RenderingContextV2>;
}
