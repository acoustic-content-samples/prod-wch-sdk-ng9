import { FetchText } from '@acoustic-content-sdk/rest-api';

import { createReactContext } from '@acoustic-content-sdk/react-api';

/**
 * Injection token for the remote text access
 */
export const WCH_CONTEXT_FETCH_TEXT = createReactContext<FetchText>(
  'WCH_CONTEXT_FETCH_TEXT'
);
