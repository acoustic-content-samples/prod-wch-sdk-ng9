import { Observable } from 'rxjs';
import { RenderingContext } from './../../interfaces/delivery/v1/rendering/context/rendering.context';

export interface RenderingContextProvider {
  /**
   * Retrieves the rendering context for the content item.
   */
  onRenderingContext: Observable<RenderingContext>;
}
