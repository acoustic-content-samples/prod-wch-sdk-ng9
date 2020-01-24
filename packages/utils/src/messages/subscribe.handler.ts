/** Copyright IBM Corp. 2018 */
import {
  Logger,
  SDK_UNSUBSCRIBE_EVENT_TYPE,
  SdkMessageHandlerCallback,
  SdkMessagePayload,
  SdkUnsubscribeEvent
} from '@acoustic-content-sdk/api';
import { NOOP_LOGGER } from './../logger/noop.logger';
import { isNotNil, isString } from './../predicates/predicates';
import { msgUnsubscribe } from './message.event';

/**
 * Tests the event
 *
 * @param aPayload - the payload
 * @returns true if the event is a refresh event
 */
function _isSdkUnsubscribeEvent(
  aPayload: SdkMessagePayload
): aPayload is SdkUnsubscribeEvent {
  // test the payload for required fields
  return (
    isNotNil(aPayload) &&
    aPayload.type === SDK_UNSUBSCRIBE_EVENT_TYPE &&
    isString((aPayload as any).handle)
  );
}

/**
 * Subscribes to a given route
 */
export function createUnsubscribeHandler(
  aLogger?: Logger
): SdkMessageHandlerCallback {
  // the logger
  const logger = aLogger || NOOP_LOGGER;

  function _handle(
    aPayload: SdkMessagePayload,
    aEvent: MessageEvent
  ): null | undefined {
    // test
    if (_isSdkUnsubscribeEvent(aPayload)) {
      // log this
      logger.info('Unsubscribing', aPayload);
      // execute the subscription
      msgUnsubscribe(aPayload.handle);
      // handled, but no response
      return null;
    }
  }

  // return the handler
  return _handle;
}
