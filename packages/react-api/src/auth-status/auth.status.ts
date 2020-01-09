import { AuthStatus } from '@acoustic-content-sdk/api';

import { createReactContext } from '../utils/context';

/**
 * Injection token for the AuthStatus
 */
export const WCH_CONTEXT_AUTH_STATUS = createReactContext<AuthStatus>(
  'WCH_CONTEXT_AUTH_STATUS'
);
