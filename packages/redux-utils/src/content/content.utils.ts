import {
  AuthoringAsset,
  AuthoringContentItem,
  BaseAuthoringItem,
  CLASSIFICATION_ASSET,
  DraftStatus,
  ELEMENT_TYPE_IMAGE,
  ELEMENT_TYPE_VIDEO,
  Status,
  User
} from '@acoustic-content-sdk/api';
import { AccessorType } from '@acoustic-content-sdk/edit-api';
import {
  getPath,
  getProperty,
  isArray,
  isNil,
  isNotEmpty,
  isNotNil,
  isUndefined,
  isString,
  parsePath
} from '@acoustic-content-sdk/utils';
import { v4 } from 'uuid';

import {
  ensureDraftId,
  getDeliveryIdFromAuthoringItem,
  getDeliveryId
} from '../draft/draft.utils';
import { createUpdater, Updater } from '../update';

/**
 * Snapshot mode for image elements
 */
const IMAGE_ELEMENT_MODE_SNAPSHOT = 'snapshot';

/**
 * Updates properties of the item that depend on the environment
 *
 * @param aItem - updater for the item
 * @param aUser - optionally the current user
 * @returns the updater after the item has been modified
 */
interface BaseAuthoringItemWithLinks extends BaseAuthoringItem {
  links?: {};
}
export function updateGenericProperties<T extends BaseAuthoringItemWithLinks>(
  aItem: Updater<T>,
  aUser?: User
): Updater<T> {
  // current item
  const oldItem = aItem.get();
  // current time
  const date = new Date().toISOString();
  aItem.set('systemModified', date);
  aItem.set('lastModified', date);
  // rewrite the ID
  const { id, created, classification, links, linkedDocId } = oldItem;
  const itemId = isString(id) ? id : v4();
  const idToUpdate =
    classification === CLASSIFICATION_ASSET ? itemId : ensureDraftId(itemId);
  aItem.set('id', idToUpdate);
  // replace the revision
  aItem.set('rev', `0-${v4()}`);
  // update the modifying user
  if (isNotNil(aUser)) {
    // set user info
    aItem.set('lastModifierId', aUser.id);
  }

  if (
    isUndefined(linkedDocId) ||
    (linkedDocId && links && links['linkedDoc'])
  ) {
    aItem.set(
      'links.linkedDoc.href',
      `/authoring/v1/content/${getDeliveryId(id)}`
    );
  }

  if (isNotNil(links)) {
    if (isNotNil(links['createDraft'])) {
      // is published item
      aItem.del('links.createDraft');
    }
  }

  // set the creation information
  if (isNil(created)) {
    aItem.set('created', date);
    if (isNotNil(aUser)) {
      aItem.set('creatorId', aUser.id);
    }
  }

  if (classification === CLASSIFICATION_ASSET) {
    aItem.set('status', Status.READY);
  } else {
    // make sure to update the status to draft
    aItem.set('status', Status.DRAFT);
    aItem.set('draftStatus', DraftStatus.IN_PROGRESS);
  }

  return aItem;
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
      width: getPath(aAsset, ['metadata', 'width'], -1),
      mediaType: aAsset.mediaType,
      resourceUri: getPath(aAsset, ['renditions', 'default', 'source']),
      height: getPath(aAsset, ['metadata', 'height'], -1)
    };
  } else {
    return { id: getDeliveryIdFromAuthoringItem(aAsset) };
  }
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

export function updateImageElement(
  aAccessor: AccessorType,
  aItem: Updater<AuthoringContentItem>,
  aAsset: AuthoringAsset
): Updater<AuthoringContentItem> {
  // original item
  const oldItem = aItem.get();
  // parse the accessor
  const path = parsePath(aAccessor);
  const parentPath = path.slice(0, -1);

  // access the parent element
  const parent = getPath(oldItem, parentPath);

  // get the original item to make a copy
  const originalImage = getPath(oldItem, path);
  const mode = getProperty<any, 'mode'>(
    originalImage,
    'mode',
    IMAGE_ELEMENT_MODE_SNAPSHOT
  );
  const altText = getProperty<any, 'altText'>(originalImage, 'altText');
  const link = getProperty<any, 'link'>(originalImage, 'link');

  // image properties to copy
  const baseImage = { altText, link, mode };

  const asset = getAssetDetails(mode, aAsset);

  // element type and mode are already set on the parent element, only add asset reference
  const img = {
    ...baseImage,
    elementType: ELEMENT_TYPE_IMAGE,
    asset
  };

  aItem.set(aAccessor, img);

  if (isArray(parent)) {
    // replace all undefined values in the array
    // if the accessor points to the n-th element of an array and the array is empty, all elements
    // before the n-th element are set to undefined by updateValueByAccessor
    replaceInArray(getPath(aItem.get(), parentPath), undefined, {});
  }

  // ok
  return aItem;
}

export function updateVideoElement(
  aAccessor: AccessorType,
  aItem: Updater<AuthoringContentItem>,
  aAsset: AuthoringAsset
): Updater<AuthoringContentItem> {
  // original item
  const oldItem = aItem.get();
  // parse the accessor
  const path = parsePath(aAccessor);
  const parentPath = path.slice(0, -1);

  // access the parent element
  const parent = getPath(oldItem, parentPath);

  const asset = {
    id: getDeliveryIdFromAuthoringItem(aAsset),
    fileName: aAsset.fileName,
    fileSize: aAsset.fileSize,
    mediaType: aAsset.mediaType,
    resourceUri: 'authoring/v1/resources/' + aAsset.resource
  };

  // element type and mode are already set on the parent element, only add asset reference
  const video = {
    elementType: ELEMENT_TYPE_VIDEO,
    asset
  };

  aItem.set(aAccessor, video);

  if (isArray(parent)) {
    // replace all undefined values in the array
    // if the accessor points to the n-th element of an array and the array is empty, all elements
    // before the n-th element are set to undefined by updateValueByAccessor
    replaceInArray(getPath(aItem.get(), parentPath), undefined, {});
  }

  // ok
  return aItem;
}

/**
 * Retrieves a property value by accessor
 */
export const getValueByAccessor = <T>(
  aItem: BaseAuthoringItem,
  aAccessor: AccessorType
): T => getPath(aItem, parsePath(aAccessor));

/**
 * Updates a single property based on the accessor expression.
 *
 * @param aAccessor - the accessor expression that points
 * @param aValue - the new value
 * @param aItem - the item to update
 *
 * @returns a copy of the item with the modified value
 */
export function updateValueByAccessor<T extends BaseAuthoringItem>(
  aAccessor: AccessorType,
  aValue: any,
  aItem: T,
  aUser?: User
): Updater<T> {
  // construct the updater
  const upd = createUpdater(aItem);
  // update some generic properties
  updateGenericProperties(upd, aUser);
  // set the value
  upd.set(aAccessor, aValue);
  // ok
  return upd;
}

export function removeArrayItemByAccessor<T extends BaseAuthoringItem>(
  aAccessor: AccessorType,
  aItem: T,
  aUser?: User
): Updater<T> {
  const updater = createUpdater(aItem);
  if (isNotNil(aItem)) {
    updateGenericProperties(updater, aUser);

    // parse the path
    const path = parsePath(aAccessor);
    if (isNotEmpty(path)) {
      // access the host
      const host = getPath(aItem, path.slice(0, -1));
      if (isArray(host)) {
        const key = parseInt(path[path.length - 1], 10);
        if (!isNaN(key)) {
          updater.del(aAccessor);
        }
      }
    }
  }
  // returns the updater
  return updater;
}
