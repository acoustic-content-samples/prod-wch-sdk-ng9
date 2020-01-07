import { selectFeature } from '@acoustic-content-sdk/redux-store';

import { {{{idConstant}}} } from './{{{idFileName}}}';
import { {{{baseReducer}}}, DEFAULT_STATE } from './{{{reducerFileName}}}';
import { {{{baseState}}} } from './{{{stateFileName}}}';

/**
 */
export interface {{{featureState}}} {
  [{{{idConstant}}}]: {{{baseState}}};
}

/**
 */
export const {{{featureReducer}}} = {
  [{{{idConstant}}}]: {{{baseReducer}}}
};

/**
 * Select the feature
 */
export const {{{selectFeature}}} = selectFeature<{{{baseState}}}>(
  {{{idConstant}}},
  DEFAULT_STATE
);
