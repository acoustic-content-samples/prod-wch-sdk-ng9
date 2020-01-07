import { selectFeature } from "@acoustic-content-sdk/redux-store";

import { DELIVERY_CONTENT_FEATURE } from "./delivery.content.id";
import { deliveryContentReducer } from "./delivery.content.reducer";
import { DeliveryContentState } from "./delivery.content.state";

/**
 */
export interface DeliveryContentFeatureState {
  [DELIVERY_CONTENT_FEATURE]: DeliveryContentState;
}

/**
 */
export const deliveryContentFeatureReducer = {
  [DELIVERY_CONTENT_FEATURE]: deliveryContentReducer
};

/**
 * Select the delivery content feature
 */
export const selectDeliveryContentFeature = selectFeature<DeliveryContentState>(
  DELIVERY_CONTENT_FEATURE
);
