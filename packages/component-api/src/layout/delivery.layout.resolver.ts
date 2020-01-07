import { DeliveryLayout } from '@acoustic-content-sdk/api';
import { Observable } from 'rxjs';

/**
 * Service interface that allows to resolve a type
 */
export interface DeliveryLayoutResolver {
  /**
   * Resolves a layout record
   *
   * @param aLayoutId - the ID of the layout
   *
   * @returns an observable of the layout
   */
  getDeliveryLayout(aLayoutId: string): Observable<DeliveryLayout>;
}
