/* Copyright IBM Corp. 2018 */
import {
  Logger,
  SDK_REFRESH_EVENT_TYPE,
  SdkMessageHandlerCallback,
  SdkMessagePayload,
  SdkRefreshEvent
} from '@acoustic-content-sdk/api';
import { NOOP_LOGGER } from './../logger/noop.logger';
import { isNotNil } from './../predicates/predicates';

/**
 * Tests the event
 *
 * @param aPayload - the payload
 * @returns true if the event is a refresh event
 */
function _isSdkRefreshEvent(
  aPayload: SdkMessagePayload
): aPayload is SdkRefreshEvent {
  // test the payload for required fields
  return isNotNil(aPayload) && aPayload.type === SDK_REFRESH_EVENT_TYPE;
}

/**
 * Executes a refresh event
 */
export function createRefreshHandler(
  aRefresh: () => any,
  aLogger?: Logger
): SdkMessageHandlerCallback {
  // the logger
  const logger = aLogger || NOOP_LOGGER;

  function _handle(
    aPayload: SdkMessagePayload,
    aEvent: MessageEvent
  ): PromiseLike<SdkMessagePayload> | undefined {
    // test
    if (_isSdkRefreshEvent(aPayload)) {
      // log this
      logger.info('Refresh', aPayload);
      // trigger the refresh call
      aRefresh();
      // handled but no response
      return null;
    }
  }

  // return the handler
  return _handle;
}
