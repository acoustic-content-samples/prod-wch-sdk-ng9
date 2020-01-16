import {
  AuthoringPlaceholder,
  KEY_METADATA,
  Locale,
  LocalizedText,
  LoggerService,
  RenderingContextProviderV2,
  RenderingContextV2,
  UrlConfig
} from '@acoustic-content-sdk/api';
import { DeliveryTypeResolver } from '@acoustic-content-sdk/component-api';
import {
  WchEditableEvent,
  WchInlineEditServiceV2
} from '@acoustic-content-sdk/edit-api';
import {
  WchEditablePlaceholderDirectiveInput,
  WchEditablePlaceholderDirectiveOutput
} from '@acoustic-content-sdk/ng-edit-api';
import {
  BiConsumer,
  Consumer,
  Generator,
  isString,
  localizedText,
  NOOP_LOGGER_SERVICE,
  opDistinctUntilChanged,
  opFalse,
  opFilterNotNil,
  opShareLast,
  opTrue,
  partialFirst,
  pluckLocale,
  pluckPath,
  pluckText,
  rxNext,
  rxPipe,
  rxSelectProperty
} from '@acoustic-content-sdk/utils';
import { EventEmitter, Renderer2 } from '@angular/core';
import { combineLatest, MonoTypeOperatorFunction, Observable, of } from 'rxjs';
import { map, switchMap, takeUntil } from 'rxjs/operators';

import { WchInternalEditService } from '../../services/wch.internal.edit.service';
import {
  phDefaultPlaceholderText,
  phFormat,
  phFormattedText,
  phPlainText,
  WCH_EDITABLE_TEXT_FORMAT,
  WchDefaultPlaceholderText
} from './../../utils/placeholder';
import { AbstractWchEditableDirective } from './abstract.editable.directive';

/* Copyright IBM Corp. 2017 */

const LOGGER = 'WchEditablePlaceholderDirective';

declare type TEXT_PROPERTY = 'innerHTML' | 'innerText';

const selectLocale = pluckPath<Locale>([KEY_METADATA, 'locale']);

/**
 * Assigns the text to a value
 *
 * @param aProp - the property to assign
 * @param aLocalizedText - the actual text
 * @param aElement - the native element
 * @param aRenderer - render used to assign the text
 */
function setText(
  aProp: TEXT_PROPERTY,
  aLocalizedText: LocalizedText,
  aElementRef: Generator<any>,
  aRenderer: Renderer2
) {
  // set the localization attribzute
  const el = aElementRef();
  // handle the empty case
  if (aLocalizedText) {
    // set the data
    aRenderer.setAttribute(el, 'lang', pluckLocale(aLocalizedText));
    aRenderer.setProperty(el, aProp, pluckText(aLocalizedText));
  } else {
    // remove the data
    aRenderer.removeAttribute(el, 'lang');
    aRenderer.setProperty(el, aProp, '');
  }
}

/**
 * Binds the element ref and the renderer
 *
 * @param aElement - the eleemnt reference
 * @param aRenderer - the renderer
 *
 * @returns function that only takes the property name and the
 */
const textSetter: (
  aElementRef: Generator<any>,
  aRenderer: Renderer2
) => BiConsumer<TEXT_PROPERTY, LocalizedText> = (
  aElementRef: Generator<any>,
  aRenderer: Renderer2
) => (aProp: TEXT_PROPERTY, aLocalizedText: LocalizedText) =>
  setText(aProp, aLocalizedText, aElementRef, aRenderer);

/**
 * Directive that allows an element of a layout to be editable. The directive assumes that the hosting component exposes
 * a rendering context via the 'onRenderingContext' member. It will then attach to the 'WchInlineEditService' to register
 * the element for edit operations.
 */
export class WchEditablePlaceholderDirective
  extends AbstractWchEditableDirective
  implements WchEditablePlaceholderDirectiveOutput {
  /**
   * The accessor expression
   */
  accessor$: Observable<string>;
  /**
   * Event that tells about the inline edit process
   */
  wchEditable$: EventEmitter<WchEditableEvent>;

  /**
   * Event exposing the current placeholder. Note that this fill only fire if the application
   * runs in preview mode. In live mode this is just the empty event.
   */
  placeholder$: Observable<AuthoringPlaceholder>;

  /**
   * Event exposing the current placeholder text. Note that this fill only fire if the application
   * runs in preview mode. In live mode this is just the empty event. If no placeholder
   * has been defined this returns the default placeholder as specified by the application
   */
  placeholderText$: Observable<LocalizedText>;

  /**
   * Generates the text of an element, potentially replaced by the placeholder
   */
  plainText$: Observable<LocalizedText>;

  /**
   * Generates the formatted text of an element, potentially replaced by the placeholder
   */
  formattedText$: Observable<LocalizedText>;

  /**
   * Generates the accessed data, decoded from the accessor expression
   */
  data$: Observable<any>;

  /**
   * Generates the type of the current element
   */
  typeId$: Observable<string>;

  /**
   * Checks if we should show or hide placeholders
   */
  showPlaceholder$: Observable<boolean>;

  constructor(
    aInput: WchEditablePlaceholderDirectiveInput,
    aElementRef: Generator<any>,
    aRenderer: Renderer2,
    aInternal: WchInternalEditService,
    aProvider: RenderingContextProviderV2,
    aTypeResolver: DeliveryTypeResolver,
    aDefaultPlaceholderText: WchDefaultPlaceholderText,
    aDebugPlaceholders: boolean,
    aDefaultLocale: string,
    aUrlConfig$: Observable<UrlConfig>,
    aInit$: Observable<any>,
    aDone$: Observable<any>,
    aInlineEditService: WchInlineEditServiceV2,
    aLoggerService: LoggerService
  ) {
    // default
    super(
      aInput,
      aElementRef,
      aInternal,
      aProvider,
      aTypeResolver,
      aDebugPlaceholders,
      aDefaultPlaceholderText,
      aDefaultLocale,
      aUrlConfig$,
      aInit$,
      aDone$,
      aInlineEditService,
      aLoggerService
    );

    // logging
    const logSvc = aLoggerService || NOOP_LOGGER_SERVICE;
    // check if inline edit is available
    const isPreviewMode$ = rxPipe(
      aUrlConfig$,
      rxSelectProperty('isPreviewMode')
    );

    // handle
    const that = this;
    const handle = that.handle;

    // some logging
    const logger = logSvc.get(LOGGER);
    const log: <T>(value: string) => MonoTypeOperatorFunction<T> = rxNext(
      logger,
      handle
    );

    // decode the input
    const { wchFormat$ } = aInput;

    // attach to lifecycle hooks
    const onInit$ = aInit$;
    const opUntilDestroyed: <T>(
      src: Observable<T>
    ) => Observable<T> = takeUntil(aDone$);

    // access the setter when the class is ready
    const setter$: Observable<BiConsumer<string, LocalizedText>> = rxPipe(
      onInit$,
      map(() => textSetter(aElementRef, aRenderer))
    );

    // setter for plain text
    const plainTextSetter$: Observable<Consumer<LocalizedText>> = rxPipe(
      setter$,
      map((setter) => partialFirst(setter, 'innerText'))
    );

    // setter for html text
    const htmlSetter$: Observable<Consumer<LocalizedText>> = rxPipe(
      setter$,
      map((setter) => partialFirst(setter, 'innerHTML'))
    );

    // availability of the rendering context, detected from the hosting component
    const renderingContext$: Observable<RenderingContextV2> =
      that.renderingContext$;

    /**
     * Extracts the locale from the rendering context
     */
    const locale$ = rxPipe(
      renderingContext$,
      map(selectLocale),
      opDistinctUntilChanged
    );

    const data$ = that.data$;

    /**
     * Fallback text without placeholders. Either this is the original
     * text with the locale as fallback of this is the 'undefined' object.
     */
    const noPhText$: Observable<LocalizedText> = rxPipe(
      data$,
      switchMap((data) =>
        isString(data)
          ? rxPipe(locale$, map(partialFirst(localizedText, data)))
          : of(undefined)
      ),
      log('noPhText')
    );

    /** The placeholder text set as the default. */
    const defaultPlaceholder$ = rxPipe(
      phDefaultPlaceholderText(aDefaultPlaceholderText, aDefaultLocale),
      log('defaultPlaceholder')
    );

    // only attach in preview mode
    const bPhDebug = aDebugPlaceholders;

    /**
     * Check if placeholder interception is enabled
     */
    const phEnabled$: Observable<boolean> = rxPipe(
      bPhDebug
        ? opTrue
        : rxPipe(
            isPreviewMode$,
            switchMap((isPreviewMode) =>
              isPreviewMode ? aInternal.inlineEdit$ : opFalse
            )
          ),
      log('onPhEnabled')
    );

    /**
     * Decodes the placeholder that belongs to the given accessor
     */
    const placeholder$ = that.placeholder$;

    /**
     * Returns the plain text for the item or the placeholder text
     */
    const plainText$ = phPlainText(
      locale$,
      data$,
      placeholder$,
      defaultPlaceholder$,
      aDefaultLocale
    );

    /**
     * Returns the formatted text for the item or the placeholder text
     */
    const formattedText$ = phFormattedText(
      locale$,
      data$,
      placeholder$,
      defaultPlaceholder$,
      aDefaultLocale
    );

    /**
     * Exposes the plain text with fallbacks, if placeholders are enabled
     */
    that.plainText$ = rxPipe(
      phEnabled$,
      switchMap((bEnabled) => (bEnabled ? plainText$ : noPhText$)),
      log('plainText'),
      opShareLast,
      opUntilDestroyed
    );

    /**
     * Exposes the formatted text with fallbacks, if placeholders are enabled
     */
    that.formattedText$ = rxPipe(
      phEnabled$,
      switchMap((bEnabled) => (bEnabled ? formattedText$ : noPhText$)),
      log('formattedText'),
      opShareLast,
      opUntilDestroyed
    );

    // handle the format
    const format$ = rxPipe(
      phFormat(wchFormat$, defaultPlaceholder$, that.typeId$),
      opFilterNotNil,
      opDistinctUntilChanged,
      log('format'),
      switchMap((format) =>
        format === WCH_EDITABLE_TEXT_FORMAT
          ? combineLatest([this.plainText$, plainTextSetter$])
          : combineLatest([this.formattedText$, htmlSetter$])
      ),
      map(([locText, setter]) => setter(locText)),
      opUntilDestroyed
    );

    // subscribe
    format$.subscribe();
  }
}
