import {
  Logger,
  LoggerService,
  RenderingContextV2
} from '@acoustic-content-sdk/api';
import {
  AccessorType,
  Disposable,
  EventTargetLike,
  EVENT_EDIT_END,
  EVENT_EDIT_START,
  WchEditableEvent,
  WchInlineEditServiceV2
} from '@acoustic-content-sdk/edit-api';
import {
  forEach,
  isNil,
  NOOP_LOGGER_SERVICE,
  parsePath,
  pluckPath,
  rxNext,
  rxPipe,
  safeUnsubscribe,
  toArray
} from '@acoustic-content-sdk/utils';
import {
  asyncScheduler,
  EMPTY,
  fromEvent,
  merge,
  MonoTypeOperatorFunction,
  Observable,
  Subject,
  Subscription
} from 'rxjs';
import { catchError, map, observeOn, switchMap, tap } from 'rxjs/operators';
import { ReduxRootStore } from '@acoustic-content-sdk/redux-store';

// plucks the dataset from an element
const pluckDataId = pluckPath<string>(parsePath('dataset.contentItemId'));
const pluckAccessor = pluckPath<string>(parsePath('dataset.wchEditable'));

/**
 * Mapped element data, will be accessor string and subscription
 */
declare type ElementData = [AccessorType, Subscription];

function createElementData(
  aAccessor: AccessorType,
  aSubsciption: Subscription
): ElementData {
  return [aAccessor, aSubsciption];
}

/**
 * Replaces the markup and returns the new set of matching elements
 *
 * @param aRoot - the root element
 * @param aMarkup - the markup string
 *
 * @returns the editable elements
 */
function getElements(aRoot: HTMLElement, aLogger: Logger): HTMLElement[] {
  // TODO make the attribute names configurable
  // return the matching elements
  const elements = toArray(
    aRoot.querySelectorAll<HTMLElement>(
      '[data-content-item-id][data-wch-editable]'
    )
  );
  // log this
  aLogger.info(LOGGER, 'elements', elements);
  // ok
  return elements;
}

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
    catchError((error) => EMPTY)
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
function createWchEditableEvents(
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

function createWchInlineEditRegistrationService(
  aEditService: WchInlineEditServiceV2,
  aLogger: Logger
) {
  // the actual registration callback
  function _registerPreview(
    aCurrentElement: HTMLElement,
    aAccessor: string,
    aRenderingContext: Observable<RenderingContextV2>
  ): Observable<WchEditableEvent> {
    /**
     * Delayed version of the context. We use this as the rendering context updates to the
     * inline edit code, because otherwise it can happen that inline edit receives a
     * rendering context update before an element has been removed. By using the asyncScheduler
     * the rendering context updates will be dispatched in the subsequent rendering cycle, so the element
     * has been removed and the subscription has been canceled already.
     */
    const asyncRenderingContext$ = rxPipe(
      aRenderingContext,
      observeOn(asyncScheduler)
    );

    // component
    const cmp$ = aEditService.registerComponent(
      aCurrentElement,
      aAccessor,
      asyncRenderingContext$
    );
    // register to the events sent by the component
    return rxPipe(
      cmp$,
      switchMap((emitter) =>
        createWchEditableEvents(aCurrentElement, emitter, aLogger)
      )
    );
  }

  return _registerPreview;
}

export interface InlineEditHost extends Disposable {
  refresh: () => any;
  events$: Observable<WchEditableEvent>;
}

const LOGGER = 'createInlineEditHost';

export function createInlineEditHost(
  aRootElement: HTMLElement,
  aStore: ReduxRootStore,
  aEditService: WchInlineEditServiceV2,
  aLogSvc: LoggerService = NOOP_LOGGER_SERVICE
): InlineEditHost {
  // construct the logger
  const logger = aLogSvc.get(LOGGER);
  // access the logger
  const log: <T>(...aArgs: any[]) => MonoTypeOperatorFunction<T> = rxNext(
    logger
  );

  const register = createWchInlineEditRegistrationService(aEditService, logger);

  // fix here
  const getRenderingContext = (aId: string) => EMPTY;

  function registerElement(
    aCurrentElement: HTMLElement,
    aAccessor: string,
    aRenderingContext: Observable<RenderingContextV2>
  ): Observable<WchEditableEvent> {
    // log this
    logger.info('registerElement', aAccessor, aCurrentElement);
    // dispatch
    return register(aCurrentElement, aAccessor, aRenderingContext);
  }

  function unregisterElement(aData: ElementData, aCurrentElement: HTMLElement) {
    // decompose
    const [acc, sub] = aData;
    // log this
    logger.info('de-registerElement', acc, aCurrentElement);
    // unsubscribe
    safeUnsubscribe(sub);
  }

  const elements = new Map<HTMLElement, ElementData>();
  const events = new Subject<WchEditableEvent>();

  function refresh() {
    // refresh the elements
    logger.info('refresh');
    // get the new elements
    const htmlElements = getElements(aRootElement, logger);
    // split the elements into new, existing and deleted
    const delElements = new Map<HTMLElement, ElementData>(elements);
    // split
    forEach(htmlElements, (el) => {
      // get the accessor
      const acc = pluckAccessor(el);
      // check if we have the element
      const data = delElements.get(el);
      // check if the element is new
      if (isNil(data)) {
        // subscribe
        const sub = registerElement(
          el,
          acc,
          getRenderingContext(pluckDataId(el))
        ).subscribe(events);
        // this is new, register it
        elements.set(el, createElementData(acc, sub));
      } else {
        // remove the elements
        delElements.delete(el);
        // decompose
        const [oldAcc] = data;
        if (acc !== oldAcc) {
          // unregister
          unregisterElement(data, el);
          // subscribe
          const sub = registerElement(
            el,
            acc,
            getRenderingContext(pluckDataId(el))
          ).subscribe(events);
          // this is new, register it
          elements.set(el, createElementData(acc, sub));
        }
      }
    });
    // unregister the deleted elements
    delElements.forEach((sub, el) => {
      // unsubscribe and remove from the set
      unregisterElement(sub, el);
      elements.delete(el);
    });
  }

  // undo the subscription
  function dispose() {
    elements.forEach(unregisterElement);
  }

  const events$ = events.asObservable();

  return {
    refresh,
    events$,
    dispose
  };
}
