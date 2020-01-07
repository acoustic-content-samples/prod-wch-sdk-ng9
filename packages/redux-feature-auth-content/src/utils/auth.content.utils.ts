import {
  AuthoringAsset,
  AuthoringContentItem,
  BaseAuthoringItem,
  CLASSIFICATION_CONTENT,
  ContentItem,
  Element,
  ELEMENT_TYPE_IMAGE,
  Group,
  KEY_VALUES,
  Logger,
  MultiImageElement,
  SingleImageElement,
  User
} from "@acoustic-content-sdk/api";
import { AccessorType } from "@acoustic-content-sdk/edit-api";
import { rxSelect } from "@acoustic-content-sdk/redux-store";
import {
  createUpdater,
  getDeliveryIdFromAuthoringItem,
  updateGenericProperties
} from "@acoustic-content-sdk/redux-utils";
import {
  arrayPush,
  assertObject,
  forEach,
  forIn,
  getPath,
  getProperty,
  isArray,
  isImageElement,
  isMultiGroupElement,
  isMultiReferenceElement,
  isNil,
  isNotEmpty,
  isNotNil,
  isSingleGroupElement,
  isSingleReferenceElement,
  isString,
  isUndefined,
  opDistinctUntilChanged,
  opFilterNotNil,
  parsePath,
  reduceForIn,
  rxPipe
} from "@acoustic-content-sdk/utils";
import { combineLatest, Observable } from "rxjs";
import { map } from "rxjs/operators";

import { selectAuthoringContentItem } from "../state/auth-content/auth.content.selectors";
import {
  AuthContentFeatureState,
  selectAuthContentFeature
} from "./../state/auth-content/auth.content.feature";

/**
 * Snapshot mode for image elements
 */
export const IMAGE_ELEMENT_MODE_SNAPSHOT = "snapshot";

export interface Position {
  row: number;
  column?: number;
  item?: number;
}

const indicesRegex = new RegExp("\\[(\\d{1,})\\]", "g");

export const getRowPositionByAccessor = (
  aAccessor: AccessorType
): Position | undefined => {
  if (aAccessor) {
    const indices = [];
    let match = null;
    while ((match = indicesRegex.exec(aAccessor)) !== null) {
      indices.push(parseInt(match[1], 10));
    }

    if (indices.length >= 1) {
      return {
        row: indices[0]
      };
    }
  }
};

export const getCellPositionByAccessor = (
  aAccessor: AccessorType
): Position | undefined => {
  if (aAccessor) {
    const indices = [];
    let match = null;
    while ((match = indicesRegex.exec(aAccessor)) !== null) {
      indices.push(parseInt(match[1], 10));
    }

    if (indices.length >= 2) {
      return {
        row: indices[0],
        column: indices[1]
      };
    }
  }
};

export const getContentPositionByAccessor = (
  aAccessor: AccessorType
): Position | undefined => {
  if (aAccessor) {
    const indices = [];
    let match = null;
    while ((match = indicesRegex.exec(aAccessor)) !== null) {
      indices.push(parseInt(match[1], 10));
    }

    if (indices.length === 3) {
      return {
        row: indices[0],
        column: indices[1],
        item: indices[2]
      };
    }
  }
};

export const isSameContentPosition = (
  position1: Position,
  position2: Position
): boolean =>
  position1.row === position2.row &&
  position1.column === position2.column &&
  position1.item === position2.item;

/**
 * Retrieves a property value by accessor
 */
export const getValueByAccessor = (
  aItem: BaseAuthoringItem,
  aAccessor: AccessorType
): any => {
  // parse the path
  const path = parsePath(aAccessor);

  // access the host
  const host = getPath(aItem, path.slice(0, -1));

  // access the value
  return isNotNil(host) ? host[path[path.length - 1]] : undefined;
};

/**
 * Updates a plain text value based on the accessor
 *
 */
export function setValueByAccessor<T extends BaseAuthoringItem>(
  aAccessor: AccessorType,
  aValue: any,
  aItem: T
): T {
  // parse the path
  const path = parsePath(aAccessor);
  if (isNotEmpty(path)) {
    // access the host
    const host = getPath(aItem, path.slice(0, -1));
    if (isNotNil(host)) {
      const key = path[path.length - 1];
      if (isUndefined(aValue)) {
        // remove the item if undefined
        delete host[key];
      } else {
        // update
        host[key] = aValue;
      }
    }
  }
  // returns the item
  return aItem;
}

function replaceInArray(array: any[], search: any, replace: any) {
  if (isArray(array)) {
    for (let i = 0; i < array.length; i++) {
      if (array[i] === search) {
        array[i] = replace;
      }
    }
  }
}

/**
 * Updates a single property based on the accessor expression. The path to the parent
 * of the accessed item must already exist.
 *
 * @param aAccessor - the accessor expression that points
 * @param aValue - the new value
 * @param aItem - the item to update
 *
 * @returns a copy of the item with the modified value
 *
 * @deprecated use Updater from redux-utils instead
 */
export const updateValueByAccessor = (
  aAccessor: AccessorType,
  aValue: any,
  aItem: AuthoringContentItem,
  aUser?: User
): AuthoringContentItem => {
  if (isNotNil(aItem)) {
    const itemUpdater = createUpdater(aItem);
    updateGenericProperties(itemUpdater, aUser);
    return setValueByAccessor(aAccessor, aValue, itemUpdater.get());
  } else {
    return aItem;
  }
};

/**
 * @deprecated use updateImageElement from redux-utils
 */
export function updateImageElementByAccessor(
  aAccessor: AccessorType,
  aItem: AuthoringContentItem,
  aAsset: AuthoringAsset,
  aUser?: User
): AuthoringContentItem {
  // parse the accessor
  const path = parsePath(aAccessor);
  const parentPath = path.slice(0, -1);

  // access the parent element
  const parent = getPath(aItem, parentPath);

  // get the original item to make a copy
  const originalImage = getPath(aItem, path);
  const mode = getProperty<any, "mode">(
    originalImage,
    "mode",
    IMAGE_ELEMENT_MODE_SNAPSHOT
  );
  const altText = getProperty<any, "altText">(originalImage, "altText");
  const link = getProperty<any, "link">(originalImage, "link");

  // image properties to copy
  const baseImage = { altText, link, mode };

  const asset = getAssetDetails(mode, aAsset);
  if (isArray(parent)) {
    // element type and mode are already set on the parent element, only add asset reference
    const img = {
      ...baseImage,
      asset
    };
    const copy = updateValueByAccessor(aAccessor, img, aItem, aUser);
    // replace all undefined values in the array
    // if the accessor points to the n-th element of an array and the array is empty, all elements
    // before the n-th element are set to undefined by updateValueByAccessor
    replaceInArray(getPath(copy, parentPath), undefined, {});
    return copy;
  } else {
    const img = {
      ...baseImage,
      elementType: ELEMENT_TYPE_IMAGE,
      asset
    };
    return updateValueByAccessor(aAccessor, img, aItem, aUser);
  }
}

/**
 * Returns asset details that are added to a content item's image element (inline). Details differ depending on the
 * reference mode.
 *
 * @param aMode - supported values are 'shared' and 'snapshot'
 * @param aAsset - the referenced asset
 */
function getAssetDetails(aMode: string, aAsset: AuthoringAsset) {
  if (aMode === IMAGE_ELEMENT_MODE_SNAPSHOT) {
    return {
      id: getDeliveryIdFromAuthoringItem(aAsset),
      fileName: aAsset.fileName,
      fileSize: aAsset.fileSize,
      width: getPath(aAsset, ["metadata", "width"], -1),
      mediaType: aAsset.mediaType,
      resourceUri: getPath(aAsset, ["renditions", "default", "source"]),
      height: getPath(aAsset, ["metadata", "height"], -1)
    };
  } else {
    return { id: getDeliveryIdFromAuthoringItem(aAsset) };
  }
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
      values.forEach(value => arrayPush(value.id, aDst));
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
      values.forEach(value => addGroupContent(aDst, value, aLogger));
    }
  } else if (isSingleGroupElement(aElement, false)) {
    const { value } = aElement;
    if (isNotNil(value)) {
      addGroupContent(aDst, value, aLogger);
    }
  }
}

export function isSingleImageElementInAuthoring(
  value: any
): value is SingleImageElement {
  return (
    isImageElement(value) &&
    isNil(value[KEY_VALUES]) &&
    isNotNil(value["asset"])
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
  forIn(aGroup, el => addReferencedAsset(aDst, el, aLogger));
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
    forEach(values, value => {
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
    forEach(values, value => addReferencedGroupAsset(aDst, value, aLogger));
  }
  // TODO add file and video support
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
  return ids.filter(id => isNotNil(id) && id !== aContentItem.id);
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
  return ids.filter(isNotNil);
}

/**
 * Generate a mapping from asset ID to a map of content items that reference this asset
 *
 * @param aItems  - the content items
 * @returns the desired mapping
 */
export function contentItemsByAssets(
  aItems: Record<string, AuthoringContentItem>,
  aLogger: Logger
): Record<string, Record<string, AuthoringContentItem>> {
  // iterate over all content
  return reduceForIn(
    aItems,
    (
      aResult: Record<string, Record<string, AuthoringContentItem>>,
      aItem: AuthoringContentItem
    ) => {
      // of the item
      const contentId = getDeliveryIdFromAuthoringItem(aItem);
      // find all asset ids
      const assetIds = referencedAssets(aItem, aLogger);
      // register
      forEach(
        assetIds,
        assetId => (assertObject(assetId, aResult)[contentId] = aItem)
      );
      // returns the map
      return aResult;
    },
    {}
  );
}

export function hasAsset(
  aAssetId: string,
  aItem: AuthoringContentItem,
  aLogger: Logger
): boolean {
  // find all referenced assets and check if the ID is part of these assets
  return referencedAssets(aItem, aLogger).includes(aAssetId);
}

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

export function isBaseAuthoringItem(aValue: any): aValue is BaseAuthoringItem {
  return (
    isNotNil(aValue) && isString(aValue.id) && isString(aValue.classification)
  );
}

export function getUniqueIdentifierByIdAndAccessor(
  id: string,
  accessor: string
) {
  return `${id}:${accessor}`;
}

export function isAuthoringAsset(aValue: any): aValue is AuthoringAsset {
  return isBaseItem("asset", aValue);
}

// retrieves the authoring version of the content item by using the rendering context
export function getAuthoringContentItemFromContentItem(
  renderingContext$: Observable<ContentItem>,
  state$: Observable<AuthContentFeatureState>
): Observable<AuthoringContentItem> {
  const authoringItems$ = rxPipe(state$, rxSelect(selectAuthContentFeature));
  const contentItemId$ = rxPipe(
    renderingContext$,
    opFilterNotNil,
    map(rc => rc.draftId || rc.id),
    opFilterNotNil,
    opDistinctUntilChanged
  );

  return rxPipe(
    combineLatest([contentItemId$, authoringItems$]),
    map(([contentItemId, authoringItems]) =>
      selectAuthoringContentItem(contentItemId)(authoringItems)
    ),
    opDistinctUntilChanged
  );
}
