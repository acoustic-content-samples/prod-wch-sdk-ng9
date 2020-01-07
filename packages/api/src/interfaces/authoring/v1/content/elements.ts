import {
  ELEMENT_TYPE_GROUP,
  ELEMENT_TYPE_IMAGE,
  ELEMENT_TYPE_REFERENCE,
  ELEMENT_TYPE_TEXT,
  ELEMENT_TYPE_VIDEO
} from '../../../delivery/v1/content/elements';
import {
  Image,
  Video
} from '../../../delivery/v1/rendering/context/rendering.context';
import { KEY_ID } from '../../../delivery/v2/content.item';
import { Status } from '../../../status';

export const KEY_ELEMENT_TYPE = 'elementType';
export const KEY_VALUE = 'value';
export const KEY_VALUES = 'values';
export const KEY_NAME = 'name';
export const KEY_STATUS = 'status';
export const KEY_TYPE_ID = 'typeId';
export const KEY_CREATOR_ID = 'creatorId';
export const KEY_TYPE_REF = 'typeRef';

export interface AuthoringText {
  [KEY_ELEMENT_TYPE]: typeof ELEMENT_TYPE_TEXT;
  [KEY_VALUE]?: string;
  [KEY_VALUES]?: string[];
}

export interface AuthoringImage {
  [KEY_ELEMENT_TYPE]: typeof ELEMENT_TYPE_IMAGE;
  [KEY_VALUES]?: Image[];
}

export interface AuthoringVideo {
  [KEY_ELEMENT_TYPE]: typeof ELEMENT_TYPE_VIDEO;
  [KEY_VALUES]?: Video[];
}

export interface AuthoringReferenceValue {
  [KEY_ID]: string;
  [KEY_NAME]?: string;
  [KEY_STATUS]?: Status;
  [KEY_TYPE_ID]?: string;
  [KEY_CREATOR_ID]?: string;
}

export interface AuthoringReference {
  [KEY_ELEMENT_TYPE]: typeof ELEMENT_TYPE_REFERENCE;
  [KEY_VALUE]?: AuthoringReferenceValue[];
  [KEY_VALUES]?: AuthoringReferenceValue[];
}

export interface AuthoringGroup<T> {
  [KEY_ELEMENT_TYPE]: typeof ELEMENT_TYPE_GROUP;
  [KEY_TYPE_REF]: AuthoringReferenceValue;
  [KEY_VALUE]?: T;
  [KEY_VALUES]?: T[];
}
