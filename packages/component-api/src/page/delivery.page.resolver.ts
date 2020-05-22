import { DeliveryContentItem } from '@acoustic-content-sdk/api';
import { Observable } from 'rxjs';

/**
 * Service interface that allows to resolve a rendering context
 * given its ID.
 */
export interface DeliveryPageResolver {
  /**
   * Locates a page given the path
   *
   * @param aCompoundPath - a potentially compound path
   *
   * @returns an observable of the content item
   */
  getDeliveryPage(aCompoundPath: string): Observable<DeliveryContentItem>;

  /**
   * Returns the error page
   * @param aSiteId - the current siteId
   */
  getErrorPage(aSiteId?: string): Observable<DeliveryContentItem>;
}
