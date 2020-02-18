import { AuthoringContentItem } from '@acoustic-content-sdk/api';
import { FileDescriptor } from '@acoustic-content-sdk/tooling';
import {
  arrayPush,
  assertArray,
  Generator,
  isNotNil,
  IsPredicate,
  isString,
  jsonParse,
  Predicate
} from '@acoustic-content-sdk/utils';
import { OperatorFunction, pipe, UnaryFunction } from 'rxjs';
import { filter, map, reduce } from 'rxjs/operators';

// very basic JSON check
const isJson: Predicate<FileDescriptor<any>> = ([name]) =>
  name.endsWith('.json');

// make payload json
const toJson: UnaryFunction<any, any> = (aValue: any) =>
  isString(aValue) ? jsonParse(aValue) : aValue;

// test if we have an authoring content item
const isAuthoringContent: IsPredicate<AuthoringContentItem> = (
  aValue: any
): aValue is AuthoringContentItem =>
  isNotNil(aValue) && isString(aValue.id) && isString(aValue.typeId);

/**
 * The reducer function that aggregates all content items into a structure
 *
 * @param aDst  - target record
 * @param aItem - the authoring item
 *
 * @returns the target record
 */
const reduceToObject = (
  aDst: Record<string, string[]>,
  { id, typeId }: AuthoringContentItem
) => {
  // create the array
  const ids = assertArray(typeId, aDst);
  arrayPush(id, ids);
  // returns the actual object
  return aDst;
};

/**
 * Operator to aggregate files into the desired mapping
 */
export const aggregateContent: Generator<OperatorFunction<
  FileDescriptor<any>,
  Record<string, string[]>
>> = () =>
  pipe(
    filter(isJson),
    map(([, data]) => toJson(data)),
    filter(isAuthoringContent),
    reduce(reduceToObject, {})
  );
