import {
  AuthoringAsset,
  AuthoringContentItem,
  AuthoringLayout,
  AuthoringLayoutMapping,
  AuthoringType,
  CLASSIFICATION_ASSET,
  CLASSIFICATION_CONTENT,
  CLASSIFICATION_CONTENT_TYPE,
  CLASSIFICATION_LAYOUT,
  CLASSIFICATION_LAYOUT_MAPPING,
  QueryInput,
  SearchResults
} from '@acoustic-content-sdk/api';
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
   * Execute the search for layout mappings. The implementation will add the classification
   * to the `fq` part of the query, automatically, so there is no need to contain it in
   * the query.
   *
   * @param aQuery - the query input
   * @param aClassification - the classification
   *
   * @returns the search result
   */
  getDeliverySearchResults<RESULT>(
    aQuery: ReconciledDeliverySearchInput<AuthoringLayoutMapping>,
    aClassification: typeof CLASSIFICATION_LAYOUT_MAPPING
  ): Observable<SearchResults<RESULT>>;
  /**
   * Execute the search for layouts. The implementation will add the classification
   * to the `fq` part of the query, automatically, so there is no need to contain it in
   * the query.
   *
   * @param aQuery - the query input
   * @param aClassification - the classification
   *
   * @returns the search result
   */
  getDeliverySearchResults<RESULT>(
    aQuery: ReconciledDeliverySearchInput<AuthoringLayout>,
    aClassification: typeof CLASSIFICATION_LAYOUT
  ): Observable<SearchResults<RESULT>>;
  /**
   * Execute the search for assets. The implementation will add the classification
   * to the `fq` part of the query, automatically, so there is no need to contain it in
   * the query.
   *
   * @param aQuery - the query input
   * @param aClassification - the classification
   *
   * @returns the search result
   */
  getDeliverySearchResults<RESULT>(
    aQuery: ReconciledDeliverySearchInput<AuthoringAsset>,
    aClassification: typeof CLASSIFICATION_ASSET
  ): Observable<SearchResults<RESULT>>;
  /**
   * Execute the search for content items. The implementation will add the classification
   * to the `fq` part of the query, automatically, so there is no need to contain it in
   * the query.
   *
   * @param aQuery - the query input
   * @param aClassification - the classification
   *
   * @returns the search result
   */
  getDeliverySearchResults<RESULT>(
    aQuery: ReconciledDeliverySearchInput<AuthoringContentItem>,
    aClassification: typeof CLASSIFICATION_CONTENT
  ): Observable<SearchResults<RESULT>>;
  /**
   * Execute the search for content items. The implementation will add the classification
   * to the `fq` part of the query, automatically, so there is no need to contain it in
   * the query.
   *
   * @param aQuery - the query input
   * @param aClassification - the classification
   *
   * @returns the search result
   */
  getDeliverySearchResults<RESULT>(
    aQuery: ReconciledDeliverySearchInput<AuthoringType>,
    aClassification: typeof CLASSIFICATION_CONTENT_TYPE
  ): Observable<SearchResults<RESULT>>;
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
  getDeliverySearchResults<ITEM, RESULT>(
    aQuery: ReconciledDeliverySearchInput<ITEM>,
    aClassification: string
  ): Observable<SearchResults<RESULT>>;
}
