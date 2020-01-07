import { Locale, LocalizedContext } from '@acoustic-content-sdk/api';
import {
  cmpNumbers,
  cmpStrings,
  Comparator,
  getProperty
} from '@acoustic-content-sdk/utils';
import { UnaryFunction } from 'rxjs';

const pluckWeight = (
  aLocContext: LocalizedContext
): UnaryFunction<Locale, number> => (aLocale) =>
  getProperty(aLocContext, aLocale, 0);

// returns the comparator function
function compareByLocale<T>(
  aLeft: T,
  aRight: T,
  aLocaleExtractor: UnaryFunction<T, Locale>,
  aWeightExtractor: UnaryFunction<Locale, number>
): number {
  // quick check
  if (aLeft === aRight) {
    return 0;
  }
  // locales
  const left = aLocaleExtractor(aLeft);
  const right = aLocaleExtractor(aRight);
  // compare by weight
  const res = cmpNumbers(aWeightExtractor(left), aWeightExtractor(right));
  return res === 0 ? cmpStrings(left, right) : res;
}

/**
 * Returns a comparator that compares objects by their locale according
 * to a locale preference
 *
 * @param aLocContext - the locale preference
 * @param aLocaleExtractor - extractor of the locale from the object
 *
 * @returns the comparator
 */
export function byLocaleComparator<T>(
  aLocContext: LocalizedContext,
  aLocaleExtractor: UnaryFunction<T, Locale>
): Comparator<T> {
  // extract the weight from the context
  const weightExtractor = pluckWeight(aLocContext);
  // returns the comparator function
  return (aLeft: T, aRight: T) =>
    compareByLocale(aLeft, aRight, aLocaleExtractor, weightExtractor);
}

const getCanonicalLocalesFallback = (aValue: string) => [aValue];

const getCanonicalLocales: UnaryFunction<string, string[]> = getProperty<
  any,
  'getCanonicalLocales'
>(Intl, 'getCanonicalLocales', getCanonicalLocalesFallback);

/**
 * Returns a canonicalized version of the locale
 *
 * @param aLocale - the locale to canonicalize
 *
 * @returns the canonical version
 */
export function canonicalizeLocale(aLocale: Locale): Locale {
  const fixed = aLocale.replace(/[^a-zA-Z]/g, '-');
  return getProperty(getCanonicalLocales(fixed), 0, fixed);
}
