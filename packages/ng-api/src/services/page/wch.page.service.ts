import { RenderingContextV2 } from '@acoustic-content-sdk/api';
import { WchPageService } from '@acoustic-content-sdk/component-api';
import { InjectionToken } from '@angular/core';
import { ActivatedRoute, UrlSegment } from '@angular/router';
import { Observable } from 'rxjs';

/**
 * Service interface that allows to resolve a rendering context
 * given the page.
 */
export interface AcNgPageService extends WchPageService {
  /**
   * Resolves the rendering context given the url segments
   *
   * @param aSegments - the segments
   *
   * @returns the observable of the rendering context or undefined if it could not be found
   */
  getRenderingContextByUrlSegments(
    aSegments: UrlSegment[]
  ): Observable<RenderingContextV2 | null | undefined>;
  /**
   * Resolves the rendering context given the router
   *
   * @param aRoute - the activated route
   *
   * @returns the observable of the rendering context or undefined if it could not be found
   */
  getRenderingContextByActivatedRoute(
    aRoute: ActivatedRoute
  ): Observable<RenderingContextV2 | null | undefined>;
}

/**
 * Injection token for the page service
 */
export const ACOUSTIC_TOKEN_PAGE_SERVICE = new InjectionToken<AcNgPageService>(
  'ACOUSTIC_TOKEN_PAGE_SERVICE'
);
