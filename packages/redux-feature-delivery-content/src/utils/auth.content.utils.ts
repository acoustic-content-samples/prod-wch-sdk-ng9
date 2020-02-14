import {
  AuthoringContentItem,
  Element,
  Group,
  KEY_VALUES,
  Logger,
  MultiImageElement,
  SingleImageElement,
  MultiVideoElement,
  SingleVideoElement
} from '@acoustic-content-sdk/api';
import { getDeliveryIdFromAuthoringItem } from '@acoustic-content-sdk/redux-utils';
import {
  SingleVideoElement,
  MultiImageElement
} from '@acoustic-content-sdk/api';
import {
  arrayPush,
  forEach,
  forIn,
  isArray,
  isImageElement,
  isVideoElement,
  isMultiGroupElement,
  isNil,
  isNotNil,
  isSingleGroupElement
} from '@acoustic-content-sdk/utils';

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

/**
 * Find all outbound asset references
 *
 * @param aContentItem - the content item
 * @returns the asset references
 */
function referencedAssets(
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
  return ids.filter(isNotNil);
}

export function hasAsset(
  aAssetId: string,
  aItem: AuthoringContentItem,
  aLogger: Logger
): boolean {
  // find all referenced assets and check if the ID is part of these assets
  return referencedAssets(aItem, aLogger).includes(aAssetId);
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

export function isSingleVideoElementInAuthoring(
  value: any
): value is SingleVideoElement {
  return (
    isVideoElement(value) &&
    isNil(value[KEY_VALUES]) &&
    isNotNil(value['asset'])
  );
}

export function isMultiVideoElementInAuthoring(
  value: any
): value is MultiVideoElement {
  return isVideoElement(value) && isArray(value[KEY_VALUES]);
}
