import { createReduxFeatureModule } from '@acoustic-content-sdk/redux-store';

import { {{{baseEpic}}} } from './{{{epicFileName}}}';
import { {{{featureState}}} } from './{{{featureFileName}}}';
import { {{{idConstant}}} } from './{{{idFileName}}}';
import { {{{baseReducer}}} } from './{{{reducerFileName}}}';
import { {{{baseState}}} } from './{{{stateFileName}}}';

/**
 * Exposes the feature module selector
 */
export const {{{baseFeature}}} = createReduxFeatureModule<{{{baseState}}}, {{{featureState}}}>({{{idConstant}}}, {{{baseReducer}}}, {{{baseEpic}}});
