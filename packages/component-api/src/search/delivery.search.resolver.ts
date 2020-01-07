import { QueryInput, SearchResults } from '@acoustic-content-sdk/api';
import { Observable } from 'rxjs';

export interface DeliverySearchResolver {
  /**
   * Execute the search
   *
   * @param aQuery - the query input
   * @param aClassification - the classification
   *
   * @returns the search result
   */
  getDeliverySearchResults<T>(
    aQuery: QueryInput,
    aClassification: string
  ): Observable<SearchResults<T>>;
}
