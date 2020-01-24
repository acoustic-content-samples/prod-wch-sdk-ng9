/** Copyright IBM Corp. 2018 */
import { SdkMessagePayload } from './messages';
import { SdkMode } from './sdk.subscribe.mode.message';

/**
 * Event that modifies the SDK mode between using public or private routes
 */
export const SDK_SET_MODE_EVENT_TYPE = 'WchSdk.setMode';
export interface SdkSetModeEvent extends SdkMessagePayload {
    // the event type
    type: 'WchSdk.setMode';
    // mode to set
    mode: SdkMode;
}

/**
 * Response to the set mode event
 */
export interface SdkSetModeResponse extends SdkMessagePayload {
    // mode set
    mode: SdkMode;
    // potential error
    error?: any;
}
