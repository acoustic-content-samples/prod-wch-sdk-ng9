import { RenderingContextV2 } from '@acoustic-content-sdk/api';
import { Observable } from 'rxjs';

/**
 * Service interface that allows to resolve a rendering context
 * given the page.
 */
export interface WchPageService {
  /**
   * Resolves the rendering context given the path
   *
   * @param aPath - the path as a string
   *
   * @returns the observable of the rendering context or undefined if it could not be found
   */
  getRenderingContextByPath(
    aPath: string
  ): Observable<RenderingContextV2 | null | undefined>;

  /**
   * Resolves the rendering context for the error page
   *
   * @returns the observable of the rendering context or undefined if it could not be found
   */
  getErrorRenderingContext(): Observable<RenderingContextV2 | null | undefined>;
}
