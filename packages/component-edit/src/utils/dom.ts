import { isNotNil, Maybe } from '@acoustic-content-sdk/utils';

/**
 * Returns the element or one of its parents that has an attribute, or null
 *
 * @param element - the element to begin searching
 * @param attributeName - the name of the attribute
 * @returns the element that was found, or null
 */
export const getElementOrParentWithAttribute = (
  element: Element,
  attributeName: string
): Element => {
  while (element) {
    if (element.hasAttribute(attributeName)) {
      return element;
    }
    element = element.parentElement;
  }
  return null;
};

/**
 * Checks if something is an element
 *
 * @param something - something
 * @returns true if the node is an element
 */
export const isElement = (something: any): something is Element =>
  something && something.nodeType === Node.ELEMENT_NODE;

/**
 * Sets or removes the attribute of an element
 *
 * @param aElement - the element
 * @param aKey - the key of the attribute
 * @returns the value
 */
export const getAttribute = (
  aElement: Maybe<Element>,
  aKey: string
): Maybe<string> =>
  isNotNil(aElement) ? aElement.getAttribute(aKey) : undefined;
