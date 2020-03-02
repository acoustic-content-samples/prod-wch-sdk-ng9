import { SearchResults } from '@acoustic-content-sdk/api';
import { ParsedUrlQueryInput } from 'querystring';

import { ProtectedRestClient } from './client';

/**
 * Generic search method
 *
 * @param aUrl - the base URL
 * @param aClient - the client
 *
 * @returns the search callback
 */
const search = (aUrl: string, aClient: ProtectedRestClient) => <T>(
  aQuery: ParsedUrlQueryInput
) => aClient.get<SearchResults<T>>(aUrl, aQuery);

/**
 * Performs a delivery search
 *
 * @param aClient - the client
 * @returns the delivery search callback
 */
export const deliverySearch = (aClient: ProtectedRestClient) =>
  search('mydelivery/v1/search', aClient);

/**
 * Performs an authoring search
 *
 * @param aClient - the client
 * @returns the authoring search callback
 */
export const authoringSearch = (aClient: ProtectedRestClient) =>
  search('authoring/v1/search', aClient);
