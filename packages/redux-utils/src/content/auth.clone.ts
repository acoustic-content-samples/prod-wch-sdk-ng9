import {
  AuthoringAsset,
  AuthoringContentItem,
  CLASSIFICATION_CONTENT,
  ELEMENT_TYPE_TEXT,
  KEY_ID
} from '@acoustic-content-sdk/api';
import {
  isArray,
  isNotNil,
  isPlainObject,
  isString,
  mapArray,
  pluckPath,
  reduceArray
} from '@acoustic-content-sdk/utils';
import { v4 } from 'uuid';

import { getDeliveryIdFromAuthoringItem } from '../draft/draft.utils';
import { createUpdater, Updater } from '../update/update';

export type AuthoringItem = AuthoringContentItem | AuthoringAsset;

interface CloneItemRecursivlyResult {
  items: AuthoringItem[];
  rootItem: AuthoringContentItem;
  index: number;
}

const updateIdentifiers = (
  item: any,
  accessor: string,
  updater: Updater<AuthoringItem>,
  idMap: Record<string, string>
): void => {
  const keys = Object.keys(item);

  for (const key of keys) {
    const value = item[key];
    if (key === KEY_ID && isString(value)) {
      const newID = idMap[value];
      if (isNotNil(newID)) {
        updater.set(`${accessor}${key}`, newID);
      }
    } else if (isPlainObject(value)) {
      updateIdentifiers(value, `${accessor}${key}.`, updater, idMap);
    } else if (isArray(value)) {
      value.forEach(
        (valueItem, idx) =>
          isPlainObject(valueItem) &&
          updateIdentifiers(
            valueItem,
            `${accessor}${key}[${idx}].`,
            updater,
            idMap
          )
      );
    }
  }
};

const selectKeyType = pluckPath<string>([
  'elements',
  'proxy',
  'value',
  'key',
  'elementType'
]);

function isItemWithKey(aValue: any): aValue is AuthoringContentItem {
  return (
    isNotNil(aValue) &&
    aValue.classification === CLASSIFICATION_CONTENT &&
    selectKeyType(aValue) === ELEMENT_TYPE_TEXT
  );
}

function reduceId(
  aDst: Record<string, string>,
  aItem: AuthoringItem
): Record<string, string> {
  const newId = v4();
  aDst[aItem.id] = newId;
  aDst[getDeliveryIdFromAuthoringItem(aItem)] = newId;
  return aDst;
}

/**
 * Clone items
 *
 * @param items - array of authoring content items and assets, they should be ordered using {@link resolveItems}
 * @returns the cloned items
 */
const cloneItems = (items: AuthoringItem[]): AuthoringItem[] => {
  // construct new IDs
  const idMap: Record<string, string> = reduceArray(items, reduceId, {});

  // iterate the items in reverse order
  return mapArray(items, (item: AuthoringItem) => {
    // create a clone
    const updater = createUpdater(item);
    updater.set('created', undefined);
    updater.set('creatorId', undefined);
    updater.set('description', undefined);
    updater.set('linkedDocId', undefined);

    switch (item.classification) {
      case 'asset':
        updater.set('cognitive', undefined);
        updater.set('path', undefined);
        updater.set('tags', {});
        break;
      case CLASSIFICATION_CONTENT:
        updater.set('tags', []);
        break;
    }

    // update the key
    if (isItemWithKey(item)) {
      const nuid = v4();
      updater.set('elements.proxy.value.key.value', nuid);
    }

    // update identifiers
    updateIdentifiers(item, '', updater, idMap);

    return updater.get();
  });
};

export { CloneItemRecursivlyResult, cloneItems };
