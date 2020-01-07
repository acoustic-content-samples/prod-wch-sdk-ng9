import { authoringLayoutFeature } from '@acoustic-content-sdk/redux-feature-auth-layout';
import { loadingFeature } from '@acoustic-content-sdk/redux-feature-load';
import { createReduxFeatureModule } from '@acoustic-content-sdk/redux-store';

import { handlebarsEpic } from './handlebars.epics';
import { HandlebarsFeatureState } from './handlebars.feature';
import { HANDLEBARS_FEATURE } from './handlebars.id';
import { handlebarsReducer } from './handlebars.reducer';
import { HandlebarsState } from './handlebars.state';

/**
 * Exposes the feature module selector
 */
export const handlebarsFeature = createReduxFeatureModule<
  HandlebarsState,
  HandlebarsFeatureState
>(HANDLEBARS_FEATURE, handlebarsReducer, handlebarsEpic, [
  loadingFeature,
  authoringLayoutFeature
]);
