import { Observable } from 'rxjs';

/**
 * Service interface that returns the pre-rendered content by id
 */
export interface PreRenderingResolver {
  /**
   * Generate a pre-rendering of the referenced content item
   *
   * @param aID - the ID of the item
   * @param aLayoutMode - optionally the layout mode
   *
   * @returns an observable of the result
   */
  getPreRenderedMarkup(aID: string, aLayoutMode?: string): Observable<string>;
}
