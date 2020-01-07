/* Copyright IBM Corp. 2018 */
import {
  Logger,
  RenderingContextV2,
  SDK_ACTIVE_ROUTE_EVENT_TYPE,
  SDK_SUBSCRIBE_ACTIVE_ROUTE_EVENT_TYPE,
  SdkActiveRouteEvent,
  SdkMessageHandlerCallback,
  SdkMessagePayload,
  SdkSubscribeActiveRouteEvent,
  SdkSubscribeActiveRouteEventResponse,
  DeliveryContentItem
} from '@acoustic-content-sdk/api';
import { Observable } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';

import { NOOP_LOGGER } from './../logger/noop.logger';
import { isNotNil } from './../predicates/predicates';
import { pageEquals, pageFromRenderingContext } from './../site/site.utils';
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
function _createSdkSubscribeActiveRouteEventResponse(
  aEvent: SdkSubscribeActiveRouteEvent,
  aHandle: string
): SdkSubscribeActiveRouteEventResponse {
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
function _createSdkActiveRouteEvent(
  aEvent: SdkSubscribeActiveRouteEvent,
  aPage?: DeliveryContentItem
): SdkActiveRouteEvent {
  // construct the object
  return {
    type: SDK_ACTIVE_ROUTE_EVENT_TYPE,
    id: aEvent.id,
    page: aPage
  };
}

/**
 * Tests the event
 *
 * @param aPayload - the payload
 * @returns true if the event is a refresh event
 */
function _isSdkSubscribeActiveRouteEvent(
  aPayload: SdkMessagePayload
): aPayload is SdkSubscribeActiveRouteEvent {
  // test the payload for required fields
  return (
    isNotNil(aPayload) &&
    aPayload.type === SDK_SUBSCRIBE_ACTIVE_ROUTE_EVENT_TYPE
  );
}

/**
 * Subscribes to the active route
 */
export function createSubscribeActiveRouteHandler(
  onActiveRenderingContext: Observable<RenderingContextV2>,
  aLogger?: Logger
): SdkMessageHandlerCallback {
  // the logger
  const logger = aLogger || NOOP_LOGGER;

  function _handle(
    aPayload: SdkMessagePayload,
    aEvent: MessageEvent
  ): SdkSubscribeActiveRouteEventResponse | undefined {
    // test
    if (_isSdkSubscribeActiveRouteEvent(aPayload)) {
      // construct the observable
      const sitePage: Observable<
        DeliveryContentItem
      > = onActiveRenderingContext.pipe(
        map(pageFromRenderingContext),
        distinctUntilChanged(pageEquals)
      );
      // construct the subscription
      const subscription = sitePage.subscribe(
        // on next
        (rc) =>
          msgSendResponse(
            _createSdkActiveRouteEvent(aPayload, rc),
            aEvent,
            logger
          ),
        // error
        (err) =>
          msgSendResponse(
            createSdkErrorResponse(aPayload, err, logger),
            aEvent,
            logger
          ),
        // on complete
        () =>
          msgSendResponse(_createSdkActiveRouteEvent(aPayload), aEvent, logger)
      );
      // subscribe
      const handle = msgRegisterSubscription(subscription);
      // return the subscription
      return _createSdkSubscribeActiveRouteEventResponse(aPayload, handle);
    }
  }

  // return the handler
  return _handle;
}
