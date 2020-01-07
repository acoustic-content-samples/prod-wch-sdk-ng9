import { ContentItemWithLayout } from "@acoustic-content-sdk/api";
import { selectPayload } from "@acoustic-content-sdk/redux-store";
import { keyById, updateRecord } from "@acoustic-content-sdk/redux-utils";
import { isEqual } from "@acoustic-content-sdk/utils";
import { Reducer } from "redux";
import { handleActions } from "redux-actions";

import {
  ACTION_ADD_DELIVERY_CONTENT,
  ACTION_SET_DELIVERY_CONTENT,
  AddDeliveryContentAction
} from "./delivery.content.actions";
import { DeliveryContentState } from "./delivery.content.state";

const DEFAULT_STATE: DeliveryContentState = {};

// update handler
const updateContentItem = updateRecord<ContentItemWithLayout>(keyById, isEqual);

const setContentItem = (
  state: DeliveryContentState,
  action: AddDeliveryContentAction
): DeliveryContentState => updateContentItem(state, selectPayload(action));

/**
 * reducers for authoring content
 */
export const deliveryContentReducer: Reducer<DeliveryContentState> = handleActions(
  {
    [ACTION_ADD_DELIVERY_CONTENT]: setContentItem,
    [ACTION_SET_DELIVERY_CONTENT]: setContentItem
  },
  DEFAULT_STATE
);
