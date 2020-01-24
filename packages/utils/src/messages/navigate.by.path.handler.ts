/* Copyright IBM Corp. 2018 */
import {
  Logger,
  SDK_NAVIGATE_BY_PATH_EVENT_TYPE,
  SdkMessageHandlerCallback,
  SdkMessagePayload,
  SdkNavigateByPathEvent,
  SdkNavigateByPathResponse
} from '@acoustic-content-sdk/api';
import { NOOP_LOGGER } from './../logger/noop.logger';
import { isNotNil, isString } from './../predicates/predicates';
import { RESPONSE_SUFFIX } from './message.event';

/**
 * Tests the event
 *
 * @param aPayload - the payload
 * @returns true if the event is a refresh event
 */
function _isSdkNavigateByPathEvent(
  aPayload: SdkMessagePayload
): aPayload is SdkNavigateByPathEvent {
  // test the payload for required fields
  return (
    isNotNil(aPayload) &&
    aPayload.type === SDK_NAVIGATE_BY_PATH_EVENT_TYPE &&
    isString((aPayload as any).path)
  );
}

/**
 * Constructs a response
 *
 * @param aEvent - the original event
 * @param aFlag - the flag
 * @param aError - the optional error
 *
 * @returns the response object
 */
function _createSdkNavigateByPathResponse(
  aEvent: SdkNavigateByPathEvent,
  aFlag: boolean,
  aError?: any
): SdkNavigateByPathResponse {
  // construct the object
  return {
    type: aEvent.type + RESPONSE_SUFFIX,
    id: aEvent.id,
    path: aEvent.path,
    success: aFlag,
    error: aError
  };
}

/**
 * Executes a navigation event
 */
export function createNavigateByPathHandler(
  aNavigate: (aPath: string) => PromiseLike<boolean>,
  aLogger?: Logger
): SdkMessageHandlerCallback {
  // the logger
  const logger = aLogger || NOOP_LOGGER;

  function _handle(
    aPayload: SdkMessagePayload,
    aEvent: MessageEvent
  ): PromiseLike<SdkNavigateByPathResponse> | undefined {
    // test
    if (_isSdkNavigateByPathEvent(aPayload)) {
      // log
      logger.info('navigate by path', aPayload);
      // trigger the refresh call
      return aNavigate(aPayload.path).then(
        (result) => _createSdkNavigateByPathResponse(aPayload, result),
        (err) => _createSdkNavigateByPathResponse(aPayload, false, err)
      );
    }
  }
  // return the handler
  return _handle;
}
