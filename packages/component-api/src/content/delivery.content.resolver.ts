import { DeliveryContentItem } from '@acoustic-content-sdk/api';
import { Observable } from 'rxjs';

/**
 * Service interface that allows to resolve a rendering context
 * given its ID.
 */
export interface DeliveryContentResolver {
  /**
   * Resolves a rendering context given the ID of the item
   *
   * @param aID - the ID of the item
   *
   * @returns an observable of the context
   */
  getDeliveryContentItem(aID: string): Observable<DeliveryContentItem>;
}
