import {
  AuthoringContentItem,
  CLASSIFICATION_CONTENT,
  Element,
  Group,
  KEY_VALUES,
  Logger,
  MultiImageElement,
  SingleImageElement
} from '@acoustic-content-sdk/api';
import {
  arrayPush,
  filterArray,
  forEach,
  forIn,
  isArray,
  isImageElement,
  isMultiGroupElement,
  isMultiReferenceElement,
  isNil,
  isNotEmpty,
  isNotNil,
  isSingleGroupElement,
  isSingleReferenceElement,
  isString
} from '@acoustic-content-sdk/utils';

import { getDeliveryIdFromAuthoringItem } from '../draft/draft.utils';

function isBaseItem(aClassification: string, aValue: any): boolean {
  return (
    isNotNil(aValue) &&
    isString(aValue.id) &&
    aValue.classification === aClassification
  );
}

export function isAuthoringContentItem(
  aValue: any
): aValue is AuthoringContentItem {
  return isBaseItem(CLASSIFICATION_CONTENT, aValue);
}

export function isSingleImageElementInAuthoring(
  value: any
): value is SingleImageElement {
  return (
    isImageElement(value) &&
    isNil(value[KEY_VALUES]) &&
    isNotNil(value['asset'])
  );
}

export function isMultiImageElementInAuthoring(
  value: any
): value is MultiImageElement {
  return isImageElement(value) && isArray(value[KEY_VALUES]);
}

function addReferencedGroupAsset(
  aDst: string[],
  aGroup: Group,
  aLogger: Logger
) {
  forIn(aGroup, (el) => addReferencedAsset(aDst, el, aLogger));
}

function addReferencedAsset(
  aDst: string[],
  aElement: Element,
  aLogger: Logger
) {
  // check the types
  if (isSingleImageElementInAuthoring(aElement)) {
    // extract the asset ID
    const { asset } = aElement;
    const id = getDeliveryIdFromAuthoringItem(asset);
    arrayPush(id, aDst);
  } else if (isMultiImageElementInAuthoring(aElement)) {
    const { values } = aElement;
    forEach(values, (value) => {
      // the asset
      const { asset } = value;
      if (isNotNil(asset)) {
        const id = getDeliveryIdFromAuthoringItem(asset);
        arrayPush(id, aDst);
      }
    });
  } else if (isSingleGroupElement(aElement)) {
    const { value } = aElement;
    // recurse on the value
    addReferencedGroupAsset(aDst, value, aLogger);
  } else if (isMultiGroupElement(aElement)) {
    const { values } = aElement;
    forEach(values, (value) => addReferencedGroupAsset(aDst, value, aLogger));
  }
  // TODO add file and video support
}

function addGroupContent(aDst: string[], aElement: Group, aLogger: Logger) {
  forIn(aElement, (el: Element) => addReferencedContent(aDst, el, aLogger));
}

function addReferencedContent(
  aDst: string[],
  aElement: Element,
  aLogger: Logger
) {
  // check the types
  if (isMultiReferenceElement(aElement, false)) {
    // add the references
    const { values } = aElement;
    if (isNotEmpty(values)) {
      forEach(values, (value) => arrayPush(value.id, aDst));
    }
  } else if (isSingleReferenceElement(aElement, false)) {
    const { value } = aElement;
    if (isNotNil(value)) {
      arrayPush(value.id, aDst);
    }
  } else if (isMultiGroupElement(aElement, false)) {
    // recurse
    const { values } = aElement;
    if (isNotEmpty(values)) {
      forEach(values, (value) => addGroupContent(aDst, value, aLogger));
    }
  } else if (isSingleGroupElement(aElement, false)) {
    const { value } = aElement;
    if (isNotNil(value)) {
      addGroupContent(aDst, value, aLogger);
    }
  }
}

/**
 * Find all outbound content references
 *
 * @param aContentItem - the content item
 * @returns the references
 */
export function referencedContent(
  aContentItem: AuthoringContentItem,
  aLogger: Logger
): string[] {
  // result
  const ids: string[] = [];
  // assemble the ids
  const { elements } = aContentItem;
  if (isNotNil(elements)) {
    forIn(elements, (el: Element) => addReferencedContent(ids, el, aLogger));
  }
  // ok
  return filterArray(ids, (id) => isNotNil(id) && id !== aContentItem.id);
}

/**
 * Find all outbound asset references
 *
 * @param aContentItem - the content item
 * @returns the asset references
 */
export function referencedAssets(
  aContentItem: AuthoringContentItem,
  aLogger: Logger
): string[] {
  // result
  const ids: string[] = [];
  // assemble the ids
  const { elements } = aContentItem;
  if (isNotNil(elements)) {
    forIn(elements, (el: Element) => addReferencedAsset(ids, el, aLogger));
  }
  // ok
  return filterArray(ids, isNotNil);
}
