import {
  anyToString,
  isNil,
  isNotEmpty,
  isNotNil
} from '@acoustic-content-sdk/utils';
import { Context, createContext } from 'react';

/**
 * Construct the react context and make sure we set the display name
 *
 * @param aName   - the display name
 * @param aDefault - optionally a default value
 *
 * @returns the context with mandatory `displayName` field
 */
export function createReactContext<T>(
  aName: string,
  aDefault?: T
): Required<Context<T>> {
  // construct the context
  const ctx = createContext<T>(aDefault);
  ctx.displayName = aName;
  // returns the context
  return ctx as any;
}
/**
 * Returns the display name of a context
 */
export const selectDisplayName = (aCtx: Context<any>): string => {
  // check if we have a name
  const { displayName } = aCtx;
  return isNotEmpty(displayName) ? displayName : anyToString(aCtx);
};

/**
 * Validates that the value is not nil and throws an exception otherwise
 *
 * @param aValue - value to check
 * @param aContext - the context, for debugging purposes
 *
 * @returns the original value, guaranteed that it will not be nil
 */
export function assertProvider<T>(
  aValue: T,
  aContext: Context<T>,
  aParentContext?: Context<any>
): NonNullable<T> {
  // sanity check
  if (isNil(aValue)) {
    // check if we have more info
    const providerName = selectDisplayName(aContext);
    const parentName = selectDisplayName(aParentContext);
    const suffix = isNotNil(parentName) ? ` by [${parentName}]` : '';
    // bail out
    const message = `Missing required provider: [${providerName}]${suffix}`;
    throw new Error(message);
  }
  // returns the value
  return aValue as any;
}
