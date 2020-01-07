import { isFunction, isString, Predicate } from '@acoustic-content-sdk/utils';
import { isDraftId } from '../draft/draft.utils';

const FUNCTION_TYPE = typeof isFunction;
const STRING_TYPE = typeof FUNCTION_TYPE;

function throwTypeError(aValue: any, aName: string, aType: string) {
  throw new TypeError(
    `Expecting [${aName}] to be of type [${aType}] but it is [${typeof aValue}].`
  );
}

export function assertIsFunction(aValue: any, aName: string) {
  if (!isFunction(aValue)) {
    throwTypeError(aValue, aName, FUNCTION_TYPE);
  }
}

export function assertIsString(aValue: any, aName: string) {
  if (!isString(aValue)) {
    throwTypeError(aValue, aName, STRING_TYPE);
  }
}

export function assertIsDraftId(aValue: any, aName: string) {
  if (!isString(aValue) || !isDraftId(aValue)) {
    throw new Error(
      `Expecting [${aName}] to be a draft ID, but it is [${aValue}].`
    );
  }
}

export function assertIsNotDraftId(aValue: any, aName: string) {
  if (!isString(aValue) || isDraftId(aValue)) {
    throw new Error(
      `Expecting [${aName}] not to be a draft ID, but it is [${aValue}].`
    );
  }
}

export function assertProperties(
  aValue: any,
  aPredicate: Predicate<any>,
  aName: string
) {
  if (!aPredicate(aValue)) {
    throw new Error(`Properties for [${aName}] are not valid.`);
  }
}
