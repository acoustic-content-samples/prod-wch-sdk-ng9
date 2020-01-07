import {
  AuthoringContentItem,
  AuthoringType,
  LoggerService
} from '@acoustic-content-sdk/api';
import {
  ACTION_ADD_AUTH_CONTENT_TYPE,
  ACTION_ADD_AUTH_CONTENT_TYPE_IF_NONEXISTENT,
  AddAuthoringContentTypeAction
} from '@acoustic-content-sdk/redux-feature-auth-type';
import {
  createAuthenticatedLoader,
  guaranteeEpic,
  LoaderType,
  nonExistentEpic
} from '@acoustic-content-sdk/redux-feature-load';
import { selectPayload } from '@acoustic-content-sdk/redux-store';
import {
  addToSetEpic,
  getDeliveryIdFromAuthoringItem,
  isNotFromDataBase
} from '@acoustic-content-sdk/redux-utils';
import { FETCH_PRIORITY, FetchText } from '@acoustic-content-sdk/rest-api';
import {
  isNotNil,
  isString,
  jsonParse,
  rxPipe
} from '@acoustic-content-sdk/utils';
import { combineEpics, Epic, ofType } from 'redux-observable';
import { map } from 'rxjs/operators';

import {
  ACTION_ADD_AUTH_CONTENT_TEMPLATE,
  ACTION_ADD_AUTH_CONTENT_TEMPLATE_IF_NONEXISTENT,
  ACTION_GUARANTEE_AUTH_CONTENT_TEMPLATE,
  ACTION_LOAD_AUTH_CONTENT_TEMPLATE,
  ACTION_SET_AUTH_CONTENT_TEMPLATE,
  addAuthoringContentTemplateAction,
  AddAuthoringContentTypeIfNonExistentAction,
  guaranteeAuthoringContentTemplateAction,
  LoadAuthoringContentTemplateAction,
  loadAuthoringContentTemplateAction
} from './auth.content.templates.actions';
import { selectAuthContentTemplatesFeature } from './auth.content.templates.feature';
import { keyByTypeId } from './auth.content.templates.selectors';
import {
  AuthoringContentTemplateState,
  PrefixedId,
  removePrefix
} from './auth.content.templates.state';

export interface AuthoringContentTemplatesDependencies {
  fetchText: FetchText;
  logSvc: LoggerService;
}

const LOGGER = 'AuthContentTemplatesEpic';

const DEFAULT_FETCH_PRIORITY = FETCH_PRIORITY.LOW;

/**
 * Initialize the active page
 */
const loadContentTemplatesEpic: Epic = (
  actions$,
  state$,
  { fetchText, logSvc }: AuthoringContentTemplatesDependencies
) => {
  // logging
  const logger = logSvc.get(LOGGER);
  // loader
  const loader: LoaderType = (id: string) =>
    rxPipe(
      fetchText(
        `authoring/v1/types/${encodeURIComponent(
          removePrefix(id)
        )}/new-content?include=defaults`,
        DEFAULT_FETCH_PRIORITY
      ),
      // convert text to json
      map<string, AuthoringContentItem>(jsonParse),
      // save the loaded type
      map(addAuthoringContentTemplateAction)
    );
  // our loader
  const opLoader = createAuthenticatedLoader(state$, loader, logger);

  return rxPipe(
    actions$,
    ofType<LoadAuthoringContentTemplateAction>(
      ACTION_LOAD_AUTH_CONTENT_TEMPLATE
    ),
    // extract the id of the type
    map(selectPayload),
    // load
    opLoader
  );
};

/**
 * Loads the default content whenever a content type gets loaded
 */
const loadTypeEpic: Epic = (actions$) =>
  rxPipe(
    actions$,
    ofType<
      AddAuthoringContentTypeAction | AddAuthoringContentTypeIfNonExistentAction
    >(
      ACTION_ADD_AUTH_CONTENT_TYPE,
      ACTION_ADD_AUTH_CONTENT_TYPE_IF_NONEXISTENT
    ),
    // extract the id of the type
    map(selectPayload),
    // extract the delivery ID
    map(getDeliveryIdFromAuthoringItem),
    // convert to a guarantee action
    map(guaranteeAuthoringContentTemplateAction)
  );

// epic to convert from ACTION_ADD_AUTH_CONTENT_TEMPLATE to ACTION_SET_AUTH_CONTENT_TEMPLATE
const setContentTemplatesEpic = addToSetEpic<AuthoringType>(
  ACTION_ADD_AUTH_CONTENT_TEMPLATE,
  ACTION_SET_AUTH_CONTENT_TEMPLATE
);

/**
 * Tests if a resource exists
 *
 * @param aId - the ID of the resource
 * @param aResources - the set of applicable resources
 *
 * @returns true if the resource exists
 */
const hasResource = <T>(
  aId: PrefixedId,
  aResources: AuthoringContentTemplateState
): boolean =>
  isString(aId) &&
  isNotNil(aResources) &&
  isNotFromDataBase(aResources[removePrefix(aId)]);

/**
 * Remove the prefix from the guarantee action
 *
 * @param aId - the prefixed ID
 * @returns the ID without prefix
 */
const loadAction = (aId: PrefixedId) =>
  loadAuthoringContentTemplateAction(removePrefix(aId));

/**
 * Handles type guarantees
 */
const guaranteeContentTemplatesEpic: Epic = guaranteeEpic(
  ACTION_GUARANTEE_AUTH_CONTENT_TEMPLATE,
  loadAction,
  selectAuthContentTemplatesFeature,
  hasResource
);

/**
 * Handles non existent items
 */
const nonExistentContentTemplatesEpic: Epic = nonExistentEpic(
  ACTION_ADD_AUTH_CONTENT_TEMPLATE_IF_NONEXISTENT,
  addAuthoringContentTemplateAction,
  keyByTypeId,
  selectAuthContentTemplatesFeature
);

export const authoringContentTemplatesEpic: Epic = combineEpics(
  loadTypeEpic,
  loadContentTemplatesEpic,
  guaranteeContentTemplatesEpic,
  nonExistentContentTemplatesEpic,
  setContentTemplatesEpic
);
