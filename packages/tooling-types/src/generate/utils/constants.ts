import {
  ELEMENT_TYPE_CATEGORY,
  ELEMENT_TYPE_DATE,
  ELEMENT_TYPE_FILE,
  ELEMENT_TYPE_FORMATTED_TEXT,
  ELEMENT_TYPE_IMAGE,
  ELEMENT_TYPE_LINK,
  ELEMENT_TYPE_LOCATION,
  ELEMENT_TYPE_NUMBER,
  ELEMENT_TYPE_OPTION_SELECTION,
  ELEMENT_TYPE_REFERENCE,
  ELEMENT_TYPE_TEXT,
  ELEMENT_TYPE_TOGGLE,
  ELEMENT_TYPE_VIDEO
} from '@acoustic-content-sdk/api';

function createTypes() {
  const TMP_TYPES: { [key: string]: string } = {};
  TMP_TYPES[ELEMENT_TYPE_TEXT] = 'string';
  TMP_TYPES[ELEMENT_TYPE_NUMBER] = 'number';
  TMP_TYPES[ELEMENT_TYPE_TOGGLE] = 'boolean';
  TMP_TYPES[ELEMENT_TYPE_FORMATTED_TEXT] = 'string';
  TMP_TYPES[ELEMENT_TYPE_LINK] = 'Link';
  TMP_TYPES[ELEMENT_TYPE_DATE] = 'string';
  TMP_TYPES[ELEMENT_TYPE_FILE] = 'File';
  TMP_TYPES[ELEMENT_TYPE_VIDEO] = 'Video';
  TMP_TYPES[ELEMENT_TYPE_IMAGE] = 'Image';
  TMP_TYPES[ELEMENT_TYPE_OPTION_SELECTION] = 'string';
  TMP_TYPES[ELEMENT_TYPE_REFERENCE] = 'DeliveryReferenceElement';
  TMP_TYPES[ELEMENT_TYPE_CATEGORY] = 'Category';
  TMP_TYPES[ELEMENT_TYPE_LOCATION] = 'Location';

  return TMP_TYPES;
}

function createAugmentedTypes() {
  const TMP_AUGMENTED_TYPES: { [key: string]: string } = {};
  TMP_AUGMENTED_TYPES['Image'] = 'SingleImageElement';
  TMP_AUGMENTED_TYPES['Video'] = 'SingleVideoElement';
  TMP_AUGMENTED_TYPES['File'] = 'SingleFileElement';
  TMP_AUGMENTED_TYPES['Link'] = 'SingleLinkElement';
  TMP_AUGMENTED_TYPES['Category'] = 'CategoryElement';
  TMP_AUGMENTED_TYPES['Location'] = 'LocationElement';
  return TMP_AUGMENTED_TYPES;
}

function createDefaultValues() {
  const TMP_DEFAULT_VALUES: { [key: string]: string } = {};
  TMP_DEFAULT_VALUES[ELEMENT_TYPE_TEXT] = '\u0027\u0027';
  TMP_DEFAULT_VALUES[ELEMENT_TYPE_NUMBER] = '0';
  TMP_DEFAULT_VALUES[ELEMENT_TYPE_TOGGLE] = 'false';
  TMP_DEFAULT_VALUES[ELEMENT_TYPE_FORMATTED_TEXT] = '\u0027\u0027';
  return TMP_DEFAULT_VALUES;
}

export const BUILT_IN_TYPES = ['string', 'number', 'boolean', 'Date'];

export const TYPES = createTypes();
export const AUGMENTED_TYPES = createAugmentedTypes();
export const DEFAULT_VALUES = createDefaultValues();
