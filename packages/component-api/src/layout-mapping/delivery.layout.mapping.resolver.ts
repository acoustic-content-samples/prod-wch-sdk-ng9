import { DeliveryLayoutMapping } from '@acoustic-content-sdk/api';
import { Observable } from 'rxjs';

/**
 * Service interface that allows to resolve a type
 */
export interface DeliveryLayoutMappingResolver {
  /**
   * Resolves a layout mapping given the ID of the type of the mapping
   *
   * @param aTypeId - the ID of the content type the layout is mapped to
   *
   * @returns an observable of the context
   */
  getDeliveryLayoutMapping(aTypeId: string): Observable<DeliveryLayoutMapping>;
}
