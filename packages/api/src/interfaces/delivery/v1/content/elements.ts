export type ELEMENT_TYPE =
  | 'text'
  | 'number'
  | 'toggle'
  | 'formattedtext'
  | 'link'
  | 'datetime'
  | 'file'
  | 'video'
  | 'image'
  | 'reference'
  | 'category'
  | 'location'
  | 'optionselection'
  | 'group'
  | 'variabletype'
  | 'product';

const _ELEMENT_TYPE_PRODUCT = 'product';
const _ELEMENT_TYPE_GROUP = 'group';
const _ELEMENT_TYPE_OPTION_SELECTION = 'optionselection';
const _ELEMENT_TYPE_TEXT = 'text';
const _ELEMENT_TYPE_FORMATTED_TEXT = 'formattedtext';
const _ELEMENT_TYPE_NUMBER = 'number';
const _ELEMENT_TYPE_TOGGLE = 'toggle';
const _ELEMENT_TYPE_LINK = 'link';
const _ELEMENT_TYPE_DATE = 'datetime';
const _ELEMENT_TYPE_CATEGORY = 'category';
const _ELEMENT_TYPE_FILE = 'file';
const _ELEMENT_TYPE_VIDEO = 'video';
const _ELEMENT_TYPE_IMAGE = 'image';
const _ELEMENT_TYPE_REFERENCE = 'reference';
const _ELEMENT_TYPE_LOCATION = 'location';
const _ELEMENT_TYPE_VARIABLE = 'variabletype';

export {
  _ELEMENT_TYPE_CATEGORY as ELEMENT_TYPE_CATEGORY,
  _ELEMENT_TYPE_DATE as ELEMENT_TYPE_DATE,
  _ELEMENT_TYPE_LINK as ELEMENT_TYPE_LINK,
  _ELEMENT_TYPE_VIDEO as ELEMENT_TYPE_VIDEO,
  _ELEMENT_TYPE_IMAGE as ELEMENT_TYPE_IMAGE,
  _ELEMENT_TYPE_TEXT as ELEMENT_TYPE_TEXT,
  _ELEMENT_TYPE_PRODUCT as ELEMENT_TYPE_PRODUCT,
  _ELEMENT_TYPE_FORMATTED_TEXT as ELEMENT_TYPE_FORMATTED_TEXT,
  _ELEMENT_TYPE_NUMBER as ELEMENT_TYPE_NUMBER,
  _ELEMENT_TYPE_TOGGLE as ELEMENT_TYPE_TOGGLE,
  _ELEMENT_TYPE_FILE as ELEMENT_TYPE_FILE,
  _ELEMENT_TYPE_REFERENCE as ELEMENT_TYPE_REFERENCE,
  _ELEMENT_TYPE_LOCATION as ELEMENT_TYPE_LOCATION,
  _ELEMENT_TYPE_OPTION_SELECTION as ELEMENT_TYPE_OPTION_SELECTION,
  _ELEMENT_TYPE_GROUP as ELEMENT_TYPE_GROUP,
  _ELEMENT_TYPE_VARIABLE as ELEMENT_TYPE_VARIABLE
};
