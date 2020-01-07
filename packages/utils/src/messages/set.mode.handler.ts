/* Copyright IBM Corp. 2018 */
import {
    Logger,
    SDK_SET_MODE_EVENT_TYPE,
    SdkMessageHandlerCallback,
    SdkMessagePayload,
    SdkMode,
    SdkSetModeEvent,
    SdkSetModeResponse,
} from '@acoustic-content-sdk/api';
import { Consumer } from './../consumers/consumer';
import { NOOP_LOGGER } from './../logger/noop.logger';
import { isNotNil, isString } from './../predicates/predicates';
import { RESPONSE_SUFFIX } from './message.event';

/**
 * Tests the event
 *
 * @param aPayload - the payload
 * @returns true if the event is a refresh event
 */
function _isSdkSetModeEvent(aPayload: SdkMessagePayload): aPayload is SdkSetModeEvent {
    // test the payload for required fields
    return isNotNil(aPayload) && (aPayload.type === SDK_SET_MODE_EVENT_TYPE) && isString((aPayload as any).mode);
}

/**
 * Constructs a response
 *
 * @param aEvent - the original event
 * @param aError - the optional error
 *
 * @returns the response object
 */
function _createSdkSetModeResponse(
    aEvent: SdkSetModeEvent,
    aMode: SdkMode,
    aError?: any): SdkSetModeResponse {
    // construct the object
    return {
        type: aEvent.type + RESPONSE_SUFFIX,
        id: aEvent.id,
        mode: aMode,
        error: aError
    };
}

/**
 * Tests if we need to switch to protected mode
 *
 * @param aMode - the mode
 */
function _isProtected(aMode: SdkMode): boolean {
    return isString(aMode) && (aMode === SdkMode.PROTECTED);
}

/**
 * Executes a navigation event
 */
export function createSetModeHandler(aPublicApiHandler: Consumer<boolean>, aLogger?: Logger): SdkMessageHandlerCallback {

    // the logger
    const logger = aLogger || NOOP_LOGGER;

    function _handle(aPayload: SdkMessagePayload, aEvent: MessageEvent): SdkSetModeResponse | undefined {
        // test
        if (_isSdkSetModeEvent(aPayload)) {
            // log
            logger.info('set mode', aPayload);
            // update the mode
            const isProtected = _isProtected(aPayload.mode);
            // update the mode
            aPublicApiHandler(!isProtected);
            // construct the response
            return _createSdkSetModeResponse(aPayload, isProtected ? SdkMode.PROTECTED : SdkMode.PUBLIC);
        }
    }
    // return the handler
    return _handle;
}
