import { lastElement, nthElement } from '../js/js.utils';
import { getProperty } from '../js/pluck';
import { Category } from '@acoustic-content-sdk/api';

/**
 * Extracts the last category element
 *
 * @param aCategory - the category
 * @param aIndex - category index
 * @param aFallback - fallback
 *
 * @returns the last element
 */
export const getCategoryLeaf = (
  aCategory: Category,
  aIndex?: number,
  aFallback?: string
): string =>
  lastElement(
    nthElement(getProperty(aCategory, 'categoryPaths'), aIndex || 0)
  ) || aFallback;
