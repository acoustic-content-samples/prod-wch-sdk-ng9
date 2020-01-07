import { selectFeature } from '@acoustic-content-sdk/redux-store';

import { LOCALE_FEATURE } from './locale.id';
import { localeReducer, LocaleState } from './locale.state';

/**
 */
export interface LocaleFeatureState {
  [LOCALE_FEATURE]: LocaleState;
}

/**
 */
export const localeFeatureReducer = {
  [LOCALE_FEATURE]: localeReducer
};

/**
 * Select the locale feature
 */
export const selectLocaleFeature = selectFeature<LocaleState>(LOCALE_FEATURE);
