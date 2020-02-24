import {
  AuthoringPlaceholder,
  AuthoringType,
  ELEMENT_TYPE_FORMATTED_TEXT,
  Locale,
  LocalizedText
} from '@acoustic-content-sdk/api';
import { AccessorType } from '@acoustic-content-sdk/edit-api';
import { WchEditableFormat } from '@acoustic-content-sdk/ng-edit-api';
import {
  BiFunction,
  createCache,
  escapeHtml,
  fromObservableOrT,
  identity,
  isLocalizedText,
  isNil,
  isNotNil,
  isString,
  isUndefined,
  isValueOf,
  localizedText,
  Maybe,
  ObservableOrT,
  opDeepDistinctUntilChanged,
  opFalse,
  opFilterNotNil,
  opShareLast,
  partialSecond,
  pluckLocale,
  pluckText,
  rxPipe,
  wchPlaceholderFromAccessor,
  wchSelectAccessor,
  wchTypeFromAccessor
} from '@acoustic-content-sdk/utils';
import { combineLatest, Observable, of, UnaryFunction } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

/**
 * type for placeholder
 */
export declare type WchDefaultPlaceholderText = ObservableOrT<
  string | LocalizedText
>;

export const ACOUSTIC_EDITABLE_TEXT_FORMAT = 'text';
export const ACOUSTIC_EDITABLE_AUTO_FORMAT = 'auto';
export const ACOUSTIC_EDITABLE_HTML_FORMAT = 'html';

const UNDEFINED = undefined;

/**
 * Implements a cache for parsed expressions
 */
export const phParseExpression = partialSecond(
  createCache<UnaryFunction<any, any>>(),
  wchSelectAccessor
);

/**
 * Decode the default placeholder
 *
 * @param aDefault - the text or the localized context for the placeholder
 * @param aEscaper - the escape function
 * @param aDefaultLocale - the default locale,
 *
 * @returns the result
 */
function _phGetStaticDefault(
  aDefault: string | LocalizedText,
  aEscaper: UnaryFunction<string, string>,
  aDefaultLocale: Locale
): LocalizedText {
  return isString(aDefault)
    ? localizedText(aEscaper(aDefault), aDefaultLocale)
    : isLocalizedText(aDefault)
    ? localizedText(aEscaper(pluckText(aDefault)), pluckLocale(aDefault))
    : aDefault;
}

/**
 * Decode the default placeholder
 *
 * @param aDefault - the text or the localized context for the placeholder
 * @param aEscaper - the escape function
 * @param aDefaultLocale - the default locale
 * @returns the result
 */
function _phGetDefault(
  aDefault: WchDefaultPlaceholderText,
  aEscaper: UnaryFunction<string, string>,
  aDefaultLocale: Locale
): Observable<LocalizedText> {
  // convert the placeholder
  return rxPipe(
    fromObservableOrT(aDefault),
    map((value) => _phGetStaticDefault(value, aEscaper, aDefaultLocale))
  );
}

/**
 * Returns the localized text for a placeholder, either from the authoring value
 * or from a fallback.
 *
 * @param aPlaceholder - the authoring placeholder
 * @param aDefault - the default fallback
 * @param aEscaper - the escape function
 * @param aDefaultLocale - the default locale
 *
 * @returns the resulting localized text
 */
function _phGetLocalizedText(
  aPlaceholder: AuthoringPlaceholder,
  aDefault: WchDefaultPlaceholderText,
  aEscaper: UnaryFunction<string, string>,
  aDefaultLocale: Locale
): Observable<LocalizedText> {
  // test if we have a placeholder
  if (aPlaceholder) {
    /**
     * Use the default if we do not have a text but we have a flag
     */
    const bShow = aPlaceholder.show;
    if (bShow || isUndefined(bShow)) {
      /**
       * If we have text, return the text
       */
      const text = aPlaceholder.text;
      return isString(text) && text.length > 0
        ? of(localizedText(aEscaper(text), aDefaultLocale))
        : _phGetDefault(aDefault, aEscaper, aDefaultLocale);
    } else {
      // nothing to return
      return of(UNDEFINED);
    }
  } else {
    /** If no placeholder is defined, always fall back to the default */
    return _phGetDefault(aDefault, aEscaper, aDefaultLocale);
  }
}

/**
 * Our string conversion
 *
 * @param aValue - the value to convert
 * @returns the converted value
 */
const _anyToString = (aValue) =>
  isNotNil(aValue) ? aValue.toString() : UNDEFINED;

/**
 * Tests if we want to display a placeholder
 *
 * @param aPlc - the placeholder
 * @returns true if we want to show the placeholder, else false
 */
function _showPlaceholder(aPlc?: AuthoringPlaceholder): boolean {
  /**
   * The only reason not to show a placeholder is that the show flag
   * has explicitly been set to false.
   */
  return isNil(aPlc) || aPlc.show || isUndefined(aPlc.show);
}

/**
 * Tests if we should show a placeholder
 *
 * @param aData - the actual data
 * @param aType - the element type
 * @param aPlaceholder - the placeholder
 *
 * @returns true to show the placeholder else false
 */
export function phShowPlaceholder(
  aData: Observable<any>,
  aType: Observable<Maybe<string>>,
  aPlaceholder: Observable<Maybe<AuthoringPlaceholder>>
): Observable<boolean> {
  // check
  return rxPipe(
    combineLatest(aData, aType),
    map(([data, type]) => isValueOf(type, data)),
    switchMap((bHasData) =>
      bHasData ? opFalse : rxPipe(aPlaceholder, map(_showPlaceholder))
    )
  );
}

/**
 * Extract text placeholder using an escaping
 *
 * @param aEscaper - the escape function
 * @param aLocale - the locale
 * @param aData - the data
 * @param aPlaceholder - the placeholder
 * @param aDefault - the default placeholder
 * @param aDefaultLocale - the default locale
 *
 * @returns the resulting text
 */
function _phEscapedText(
  aEscaper: UnaryFunction<string, string>,
  aLocale: Observable<Locale>,
  aData: Observable<any>,
  aPlaceholder: Observable<AuthoringPlaceholder>,
  aDefault: Observable<WchDefaultPlaceholderText>,
  aDefaultLocale: Locale
): Observable<LocalizedText> {
  // extract the placeholder text
  const onPhText: Observable<LocalizedText> = rxPipe(
    combineLatest(aPlaceholder, aDefault),
    switchMap(([plc, phDefault]) =>
      _phGetLocalizedText(plc, phDefault, aEscaper, aDefaultLocale)
    ),
    opFilterNotNil
  );
  // combine
  return rxPipe(
    aData,
    map(_anyToString),
    switchMap((data) =>
      isString(data) && data.length > 0
        ? combineLatest(of(data), aLocale)
        : onPhText
    ),
    opDeepDistinctUntilChanged
  );
}

/**
 * Returns a localized text item for a placeholder
 *
 * @param aPlaceholder - the placeholder
 * @param aDefault - default placeholder
 * @param aDefaultLocale - the default locale
 *
 * @returns the localized text
 */
export const phPlaceholderText = (
  aPlaceholder: AuthoringPlaceholder,
  aDefault: WchDefaultPlaceholderText,
  aDefaultLocale: Locale
): Observable<LocalizedText> =>
  _phGetLocalizedText(aPlaceholder, aDefault, identity, aDefaultLocale);

/**
 * Plain text
 *
 * @param aLocale - the locale
 * @param aData - the data
 * @param aPlaceholder - the placeholder
 *
 * @returns the resulting plain text
 */
export const phPlainText: (
  aLocale: Observable<Locale>,
  aData: Observable<any>,
  aPlaceholder: Observable<AuthoringPlaceholder>,
  aDefault: Observable<WchDefaultPlaceholderText>,
  aDefaultLocale: Locale
) => Observable<LocalizedText> = (
  aLocale,
  aData,
  aPlaceholder,
  aDefault,
  aDefaultLocale
) =>
  _phEscapedText(
    identity,
    aLocale,
    aData,
    aPlaceholder,
    aDefault,
    aDefaultLocale
  );

/**
 * Formatted text
 *
 * @param aLocale - the locale
 * @param aData - the data
 * @param aPlaceholder - the placeholder
 *
 * @returns the resulting formatted text
 */
export const phFormattedText: (
  aLocale: Observable<Locale>,
  aData: Observable<any>,
  aPlaceholder: Observable<AuthoringPlaceholder>,
  aDefault: Observable<WchDefaultPlaceholderText>,
  aDefaultLocale: Locale
) => Observable<LocalizedText> = (
  aLocale,
  aData,
  aPlaceholder,
  aDefault,
  aDefaultLocale
) =>
  _phEscapedText(
    escapeHtml,
    aLocale,
    aData,
    aPlaceholder,
    aDefault,
    aDefaultLocale
  );

/**
 * Returns a placeholder from an accessor expression and the type
 *
 * @param onAcc - the accessor expression
 * @param onType - the type
 *
 * @returns the placeholder
 */
export const phPlaceholderFromAccessor: BiFunction<
  Observable<AccessorType>,
  Observable<AuthoringType>,
  Observable<AuthoringPlaceholder>
> = (onAcc, onType) =>
  rxPipe(
    combineLatest(onAcc, onType),
    map(([acc, type]) => wchPlaceholderFromAccessor(acc, type)),
    opShareLast
  );

/**
 * Returns the element type from an accessor expression and the type
 *
 * @param onAcc - the accessor expression
 * @param onType - the type
 *
 * @returns the element type
 */
export const phTypeFromAccessor: BiFunction<
  Observable<AccessorType>,
  Observable<AuthoringType>,
  Observable<string>
> = (onAcc, onType) =>
  rxPipe(
    combineLatest(onAcc, onType),
    map(([acc, type]) => wchTypeFromAccessor(acc, type)),
    opShareLast
  );

/**
 * @param aElementType - the element type
 * @returns the format value
 */
function _formatFromType(aElementType: string): WchEditableFormat {
  // map from the element type to a data type
  return aElementType === ELEMENT_TYPE_FORMATTED_TEXT
    ? ACOUSTIC_EDITABLE_HTML_FORMAT
    : isString(aElementType)
    ? ACOUSTIC_EDITABLE_TEXT_FORMAT
    : aElementType;
}

/**
 * Decodes the format based on the format input and a potential placeholder
 *
 * @param onFmt - the format string
 * @param onPlc - the placeholder string
 *
 * @returns the format
 */
export const phFormat: (
  onFmt: Observable<WchEditableFormat>,
  onPlc: Observable<WchDefaultPlaceholderText>,
  onType: Observable<string>
) => Observable<WchEditableFormat> = (onFmt, onPlc, onType) =>
  rxPipe(
    combineLatest(onFmt, onPlc),
    switchMap(([fmt, plc]) =>
      fmt === ACOUSTIC_EDITABLE_AUTO_FORMAT || isNotNil(plc)
        ? rxPipe(onType, map(_formatFromType))
        : of(fmt)
    )
  );

/**
 * Constructs a default text in case placeholders are missing
 *
 * @param aDefaultLocale - the locale
 * @returns the placeholder
 */
function _missingPlaceholderText(
  aDefaultLocale: string
): WchDefaultPlaceholderText {
  // returns the localized text
  return localizedText('$$MISSING_PLACEHOLDER', aDefaultLocale);
}

/**
 * Construct the default placeholder text
 *
 */
export function phDefaultPlaceholderText(
  aDefaultPlaceholder: WchDefaultPlaceholderText,
  aDefaultLocale: string
): Observable<LocalizedText> {
  // returns the placeholder
  return rxPipe(
    fromObservableOrT(
      aDefaultPlaceholder || _missingPlaceholderText(aDefaultLocale)
    ),
    map((txt) => (isString(txt) ? localizedText(txt, aDefaultLocale) : txt))
  );
}
