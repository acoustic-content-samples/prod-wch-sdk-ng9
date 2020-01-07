import { AuthoringLayoutMapping, BaseAuthoringItem } from '@acoustic-content-sdk/api';
import { getPath, parsePath } from '@acoustic-content-sdk/utils';

export function selectId(aItem: BaseAuthoringItem): string {
  return aItem.linkedDocId || aItem.id;
}

const TYPE_ID_PATH = parsePath('type.id');

export function selectTypeId(aMapping: AuthoringLayoutMapping): string {
  return getPath(aMapping, TYPE_ID_PATH);
}
