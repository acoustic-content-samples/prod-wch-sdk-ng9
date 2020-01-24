/** Copyright IBM Corp. 2018 */
import { DeliveryContentItem } from './../delivery/v2/content.item';
import { SdkMessagePayload } from './messages';
import { SdkSubscribeEventResponse } from './sdk.subscribe.message';

/**
 * Event that subscribes a listener for an active route
 */
export const SDK_SUBSCRIBE_ACTIVE_ROUTE_EVENT_TYPE =
  'WchSdk.router.activeRoute.subscribe';
export interface SdkSubscribeActiveRouteEvent extends SdkMessagePayload {
  // the event type
  type: 'WchSdk.router.activeRoute.subscribe';
}

/**
 * Event sent to denote a modification of the active route
 */
export const SDK_ACTIVE_ROUTE_EVENT_TYPE = 'WchSdk.router.activeRoute';
export interface SdkActiveRouteEvent extends SdkMessagePayload {
  // the event type
  type: 'WchSdk.router.activeRoute';
  // the page
  page: DeliveryContentItem;
}

export interface SdkSubscribeActiveRouteEventResponse
  extends SdkSubscribeEventResponse {}
