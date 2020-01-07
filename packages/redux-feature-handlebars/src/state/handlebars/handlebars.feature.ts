import { selectFeature } from '@acoustic-content-sdk/redux-store';

import { HANDLEBARS_FEATURE } from './handlebars.id';
import { handlebarsReducer } from './handlebars.reducer';
import { HandlebarsState } from './handlebars.state';

/**
 */
export interface HandlebarsFeatureState {
  [HANDLEBARS_FEATURE]: HandlebarsState;
}

/**
 */
export const handlebarsFeatureReducer = {
  [HANDLEBARS_FEATURE]: handlebarsReducer
};

/**
 * Select the handlebars feature
 */
export const selectHandlebarsFeature = selectFeature<HandlebarsState>(
  HANDLEBARS_FEATURE
);
