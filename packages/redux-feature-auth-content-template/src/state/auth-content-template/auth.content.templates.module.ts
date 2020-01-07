import { authoringTypeFeature } from "@acoustic-content-sdk/redux-feature-auth-type";
import { loadingFeature } from "@acoustic-content-sdk/redux-feature-load";
import { loggedInFeature } from "@acoustic-content-sdk/redux-feature-login";
import { urlConfigFeature } from "@acoustic-content-sdk/redux-feature-url-config";
import { createReduxFeatureModule } from "@acoustic-content-sdk/redux-store";

import { authoringContentTemplatesEpic } from "./auth.content.templates.epics";
import { AuthContentTemplatesFeatureState } from "./auth.content.templates.feature";
import { AUTH_CONTENT_TEMPLATES_FEATURE } from "./auth.content.templates.id";
import { authoringContentTemplatesReducer } from "./auth.content.templates.reducer";
import { AuthoringContentTemplateState } from "./auth.content.templates.state";

/**
 * Exposes the feature module selector
 */
export const authoringContentTemplatesFeature = createReduxFeatureModule<
  AuthoringContentTemplateState,
  AuthContentTemplatesFeatureState
>(
  AUTH_CONTENT_TEMPLATES_FEATURE,
  authoringContentTemplatesReducer,
  authoringContentTemplatesEpic,
  [loadingFeature, loggedInFeature, urlConfigFeature, authoringTypeFeature]
);
