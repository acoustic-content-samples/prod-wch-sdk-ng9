import { authoringContentFeature } from "@acoustic-content-sdk/redux-feature-auth-content";
import { authoringLayoutFeature } from "@acoustic-content-sdk/redux-feature-auth-layout";
import { authoringLayoutMappingFeature } from "@acoustic-content-sdk/redux-feature-auth-layout-mapping";
import { authoringTypeFeature } from "@acoustic-content-sdk/redux-feature-auth-type";
import { deliveryContentFeature } from "@acoustic-content-sdk/redux-feature-delivery-content";
import { handlebarsFeature } from "@acoustic-content-sdk/redux-feature-handlebars";
import { loadingFeature } from "@acoustic-content-sdk/redux-feature-load";
import { loggedInFeature } from "@acoustic-content-sdk/redux-feature-login";
import { createReduxFeatureModule } from "@acoustic-content-sdk/redux-store";

import { batchEpic } from "./batch.epic";

/**
 * Exposes the feature module selector
 */
export const batchFeature = createReduxFeatureModule(
  undefined,
  undefined,
  batchEpic,
  [
    loadingFeature,
    loggedInFeature,
    authoringLayoutMappingFeature,
    authoringLayoutFeature,
    authoringTypeFeature,
    authoringContentFeature,
    deliveryContentFeature,
    handlebarsFeature
  ]
);
