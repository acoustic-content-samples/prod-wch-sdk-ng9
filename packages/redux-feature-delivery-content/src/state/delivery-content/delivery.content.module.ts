import { authoringAssetFeature } from "@acoustic-content-sdk/redux-feature-auth-asset";
import { authoringContentFeature } from "@acoustic-content-sdk/redux-feature-auth-content";
import { authoringLayoutFeature } from "@acoustic-content-sdk/redux-feature-auth-layout";
import { authoringTypeFeature } from "@acoustic-content-sdk/redux-feature-auth-type";
import { urlConfigFeature } from "@acoustic-content-sdk/redux-feature-url-config";
import { createReduxFeatureModule } from "@acoustic-content-sdk/redux-store";

import { deliveryContentEpic } from "./delivery.content.epics";
import { DeliveryContentFeatureState } from "./delivery.content.feature";
import { DELIVERY_CONTENT_FEATURE } from "./delivery.content.id";
import { deliveryContentReducer } from "./delivery.content.reducer";
import { DeliveryContentState } from "./delivery.content.state";

/**
 * Exposes the feature module selector
 */
export const deliveryContentFeature = createReduxFeatureModule<
  DeliveryContentState,
  DeliveryContentFeatureState
>(DELIVERY_CONTENT_FEATURE, deliveryContentReducer, deliveryContentEpic, [
  authoringAssetFeature,
  authoringContentFeature,
  authoringLayoutFeature,
  authoringTypeFeature,
  urlConfigFeature
]);
