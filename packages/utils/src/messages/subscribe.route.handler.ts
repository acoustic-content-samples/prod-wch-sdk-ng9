/** Copyright IBM Corp. 2018 */
import {
  DeliveryContentItem,
  Logger,
  RenderingContextV2,
  SDK_ROUTE_EVENT_TYPE,
  SDK_SUBSCRIBE_ROUTE_EVENT_TYPE,
  SdkMessageHandlerCallback,
  SdkMessagePayload,
  SdkRouteEvent,
  SdkSubscribeRouteEvent,
  SdkSubscribeRouteEventResponse
} from '@acoustic-content-sdk/api';
import { Observable } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';

import { mapArray } from '../js/js.core';
import { NOOP_LOGGER } from './../logger/noop.logger';
import { isArray, isNotNil, isString } from './../predicates/predicates';
import {
  pageEquals,
  pageFromRenderingContext,
  pageGetEncodedPath
} from './../site/site.utils';
import {
  createSdkErrorResponse,
  msgRegisterSubscription,
  msgSendResponse,
  RESPONSE_SUFFIX
} from './message.event';

/** Copyright IBM Corp. 2018 */
/**
 * Constructs the event for the actual route active route
 *
 * @param aEvent - the original event
 * @param aRoute - the route
 * @param aPage - the site page
 *
 * @returns the event object
 */
function _createSdkRouteEvent(
  aEvent: SdkSubscribeRouteEvent,
  aRoute: string,
  aPage?: DeliveryContentItem
): SdkRouteEvent {
  // construct the object
  return {
    type: SDK_ROUTE_EVENT_TYPE,
    id: aEvent.id,
    route: aRoute,
    page: aPage
  };
}

/**
 * Constructs a response
 *
 * @param aEvent - the original event
 * @param aHandle - the handle
 *
 * @returns the response object
 */
function _createSdkSubscribeRouteEventResponse(
  aEvent: SdkSubscribeRouteEvent,
  aHandle: string
): SdkSubscribeRouteEventResponse {
  // construct the object
  return {
    type: aEvent.type + RESPONSE_SUFFIX,
    id: aEvent.id,
    handle: aHandle
  };
}

/**
 * Tests the event
 *
 * @param aPayload - the payload
 * @returns true if the event is a refresh event
 */
function _isSdkSubscribeRouteEvent(
  aPayload: SdkMessagePayload
): aPayload is SdkSubscribeRouteEvent {
  // test the payload for required fields
  return isNotNil(aPayload) && aPayload.type === SDK_SUBSCRIBE_ROUTE_EVENT_TYPE;
}

/**
 * Subscribes to a given route
 */
export function createSubscribeRouteHandler(
  aGetRenderingContextByPath: (aPath: string) => Observable<RenderingContextV2>,
  aLogger?: Logger
): SdkMessageHandlerCallback {
  // the logger
  const logger = aLogger || NOOP_LOGGER;

  /**
   * The actual handler method
   *
   * @param aPayload - payload of the event
   * @param aEvent - the event itself
   *
   * @returns the event response
   */
  function _handle(
    aPayload: SdkMessagePayload,
    aEvent: MessageEvent
  ): SdkSubscribeRouteEventResponse | undefined {
    // check
    if (_isSdkSubscribeRouteEvent(aPayload)) {
      // produce the route
      const route = isString(aPayload.route)
        ? pageGetEncodedPath(aPayload.route)
        : isArray(aPayload.route)
        ? '/' + mapArray(aPayload.route, encodeURIComponent).join('/')
        : '/';
      // log this
      logger.info('Assigning subscription for path', '[', route, ']');
      // construct the subscription
      const sitePage: Observable<
        DeliveryContentItem
      > = aGetRenderingContextByPath(route).pipe(
        // extract the page from the context
        map(pageFromRenderingContext),
        // do not communicate pages twice
        distinctUntilChanged(pageEquals)
      );
      // subscribe
      const subscription = sitePage.subscribe(
        // on next
        (rc) =>
          msgSendResponse(
            _createSdkRouteEvent(aPayload, route, rc),
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
          msgSendResponse(_createSdkRouteEvent(aPayload, route), aEvent, logger)
      );
      // subscribe
      const handle = msgRegisterSubscription(subscription);
      // return the subscription
      return _createSdkSubscribeRouteEventResponse(aPayload, handle);
    }
  }

  // return the handler
  return _handle;
}
