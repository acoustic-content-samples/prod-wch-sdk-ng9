import { createReduxFeatureModule } from '@acoustic-content-sdk/redux-store';

import { ErrorFeatureState } from './error.feature';
import { ERROR_FEATURE } from './error.id';
import { errorReducer, ErrorState } from './error.state';

/**
 * Exposes the feature module selector
 */
export const errorFeature = createReduxFeatureModule<
  ErrorState,
  ErrorFeatureState
>(ERROR_FEATURE, errorReducer);
