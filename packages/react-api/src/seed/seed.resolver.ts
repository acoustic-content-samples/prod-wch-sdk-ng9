import { SeedResolver } from '@acoustic-content-sdk/component-api';

import { createReactContext } from '../utils/context';

/**
 * Injection token for the page service
 */
export const WCH_CONTEXT_SEED_RESOLVER = createReactContext<SeedResolver>(
  'WCH_CONTEXT_SEED_RESOLVER'
);
