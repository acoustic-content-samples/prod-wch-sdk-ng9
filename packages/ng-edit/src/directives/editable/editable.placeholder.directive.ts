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
  AccessorType,
  WchEditableEvent,
  WchInlineEditServiceV2
} from '@acoustic-content-sdk/edit-api';
import {
  WCH_TOKEN_DELIVERY_TYPE_RESOLVER,
  WCH_TOKEN_LOGGER_SERVICE,
  WCH_TOKEN_RENDERING_CONTEXT_PROVIDER,
  WCH_TOKEN_URL_CONFIG
} from '@acoustic-content-sdk/ng-api';
import {
  WCH_TOKEN_DEBUG_PLACEHOLDERS,
  WCH_TOKEN_DEFAULT_PLACEHOLDER_TEXT,
  WCH_TOKEN_INLINE_EDIT_SERVICE,
  WchPlaceholder
} from '@acoustic-content-sdk/ng-edit-api';
import {
  BiConsumer,
  Consumer,
  createSetterOnSubject,
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
import {
  Directive,
  ElementRef,
  EventEmitter,
  Inject,
  Input,
  LOCALE_ID,
  OnDestroy,
  OnInit,
  Optional,
  Output,
  Renderer2,
  ViewContainerRef
} from '@angular/core';
import {
  BehaviorSubject,
  combineLatest,
  MonoTypeOperatorFunction,
  Observable,
  of
} from 'rxjs';
import { map, switchMap, takeUntil } from 'rxjs/operators';

import { WchInternalEditService } from '../../services/wch.internal.edit.service';
import {
  phDefaultPlaceholderText,
  phFormat,
  phFormattedText,
  phPlainText,
  WCH_EDITABLE_TEXT_FORMAT,
  WchDefaultPlaceholderText,
  WchEditableFormat
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
function _setText(
  aProp: TEXT_PROPERTY,
  aLocalizedText: LocalizedText,
  aElement: ElementRef,
  aRenderer: Renderer2
) {
  // set the localization attribzute
  const el = aElement.nativeElement;
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
const _textSetter: (
  aElement: ElementRef,
  aRenderer: Renderer2
) => BiConsumer<TEXT_PROPERTY, LocalizedText> = (
  aElement: any,
  aRenderer: Renderer2
) => (aProp: TEXT_PROPERTY, aLocalizedText: LocalizedText) =>
  _setText(aProp, aLocalizedText, aElement, aRenderer);

/**
 * Directive that allows an element of a layout to be editable. The directive assumes that the hosting component exposes
 * a rendering context via the 'onRenderingContext' member. It will then attach to the 'WchInlineEditService' to register
 * the element for edit operations.
 */
@Directive({
  selector: ':not(wch-placeholder)[wchEditable][wchFormat]',
  exportAs: 'wchEditable'
})
export class WchEditablePlaceholderDirective
  extends AbstractWchEditableDirective
  implements OnInit, OnDestroy, WchPlaceholder {
  /**
   * Main input value for the directive. It denotes the element that is being edited.
   */
  @Input()
  wchEditable: AccessorType;

  /**
   * If specified, the directive will update the textual content of the attached node with
   * either the value of the edited property or with the configured placeholder, if there is any. The
   * format flag describes if the value is considered to be plain text ('text'), formatted text ('html') or
   * if the type is to be discovered automatically.
   *
   * If missing, the property has to be updated by the designer of the template, explicitly.
   */
  @Input()
  wchFormat: WchEditableFormat;

  /**
   * Event that tells about the inline edit process
   */
  @Output()
  wchEditable$: EventEmitter<WchEditableEvent>;

  /**
   * Event exposing the current placeholder. Note that this fill only fire if the application
   * runs in preview mode. In live mode this is just the empty event.
   */
  @Output()
  placeholder$: Observable<AuthoringPlaceholder>;

  /**
   * Event exposing the current placeholder text. Note that this fill only fire if the application
   * runs in preview mode. In live mode this is just the empty event. If no placeholder
   * has been defined this returns the default placeholder as specified by the application
   */
  @Output()
  placeholderText$: Observable<LocalizedText>;

  /**
   * Generates the text of an element, potentially replaced by the placeholder
   */
  @Output()
  plainText$: Observable<LocalizedText>;

  /**
   * Generates the formatted text of an element, potentially replaced by the placeholder
   */
  @Output()
  formattedText$: Observable<LocalizedText>;

  /**
   * Generates the accessed data, decoded from the accessor expression
   */
  @Output()
  data$: Observable<any>;

  /**
   * Generates the type of the current element
   */
  @Output()
  typeId$: Observable<string>;

  /**
   * Checks if we should show or hide placeholders
   */
  @Output()
  showPlaceholder$: Observable<boolean>;

  constructor(
    vcRef: ViewContainerRef,
    aElementRef: ElementRef,
    aRenderer: Renderer2,
    aInternal: WchInternalEditService,
    @Inject(WCH_TOKEN_RENDERING_CONTEXT_PROVIDER)
    aProvider: RenderingContextProviderV2,
    @Inject(WCH_TOKEN_DELIVERY_TYPE_RESOLVER)
    aTypeResolver: DeliveryTypeResolver,
    @Inject(WCH_TOKEN_DEFAULT_PLACEHOLDER_TEXT)
    aDefaultPlaceholderText: WchDefaultPlaceholderText,
    @Inject(WCH_TOKEN_DEBUG_PLACEHOLDERS) aDebugPlaceholders: boolean,
    @Inject(LOCALE_ID) aDefaultLocale: string,
    @Inject(WCH_TOKEN_URL_CONFIG)
    aUrlConfig$: Observable<UrlConfig>,
    @Optional()
    @Inject(WCH_TOKEN_INLINE_EDIT_SERVICE)
    aInlineEditService: WchInlineEditServiceV2,
    @Optional()
    @Inject(WCH_TOKEN_LOGGER_SERVICE)
    aLoggerService: LoggerService
  ) {
    // default
    super(
      vcRef,
      aInternal,
      aProvider,
      aTypeResolver,
      aDebugPlaceholders,
      aDefaultPlaceholderText,
      aDefaultLocale,
      aUrlConfig$,
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

    // the accessor definitions
    const onWchFormat = new BehaviorSubject<WchEditableFormat>(null);

    Object.defineProperties(that, {
      wchFormat: createSetterOnSubject(onWchFormat)
    });

    // attach to lifecycle hooks
    const onInit$ = that.onInit$;
    const opUntilDestroyed: <T>(
      src: Observable<T>
    ) => Observable<T> = takeUntil(that.onDestroy$);

    // access the setter when the class is ready
    const setter$: Observable<BiConsumer<string, LocalizedText>> = rxPipe(
      onInit$,
      map(() => _textSetter(aElementRef, aRenderer))
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
      phFormat(onWchFormat, defaultPlaceholder$, that.typeId$),
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

  // this seems to be required in order to have AOT recognize the method
  ngOnInit() {
    super.ngOnInit();
  }

  // this seems to be required in order to have AOT recognize the method
  ngOnDestroy() {
    super.ngOnDestroy();
  }
}
