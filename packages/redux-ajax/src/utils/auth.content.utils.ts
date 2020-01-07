import { BaseAuthoringItem } from '@acoustic-content-sdk/api';
import { isNotNil, isString } from '@acoustic-content-sdk/utils';

export function isBaseAuthoringItem(aValue: any): aValue is BaseAuthoringItem {
  return (
    isNotNil(aValue) && isString(aValue.id) && isString(aValue.classification)
  );
}
