import { selectFeature } from '@acoustic-content-sdk/redux-store';

import { SAVING_FEATURE } from './save.id';
import { savingReducer } from './save.reducer';
import { SavingState } from './save.state';

/**
 */
export interface SavingFeatureState {
  [SAVING_FEATURE]: SavingState;
}

/**
 */
export const savingFeatureReducer = {
  [SAVING_FEATURE]: savingReducer
};

/**
 * Select the save feature
 */
export const selectSavingFeature = selectFeature<SavingState>(SAVING_FEATURE);
