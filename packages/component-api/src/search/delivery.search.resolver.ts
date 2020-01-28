import { QueryInput, SearchResults } from '@acoustic-content-sdk/api';
import { Observable } from 'rxjs';

/**
 * Service that performs a search query against delivery search for
 * artifacts of a particular classification.
 */
export interface DeliverySearchResolver {
  /**
   * Execute the search. The implementation will add the classification
   * to the `fq` part of the query, automatically, so there is no need to contain it in
   * the query.
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
