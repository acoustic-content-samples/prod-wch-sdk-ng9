import { ContentItemWithLayout } from '@acoustic-content-sdk/api';

import { ProtectedRestClient } from './client';

/**
 * Callback to return the current site
 *
 * @param aClient - the client
 * @returns a callback to get the current site
 */
export const site = (aClient: ProtectedRestClient) => () =>
  aClient.get<ContentItemWithLayout>('mydelivery/v2/sites/@current');
