import {
  AuthoringAsset,
  AuthoringContentItem,
  CLASSIFICATION_CONTENT
} from "@acoustic-content-sdk/api";
import { isNotNil, isString } from "@acoustic-content-sdk/utils";

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

export function isAuthoringAsset(aValue: any): aValue is AuthoringAsset {
  return isBaseItem("asset", aValue);
}
