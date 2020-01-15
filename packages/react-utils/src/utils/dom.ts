import { forEach, isNotNil, rxPipe } from '@acoustic-content-sdk/utils';
import { fromEvent, merge, Observable } from 'rxjs';
import { mapTo, startWith } from 'rxjs/operators';

/**
 * Sets or removes the attribute of an element
 *
 * @param aElement - the element
 * @param aKey - the key of the attribute
 * @returns the value
 */
export const getAttribute = (aElement: Element, aKey: string): string =>
  aElement.getAttribute(aKey);

/**
 * Checks if something is an element
 *
 * @param something - something
 * @returns true if the node is an element
 */
export const isElement = (something: any): something is Element =>
  something instanceof Element;

/**
 * Checks if something as an HTML element
 *
 * @param something - something
 * @returns true if the node is an element
 */
export const isHTMLElement = (something: any): something is HTMLElement =>
  something instanceof HTMLElement;
