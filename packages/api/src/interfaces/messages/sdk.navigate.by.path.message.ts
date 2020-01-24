/** Copyright IBM Corp. 2018 */
import { SdkMessagePayload } from './messages';

/**
 * Event that triggers a navigation
 */
export const SDK_NAVIGATE_BY_PATH_EVENT_TYPE = 'WchSdk.router.navigateByPath';
export interface SdkNavigateByPathEvent extends SdkMessagePayload {
    // the event type
    type: 'WchSdk.router.navigateByPath';
    // path to navigate to
    path: string;
}

/**
 * Response to the navigation event
 */
export interface SdkNavigateByPathResponse extends SdkMessagePayload {
    // path navigated to
    path: string;
    // success of the operation
    success: boolean;
    // potential error
    error?: any;
}
