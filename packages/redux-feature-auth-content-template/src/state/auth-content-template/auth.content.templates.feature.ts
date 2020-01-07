import { selectFeature } from "@acoustic-content-sdk/redux-store";

import { AUTH_CONTENT_TEMPLATES_FEATURE } from "./auth.content.templates.id";
import { authoringContentTemplatesReducer } from "./auth.content.templates.reducer";
import { AuthoringContentTemplateState } from "./auth.content.templates.state";

/**
 */
export interface AuthContentTemplatesFeatureState {
  [AUTH_CONTENT_TEMPLATES_FEATURE]: AuthoringContentTemplateState;
}

/**
 */
export const authContentTemplatesFeatureReducer = {
  [AUTH_CONTENT_TEMPLATES_FEATURE]: authoringContentTemplatesReducer
};

/**
 * Select the authoring type feature
 */
export const selectAuthContentTemplatesFeature = selectFeature<
  AuthoringContentTemplateState
>(AUTH_CONTENT_TEMPLATES_FEATURE);
