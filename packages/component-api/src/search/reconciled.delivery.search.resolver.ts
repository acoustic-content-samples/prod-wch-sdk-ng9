import { QueryInput } from '@acoustic-content-sdk/api';
import { Observable, UnaryFunction } from 'rxjs';

/**
 * Input to the reconciled search operation
 */
export interface ReconciledDeliverySearchInput<T> {
  /**
   * Matcher function that tests if a particular value matches the search query
   */
  predicate: UnaryFunction<T, boolean>;

  /**
   * The search query object used to execute a query equivalent to
   * the matcher
   */
  query: QueryInput;
}

/**
 * Service that performs a search query against delivery search for
 * artifacts of a particular classification.
 */
export interface ReconciledDeliverySearchResolver {
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
    aQuery: ReconciledDeliverySearchInput<T>,
    aClassification: string
  ): Observable<T[]>;
}
