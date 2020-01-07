import { selectFeature } from '@acoustic-content-sdk/redux-store';

import { ERROR_FEATURE } from './error.id';
import { errorReducer, ErrorState } from './error.state';

export interface ErrorFeatureState {
  [ERROR_FEATURE]: ErrorState;
}

export const errorFeatureReducer = {
  [ERROR_FEATURE]: errorReducer
};
/**
 * Select the URL config feature
 */
export const selectErrorFeature = selectFeature<ErrorState>(ERROR_FEATURE);
