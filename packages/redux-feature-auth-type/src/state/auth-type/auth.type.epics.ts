import { AuthoringType, Logger } from '@acoustic-content-sdk/api';
import {
  createPreviewAwareLoader,
  guaranteeEpic,
  LoaderType,
  nonExistentEpic
} from '@acoustic-content-sdk/redux-feature-load';
import { selectPayload } from '@acoustic-content-sdk/redux-store';
import {
  addToSetEpic,
  getDeliveryIdFromAuthoringItem
} from '@acoustic-content-sdk/redux-utils';
import { FetchText } from '@acoustic-content-sdk/rest-api';
import {
  arrayPush,
  jsonParse,
  rxPipe,
  wchForEachType
} from '@acoustic-content-sdk/utils';
import { Action } from 'redux';
import { combineEpics, Epic, ofType } from 'redux-observable';
import { map } from 'rxjs/operators';
import {
  AuthoringTypeService,
  rxAuthoringType
} from '../../utils/auth.type.utils';
import {
  ACTION_ADD_AUTH_CONTENT_TYPE,
  ACTION_ADD_AUTH_CONTENT_TYPE_IF_NONEXISTENT,
  ACTION_GUARANTEE_AUTH_CONTENT_TYPE,
  ACTION_LOAD_AUTH_CONTENT_TYPE,
  ACTION_SET_AUTH_CONTENT_TYPE,
  addAuthoringContentTypeAction,
  LoadAuthoringContentTypeAction,
  loadAuthoringContentTypeAction
} from './auth.type.actions';
import { selectAuthTypeFeature } from './auth.type.feature';

export interface AuthoringTypeDependencies {
  fetchText: FetchText;
  logger: Logger;
}

function getAddAuthoringContentTypeActions(
  aAuthoringType: AuthoringType
): Action[] {
  // the actions
  const actions: Action[] = [];
  // iterate over all types
  wchForEachType(aAuthoringType, (type) =>
    arrayPush(addAuthoringContentTypeAction(type), actions)
  );
  // ok
  return actions;
}

/**
 * Initialize the active page
 */
const loadTypeEpic: Epic = (
  actions$,
  state$,
  { fetchText, logger }: AuthoringTypeDependencies
) => {
  // utility to fetch the types
  const loadType: AuthoringTypeService = rxAuthoringType(fetchText, logger);
  // loader
  const loader: LoaderType = (id) =>
    rxPipe(
      /**
       * type loading does not have to wait for a login, because we use the delivery route
       */
      loadType(id),
      // convert text to json
      map<string, AuthoringType>(jsonParse),
      // save the loaded type
      map(getAddAuthoringContentTypeActions)
    );
  // our loader
  const opLoader = createPreviewAwareLoader(state$, loader, logger);

  return rxPipe(
    actions$,
    ofType<LoadAuthoringContentTypeAction>(ACTION_LOAD_AUTH_CONTENT_TYPE),
    // extract the id of the type
    map(selectPayload),
    // load
    opLoader
  );
};

// epic to convert from ACTION_ADD_AUTH_CONTENT_TYPE to ACTION_SET_AUTH_CONTENT_TYPE
const setTypeEpic = addToSetEpic<AuthoringType>(
  ACTION_ADD_AUTH_CONTENT_TYPE,
  ACTION_SET_AUTH_CONTENT_TYPE
);

/**
 * Handles type guarantees
 */
const guaranteeTypeEpic: Epic = guaranteeEpic(
  ACTION_GUARANTEE_AUTH_CONTENT_TYPE,
  loadAuthoringContentTypeAction,
  selectAuthTypeFeature
);

/**
 * Handles non existent items
 */
const nonExistentTypeEpic: Epic = nonExistentEpic(
  ACTION_ADD_AUTH_CONTENT_TYPE_IF_NONEXISTENT,
  addAuthoringContentTypeAction,
  getDeliveryIdFromAuthoringItem,
  selectAuthTypeFeature
);

export const authoringTypeEpic: Epic = combineEpics(
  loadTypeEpic,
  guaranteeTypeEpic,
  nonExistentTypeEpic,
  setTypeEpic
);
