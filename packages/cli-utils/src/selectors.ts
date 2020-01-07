import {
  AuthoringLayout,
  AuthoringLayoutMapping,
  BaseAuthoringItem
} from '@acoustic-content-sdk/api';

export function selectId(aItem: BaseAuthoringItem): string {
  return aItem.linkedDocId || aItem.id;
}

export function selectSimpleId(
  aItem: AuthoringLayout | AuthoringLayoutMapping
): string {
  return aItem.id;
}
