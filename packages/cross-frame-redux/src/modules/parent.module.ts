import { StaticHubInfoUrlProvider, UrlConfig } from "@acoustic-content-sdk/api";
import {
  selectAuthContentFeature,
  setAuthoringContentAction
} from "@acoustic-content-sdk/redux-feature-auth-content";
import {
  selectAuthLayoutFeature,
  setAuthoringLayoutAction
} from "@acoustic-content-sdk/redux-feature-auth-layout";
import {
  selectAuthLayoutMappingFeature,
  setAuthoringLayoutMappingAction
} from "@acoustic-content-sdk/redux-feature-auth-layout-mapping";
import {
  selectAuthTypeFeature,
  setAuthoringContentTypeAction
} from "@acoustic-content-sdk/redux-feature-auth-type";
import {
  selectDeliveryContentFeature,
  setDeliveryContentAction
} from "@acoustic-content-sdk/redux-feature-delivery-content";
import {
  selectUrlConfigFeature,
  setUrlConfigAction
} from "@acoustic-content-sdk/redux-feature-url-config";
import {
  selectWchConfigFeature,
  setWchConfigAction
} from "@acoustic-content-sdk/redux-feature-wch-config";
import {
  createReduxFeatureModule,
  ReduxRootState,
  rxSelect,
  selectPayload
} from "@acoustic-content-sdk/redux-store";
import { removeDataBaseMarker } from "@acoustic-content-sdk/redux-utils";
import {
  arrayPush,
  Consumer,
  isNotNil,
  opFilterNever,
  reduceForIn,
  rxPipe
} from "@acoustic-content-sdk/utils";
import { Action } from "redux";
import { combineEpics, Epic, ofType } from "redux-observable";
import { from, Observable, UnaryFunction } from "rxjs";
import { filter, map, mergeMap, withLatestFrom } from "rxjs/operators";

import {
  ACTION_REQUEST_AUTHORING_LAYOUT,
  ACTION_REQUEST_AUTHORING_LAYOUT_MAPPING,
  ACTION_REQUEST_AUTHORING_TYPE,
  ACTION_REQUEST_DELIVERY_CONTENT,
  ACTION_REQUEST_URL_CONFIG,
  ACTION_REQUEST_WCH_CONFIG
} from "../actions";
import { ACTION_REQUEST_AUTHORING_CONTENT } from "../actions/auth.content";
import {
  createActionsEpic,
  isNotSetAction,
  isSetAction
} from "../epics/actions.epic";
import { MessageService } from "../messages/message.service";

/**
 * Decode the API URL from the URL confi
 *
 * @param aConfig - the config
 * @returns the provider
 */
function urlConfigToUrlConfigProvider(
  aConfig: UrlConfig
): StaticHubInfoUrlProvider {
  // decode the API URL
  return aConfig.apiUrl;
}

function urlConfigToAction(aConfig: UrlConfig): Action {
  return setUrlConfigAction(urlConfigToUrlConfigProvider(aConfig));
}

function reduceArray<T>(aDst: T[], aItem: T) {
  return arrayPush(aItem, aDst);
}

/**
 * Extracts the values from a record as an array
 *
 * @param aRecord - the record
 * @returns an observable of the values
 */
function getValues<T>(aRecord: Record<string, T>): Observable<T> {
  return from(reduceForIn(aRecord, reduceArray, []));
}

/**
 * Constructs an epic that dispatches the values from a map as SET actions
 */
function createRequestEpicForRecord<T>(
  aSelectFeature: UnaryFunction<ReduxRootState, Record<string, T>>,
  aFeatureAction: string,
  aActionGenerator: UnaryFunction<T, Action>,
  aActionConsumer: Consumer<Action>
): Epic {
  // retuns the epic
  return (action$, state$) => {
    // select the content
    const feature$ = rxPipe(state$, rxSelect(aSelectFeature));

    return rxPipe(
      action$,
      ofType(aFeatureAction),
      withLatestFrom(feature$),
      mergeMap(([, feature]) => getValues(feature)),
      map(aActionGenerator),
      map(aActionConsumer),
      opFilterNever
    );
  };
}

/**
 * Constructs an epic that dispatches individual records
 */
function createRequestEpicForItem<T>(
  aSelectFeature: UnaryFunction<ReduxRootState, T>,
  aFeatureAction: string,
  aActionGenerator: UnaryFunction<T, Action>,
  aActionConsumer: Consumer<Action>
): Epic {
  // retuns the epic
  return (action$, state$) => {
    // select the content
    const feature$ = rxPipe(state$, rxSelect(aSelectFeature));

    return rxPipe(
      action$,
      ofType(aFeatureAction),
      withLatestFrom(feature$),
      map(([, feature]) => feature),
      map(aActionGenerator),
      map(aActionConsumer),
      opFilterNever
    );
  };
}

/**
 * Removes a potential database ID from the action
 *
 * @param aAction  - the action
 * @returns the cleaned action
 */
function cleanupPayload(aAction: Action): Action {
  // only for set actions
  if (isSetAction(aAction)) {
    // select the payload
    const payload = selectPayload(aAction as any);
    if (isNotNil(payload)) {
      // replace
      return {
        ...aAction,
        payload: removeDataBaseMarker(payload)
      } as any;
    }
  }
  // nothing to do
  return aAction;
}

/**
 * Constructs the epic for the redux store in the parent frame that sends all SET_XXX actions to
 * the child frame
 *
 * @param aMessageService  - the message service used for the communication from the parent frame to the child frame
 * @returns the epic
 */
function createParentFrameEpic(aMessageService: MessageService): Epic {
  /**
   * Message sending
   */
  const sendMessage: Consumer<Action> = action =>
    aMessageService.sendMessage(cleanupPayload(action));

  /**
   * Dispatch set actions to the client
   */
  const dispatchActions = createActionsEpic(isSetAction, sendMessage);

  const requestUrlConfig = createRequestEpicForItem(
    selectUrlConfigFeature,
    ACTION_REQUEST_URL_CONFIG,
    urlConfigToAction,
    sendMessage
  );

  const requestWchConfig = createRequestEpicForItem(
    selectWchConfigFeature,
    ACTION_REQUEST_WCH_CONFIG,
    setWchConfigAction,
    sendMessage
  );

  const requestDeliveryContentEpic = createRequestEpicForRecord(
    selectDeliveryContentFeature,
    ACTION_REQUEST_DELIVERY_CONTENT,
    setDeliveryContentAction,
    sendMessage
  );

  const requestAuthoringContentEpic = createRequestEpicForRecord(
    selectAuthContentFeature,
    ACTION_REQUEST_AUTHORING_CONTENT,
    setAuthoringContentAction,
    sendMessage
  );

  const requestAuthoringTypeEpic = createRequestEpicForRecord(
    selectAuthTypeFeature,
    ACTION_REQUEST_AUTHORING_TYPE,
    setAuthoringContentTypeAction,
    sendMessage
  );

  const requestAuthoringLayoutEpic = createRequestEpicForRecord(
    selectAuthLayoutFeature,
    ACTION_REQUEST_AUTHORING_LAYOUT,
    setAuthoringLayoutAction,
    sendMessage
  );

  const requestAuthoringLayoutMappingEpic = createRequestEpicForRecord(
    selectAuthLayoutMappingFeature,
    ACTION_REQUEST_AUTHORING_LAYOUT_MAPPING,
    setAuthoringLayoutMappingAction,
    sendMessage
  );

  /**
   * Receive non-set actions from the client
   */
  const receiveActions: Epic = () =>
    rxPipe(aMessageService.messages$, filter(isNotSetAction));

  // dispatch
  return combineEpics(
    dispatchActions,
    receiveActions,
    requestUrlConfig,
    requestWchConfig,
    requestDeliveryContentEpic,
    requestAuthoringContentEpic,
    requestAuthoringTypeEpic,
    requestAuthoringLayoutEpic,
    requestAuthoringLayoutMappingEpic
  );
}

/**
 * Redux module for the parent store
 *
 * @param aMessageService  - message service
 * @returns the child module
 */
export function createParentModule(aMessageService: MessageService) {
  return createReduxFeatureModule(
    undefined,
    undefined,
    createParentFrameEpic(aMessageService),
    undefined
  );
}
