import { UrlSegment } from '@angular/router';
import { mapArray, urlSlashes } from '@acoustic-content-sdk/utils';

/**
 * Constructs the URL path based on the segemnets
 *
 * @param aSegments -     the segments
 * @returns the path
 */
export const pathGetPathFromUrlSegments = (aSegments: UrlSegment[]): string =>
  urlSlashes(
    mapArray(aSegments, (segment) => encodeURIComponent(segment.path)).join('/')
  );
