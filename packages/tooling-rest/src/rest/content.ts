import {
  AuthoringContentItem,
  ContentItemWithLayout
} from '@acoustic-content-sdk/api';

import { ProtectedRestClient } from './client';

/**
 * Generic content method
 *
 * @param aUrl - the base URL
 * @param aClient - the client
 *
 * @returns the scontent callback
 */
const content = <T>(aUrl: string, aClient: ProtectedRestClient) => (
  aId: string
) => aClient.get<T>(`${aUrl}${encodeURIComponent(aId)}`);

/**
 * Read delivery content
 *
 * @param aClient - the client
 * @returns the delivery content callback
 */
export const deliveryContent = (aClient: ProtectedRestClient) =>
  content<ContentItemWithLayout>('mydelivery/v1/content/', aClient);

/**
 * Read authoring content
 *
 * @param aClient - the client
 * @returns the authoring content callback
 */
export const authoringContent = (aClient: ProtectedRestClient) =>
  content<AuthoringContentItem>('authoring/v1/content/', aClient);
