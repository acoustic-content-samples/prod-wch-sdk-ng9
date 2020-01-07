import {
  AuthoringGroup,
  AuthoringImage,
  AuthoringReference,
  AuthoringReferenceValue,
  AuthoringText,
  AuthoringVideo,
  ELEMENT_TYPE_GROUP,
  ELEMENT_TYPE_IMAGE,
  ELEMENT_TYPE_REFERENCE,
  ELEMENT_TYPE_TEXT,
  ELEMENT_TYPE_VIDEO,
  Image,
  KEY_CREATOR_ID,
  KEY_ELEMENT_TYPE,
  KEY_ID,
  KEY_NAME,
  KEY_TYPE_ID,
  KEY_TYPE_REF,
  KEY_VALUE,
  KEY_VALUES
} from '@acoustic-content-sdk/api';

import { isImage, isVideo } from '../elements/element';
import {
  isNotNil,
  isOptional,
  isOptionalArrayOf,
  isString
} from '../predicates/predicates';

export function isAuthoringText(value: any): value is AuthoringText {
  return (
    isNotNil(value) &&
    value[KEY_ELEMENT_TYPE] === ELEMENT_TYPE_TEXT &&
    isOptional(value[KEY_VALUE], isString) &&
    isOptionalArrayOf(value[KEY_VALUES], isString)
  );
}

function isOptionalImage(aValue: any): aValue is Image {
  return isImage(aValue, true);
}

export function isAuthoringImage(value: any): value is AuthoringImage {
  return (
    isNotNil(value) &&
    value[KEY_ELEMENT_TYPE] === ELEMENT_TYPE_IMAGE &&
    isOptionalImage(value) &&
    isOptionalArrayOf(value[KEY_VALUES], isOptionalImage)
  );
}

function isOptionalVideo(aValue: any): aValue is Image {
  return isVideo(aValue, true);
}

export function isAuthoringVideo(value: any): value is AuthoringVideo {
  return (
    isNotNil(value) &&
    value[KEY_ELEMENT_TYPE] === ELEMENT_TYPE_VIDEO &&
    isOptionalVideo(value) &&
    isOptionalArrayOf(value[KEY_VALUES], isOptionalVideo)
  );
}

export function isAuthoringReferenceValue(
  value: any
): value is AuthoringReferenceValue {
  return (
    isNotNil(value) &&
    isString(value[KEY_ID]) &&
    isOptional(value[KEY_NAME], isString) &&
    isOptional(value[KEY_TYPE_ID], isString) &&
    isOptional(value[KEY_CREATOR_ID], isString)
  );
}

export function isAuthoringReference(value: any): value is AuthoringReference {
  return (
    isNotNil(value) &&
    value[KEY_ELEMENT_TYPE] === ELEMENT_TYPE_REFERENCE &&
    isOptional(value[KEY_VALUE], isAuthoringReferenceValue) &&
    isOptionalArrayOf(value[KEY_VALUES], isAuthoringReferenceValue)
  );
}

export function isAuthoringGroup<T>(value: any): value is AuthoringGroup<T> {
  return (
    isNotNil(value) &&
    value[KEY_ELEMENT_TYPE] === ELEMENT_TYPE_GROUP &&
    isAuthoringReferenceValue(value[KEY_TYPE_REF])
  );
}
