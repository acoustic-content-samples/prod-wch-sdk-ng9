import { urlConfigFeature } from '@acoustic-content-sdk/redux-feature-url-config';
import { currentUserFeature } from '@acoustic-content-sdk/redux-feature-user';
import { createReduxFeatureModule } from '@acoustic-content-sdk/redux-store';

import { dataBaseEpic } from './database.epic';

/**
 * Exposes the feature module selector
 */
export const databaseFeature = createReduxFeatureModule(
  undefined,
  undefined,
  dataBaseEpic,
  [urlConfigFeature, currentUserFeature]
);
