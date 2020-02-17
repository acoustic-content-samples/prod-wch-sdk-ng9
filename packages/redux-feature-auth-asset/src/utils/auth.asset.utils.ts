import {
  AuthoringAsset,
  CLASSIFICATION_ASSET
} from '@acoustic-content-sdk/api';
import { isNotNil } from '@acoustic-content-sdk/utils';
import { isString } from 'util';

function isBaseItem(aClassification: string, aValue: any): boolean {
  return (
    isNotNil(aValue) &&
    isString(aValue.id) &&
    aValue.classification === aClassification
  );
}

export function isAuthoringAsset(aValue: any): aValue is AuthoringAsset {
  return isBaseItem(CLASSIFICATION_ASSET, aValue);
}
