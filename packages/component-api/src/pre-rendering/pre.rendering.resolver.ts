import { Observable } from 'rxjs';

/**
 * Service interface that returns the pre-rendered content by id
 */
export interface PreRenderingResolver {
  /**
   * Generate a pre-rendering of the referenced content item
   *
   * @param aSelector - the markup selector. This is either the ID of a content item or `ID#accessor` to address a markup fragment
   * @param aLayoutMode - optionally the layout mode
   *
   * @returns an observable of the result
   */
  getPreRenderedMarkup(
    aSelector: string,
    aLayoutMode?: string
  ): Observable<string>;
}
