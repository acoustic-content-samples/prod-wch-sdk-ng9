/** Copyright IBM Corp. 2018 */

/**
 * Base interfaces for events that can be sent to the SDK
 */
export interface SdkMessagePayload {
    // event identifier, identifying a potential response
    id: string;
    // the event type
    type: string;
}

/**
 * Response sent when processing a message fails
 */
export interface SdkErrorResponse extends SdkMessagePayload {
    // potential error
    error: any;
}

export type SdkMessageHandlerCallback = (aPayload: SdkMessagePayload, aEvent: MessageEvent) => PromiseLike<SdkMessagePayload> | SdkMessagePayload | null | undefined;

export interface SdkMessageHandler {
    handle: SdkMessageHandlerCallback;
}

