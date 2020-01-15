import { Logger } from '@acoustic-content-sdk/api';
import {
  EVENT_EDIT_END,
  EVENT_EDIT_START,
  EventTargetLike,
  WchEditableEvent
} from '@acoustic-content-sdk/edit-api';
import { rxPipe } from '@acoustic-content-sdk/utils';
import { empty, fromEvent, merge, Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

/**
 * Constructs the event
 *
 * @param aType - the event type
 * @param aTarget - the target node
 * @param aData - the event data
 *
 * @returns the event object
 */
function _createWchEditableEvent(
  aType: string,
  aTarget: HTMLElement,
  aData: any
): WchEditableEvent {
  // constructs the proper event object
  return {
    type: aType,
    target: aTarget,
    data: aData
  };
}

/**
 *
 * Registers for an event
 *
 * @param aType - the event type
 * @param aTarget - the current element
 * @param aEmitter - the event emitter
 *
 * @returns the sequence of events
 */
function _registerForEvent(
  aType: string,
  aTarget: HTMLElement,
  aEmitter: EventTargetLike,
  aLogger: Logger
): Observable<WchEditableEvent> {
  // registers for the event and produces the desired wrapper
  return rxPipe(
    fromEvent(aEmitter, aType),
    map((data) => _createWchEditableEvent(aType, aTarget, data)),
    tap(
      (event) => aLogger.info('Event', event),
      (error) => aLogger.warn('Registration error.', aEmitter, error)
    ),
    catchError((error) => empty())
  );
}

/**
 * Construct the event stream
 *
 * @param aTarget - the target element
 * @param aEmitter - the event emitter
 *
 * @returns the event stream
 */
export function createWchEditableEvents(
  aTarget: HTMLElement,
  aEmitter: EventTargetLike,
  aLogger: Logger
): Observable<WchEditableEvent> {
  // attach the events we are interested in
  const onStart = _registerForEvent(
    EVENT_EDIT_START,
    aTarget,
    aEmitter,
    aLogger
  );
  const onStop = _registerForEvent(EVENT_EDIT_END, aTarget, aEmitter, aLogger);

  // combine
  return merge(onStart, onStop);
}
