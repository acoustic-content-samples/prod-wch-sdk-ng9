import { SeedResolver } from '@acoustic-content-sdk/component-api';

import { createReactContext } from '../utils/context';

/**
 * Injection token for the SeedResolver
 */
export const ACOUSTIC_CONTEXT_SEED_RESOLVER = createReactContext<SeedResolver>(
  'ACOUSTIC_CONTEXT_SEED_RESOLVER'
);
