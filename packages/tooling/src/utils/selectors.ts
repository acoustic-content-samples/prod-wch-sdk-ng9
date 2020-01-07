import {
  AuthoringLayoutMapping,
  BaseAuthoringItem,
  AuthoringLayoutItem
} from '@acoustic-content-sdk/api';
import { getPath, parsePath, getProperty } from '@acoustic-content-sdk/utils';
import { kebabCase } from './names';

export function selectId(aItem: BaseAuthoringItem): string {
  return aItem.linkedDocId || aItem.id;
}

const TYPE_ID_PATH = parsePath('type.id');

export function selectTypeId(aMapping: AuthoringLayoutMapping): string {
  return getPath(aMapping, TYPE_ID_PATH);
}

export function selectPath(
  aLayout: AuthoringLayoutItem | AuthoringLayoutMapping
): string {
  return getProperty(aLayout, 'path') || `/${kebabCase(aLayout.id)}.json`;
}
