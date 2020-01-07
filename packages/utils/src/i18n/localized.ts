import { UnaryFunction } from 'rxjs';
import { Locale, LocalizedContext, LocalizedText } from '@acoustic-content-sdk/api';
import { BiFunction } from '../consumers/consumer';
import {
  biComposeMono,
  compose,
  flipArgs,
  partialSecond,
  propertyFromObject,
  zipArgs
} from '../js/js.core';
import { getProperty } from '../js/pluck';
import { isArrayOf, isString } from '../predicates/predicates';
import { cmpNumbers, Comparator } from './../compare/compare';

/**
 * expose a tuple as text
 */
export const localizedText: BiFunction<
  string,
  Locale,
  LocalizedText
> = zipArgs as any;

/**
 * Accessor for locales from a localized context
 */
export const pluckLocale: UnaryFunction<LocalizedText, Locale> = partialSecond(
  getProperty,
  1
) as any;

/**
 * Accessor for text from a localized context
 */
export const pluckText: UnaryFunction<LocalizedText, string> = partialSecond(
  getProperty,
  0
) as any;

/**
 * Returns a comparator that orders localizations according to the
 * preferences of a localized context
 *
 * @param locContext - */
export const cmpByLocalizedContext: UnaryFunction<
  LocalizedContext,
  Comparator<LocalizedText>
> = (locContext) =>
  flipArgs(
    biComposeMono(
      compose(
        pluckLocale,
        propertyFromObject(locContext, 0)
      ),
      cmpNumbers
    )
  );

/**
 * Tests if a value is a localized context
 *
 * @param aText - text to check
 * @returns true if the text is a localized context, else false
 */
export function isLocalizedText(aText: any): aText is LocalizedText {
  return isArrayOf(aText, isString) && aText.length === 2;
}
