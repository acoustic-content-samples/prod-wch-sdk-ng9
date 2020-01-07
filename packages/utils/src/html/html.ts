import { UnaryFunction } from 'rxjs';
import { partialFirst } from '../js/js.core';
import { getProperty } from '../js/pluck';
import { isString } from '../predicates/predicates';

// List of HTML entities for escaping.
const htmlEscapes = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#x27;',
  '/': '&#x2F;'
};

// Regex containing the keys listed immediately above.
const htmlEscaper = /[&<>"'\/]/g;

/**
 * Function that executes the escape
 */
const _escapeMatch = partialFirst(getProperty, htmlEscapes);

// Escape a string for HTML interpolation.
const _escapeHtml: UnaryFunction<string, string> = (aValue) =>
  aValue.replace(htmlEscaper, _escapeMatch);

/**
 * Applies HTML escaping to strings
 *
 * @param aValue - the value
 * @returns the escaped value
 */
export const escapeHtml = <T = string>(aValue: T) =>
  isString(aValue) ? _escapeHtml(aValue) : aValue;
