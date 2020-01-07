import { createReduxFeatureModule } from '@acoustic-content-sdk/redux-store';

import { LocaleFeatureState } from './locale.feature';
import { LOCALE_FEATURE } from './locale.id';
import { localeReducer, LocaleState } from './locale.state';

/**
 * Exposes the feature module selector
 */
export const localeFeature = createReduxFeatureModule<
  LocaleState,
  LocaleFeatureState
>(LOCALE_FEATURE, localeReducer);
