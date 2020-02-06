import {
  Logger,
  LoggerService,
  RenderingContextV2,
  UrlConfig
} from '@acoustic-content-sdk/api';
import {
  AccessorType,
  EVENT_INLINE_EDIT_END,
  EVENT_INLINE_EDIT_SET_SELECTED_CELL,
  EVENT_INLINE_EDIT_START,
  EventTargetLike,
  WchInlineEditEvent,
  WchInlineEditProviderV2,
  WchInlineEditRegistrationResult,
  WchInlineEditRegistrationV2,
  WchInlineEditServiceV2
} from '@acoustic-content-sdk/edit-api';
import {
  Consumer,
  hashRandomIdentifier,
  isFunction,
  isNotNil,
  NOOP_LOGGER_SERVICE,
  opShareLast,
  rxNext,
  rxPipe,
  rxSelectProperty
} from '@acoustic-content-sdk/utils';
import {
  EMPTY,
  fromEvent,
  merge,
  MonoTypeOperatorFunction,
  Observable,
  Observer,
  of,
  Subject,
  Unsubscribable
} from 'rxjs';
import {
  catchError,
  filter,
  map,
  switchMap,
  takeUntil,
  tap
} from 'rxjs/operators';

import { EMPTY_WCH_INLINE_EDIT_SERVICE } from './empty.inlint.edit.service';
import { getInlineEditSelection } from './inline.edit.selection';

// need this as a workaround
/* Copyright IBM Corp. 2017 */
const LOGGER = 'AbstractWchInlineEditService';

/**
 * Constructs the event
 *
 * @param type - the event type
 * @param data - the event data
 *
 * @returns the event object
 */
const createWchInlineEditEvent = (
  type: string,
  data: any
): WchInlineEditEvent => ({
  type,
  data
});

/**
 * Registers for an event
 *
 * @param aType - the event type
 * @param aEmitter - the event emitter
 *
 * @returns the sequence of events
 */
function registerForEvent(
  aType: string,
  aEmitter: EventTargetLike,
  aLogger: Logger
): Observable<WchInlineEditEvent> {
  // registers for the event and produces the desired wrapper
  return rxPipe(
    fromEvent(aEmitter, aType),
    map((data) => createWchInlineEditEvent(aType, data)),
    tap(
      (event) => aLogger.info('Event', event),
      (error) => aLogger.warn('Registration error.', aEmitter, error)
    ),
    catchError((error) => EMPTY)
  );
}

/**
 * Constructs the registration for a native element
 *
 * @param aRegisterMethod - registration callback method
 * @param nativeElement - the native element
 * @param accessor - accessor string
 * @param renderingContext$ - rendering context
 *
 * @returns observable of the registration result in form of an event emitter
 */
function createRegistration(
  aRegisterMethod: WchInlineEditRegistrationV2,
  nativeElement: any,
  accessor: AccessorType,
  renderingContext$: Observable<RenderingContextV2>,
  logger: Logger
): Observable<EventTargetLike> {
  // register
  return Observable.create((observer: Observer<EventTargetLike>) => {
    // log this
    const id = hashRandomIdentifier();
    logger.info('Registering ', accessor, 'with', id);
    // create the registration
    const regResult: WchInlineEditRegistrationResult = aRegisterMethod(
      nativeElement,
      accessor,
      renderingContext$
    );
    // fix the object in case ...
    const el =
      regResult ||
      FALLBACK_REGISTRATION(nativeElement, accessor, renderingContext$);
    // communicate this
    observer.next(el as EventTargetLike);
    // the disposer
    const dispose = (el as any).dispose;
    // the tear down logic
    return () => {
      // end the stream
      observer.complete();
      // dispose the original registration
      if (isFunction(dispose)) {
        dispose.apply(el);
      }
      // done
      logger.info('Deregistering ', accessor, 'with', id);
    };
  });
}

const FALLBACK_REGISTRATION = EMPTY_WCH_INLINE_EDIT_SERVICE.registerComponent;
const FALLBACK_FROM_EVENT = EMPTY_WCH_INLINE_EDIT_SERVICE.fromEvent;

const createSelectionEvent = (data: string): WchInlineEditEvent =>
  createWchInlineEditEvent(EVENT_INLINE_EDIT_SET_SELECTED_CELL, data);

/**
 * Implementation of the `WchInlineEditServiceV2 that loads the inline edit library and allows
 * to attach to that library.
 */
export class AbstractWchInlineEditService
  implements WchInlineEditServiceV2, Unsubscribable {
  fromEvent: <T>(aName: string) => Observable<T>;

  registerComponent: (
    nativeElement: any,
    accessor: AccessorType,
    renderingContext$: Observable<RenderingContextV2>
  ) => Observable<EventTargetLike>;

  protected readonly done$: Subject<any>;

  protected constructor(
    aEventConsumer: Consumer<WchInlineEditEvent>,
    aProvider$: Observable<WchInlineEditProviderV2>,
    aUrlConfig$: Observable<UrlConfig>,
    aDocument?: any,
    aLogSvc?: LoggerService
  ) {
    // pointers
    const that = this;

    // logger
    const logSvc = aLogSvc || NOOP_LOGGER_SERVICE;

    const done$ = (this.done$ = new Subject());

    /**
     *  if we have a document, register for changes
     */
    const inlineEditSelection$: Observable<string> = isNotNil(aDocument)
      ? getInlineEditSelection(aDocument, logSvc)
      : EMPTY;

    const inlineEditSelectionEvent$: Observable<WchInlineEditEvent> = rxPipe(
      inlineEditSelection$,
      map(createSelectionEvent)
    );

    // check if we run in debug mode
    const isPreviewMode$ = rxPipe(
      aUrlConfig$,
      rxSelectProperty('isPreviewMode')
    );

    const logger = logSvc.get(LOGGER);

    const log: <T>(value: string) => MonoTypeOperatorFunction<T> = rxNext(
      logger
    );

    // load the module, make sure it does not pollute the global namespace
    const module$: Observable<WchInlineEditProviderV2> = rxPipe(
      aProvider$,
      log('onModuleLoaded'),
      takeUntil(done$),
      opShareLast
    );

    // extract the register method
    const registerMethod$: Observable<WchInlineEditRegistrationV2> = rxPipe(
      module$,
      rxSelectProperty('register'),
      catchError((err) => of(FALLBACK_REGISTRATION)),
      filter(isFunction),
      map((fct) => fct as WchInlineEditRegistrationV2),
      log('onRegisterMethod'),
      opShareLast
    );

    // extract the global event emitter
    const eventEmitter$ = rxPipe(
      module$,
      map((module) => (module as any) as EventTargetLike)
    );

    /**
     * Our actual callback
     *
     * @param nativeElement - the native element to attach to
     * @param accessor - the accessor
     * @param renderingContext$ - our rendering context
     *
     * @returns observable of the event producer
     */
    function internalRegisterComponent(
      nativeElement: any,
      accessor: AccessorType,
      renderingContext$: Observable<RenderingContextV2>
    ): Observable<EventTargetLike> {
      // construct the observable
      const register$ = rxPipe(
        registerMethod$,
        switchMap((method) =>
          createRegistration(
            method,
            nativeElement,
            accessor,
            renderingContext$,
            logger
          )
        ),
        catchError((err: any) => {
          // log this error
          logger.error(LOGGER, err);
          // fallback with an empty handler
          return FALLBACK_REGISTRATION(
            nativeElement,
            accessor,
            renderingContext$
          );
        })
      );
      // dispatch
      return rxPipe(
        isPreviewMode$,
        switchMap((isPreviewMode) => (isPreviewMode ? register$ : EMPTY)),
        takeUntil(done$)
      );
    }

    /**
     * Registers an event with the library
     *
     * @param aName - name of the event
     */
    function internalFromEvent<T>(aName: string): Observable<T> {
      // attach to the event from the original source
      const fromEvent$ =
        aName === EVENT_INLINE_EDIT_SET_SELECTED_CELL
          ? inlineEditSelection$
          : rxPipe(
              eventEmitter$,
              switchMap((emitter) => fromEvent<any>(emitter, aName)),
              catchError((err) => FALLBACK_FROM_EVENT(aName))
            );
      // only in debug mode
      return rxPipe(
        isPreviewMode$,
        switchMap((isPreviewMode) => (isPreviewMode ? fromEvent$ : EMPTY)),
        takeUntil(done$)
      );
    }

    // register
    const inlineEditStartEvent$ = rxPipe(
      eventEmitter$,
      switchMap((emitter) =>
        registerForEvent(EVENT_INLINE_EDIT_START, emitter, logger)
      )
    );
    const inlineEditEndEvent$ = rxPipe(
      eventEmitter$,
      switchMap((emitter) =>
        registerForEvent(EVENT_INLINE_EDIT_END, emitter, logger)
      )
    );
    // merge and register
    const events$ = merge(
      inlineEditStartEvent$,
      inlineEditEndEvent$,
      inlineEditSelectionEvent$
    );
    // register
    rxPipe(
      isPreviewMode$,
      switchMap((isPreviewMode) => (isPreviewMode ? events$ : EMPTY)),
      takeUntil(done$)
    ).subscribe(aEventConsumer);

    // register the global handlers
    that.registerComponent = internalRegisterComponent;
    that.fromEvent = internalFromEvent;
  }

  unsubscribe() {
    // send the done trigger
    this.done$.next();
  }
}
