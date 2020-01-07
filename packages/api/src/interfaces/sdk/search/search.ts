import { Observable } from 'rxjs';

import { RenderingContext } from './../../../interfaces/delivery/v1/rendering/context/rendering.context';
import {
  RenderingContextQueryResult,
  SitePagesQueryResult
} from './../../../interfaces/delivery/v1/search/search.result';
import { Query } from './../../query';

export type QueryInput =
  | string
  | string[]
  | null
  | undefined
  | URLSearchParams
  | Query;

export interface WchSdkSearch {
  /**
   * Locates the rendering context identified by the ID
   *
   * $1$2 -$3
   * $1$2 -$3
   *
   * @returns the query result
   */
  getRenderingContextById: (
    aId: string,
    aLevels?: number
  ) => Observable<RenderingContext>;

  /**
   * Locates all rendering contexts that match a particular query. It is not necessary to add the
   * classification to the query, it will automatically only apply to content for the current site
   *
   * $1$2 -$3
   * $1$2 -$3
   *
   * @returns the query result
   */
  getRenderingContexts: (
    aValue: QueryInput,
    aLevels?: number
  ) => Observable<RenderingContextQueryResult>;

  /**
   * Locates all pages that match a particular query. It is not necessary to add the
   * classification to the query, it will automatically only apply to pages for the current site
   *
   * $1$2 -$3
   *
   * @returns the query result
   */
  getSitePages: (aValue: QueryInput) => Observable<SitePagesQueryResult>;
}
