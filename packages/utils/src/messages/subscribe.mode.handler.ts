/* Copyright IBM Corp. 2018 */
import { Observable } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';

import {
  Logger,
  SDK_MODE_EVENT_TYPE,
  SDK_SUBSCRIBE_MODE_EVENT_TYPE,
  SdkMessageHandlerCallback,
  SdkMessagePayload,
  SdkMode,
  SdkModeEvent,
  SdkSubscribeModeEvent,
  SdkSubscribeModeEventResponse
} from '@acoustic-content-sdk/api';
import { NOOP_LOGGER } from './../logger/noop.logger';
import { isNotNil } from './../predicates/predicates';
import {
  createSdkErrorResponse,
  msgRegisterSubscription,
  msgSendResponse,
  RESPONSE_SUFFIX
} from './message.event';

/* Copyright IBM Corp. 2018 */
/**
 * Constructs a response
 *
 * @param aEvent - the original event
 * @param aHandle - the handle
 *
 * @returns the response object
 */
function _createSdkSubscribeModeEventResponse(
  aEvent: SdkSubscribeModeEvent,
  aHandle: string
): SdkSubscribeModeEventResponse {
  // construct the object
  return {
    type: aEvent.type + RESPONSE_SUFFIX,
    id: aEvent.id,
    handle: aHandle
  };
}

/**
 * Constructs the event for the active route
 *
 * @param aEvent - the original event
 * @param aPage - the site page
 *
 * @returns the event object
 */
function _createSdkModeEvent(
  aEvent: SdkSubscribeModeEvent,
  aMode: SdkMode
): SdkModeEvent {
  // construct the object
  return {
    type: SDK_MODE_EVENT_TYPE,
    id: aEvent.id,
    mode: aMode
  };
}

/**
 * Tests the event
 *
 * @param aPayload - the payload
 * @returns true if the event is a refresh event
 */
function _isSdkSubscribeModeEvent(
  aPayload: SdkMessagePayload
): aPayload is SdkSubscribeModeEvent {
  // test the payload for required fields
  return isNotNil(aPayload) && aPayload.type === SDK_SUBSCRIBE_MODE_EVENT_TYPE;
}

/**
 * Subscribes to the active route
 */
export function createSubscribeModeHandler(
  onUsePublic: Observable<boolean>,
  aLogger?: Logger
): SdkMessageHandlerCallback {
  // the logger
  const logger = aLogger || NOOP_LOGGER;

  function _handle(
    aPayload: SdkMessagePayload,
    aEvent: MessageEvent
  ): SdkSubscribeModeEventResponse | undefined {
    // test
    if (_isSdkSubscribeModeEvent(aPayload)) {
      // log
      logger.info('subscribe to mode changes', aPayload);
      // construct the observable
      const onMode: Observable<SdkMode> = onUsePublic.pipe(
        map((bPublic) => (bPublic ? SdkMode.PUBLIC : SdkMode.PROTECTED)),
        distinctUntilChanged()
      );
      // construct the subscription
      const subscription = onMode.subscribe(
        // on next
        (mode) =>
          msgSendResponse(_createSdkModeEvent(aPayload, mode), aEvent, logger),
        // error
        (err) =>
          msgSendResponse(
            createSdkErrorResponse(aPayload, err, logger),
            aEvent,
            logger
          )
      );
      // subscribe
      const handle = msgRegisterSubscription(subscription);
      // return the subscription
      return _createSdkSubscribeModeEventResponse(aPayload, handle);
    }
  }

  // return the handler
  return _handle;
}
