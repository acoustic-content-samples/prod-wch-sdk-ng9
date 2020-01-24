/** Copyright IBM Corp. 2018 */
import { SdkMessagePayload } from './messages';
import { SdkSubscribeEventResponse } from './sdk.subscribe.message';

/**
 * Event that subscribes a listener for modes
 */
export const SDK_SUBSCRIBE_MODE_EVENT_TYPE = 'WchSdk.mode.subscribe';
export interface SdkSubscribeModeEvent extends SdkMessagePayload {
    // the event type
    type: 'WchSdk.mode.subscribe';
}

export enum SdkMode {
    PUBLIC = 'public',
    PROTECTED = 'protected'
}

/**
 * Event sent to denote the active mode
 */
export const SDK_MODE_EVENT_TYPE = 'WchSdk.mode';
export interface SdkModeEvent extends SdkMessagePayload {
    // the event type
    type: 'WchSdk.mode';
    // the mode
    mode: SdkMode;
}

export interface SdkSubscribeModeEventResponse extends SdkSubscribeEventResponse {
}
