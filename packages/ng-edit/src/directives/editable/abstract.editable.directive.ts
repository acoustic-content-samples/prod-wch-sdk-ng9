import {
  AuthoringElement,
  AuthoringPlaceholder,
  AuthoringType,
  KEY_METADATA,
  KEY_TYPE_ID,
  LocalizedText,
  LoggerService,
  RenderingContextProviderV2,
  RenderingContextV2,
  UrlConfig
} from '@acoustic-content-sdk/api';
import { DeliveryTypeResolver } from '@acoustic-content-sdk/component-api';
import { EMPTY_WCH_INLINE_EDIT_SERVICE } from '@acoustic-content-sdk/component-edit';
import {
  AccessorType,
  WchEditableEvent,
  WchInlineEditServiceV2
} from '@acoustic-content-sdk/edit-api';
import {
  Generator,
  hashRandomIdentifier,
  identity,
  isString,
  Maybe,
  boxLoggerService,
  opDistinctUntilChanged,
  opFalse,
  opFilterNotNil,
  opShareLast,
  opTrue,
  pluckPath,
  pluckProperty,
  rxNext,
  rxPipe,
  rxSelectProperty,
  rxWchFromAuthoringTypeByAccessor,
  UNDEFINED$,
  wchTypeFromAccessor
} from '@acoustic-content-sdk/utils';
import { EventEmitter } from '@angular/core';
import {
  asyncScheduler,
  combineLatest,
  EMPTY,
  MonoTypeOperatorFunction,
  Observable,
  of,
  pipe,
  UnaryFunction
} from 'rxjs';
import {
  filter,
  map,
  observeOn,
  switchMap,
  takeUntil,
  tap
} from 'rxjs/operators';

import { WchInternalEditService } from '../../services/wch.internal.edit.service';
import { createWchEditableEvents } from '../../utils/events';
import { assertValue } from './../../utils/assert';
import {
  phParseExpression,
  phPlaceholderText,
  phShowPlaceholder,
  WchDefaultPlaceholderText
} from './../../utils/placeholder';

/* Copyright IBM Corp. 2017 */

const LOGGER = 'AbstractWchEditableDirective';

const selectTypeId = pluckPath<string>([KEY_METADATA, KEY_TYPE_ID]);

/**
 * Returns the placeholder from a element
 *
 * @param aElement - the element
 *
 * @returns the placeholder
 */
const selectPlaceholderFromElement: UnaryFunction<
  AuthoringElement,
  AuthoringPlaceholder
> = pluckProperty('placeholder');

// this accessor represents the component
const COMPONENT_ACCESSOR: AccessorType = null;

// the accessor if the root level component is edited
const ON_COMPONENT_ACCESSOR = of(COMPONENT_ACCESSOR);

export interface AbstractWchEditableDirectiveInput {
  /**
   * Main input value for the directive. It denotes the element that is being edited.
   */
  wchEditable$: Observable<AccessorType>;
}

export abstract class AbstractWchEditableDirective
  implements RenderingContextProviderV2 {
  /**
   * Event that tells about the inline edit process
   */
  wchEditable$ = new EventEmitter<WchEditableEvent>();

  /**
   * Event exposing the current placeholder. If no placeholder exists or placeholders are disabled, this
   * will return 'undefined'.
   */
  placeholder$: Observable<AuthoringPlaceholder>;

  /**
   * Event exposing the current placeholder text. If placeholders are disabled, this will return 'undefined'. If no placeholder
   * has been defined this returns the default placeholder as specified by the application, else 'undefined'.
   */
  placeholderText$: Observable<LocalizedText>;

  /**
   * Generates the accessed data, decoded from the accessor expression
   */
  data$: Observable<any>;

  /**
   * Exposes the decoded accessor string into the renderign context
   */
  accessor$: Observable<string>;

  /**
   * Exposes the rendering context
   */
  renderingContext$: Observable<RenderingContextV2>;

  /**
   * Checks if we should show or hide placeholders
   */
  showPlaceholder$: Observable<boolean>;

  /**
   * Generates the type of the current element
   */
  typeId$: Observable<string>;

  /**
   * Internal handle used for debugging output
   */
  protected handle: string;

  /**
   * accessor to the authoring type
   */
  protected authoringType$: Observable<AuthoringType>;

  protected constructor(
    aInput: AbstractWchEditableDirectiveInput,
    aElementRef: Generator<any>,
    aInternal: WchInternalEditService,
    aProvider: RenderingContextProviderV2,
    aTypeResolver: DeliveryTypeResolver,
    aDebugPlaceholders: boolean,
    aDefaultPlaceholderText: WchDefaultPlaceholderText,
    aDefaultLocale: string,
    aUrlConfig$: Observable<UrlConfig>,
    aInit$: Observable<any>,
    aDone$: Observable<any>,
    aInlineEditService?: WchInlineEditServiceV2,
    aLogSvc?: LoggerService
  ) {
    // logging
    const logSvc = boxLoggerService(aLogSvc);

    const inlineEditService =
      aInlineEditService || EMPTY_WCH_INLINE_EDIT_SERVICE;

    // check if inline edit is available
    const isPreviewMode$ = rxPipe(
      aUrlConfig$,
      rxSelectProperty('isPreviewMode')
    );

    const getDeliveryType = (aID: string) => aTypeResolver.getDeliveryType(aID);

    // handle
    const that = this;
    const handle = (that.handle = hashRandomIdentifier());

    // some logging
    const logger = logSvc.get(LOGGER);
    const log: <T>(value: string) => MonoTypeOperatorFunction<T> = rxNext(
      logger,
      handle
    );

    // input
    const { wchEditable$ } = aInput;

    // attach to lifecycle hooks
    const init$ = aInit$;
    const opUntilDestroyed: <T>(
      src: Observable<T>
    ) => Observable<T> = takeUntil(aDone$);

    /**
     * Share emission until destroyed
     */
    const opSharedUntilDestroyed: <T>(
      src: Observable<T>
    ) => Observable<T> = pipe(opShareLast, opUntilDestroyed);

    // the accessor
    const accessor$: Observable<AccessorType> = rxPipe(
      wchEditable$,
      opDistinctUntilChanged,
      switchMap((input) =>
        input === null
          ? ON_COMPONENT_ACCESSOR
          : rxPipe(
              of(input),
              tap(
                assertValue(isString, (acc) =>
                  logger.warn(
                    'Accessor expression must be a string.',
                    handle,
                    typeof acc
                  )
                )
              ),
              filter(isString),
              opDistinctUntilChanged,
              log('accessor')
            )
      ),
      opShareLast
    );

    // availability of the rendering context, detected from the hosting component
    const renderingContext$: Observable<RenderingContextV2> =
      aProvider.renderingContext$;

    const exprAccessor$ = rxPipe(
      accessor$,
      map(phParseExpression),
      opShareLast
    );

    const data$ = rxPipe(
      combineLatest([exprAccessor$, renderingContext$]),
      map(([acc, rc]) => acc(rc)),
      opDistinctUntilChanged,
      log('data'),
      opShareLast
    );

    /**
     * Type id
     */
    const rootTypeId$ = rxPipe(
      renderingContext$,
      map(selectTypeId),
      opDistinctUntilChanged
    );

    /**
     * Decode the type from the accessor
     */
    const authElement$ = rxPipe(
      combineLatest([accessor$, rootTypeId$]),
      switchMap(([accessor, typeId]) =>
        rxWchFromAuthoringTypeByAccessor(
          accessor,
          typeId,
          identity,
          getDeliveryType
        )
      ),
      opDistinctUntilChanged,
      opShareLast
    );

    /**
     * Decodes the authoring type from the rendering context. It
     * extracts the typeId and then loads the authoring type record.
     */
    const deliveryType$: Observable<Maybe<AuthoringType>> = rxPipe(
      renderingContext$,
      map(selectTypeId),
      opDistinctUntilChanged,
      switchMap(getDeliveryType),
      log('deliveryType'),
      opShareLast
    );

    /**
     * Fallback to no placeholder
     */
    const noPh$: Observable<Maybe<AuthoringPlaceholder>> = UNDEFINED$;

    /**
     * Decodes the placeholder that belongs to the given accessor
     */
    const placeholder$: Observable<Maybe<AuthoringPlaceholder>> = rxPipe(
      authElement$,
      map(selectPlaceholderFromElement)
    );

    // test if placeholder debugging is enabled
    const bPhDebug = aDebugPlaceholders;

    /**
     * Check if placeholder interception is enabled
     */
    const phEnabled$: Observable<boolean> = rxPipe(
      bPhDebug ? opTrue : aInternal.inlineEdit$,
      log('phEnabled')
    );

    // decode the element type from the rendering context
    const typeId$ = rxPipe(
      combineLatest(deliveryType$, accessor$),
      map(([type, accessor]) => wchTypeFromAccessor(accessor, type)),
      opFilterNotNil,
      log('typeId'),
      opDistinctUntilChanged,
      opShareLast
    );

    /**
     * Test if we would show placeholders
     */
    const showPlaceholder$ = rxPipe(
      phEnabled$,
      switchMap((bEnabled) =>
        bEnabled
          ? phShowPlaceholder(data$, typeId$, that.placeholder$)
          : opFalse
      ),
      log('showPlaceholder'),
      opDistinctUntilChanged
    );

    /**
     * Exposes the placeholder information if it exists and if inline
     * edit is enabled. Otherwise returns 'undefined'.
     */
    const enabledPlaceholder$ = rxPipe(
      phEnabled$,
      switchMap((bEnabled) => (bEnabled ? placeholder$ : noPh$)),
      log('placeholder')
    );

    /**
     * Expose the placeholder text
     */
    const placeholderText$ = rxPipe(
      combineLatest([enabledPlaceholder$, phEnabled$]),
      switchMap(([plc, bEnabled]) =>
        bEnabled
          ? phPlaceholderText(plc, aDefaultPlaceholderText, aDefaultLocale)
          : UNDEFINED$
      ),
      log('placeholderText')
    );

    // exposes the current element
    const currentElement$ = rxPipe(
      init$,
      map(aElementRef),
      tap(
        assertValue(Boolean, () =>
          logger.warn('Native element must be defined.', handle)
        )
      ),
      opFilterNotNil,
      opDistinctUntilChanged,
      log<HTMLElement>('currentElement')
    );

    /**
     * Delayed version of the context. We use this as the rendering context updates to the
     * inline edit code, because otherwise it can happen that inline edit receives a
     * rendering context update before an element has been removed. By using the asyncScheduler
     * the rendering context updates will be dispatched in the subsequent rendering cycle, so the element
     * has been removed and the subscription has been canceled already.
     */
    const asyncRenderingContext$ = rxPipe(
      renderingContext$,
      observeOn(asyncScheduler)
    );

    // register to the events sent by the component
    const events$: Observable<WchEditableEvent> = rxPipe(
      combineLatest([currentElement$, accessor$]),
      switchMap(([el, acc]) =>
        rxPipe(
          inlineEditService.registerComponent(el, acc, asyncRenderingContext$),
          switchMap((emitter) => createWchEditableEvents(el, emitter, logger))
        )
      )
    );

    // expose the events
    rxPipe(
      // only in preview
      isPreviewMode$,
      switchMap((isPreviewMode) => (isPreviewMode ? events$ : EMPTY)),
      // update the global flag
      tap<WchEditableEvent>(aInternal.editableConsumer),
      // cancel all subscriptions when done
      opUntilDestroyed
    ) // expose the events on our output
      .subscribe(that.wchEditable$);

    // make the data available in any case
    that.data$ = rxPipe(data$, opSharedUntilDestroyed);
    that.placeholder$ = rxPipe(enabledPlaceholder$, opSharedUntilDestroyed);
    that.placeholderText$ = rxPipe(placeholderText$, opSharedUntilDestroyed);
    that.accessor$ = rxPipe(accessor$, opSharedUntilDestroyed);
    that.renderingContext$ = rxPipe(renderingContext$, opSharedUntilDestroyed);
    that.showPlaceholder$ = rxPipe(showPlaceholder$, opSharedUntilDestroyed);
    that.typeId$ = rxPipe(typeId$, opSharedUntilDestroyed);
    that.authoringType$ = rxPipe(deliveryType$, opSharedUntilDestroyed);
  }
}
