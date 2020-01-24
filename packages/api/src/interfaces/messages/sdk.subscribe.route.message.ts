/** Copyright IBM Corp. 2018 */
import { DeliveryContentItem } from './../delivery/v2/content.item';
import { SdkMessagePayload } from './messages';
import { SdkSubscribeEventResponse } from './sdk.subscribe.message';

/**
 * Event that subscribes a listener for a specific route
 */
export const SDK_SUBSCRIBE_ROUTE_EVENT_TYPE = 'WchSdk.router.route.subscribe';
export interface SdkSubscribeRouteEvent extends SdkMessagePayload {
  // the event type
  type: 'WchSdk.router.route.subscribe';
  /**
   * The desired route. If the route is a string, then it is the ESCAPED path. If it is a string
   * array, then each array element contains the UNESCAPED path segment
   */
  route: string | string[];
}

/**
 * Event sent to denote a modification of the route
 */
export const SDK_ROUTE_EVENT_TYPE = 'WchSdk.router.route';
export interface SdkRouteEvent extends SdkMessagePayload {
  // the event type
  type: 'WchSdk.router.route';
  // the route to subscribe to
  route: string;
  // the page
  page: DeliveryContentItem;
}

export interface SdkSubscribeRouteEventResponse
  extends SdkSubscribeEventResponse {}
