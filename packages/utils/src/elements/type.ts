import { AUTHORING_ELEMENT_ROLE, AuthoringElement, AuthoringType } from '@acoustic-content-sdk/api';

import { filterArray } from '../js/js.utils';
import { isNilOrEmpty, isNotEmpty, isNotNil, Predicate } from '../predicates/predicates';

/**
 * Returns all elements of a particular type
 *
 * @param aType - the au
 * @param aPredicate
 */
function getElementTypes(
  aType: AuthoringType,
  aPredicate: Predicate<AuthoringElement>
): AuthoringElement[] {
  return filterArray(aType.elements, aPredicate);
}

/**
 * Checks if an element type has a config role
 */
function hasConfigRole(aRoles: AUTHORING_ELEMENT_ROLE[]): boolean {
  return isNotEmpty(aRoles) && aRoles.includes('configuration');
}

/**
 * Checks if an element type has a content role
 */
function hasContentRole(aRoles: AUTHORING_ELEMENT_ROLE[]): boolean {
  return isNilOrEmpty(aRoles) || aRoles.includes('content');
}

/**
 * Checks if an element is a config element
 *
 * @param aElement - the element to check
 * @returns true if the element has the configuration
 */
export function isAuthoringConfigElement(aElement: AuthoringElement): boolean {
  return isNotNil(aElement) && hasConfigRole(aElement.role);
}

/**
 * Checks if an element is a content element
 *
 * @param aElement - the element to check
 * @returns true if the element has the configuration
 */
export function isAuthoringContentElement(aElement: AuthoringElement): boolean {
  return isNotNil(aElement) && hasContentRole(aElement.role);
}

/**
 * Returns the authoring config elements
 *
 * @param aType - the type
 *
 * @returns those elements on the type that are config elements
 */
export function getAuthoringConfigElements(
  aType: AuthoringType
): AuthoringElement[] {
  return filterArray(aType.elements, isAuthoringConfigElement);
}

/**
 * Returns the authoring content elements
 *
 * @param aType - the types
 *
 * @returns those elements on the type that are content elements
 */
export function getAuthoringContentElements(
  aType: AuthoringType
): AuthoringElement[] {
  return filterArray(aType.elements, isAuthoringContentElement);
}
