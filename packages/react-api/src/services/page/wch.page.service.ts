import { RenderingContextV2 } from '@acoustic-content-sdk/api';
import { WchPageService } from '@acoustic-content-sdk/component-api';
import { RouteComponentProps } from 'react-router';
import { Observable } from 'rxjs';

import { createReactContext } from '../../utils/context';

/**
 * Service interface that allows to resolve a rendering context
 * given the page.
 */
export interface ReactWchPageService extends WchPageService {
  /**
   * Resolves the rendering context given the router
   *
   * @param aRoute - the activated route
   *
   * @returns the observable of the rendering context or undefined if it could not be found
   */
  getRenderingContextByActivatedRoute(
    aRoute: RouteComponentProps
  ): Observable<RenderingContextV2 | null | undefined>;
}

/**
 * Injection token for the ReactWchPageService
 */
export const ACOUSTIC_CONTEXT_PAGE_SERVICE = createReactContext<ReactWchPageService>(
  'ACOUSTIC_CONTEXT_PAGE_SERVICE'
);
