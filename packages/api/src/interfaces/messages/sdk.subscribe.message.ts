/* Copyright IBM Corp. 2018 */
import { SdkMessagePayload } from './messages';

/**
 * Response to a subscription
 */
export interface SdkSubscribeEventResponse extends SdkMessagePayload {
  /**
   * handle, unsubscribe using this handle
   */
  handle: string;
}

/**
 * Event that unsubscribes a listener
 */
export const SDK_UNSUBSCRIBE_EVENT_TYPE = 'WchSdk.unsubscribe';
export interface SdkUnsubscribeEvent extends SdkMessagePayload {
  /**
   * the event type
   */
  type: 'WchSdk.unsubscribe';
  /**
   * handle to unsubscribe on
   */
  handle: string;
}
