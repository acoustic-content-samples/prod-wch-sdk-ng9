/* Copyright IBM Corp. 2018 */
import { Subscription } from 'rxjs';

import { Generator } from '../generators/generator';
import { lazyGenerator } from '../generators/lazy.generator';
import {
  Logger,
  SdkErrorResponse,
  SdkMessageHandler,
  SdkMessagePayload
} from '@acoustic-content-sdk/api';
import { corsTestOrigin, NULL_ORIGIN } from './../cors/cors.utils';
import { hashRandomIdentifier } from './../hash/hash.utils';
import { jsonStringify } from './../json/json.utils';
import { NOOP_LOGGER } from './../logger/noop.logger';
import { identity } from './../misc';
import { isNotNil, isString } from './../predicates/predicates';

export const RESPONSE_SUFFIX = 'Response';

// subscriptions
const _SUBSCRIPTIONS: { [handle: string]: Subscription } = {};

/**
 * Unsubscribes from a previous subscription
 *
 * @param aHandle - the handle
 */
function _unsubscribe(aHandle: string) {
  // undo the subscription
  _SUBSCRIPTIONS[aHandle].unsubscribe();
  delete _SUBSCRIPTIONS[aHandle];
}

/**
 * Registers the subscription and returns a handle
 *
 * @param aSubscription - the subscription
 * @returns the handle
 */
function _registerSubscription(aSubscription: Subscription): string {
  // add a subscription
  const handle = hashRandomIdentifier();
  _SUBSCRIPTIONS[handle] = aSubscription;
  return handle;
}

/**
 * Tests the event
 *
 * @param aPayload - the payload
 * @returns true if the event is targeted to the SDK
 */
function _isSdkEvent(aPayload: any): aPayload is SdkMessagePayload {
  // test the payload for required fields
  return isNotNil(aPayload) && isString(aPayload.type) && isString(aPayload.id);
}

/**
 * Constructs an error response
 *
 * @param aEvent - the original event
 * @param aError - the optional error
 *
 * @returns the response object
 */
function _createSdkErrorResponse(
  aEvent: SdkMessagePayload,
  aError: any,
  aLogger: Logger
): SdkErrorResponse {
  // log the original error
  aLogger.error(aError);
  // construct the object
  return {
    type: aEvent.type + RESPONSE_SUFFIX,
    id: aEvent.id,
    error: jsonStringify(aError)
  };
}

/**
 * Returns the message port if it exists
 *
 * @param aEvent - the event
 * @returns the message port if available
 */
function _getMessagePort(aEvent: MessageEvent): MessagePort {
  // test if we have a message channel
  if (aEvent && aEvent.ports && aEvent.ports[0] instanceof MessagePort) {
    return aEvent.ports[0];
  }
}

/**
 * Sends a response to the sender of the event
 *
 * @param aResponse - the response
 * @param aEvent - the event
 */
function _sendResponse(aResponse: any, aEvent: MessageEvent, aLogger: Logger) {
  // check if we have window and origin
  const source = aEvent.source;
  const origin: string = aEvent.origin;
  // only send if we have data
  if (isNotNil(aResponse) && isNotNil(source)) {
    // check if we have message channel support
    const port = _getMessagePort(aEvent);
    if (isNotNil(port)) {
      // log this
      aLogger.info('Responded via message channel.');
      // respond via the port
      port.postMessage(aResponse);
    }
    // only reply to non null origins
    else if (isString(origin) && origin !== NULL_ORIGIN) {
      // we can assume that this is a windows post
      const winSource = source as Window;
      // log this
      aLogger.info('Responded via POST message.');
      // send the message directly to the origin
      winSource.postMessage(aResponse, origin);
    } else {
      aLogger.warn('Cannot reply to origin', '[', origin, ']');
    }
    // log this
    aLogger.info(
      'Sent response',
      '[',
      aResponse,
      ']',
      'to origin',
      '[',
      origin,
      ']'
    );
  }
}

/**
 * Processes the message and potentially produces a response
 *
 * @param aData - the payload data
 * @param aEvent - the incoming event
 * @returns the eventual response
 */
function _processMessage(
  aData: SdkMessagePayload,
  aEvent: MessageEvent,
  aMsgHandlers: Generator<SdkMessageHandler[]>,
  aLogger: Logger
): PromiseLike<SdkMessagePayload> | SdkMessagePayload | null | undefined {
  // access the handlers
  const handlers = aMsgHandlers();
  // iterate over the providers
  let idx = handlers.length;
  while (--idx >= 0) {
    // current handler
    const handler = handlers[idx];
    aLogger.info('testing ...', handler);
    // handle
    const result = handler.handle(aData, aEvent);
    if (result !== undefined) {
      // handler accepted the message
      aLogger.info('succeeded ...', handler);
      // ok
      return result;
    }
  }
  // unknown event type
  aLogger.warn('Unknown event type.');
}

/**
 * Constructs an event listener that listens for messages
 *
 * @param aCorsWhitelist - generator that produces a CORS whitelist
 * @param aMsgHandlers - generator that enumerates the set of registered message handlers
 *
 * @returns the listener that can be attached to the window object
 */
function _createMessageHandler(
  aCorsWhitelist: Generator<PromiseLike<string[]>>,
  aMsgHandlers: Generator<SdkMessageHandler[]>,
  aLogger?: Logger
): (aEvent: MessageEvent) => void {
  // logger
  const logger = aLogger || NOOP_LOGGER;
  // handle the whitelist
  const corsWhiteList = lazyGenerator(aCorsWhitelist);
  // returns the handler
  function _onMessage(aEvent: MessageEvent) {
    // validate if we have the event
    if (isNotNil(aEvent)) {
      // get the data
      const data = aEvent.data;
      if (_isSdkEvent(data)) {
        // load the whitelist
        corsWhiteList()
          // perform the CORS check
          .then((whitelist) => corsTestOrigin(aEvent.origin, whitelist, logger))
          // if valid, process the message and potentially produce a response
          .then((bValid) =>
            bValid
              ? _processMessage(data, aEvent, aMsgHandlers, logger)
              : undefined
          )
          // handle errors
          .then(identity, (error) =>
            _createSdkErrorResponse(data, error, aLogger)
          )
          // send the response to the caller
          .then((resp) => _sendResponse(resp, aEvent, aLogger));
      } else {
        // warn
        // aLogger.warn('Message payload is null or undefined.');
      }
    } else {
      // warn
      logger.warn('Message is null or undefined.');
    }
  }

  // ok
  return _onMessage;
}

export {
  _createMessageHandler as createMessageHandler,
  _sendResponse as msgSendResponse,
  _createSdkErrorResponse as createSdkErrorResponse,
  _registerSubscription as msgRegisterSubscription,
  _unsubscribe as msgUnsubscribe
};
