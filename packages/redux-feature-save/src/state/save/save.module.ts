import { loggedInFeature } from '@acoustic-content-sdk/redux-feature-login';
import { currentUserFeature } from '@acoustic-content-sdk/redux-feature-user';
import { createReduxFeatureModule } from '@acoustic-content-sdk/redux-store';

import { savingEpic } from './save.epics';
import { SavingFeatureState } from './save.feature';
import { SAVING_FEATURE } from './save.id';
import { savingReducer } from './save.reducer';
import { SavingState } from './save.state';

/**
 * Exposes the feature module selector
 */
export const savingFeature = createReduxFeatureModule<
  SavingState,
  SavingFeatureState
>(SAVING_FEATURE, savingReducer, savingEpic, [
  currentUserFeature,
  loggedInFeature
]);
