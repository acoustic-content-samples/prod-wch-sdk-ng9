/** Copyright IBM Corp. 2018 */
import { SdkMessagePayload } from './messages';

/**
 * Event that triggers a refresh
 */
export const SDK_REFRESH_EVENT_TYPE = 'WchSdk.refresh';
export interface SdkRefreshEvent extends SdkMessagePayload {
    // the event type
    type: 'WchSdk.refresh';
}
