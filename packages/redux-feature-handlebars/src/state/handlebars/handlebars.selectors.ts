import {
  getPath,
  isFunction,
  isNil,
  isNotNil,
  isString
} from '@acoustic-content-sdk/utils';

import { HandlebarsProcessor } from '../../utils/handlebars';
import {
  HandlebarsKey,
  HandlebarsState,
  HandlebarsTemplateState
} from './handlebars.state';

/**
 * Checks if a template state is valid
 *
 * @param aState - the template state
 * @returns true if the state is valid, else false
 */
export function isValidHandlebarsTemplateState(
  aState: HandlebarsTemplateState
): boolean {
  return (
    isNotNil(aState) &&
    isString(aState.stringTemplate) &&
    isNil(aState.error) &&
    isFunction(aState.compiledTemplate)
  );
}

/**
 * Selects the pre-compiled handlebars template based on the key or returns undefined.
 *
 * @param aKey - the URL to the template
 * @returns the selector of the precompiled template on the state
 */
export const selectTemplate = (aKey: HandlebarsKey) => (
  aState: HandlebarsState
): HandlebarsProcessor => getPath(aState, [aKey, 'compiledTemplate']);
