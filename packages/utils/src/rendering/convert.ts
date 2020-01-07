import {
  AbstractElement,
  AuthoringSelectedLayout,
  ContentItemWithLayout,
  DeliveryContentItem,
  DeliveryContentMetadata,
  DeliveryElement,
  DeliveryGroupElement,
  DeliveryGroupElementMetadata,
  ELEMENT_TYPE_CATEGORY,
  ELEMENT_TYPE_DATE,
  ELEMENT_TYPE_FILE,
  ELEMENT_TYPE_FORMATTED_TEXT,
  ELEMENT_TYPE_GROUP,
  ELEMENT_TYPE_IMAGE,
  ELEMENT_TYPE_LINK,
  ELEMENT_TYPE_LOCATION,
  ELEMENT_TYPE_NUMBER,
  ELEMENT_TYPE_OPTION_SELECTION,
  ELEMENT_TYPE_REFERENCE,
  ELEMENT_TYPE_TEXT,
  ELEMENT_TYPE_TOGGLE,
  ELEMENT_TYPE_VIDEO,
  KEY_ID,
  KEY_METADATA,
  OptionSelection
} from '@acoustic-content-sdk/api';
import { identity, UnaryFunction } from 'rxjs';

import { mapArray, partialSecond, UNDEFINED } from '../js/js.core';
import {
  assignObject,
  objectAssign,
  reduceForIn,
  reduceToObject
} from '../js/js.utils';
import { pluckProperty } from '../js/pluck';
import {
  isArray,
  isNil,
  isNotEmpty,
  isNotNil,
  isUndefined
} from './../predicates/predicates';

/**
 * Make sure to return an object
 *
 * @param aValue - value to check
 * @returns the object
 */
const assertObject = (aValue: Record<string, any>) => aValue || {};

/**
 * Only assigns the key/value pair if the value is defined
 *
 * @param aKey - the key
 * @param aValue - the value
 * @param aDst - the target object
 *
 * @returns the target object
 */
const safeAssign = (aKey: string, aValue: any, aDst: Record<string, any>) =>
  isNotNil(aValue) ? objectAssign(aKey, aValue, assertObject(aDst)) : aDst;

/**
 * Checks if a value is either undefined or not nul, i.e. in particular not false or 0
 *
 * @param aValue - the value to check
 * @returns true if the value is as expected
 */
const isUndefinedOrNotNul = (aValue: any) => isUndefined(aValue) || aValue;

/**
 * Helper map that contains the invalid keys
 */
const INVALID_KEYS = reduceToObject(
  [
    'elementType',
    'elements',
    'links',
    'status',
    'lastModifierId',
    'creatorId',
    'publishing'
  ],
  identity
);

/**
 * Only assigns the key/value pair if the value is defined and the key is valid
 *
 * @param aKey - the key
 * @param aValue - the value
 * @param aDst - the target object
 *
 * @returns the target object
 */
const cleanupValue = (aDst: Record<string, any>, aValue: any, aKey: string) =>
  isNil(INVALID_KEYS[aKey]) &&
  isNotNil(aValue) &&
  isUndefinedOrNotNul(aValue.length)
    ? objectAssign(aKey, aValue, assertObject(aDst))
    : aDst;

/**
 * Transforms a single value
 *
 * @param aValue - the value
 * @param aTransform - the transform
 *
 * @returns the transformed item
 */
const transformSingle = (
  aValue: any,
  aTransform?: UnaryFunction<any, DeliveryElement>
) => (aTransform ? aTransform(aValue) : aValue);

/**
 * Transforms an array of values
 *
 * @param aValues - the values
 * @param aTransform - the transform
 *
 * @returns the transformed item
 */
const transformArray = (
  aValues: ArrayLike<any>,
  aTransform?: UnaryFunction<any, DeliveryElement>
) => (aTransform ? mapArray(aValues, aTransform) : aValues);

/**
 * Constructs an element that uses 'value' for a single element and 'values' for
 * a multi element.
 *
 * @param aElement - the original element
 *
 * @returns the resulting delivery element
 */
function createNormalElement(
  aElement: any,
  aTransform?: UnaryFunction<any, DeliveryElement>
): DeliveryElement {
  // extract
  const { value, values } = aElement;
  return isNotNil(value)
    ? transformSingle(value, aTransform)
    : isNotEmpty(values)
    ? transformArray(values, aTransform)
    : UNDEFINED;
}

/**
 * Constructs an element that uses 'value' for a single element and 'values' for
 * a multi element.
 *
 * @param aElement - the original element
 *
 * @returns the resulting delivery element
 */
function createStrangeElement(
  aElement: any,
  aTransform?: UnaryFunction<any, DeliveryElement>
): DeliveryElement {
  // extract
  const { values } = aElement;
  if (isNotEmpty(values)) {
    return transformArray(values, aTransform);
  }
  // make sure to remove the type field
  return reduceForIn(aElement, cleanupValue, UNDEFINED);
}

/**
 * Construct a reference element from the metadata
 *
 * @param aMetadata - the metadata
 * @returns an object with the metadata key
 */
const transformReferenceElement = (aMetadata: any) => ({
  [KEY_METADATA]: reduceForIn(aMetadata, cleanupValue, UNDEFINED)
});

/**
 * Construct a reference element
 */
const createReferenceElement = partialSecond(
  createNormalElement,
  transformReferenceElement
);

/**
 * Extracts the selection field from the options element
 */
const transformOptionSelectionElement = pluckProperty<
  OptionSelection,
  'selection'
>('selection');

/**
 * Constructs a new options selections element
 */
const createOptionSelectionElement = partialSecond(
  createNormalElement,
  transformOptionSelectionElement
);

/**
 * Creates a new group element
 *
 * @param aKey - key of the element
 * @param aElement - the delivery element
 *
 * @returns the new element or undefined
 */
function createGroupElement(aAccessor: string, aKey: string, aElement: any) {
  // extract
  const { value, values, selectedLayouts } = aElement;
  // accessor prefix
  const accessorPrefix = `${aAccessor}.${aKey}`;
  // sanity check
  return isNotNil(value)
    ? createGroupContentItem(`${accessorPrefix}.value`, value, selectedLayouts)
    : isArray(values) && values.length
    ? values.map((val, idx) =>
        createGroupContentItem(
          `${accessorPrefix}.values[${idx}]`,
          val,
          selectedLayouts
        )
      )
    : UNDEFINED;
}

/**
 * Transforms an element by its element type
 *
 * @param aKey - key of the element
 * @param aElement - the delivery element
 *
 * @returns the new element or undefined
 */
function createElement(
  aAccessor: string,
  aKey: string,
  aElement: AbstractElement
) {
  // handle the element type
  const { elementType } = aElement;
  // dispatch
  switch (elementType) {
    case ELEMENT_TYPE_DATE:
    case ELEMENT_TYPE_TEXT:
    case ELEMENT_TYPE_FORMATTED_TEXT:
    case ELEMENT_TYPE_NUMBER:
    case ELEMENT_TYPE_TOGGLE:
      return createNormalElement(aElement);
    case ELEMENT_TYPE_IMAGE:
    case ELEMENT_TYPE_VIDEO:
    case ELEMENT_TYPE_FILE:
    case ELEMENT_TYPE_LINK:
    case ELEMENT_TYPE_LOCATION:
    case ELEMENT_TYPE_CATEGORY:
      return createStrangeElement(aElement);
    case ELEMENT_TYPE_OPTION_SELECTION:
      return createOptionSelectionElement(aElement);
    case ELEMENT_TYPE_REFERENCE:
      return createReferenceElement(aElement);
    case ELEMENT_TYPE_GROUP:
      return createGroupElement(aAccessor, aKey, aElement);
    default:
      return UNDEFINED;
  }
}

/**
 * Constructs the metadata for a group element
 *
 * @param accessor - the accessor string
 * @param selectedLayouts - the set of selected layouts
 *
 * @returns the metadata
 */
const createGroupMetadata = (
  accessor: string,
  selectedLayouts: AuthoringSelectedLayout[]
): DeliveryGroupElementMetadata =>
  isNotEmpty(selectedLayouts) ? { accessor, selectedLayouts } : { accessor };

function createGroupContentItem(
  accessor: string,
  aElements: Record<string, any>,
  selectedLayouts: AuthoringSelectedLayout[]
) {
  // construct
  const obj = createContentItem(accessor, aElements);
  return isNotNil(obj)
    ? objectAssign(
        KEY_METADATA,
        createGroupMetadata(accessor, selectedLayouts),
        obj
      )
    : obj;
}

function createContentItem(aAccessor: string, aElements: Record<string, any>) {
  // map the elements to actual content
  return reduceForIn(
    aElements,
    (aDst: any, value: AbstractElement, key: string) =>
      safeAssign(key, createElement(aAccessor, key, value), aDst),
    UNDEFINED
  );
}

/**
 * Converts a v1 delivery item structure into a simplified structure
 *
 * @param aItem  - the item to convert
 *
 * @returns the same item in the simplified structure
 */
export function createDeliveryContentItem(
  aItem: ContentItemWithLayout
): DeliveryContentItem {
  // root accessor
  const accessor = 'elements';
  // dispatch
  return isNotNil(aItem)
    ? objectAssign(
        KEY_METADATA,
        reduceForIn(aItem, cleanupValue, { accessor }),
        createContentItem(accessor, aItem.elements) || {}
      )
    : UNDEFINED;
}

const selectMetadata = pluckProperty<any, '$metadata'>(KEY_METADATA);
const selectId = pluckProperty<any, 'id'>(KEY_ID);

/**
 * Test if an item is a delivery group item
 *
 * @param aValue - value to test
 * @returns true if this is a group item, else false
 */
function isDeliveryGroupElement(aValue: any): aValue is DeliveryGroupElement {
  // test for metadata
  const $metadata = selectMetadata(aValue);
  return isNotNil($metadata) && isNil(selectId($metadata));
}

/**
 * Constructs a reducer function to augment group elements. Binds to the top level delivery metadata
 *
 * @param aMetadata - metadata to bind to
 * @returns the reducer
 */
function createDeliveryGroupReducer(aMetadata: DeliveryContentMetadata) {
  /**
   * Copy the elements in the group element
   *
   * @param aDst  - target record
   * @param aValue - value
   * @param aKey - key
   */
  const reduceDeliveryGroupElement = (aDst: any, aValue: any, aKey: string) =>
    objectAssign(aKey, augmentValue(aValue), aDst);

  /**
   * Augments the value, depending on whether it's an array or a single value
   *
   * @param aValue - the value to augment
   * @returns the augmented value
   */
  const augmentValue = (aValue: any) =>
    isArray(aValue) ? augmentArray(aValue) : augmentSingle(aValue);

  /**
   * Augment a single value
   *
   * @param aValue - the single value
   * @returns the augmented value
   */
  const augmentSingle = (aValue: any) =>
    isDeliveryGroupElement(aValue)
      ? augmentDeliveryGroupElement(
          aValue,
          aMetadata,
          reduceDeliveryGroupElement
        )
      : aValue;

  /**
   * Augments an array of values
   *
   * @param aItems - the items to augment
   * @returns the augmented items
   */
  const augmentArray = (aItems: any[]) => mapArray(aItems, augmentValue);

  // returns the reducer function
  return reduceDeliveryGroupElement;
}

/**
 * Merge the properties of the metadata object into the group element
 *
 * @param aItem - the group element
 * @param aMetadata - the top level metadata
 *
 * @returns the augmented metadata
 */
function augmentDeliveryGroupElement(
  aItem: DeliveryGroupElement,
  aMetadata: DeliveryContentMetadata,
  aReducer: (
    aDst: DeliveryGroupElement,
    aValue: DeliveryElement,
    aKey: string
  ) => DeliveryGroupElement
): DeliveryGroupElement {
  // cleanup the group level metadata
  const $metadata = { ...aMetadata };
  delete $metadata.selectedLayouts;
  assignObject($metadata, aItem[KEY_METADATA]);
  // override the metadata record by the merged one
  return objectAssign(
    KEY_METADATA,
    $metadata,
    reduceForIn(aItem, aReducer, {})
  );
}

/**
 * Merges metadata into each level
 *
 * @param aItem - the item
 * @param aMetadata - the metadata item
 *
 * @returns the augmented item
 */
function augmentDeliveryContentItemWithMetadata(
  aItem: DeliveryContentItem,
  aMetadata: DeliveryContentMetadata
): DeliveryContentItem {
  // augment
  return reduceForIn(aItem, createDeliveryGroupReducer(aMetadata), {});
}

/**
 * Merges metadata into each level
 *
 * @param aItem - the item
 * @returns the augmented item
 */
export function createDeliveryContentItemWithMetadata(
  aItem: DeliveryContentItem
): DeliveryContentItem {
  return isNotNil(aItem)
    ? augmentDeliveryContentItemWithMetadata(aItem, aItem[KEY_METADATA])
    : UNDEFINED;
}
