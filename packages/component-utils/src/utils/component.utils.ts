import { isString, isStringArray } from '@acoustic-content-sdk/utils';

const EMPTY_ARRAY: string[] = [];

/**
 * Decodes the selector from the component
 *
 * @param aComponent -  the component
 * @returns the selectors for the component
 */
export function cmpGetSelectors(
  aSelector: string | string[] | null | undefined
): string[] {
  /**
   *  decode the selector
   */
  let result: string[];
  /**
   *  convert to an array
   */
  if (isStringArray(aSelector)) {
    /**
     *  returns the array
     */
    result = aSelector;
  } else if (isString(aSelector)) {
    /**
     *  wrap into an array
     */
    result = [aSelector];
  } else {
    /**
     *  no selectors available
     */
    result = EMPTY_ARRAY;
  }
  /**
   *  ok
   */
  return result;
}

/**
 * Decodes the selector from the component
 *
 * @param aComponent -  the component
 * @returns the selectors for the component
 */
export function cmpGetSelector(
  aSelector: string | null | undefined
): string | undefined {
  /**
   *  decode the selector
   */
  let result: string;
  if (isString(aSelector)) {
    /**
     *  wrap into an array
     */
    result = aSelector;
  }
  /**
   *  ok
   */
  return result;
}
