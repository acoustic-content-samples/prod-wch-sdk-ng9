import { AuthoringContentItem } from "@acoustic-content-sdk/api";
import { selectPayload } from "@acoustic-content-sdk/redux-store";
import { updateRecord } from "@acoustic-content-sdk/redux-utils";
import { Reducer } from "redux";
import { handleActions } from "redux-actions";

import {
  ACTION_ADD_AUTH_CONTENT_TEMPLATE,
  ACTION_SET_AUTH_CONTENT_TEMPLATE,
  AddAuthoringContentTemplateAction,
  SetAuthoringContentTemplateAction
} from "./auth.content.templates.actions";
import { keyByTypeId } from "./auth.content.templates.selectors";
import { AuthoringContentTemplateState } from "./auth.content.templates.state";

const DEFAULT_STATE: AuthoringContentTemplateState = {};

const updateTemplatesWithRevision: (
  aState: AuthoringContentTemplateState,
  aItem: AuthoringContentItem
) => AuthoringContentTemplateState = updateRecord(keyByTypeId);

const setTemplate = (
  state: AuthoringContentTemplateState,
  action: AddAuthoringContentTemplateAction | SetAuthoringContentTemplateAction
): AuthoringContentTemplateState =>
  updateTemplatesWithRevision(state, selectPayload(action));

/**
 * reducers for templates
 */
export const authoringContentTemplatesReducer: Reducer<
  AuthoringContentTemplateState,
  AddAuthoringContentTemplateAction | SetAuthoringContentTemplateAction
> = handleActions(
  {
    [ACTION_ADD_AUTH_CONTENT_TEMPLATE]: setTemplate,
    [ACTION_SET_AUTH_CONTENT_TEMPLATE]: setTemplate
  },
  DEFAULT_STATE
);
