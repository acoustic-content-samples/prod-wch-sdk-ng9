import { DeliveryContentItem } from '@acoustic-content-sdk/api';
import { Observable } from 'rxjs';

/**
 * Service interface that allows to resolve a rendering context
 * given its ID.
 */
export interface DeliveryPageResolver {
  /**
   * Resolves a rendering context given the ID of the item
   *
   * @param aPath - the path to the page
   *
   * @returns an observable of the context
   */
  getDeliveryPage(aPath: string): Observable<DeliveryContentItem>;
}
