import {
  AuthoringPlaceholder,
  AuthoringType,
  KEY_METADATA,
  KEY_TYPE_ID,
  Locale,
  LocalizedText,
  LoggerService,
  RenderingContextProviderV2,
  UrlConfig
} from '@acoustic-content-sdk/api';
import { DeliveryTypeResolver } from '@acoustic-content-sdk/component-api';
import { AccessorType } from '@acoustic-content-sdk/edit-api';
import { WchPlaceholder } from '@acoustic-content-sdk/ng-edit-api';
import {
  isString,
  localizedText,
  Maybe,
  NOOP_LOGGER_SERVICE,
  opDistinctUntilChanged,
  opFalse,
  opFilterNotNil,
  opShareLast,
  opTrue,
  partialFirst,
  pluckPath,
  pluckProperty,
  rxNext,
  rxPipe,
  rxSelectProperty,
  rxWchFromAuthoringTypeByAccessor,
  UNDEFINED$,
  wchDecodeAccessor,
  wchTypeFromAccessor
} from '@acoustic-content-sdk/utils';
import {
  combineLatest,
  identity,
  MonoTypeOperatorFunction,
  Observable,
  of,
  OperatorFunction,
  UnaryFunction
} from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import {
  phDefaultPlaceholderText,
  phFormattedText,
  phParseExpression,
  phPlaceholderFromAccessor,
  phPlaceholderText,
  phPlainText,
  phShowPlaceholder,
  WchDefaultPlaceholderText
} from '../../utils/placeholder';
import { WchInternalEditService } from '../wch.internal.edit.service';

const LOGGER = 'WchPlaceholderImpl';

const selectLocale = pluckPath<Locale>([KEY_METADATA, 'locale']);
const selectTypeId = pluckPath<string>([KEY_METADATA, KEY_TYPE_ID]);

export class WchPlaceholderImpl implements WchPlaceholder {
  /**
   * The accessor expression
   */
  accessor$: Observable<string>;

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
   * Generates the accessed data, decoded from the accessor expression
   */
  data$: Observable<any>;

  /**
   * Generates the text of an element, potentially replaced by the placeholder
   */
  plainText$: Observable<LocalizedText>;

  /**
   * Generates the formatted text of an element, potentially replaced by the placeholder
   */
  formattedText$: Observable<LocalizedText>;

  /**
   * Generates the type of the current element
   */
  typeId$: Observable<string>;

  /**
   * Checks if we should show or hide placeholders
   */
  showPlaceholder$: Observable<boolean>;

  constructor(
    aAccessor: AccessorType,
    aInternal: WchInternalEditService,
    aProvider: RenderingContextProviderV2,
    aTypeResolver: DeliveryTypeResolver,
    aDefaultPlaceholderText: WchDefaultPlaceholderText,
    aDebugPlaceholders: boolean,
    aDefaultLocale: string,
    aUrlConfig$: Observable<UrlConfig>,
    aLoggerService?: LoggerService
  ) {
    const that = this;
    // logger
    const logSvc = aLoggerService || NOOP_LOGGER_SERVICE;

    // check if inline edit is available
    const isPreviewMode$ = rxPipe(
      aUrlConfig$,
      rxSelectProperty('isPreviewMode')
    );

    // some logging
    const logger = logSvc.get(LOGGER);
    const log: <T>(value: string) => MonoTypeOperatorFunction<T> = rxNext(
      logger
    );

    // the accessor
    const accessor = wchDecodeAccessor(aProvider, aAccessor) || aAccessor;

    // availability of the rendering context, detected from the hosting component
    const renderingContext$ = aProvider.renderingContext$;

    const exprAccessor = phParseExpression(accessor);

    const data$ = rxPipe(
      renderingContext$,
      map(exprAccessor),
      opDistinctUntilChanged,
      log('data'),
      opShareLast
    );

    /**
     * Fallback to no placeholder
     */
    const noPh$: Observable<AuthoringPlaceholder> = UNDEFINED$;

    /**
     * Extracts the locale from the rendering context
     */
    const locale$ = rxPipe(
      renderingContext$,
      map(selectLocale),
      opDistinctUntilChanged
    );

    /**
     * Fallback text without placeholders
     */
    const noPhText$: Observable<LocalizedText> = rxPipe(
      data$,
      switchMap((data) =>
        isString(data)
          ? rxPipe(locale$, map(partialFirst(localizedText, data)))
          : UNDEFINED$
      ),
      log('noPhText')
    );

    const getDeliveryType = (aID: string) => aTypeResolver.getDeliveryType(aID);

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
      rootTypeId$,
      switchMap((typeId) =>
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

    // decode the element type from the rendering context
    const typeId$ = rxPipe(
      deliveryType$,
      map((type) => wchTypeFromAccessor(accessor, type)),
      opFilterNotNil,
      log('typeId'),
      opDistinctUntilChanged,
      opShareLast
    );

    /**
     * Check if placeholder interception is enabled
     */
    const phEnabled$: Observable<boolean> = rxPipe(
      aDebugPlaceholders
        ? opTrue
        : rxPipe(
            isPreviewMode$,
            switchMap((isPreviewMode) =>
              isPreviewMode ? aInternal.inlineEdit$ : opFalse
            )
          ),
      opDistinctUntilChanged,
      log('phEnabled'),
      opShareLast
    );

    /**
     * Decodes the placeholder that belongs to the given accessor
     */
    const placeholder$ = phPlaceholderFromAccessor(of(accessor), deliveryType$);

    /**
     * Exposes the placeholder information if it exsists and if inline
     * edit is enabled. Otherwise does not return anything.
     */
    const enabledPlaceholder$ = (that.placeholder$ = rxPipe(
      phEnabled$,
      switchMap((bEnabled) => (bEnabled ? placeholder$ : noPh$)),
      log('placeholder')
    ));

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

    // extract the default placeholder
    const defaultPlaceholder$ = rxPipe(
      phDefaultPlaceholderText(aDefaultPlaceholderText, aDefaultLocale),
      log('defaultPlaceholder')
    );

    /**
     * Expose the placeholder text
     */
    that.placeholderText$ = rxPipe(
      enabledPlaceholder$,
      switchMap((plc) =>
        phPlaceholderText(plc, aDefaultPlaceholderText, aDefaultLocale)
      ),
      log('onPlaceholderText')
    );

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
      log('plainText')
    );

    /**
     * Exposes the formatted text with fallbacks, if placeholders are enabled
     */
    that.formattedText$ = rxPipe(
      phEnabled$,
      switchMap((bEnabled) => (bEnabled ? formattedText$ : noPhText$)),
      log('formattedText')
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

    // make the data available in any case
    that.data$ = data$;
    that.typeId$ = typeId$;
    that.placeholderText$ = placeholderText$;
    that.showPlaceholder$ = showPlaceholder$;
    that.accessor$ = of(accessor);
  }
}

/** some type magic */
const _selectFromWchPlaceholder: <K extends keyof WchPlaceholder>(
  aKey: K
) => UnaryFunction<WchPlaceholder, WchPlaceholder[K]> = pluckProperty;

// selectors for each field for convenience
export const selectOnAccessor = _selectFromWchPlaceholder('accessor$');
export const selectOnPlaceholder = _selectFromWchPlaceholder('placeholder$');
export const selectOnPlaceholderText = _selectFromWchPlaceholder(
  'placeholderText$'
);
export const selectOnData = _selectFromWchPlaceholder('data$');
export const selectOnPlainText = _selectFromWchPlaceholder('plainText$');
export const selectOnFormattedText = _selectFromWchPlaceholder(
  'formattedText$'
);
export const selectOnShowPlaceholder = _selectFromWchPlaceholder(
  'showPlaceholder$'
);
export const selectOnTypeId = _selectFromWchPlaceholder('typeId$');

// switch operators for convenience
export const opOnAccessor: OperatorFunction<WchPlaceholder, string> = switchMap(
  selectOnAccessor
);
export const opOnPlaceholder: OperatorFunction<
  WchPlaceholder,
  AuthoringPlaceholder
> = switchMap(selectOnPlaceholder);
export const opOnPlaceholderText: OperatorFunction<
  WchPlaceholder,
  LocalizedText
> = switchMap(selectOnPlaceholderText);
export const opOnData: OperatorFunction<WchPlaceholder, any> = switchMap(
  selectOnData
);
export const opOnPlainText: OperatorFunction<
  WchPlaceholder,
  LocalizedText
> = switchMap(selectOnPlainText);
export const opOnFormattedText: OperatorFunction<
  WchPlaceholder,
  LocalizedText
> = switchMap(selectOnFormattedText);
export const opOnShowPlaceholder: OperatorFunction<
  WchPlaceholder,
  boolean
> = switchMap(selectOnShowPlaceholder);
export const opOnTypeId: OperatorFunction<WchPlaceholder, string> = switchMap(
  selectOnTypeId
);
