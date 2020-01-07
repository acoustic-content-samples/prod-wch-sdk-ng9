import { Observable } from 'rxjs';

import { RenderingContext } from './../../interfaces/delivery/v1/rendering/context/rendering.context';
import { RenderingContextProvider } from './../rendering/rendering.context.provider';

export interface ActivePage extends RenderingContextProvider {
  /**
   * Retrieves the rendering context for the content item rendered for the
   * currently selected page.
   */
  onRenderingContext: Observable<RenderingContext>;
}
