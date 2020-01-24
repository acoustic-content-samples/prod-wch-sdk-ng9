import {
  Asset,
  Category,
  CategoryElement,
  DateElement,
  Element,
  ELEMENT_TYPE,
  ELEMENT_TYPE_CATEGORY,
  ELEMENT_TYPE_DATE,
  ELEMENT_TYPE_FILE,
  ELEMENT_TYPE_FORMATTED_TEXT,
  ELEMENT_TYPE_GROUP,
  ELEMENT_TYPE_IMAGE,
  ELEMENT_TYPE_LINK,
  ELEMENT_TYPE_LOCATION,
  ELEMENT_TYPE_NUMBER,
  ELEMENT_TYPE_OPTION_SELECTION,
  ELEMENT_TYPE_PRODUCT,
  ELEMENT_TYPE_REFERENCE,
  ELEMENT_TYPE_TEXT,
  ELEMENT_TYPE_TOGGLE,
  ELEMENT_TYPE_VIDEO,
  File,
  FileElement,
  FormattedTextElement,
  Group,
  GroupElement,
  Image,
  ImageElement,
  Link,
  LinkElement,
  Location,
  LocationElement,
  MultiDateElement,
  MultiFileElement,
  MultiFormattedTextElement,
  MultiGroupElement,
  MultiImageElement,
  MultiLinkElement,
  MultiNumberElement,
  MultiOptionSelectionElement,
  MultiProductElement,
  MultiReferenceElement,
  MultiTextElement,
  MultiToggleElement,
  MultiVideoElement,
  NumberElement,
  OptionSelection,
  OptionSelectionElement,
  ProductElement,
  ReferenceElement,
  RenderingContext,
  SingleDateElement,
  SingleFileElement,
  SingleFormattedTextElement,
  SingleGroupElement,
  SingleImageElement,
  SingleLinkElement,
  SingleNumberElement,
  SingleOptionSelectionElement,
  SingleProductElement,
  SingleReferenceElement,
  SingleTextElement,
  SingleToggleElement,
  SingleVideoElement,
  TextElement,
  ToggleElement,
  TypeRef,
  Video,
  VideoElement
} from '@acoustic-content-sdk/api';
import {
  isArrayOf,
  isBoolean,
  isFunction,
  isNil,
  isNotNil,
  isNumber,
  isObjectOf,
  isPlainObject,
  IsPredicate,
  isString
} from './../predicates/predicates';

/* Copyright IBM Corp. 2017 */
const _PROP_TYPE = 'elementType';
const _PROP_VALUE = 'value';
const _PROP_VALUES = 'values';
const _PROP_SELECTION = 'selection';
const _PROP_TYPE_REF = 'typeRef';
const _PROP_ID = 'id';

function _isType(aType: string, aValue: any | null | undefined): boolean {
  return isNotNil(aValue) && aValue[_PROP_TYPE] === aType;
}

function _isTypeRef(aValue: any): aValue is TypeRef {
  return (
    isNotNil(aValue) && isPlainObject(aValue) && isString(aValue[_PROP_ID])
  );
}

/**
 * Tests if an element is an option selection element
 *
 * @param aValue - the value to test
 * @returns the type assertion
 */
function _isOptionSelectionElement(
  aValue: any
): aValue is OptionSelectionElement {
  return _isType(ELEMENT_TYPE_OPTION_SELECTION, aValue);
}

function _isOptionSelection(
  aValue: any,
  bOptional?: boolean
): aValue is OptionSelection {
  return (
    (bOptional && isNil(aValue)) ||
    (isPlainObject(aValue) && isString(aValue[_PROP_SELECTION]))
  );
}

function _isArrayOf<T>(
  aValue: any,
  aPredicate: IsPredicate<T>,
  bOptional?: boolean
): boolean {
  return (bOptional && isNil(aValue)) || isArrayOf(aValue, aPredicate);
}

/**
 * Tests if an element is an option selection element
 *
 * @param aValue - the value to test
 * @returns the type assertion
 */
function _isSingleOptionSelectionElement(
  aValue: any,
  bOptional?: boolean
): aValue is SingleOptionSelectionElement {
  return (
    _isOptionSelectionElement(aValue) &&
    _isOptionSelection(aValue[_PROP_VALUE], bOptional)
  );
}

/**
 * Tests if an element is an option selection element
 *
 * @param aValue - the value to test
 * @returns the type assertion
 */
function _isMultiOptionSelectionElement(
  aValue: any,
  bOptional?: boolean
): aValue is MultiOptionSelectionElement {
  return (
    _isOptionSelectionElement(aValue) &&
    _isArrayOf(aValue[_PROP_VALUES], _isOptionSelection, bOptional)
  );
}

/**
 * Tests if an element is a text element
 *
 * @param aValue - the value to test
 * @returns the type assertion
 */
function _isTextElement(aValue: any): aValue is TextElement {
  return _isType(ELEMENT_TYPE_TEXT, aValue);
}

function _isProductElement(aValue: any): aValue is ProductElement {
  return _isType(ELEMENT_TYPE_PRODUCT, aValue);
}

function _isString(aValue: any, bOptional?: boolean): aValue is string {
  return (bOptional && isNil(aValue)) || isString(aValue);
}

function _isNumber(aValue: any, bOptional?: boolean): aValue is number {
  return (bOptional && isNil(aValue)) || isNumber(aValue);
}

function _isBoolean(aValue: any, bOptional?: boolean): aValue is boolean {
  return (bOptional && isNil(aValue)) || isBoolean(aValue);
}

/**
 * Tests if an element is a text element
 *
 * @param aValue - the value to test
 * @returns the type assertion
 */
function _isSingleTextElement(
  aValue: any,
  bOptional?: boolean
): aValue is SingleTextElement {
  return _isTextElement(aValue) && _isString(aValue[_PROP_VALUE], bOptional);
}

/**
 * Tests if an element is a text element
 *
 * @param aValue - the value to test
 * @returns the type assertion
 */
function _isMultiTextElement(
  aValue: any,
  bOptional?: boolean
): aValue is MultiTextElement {
  return (
    _isTextElement(aValue) &&
    _isArrayOf(aValue[_PROP_VALUES], isString, bOptional)
  );
}

/**
 * Tests if an element is a text element
 *
 * @param aValue - the value to test
 * @returns the type assertion
 */
function _isSingleProductElement(
  aValue: any,
  bOptional?: boolean
): aValue is SingleProductElement {
  return _isProductElement(aValue) && _isString(aValue[_PROP_VALUE], bOptional);
}

/**
 * Tests if an element is a text element
 *
 * @param aValue - the value to test
 * @returns the type assertion
 */
function _isMultiProductElement(
  aValue: any,
  bOptional?: boolean
): aValue is MultiProductElement {
  return (
    _isProductElement(aValue) &&
    _isArrayOf(aValue[_PROP_VALUES], isString, bOptional)
  );
}

function _isDate(aValue: any, bOptional?: boolean): boolean {
  return _isString(aValue, bOptional);
}

/**
 * Tests if an element is a date element
 *
 * @param aValue - the value to test
 * @returns the type assertion
 */
function _isSingleDateElement(
  aValue: any,
  bOptional?: boolean
): aValue is SingleDateElement {
  return _isDateElement(aValue) && _isDate(aValue[_PROP_VALUE], bOptional);
}

/**
 * Tests if an element is a text element
 *
 * @param aValue - the value to test
 * @returns the type assertion
 */
function _isMultiDateElement(
  aValue: any,
  bOptional?: boolean
): aValue is MultiDateElement {
  return (
    _isDateElement(aValue) &&
    _isArrayOf(aValue[_PROP_VALUES], isString, bOptional)
  );
}

/**
 * Tests if an element is a Group element
 *
 * @param aValue - the value to test
 * @returns the type assertion
 */
function _isGroupElement(
  aValue: any,
  bOptional?: boolean
): aValue is GroupElement {
  return (
    _isType(ELEMENT_TYPE_GROUP, aValue) && _isTypeRef(aValue[_PROP_TYPE_REF])
  );
}

/**
 * Make a flat check for an element
 *
 * @param aValue - the value to test
 * @returns true if the value is an element, else false
 */
function _flatIsElement(aValue: any): aValue is Element {
  // check if the element exists
  return isPlainObject(aValue) && isString(aValue[_PROP_TYPE]);
}

/**
 * Tests if the value is a vaid group
 *
 * @param aValue - the value
 * @returns true if the value is a group, else false
 */
function _isGroup(aValue: any, bOptional?: boolean): aValue is Group {
  return isObjectOf(aValue, _flatIsElement);
}

/**
 * Tests if an element is a Group element
 *
 * @param aValue - the value to test
 * @returns the type assertion
 */
function _isSingleGroupElement(
  aValue: any,
  bOptional?: boolean
): aValue is SingleGroupElement {
  return _isGroupElement(aValue) && _isGroup(aValue[_PROP_VALUE], bOptional);
}

/**
 * Tests if an element is a Group element
 *
 * @param aValue - the value to test
 * @returns the type assertion
 */
function _isMultiGroupElement(
  aValue: any,
  bOptional?: boolean
): aValue is MultiGroupElement {
  return (
    _isGroupElement(aValue) &&
    _isArrayOf(aValue[_PROP_VALUES], _isGroup, bOptional)
  );
}

/**
 * Tests if an element is a text element
 *
 * @param aValue - the value to test
 * @returns the type assertion
 */
function _isFormattedTextElement(aValue: any): aValue is FormattedTextElement {
  return _isType(ELEMENT_TYPE_FORMATTED_TEXT, aValue);
}

/**
 * Tests if an element is a text element
 *
 * @param aValue - the value to test
 * @returns the type assertion
 */
function _isSingleFormattedTextElement(
  aValue: any,
  bOptional?: boolean
): aValue is SingleFormattedTextElement {
  return (
    _isFormattedTextElement(aValue) && _isString(aValue[_PROP_VALUE], bOptional)
  );
}

/**
 * Tests if an element is a text element
 *
 * @param aValue - the value to test
 * @returns the type assertion
 */
function _isMultiFormattedTextElement(
  aValue: any,
  bOptional?: boolean
): aValue is MultiFormattedTextElement {
  return (
    _isFormattedTextElement(aValue) &&
    _isArrayOf(aValue[_PROP_VALUES], isString, bOptional)
  );
}

/**
 * Tests if an element is a number element
 *
 * @param aValue - the value to test
 * @returns the type assertion
 */
function _isNumberElement(aValue: any): aValue is NumberElement {
  return _isType(ELEMENT_TYPE_NUMBER, aValue);
}

/**
 * Tests if an element is a number element
 *
 * @param aValue - the value to test
 * @returns the type assertion
 */
function _isSingleNumberElement(
  aValue: any,
  bOptional?: boolean
): aValue is SingleNumberElement {
  return _isNumberElement(aValue) && _isNumber(aValue[_PROP_VALUE], bOptional);
}

/**
 * Tests if an element is a number element
 *
 * @param aValue - the value to test
 * @returns the type assertion
 */
function _isMultiNumberElement(
  aValue: any,
  bOptional?: boolean
): aValue is MultiNumberElement {
  return (
    _isNumberElement(aValue) &&
    _isArrayOf(aValue[_PROP_VALUES], isNumber, bOptional)
  );
}

/**
 * Tests if an element is a toggle element
 *
 * @param aValue - the value to test
 * @returns the type assertion
 */
function _isToggleElement(
  aValue: any,
  bOptional?: boolean
): aValue is ToggleElement {
  return _isType(ELEMENT_TYPE_TOGGLE, aValue);
}

/**
 * Tests if an element is a toggle element
 *
 * @param aValue - the value to test
 * @returns the type assertion
 */
function _isSingleToggleElement(
  aValue: any,
  bOptional?: boolean
): aValue is SingleToggleElement {
  return _isToggleElement(aValue) && _isBoolean(aValue[_PROP_VALUE], bOptional);
}

/**
 * Tests if an element is a toggle element
 *
 * @param aValue - the value to test
 * @returns the type assertion
 */
function _isMultiToggleElement(
  aValue: any,
  bOptional?: boolean
): aValue is MultiToggleElement {
  return (
    _isToggleElement(aValue) &&
    _isArrayOf(aValue[_PROP_VALUES], isBoolean, bOptional)
  );
}

/**
 * Tests if an element is a link element
 *
 * @param aValue - the value to test
 * @returns the type assertion
 */
function _isLinkElement(aValue: any): aValue is LinkElement {
  return _isType(ELEMENT_TYPE_LINK, aValue);
}

/**
 * Tests if an element is a date element
 *
 * @param aValue - the value to test
 * @returns the type assertion
 */
function _isDateElement(aValue: any): aValue is DateElement {
  return _isType(ELEMENT_TYPE_DATE, aValue);
}

function _isCategory(aValue: any, bOptional?: boolean): aValue is Category {
  // make the required checks
  return bOptional
    ? isNil(aValue) || isPlainObject(aValue)
    : isPlainObject(aValue) &&
        (_isArrayOf(aValue['categoryIds'], _isString, bOptional) ||
          _isArrayOf(aValue['categories'], _isString, bOptional));
}

/**
 * Tests if an element is a category element
 *
 * @param aValue - the value to test
 * @returns the type assertion
 */
function _isCategoryElement(
  aValue: any,
  bOptional?: boolean
): aValue is CategoryElement {
  return (
    _isType(ELEMENT_TYPE_CATEGORY, aValue) && _isCategory(aValue, bOptional)
  );
}

/**
 * Tests if an element is a file element
 *
 * @param aValue - the value to test
 * @returns the type assertion
 */
function _isFileElement(aValue: any): aValue is FileElement {
  return _isType(ELEMENT_TYPE_FILE, aValue);
}

/**
 * Tests the value is a valid asset
 *
 * @param aValue - the value
 * @param bOptional - flag to test if the asset is optional
 *
 * @returns true if the element is an asset
 */
function _isAsset(aValue: any, bOptional?: boolean): aValue is Asset {
  return bOptional
    ? isNil(aValue) || isPlainObject(aValue)
    : isPlainObject(aValue) && isString(aValue['id']);
}

/**
 * Tests if an element has at least an asset and a URL
 *
 * @param aValue - the value to check
 * @param bOptional - flag to test if the video is optional
 *
 * @returns true if we have an video, else false
 */
function _hasAssetAndUrl(aValue: any, bOptional?: boolean): boolean {
  // make the required checks
  return bOptional
    ? isNil(aValue) || isPlainObject(aValue)
    : isPlainObject(aValue) &&
        _isAsset(aValue['asset']) &&
        isString(aValue['url']);
}

/**
 * Tests if an element is a video. If the element is optional, it can be null or an arbitrary
 * object. Otherwise we must have at least an asset and a URL.
 *
 * @param aValue - the value to check
 * @param bOptional - flag to test if the video is optional
 *
 * @returns true if we have an video, else false
 */
function _isFile(aValue: any, bOptional?: boolean): aValue is File {
  // make the required checks
  return _hasAssetAndUrl(aValue, bOptional);
}

/**
 * Tests if an element is a video. If the element is optional, it can be null or an arbitrary
 * object. Otherwise we must have at least an asset and a URL.
 *
 * @param aValue - the value to check
 * @param bOptional - flag to test if the video is optional
 *
 * @returns true if we have an video, else false
 */
function _isVideo(aValue: any, bOptional?: boolean): aValue is Video {
  // make the required checks
  return _hasAssetAndUrl(aValue, bOptional);
}

/**
 * Tests if we have a link element. We consider the element to exist if it has
 * at least one of its fields set.
 *
 * @param aValue - the value
 * @param bOptional - flag to test if the asset is optional
 *
 * @returns true if the element is a link
 */
function _isLink(aValue: any, bOptional?: boolean): aValue is Link {
  return bOptional
    ? isNil(aValue) || isPlainObject(aValue)
    : isPlainObject(aValue) &&
        (isString(aValue['linkURL']) ||
          isString(aValue['linkText']) ||
          isString(aValue['linkDescription']));
}

/**
 * Tests if an element is an image. If the element is optional, it can be null or an arbitrary
 * object. Otherwise we must have at least an asset and a URL.
 *
 * @param aValue - the value to check
 * @param bOptional - flag to test if the image is optional
 *
 * @returns true if we have an image, else false
 */
function _isImage(aValue: any, bOptional?: boolean): aValue is Image {
  // make the required checks
  return _hasAssetAndUrl(aValue, bOptional);
}

/**
 * Tests if an element is a file element
 *
 * @param aValue - the value to test
 * @returns the type assertion
 */
function _isSingleFileElement(
  aValue: any,
  bOptional?: boolean
): aValue is SingleFileElement {
  return _isFileElement(aValue) && _isFile(aValue, bOptional);
}

/**
 * Tests if an element is a file element
 *
 * @param aValue - the value to test
 * @returns the type assertion
 */
function _isMultiFileElement(
  aValue: any,
  bOptional?: boolean
): aValue is MultiFileElement {
  return (
    _isFileElement(aValue) &&
    _isArrayOf(aValue[_PROP_VALUES], _isFile, bOptional)
  );
}

/**
 * Tests if an element is a video element
 *
 * @param aValue - the value to test
 * @returns the type assertion
 */
function _isVideoElement(aValue: any): aValue is VideoElement {
  return _isType(ELEMENT_TYPE_VIDEO, aValue);
}

/**
 * Tests if an element is an image element
 *
 * @param aValue - the value to test
 * @returns the type assertion
 */
function _isImageElement(aValue: any): aValue is ImageElement {
  return _isType(ELEMENT_TYPE_IMAGE, aValue);
}

/**
 * Tests if an element is an image element
 *
 * @param aValue - the value to test
 * @returns the type assertion
 */
function _isSingleImageElement(
  aValue: any,
  bOptional?: boolean
): aValue is SingleImageElement {
  return _isImageElement(aValue) && _isImage(aValue, bOptional);
}

/**
 * Tests if an element is an image element
 *
 * @param aValue - the value to test
 * @returns the type assertion
 */
function _isMultiImageElement(
  aValue: any,
  bOptional?: boolean
): aValue is MultiImageElement {
  return (
    _isImageElement(aValue) &&
    _isArrayOf(aValue[_PROP_VALUES], _isImage, bOptional)
  );
}

/**
 * Tests if an element is an image element
 *
 * @param aValue - the value to test
 * @returns the type assertion
 */
function _isSingleVideoElement(
  aValue: any,
  bOptional?: boolean
): aValue is SingleVideoElement {
  return _isVideoElement(aValue) && _isVideo(aValue, bOptional);
}

/**
 * Tests if an element is an image element
 *
 * @param aValue - the value to test
 * @returns the type assertion
 */
function _isMultiVideoElement(
  aValue: any,
  bOptional?: boolean
): aValue is MultiVideoElement {
  return (
    _isVideoElement(aValue) &&
    _isArrayOf(aValue[_PROP_VALUES], _isVideo, bOptional)
  );
}

/**
 * Tests if an element is an image element
 *
 * @param aValue - the value to test
 * @returns the type assertion
 */
function _isSingleLinkElement(
  aValue: any,
  bOptional?: boolean
): aValue is SingleLinkElement {
  return _isLinkElement(aValue) && _isLink(aValue, bOptional);
}

/**
 * Tests if an element is an image element
 *
 * @param aValue - the value to test
 * @returns the type assertion
 */
function _isMultiLinkElement(
  aValue: any,
  bOptional?: boolean
): aValue is MultiLinkElement {
  return (
    _isLinkElement(aValue) &&
    _isArrayOf(aValue[_PROP_VALUES], _isLink, bOptional)
  );
}

/**
 * Tests if an element is a reference element
 *
 * @param aValue - the value to test
 * @returns the type assertion
 */
function _isReferenceElement(aValue: any): aValue is ReferenceElement {
  return _isType(ELEMENT_TYPE_REFERENCE, aValue);
}

function _isReference(
  aValue: any,
  bOptional?: boolean
): aValue is RenderingContext {
  return bOptional || isNotNil(aValue);
}

/**
 * Tests if an element is a reference element
 *
 * @param aValue - the value to test
 * @returns the type assertion
 */
function _isSingleReferenceElement(
  aValue: any,
  bOptional?: boolean
): aValue is SingleReferenceElement {
  return (
    _isReferenceElement(aValue) && _isReference(aValue[_PROP_VALUE], bOptional)
  );
}

/**
 * Tests if an element is a reference element
 *
 * @param aValue - the value to test
 * @returns the type assertion
 */
function _isMultiReferenceElement(
  aValue: any,
  bOptional?: boolean
): aValue is MultiReferenceElement {
  return (
    _isReferenceElement(aValue) &&
    _isArrayOf(aValue[_PROP_VALUES], _isReference, bOptional)
  );
}

function _isLocation(aValue: any, bOptional?: boolean): aValue is Location {
  // make the required checks
  return bOptional
    ? isNil(aValue) || isPlainObject(aValue)
    : isPlainObject(aValue) &&
        (_isNumber(aValue['latitude']) && _isNumber(aValue['longitude']));
}

/**
 * Tests if an element is a location element
 *
 * @param aValue - the value to test
 * @returns the type assertion
 */
function _isLocationElement(
  aValue: any,
  bOptional?: boolean
): aValue is LocationElement {
  return (
    _isType(ELEMENT_TYPE_LOCATION, aValue) && _isLocation(aValue, bOptional)
  );
}

function _isSomeDateElement(
  aValue: any,
  bOptional?: boolean
): aValue is SingleDateElement | MultiDateElement {
  return (
    _isSingleDateElement(aValue, bOptional) ||
    _isMultiDateElement(aValue, bOptional)
  );
}

function _isSomeFileElement(
  aValue: any,
  bOptional?: boolean
): aValue is SingleFileElement | MultiFileElement {
  return (
    _isSingleFileElement(aValue, bOptional) ||
    _isMultiFileElement(aValue, bOptional)
  );
}

function _isSomeFormattedTextElement(
  aValue: any,
  bOptional?: boolean
): aValue is SingleFormattedTextElement | MultiFormattedTextElement {
  return (
    _isSingleFormattedTextElement(aValue, bOptional) ||
    _isMultiFormattedTextElement(aValue, bOptional)
  );
}

function _isSomeGroupElement(
  aValue: any,
  bOptional?: boolean
): aValue is SingleGroupElement | MultiGroupElement {
  return (
    _isSingleGroupElement(aValue, bOptional) ||
    _isMultiGroupElement(aValue, bOptional)
  );
}

function _isSomeImageElement(
  aValue: any,
  bOptional?: boolean
): aValue is SingleImageElement | MultiImageElement {
  return (
    _isSingleImageElement(aValue, bOptional) ||
    _isMultiImageElement(aValue, bOptional)
  );
}

function _isSomeLinkElement(
  aValue: any,
  bOptional?: boolean
): aValue is SingleLinkElement | MultiLinkElement {
  return (
    _isSingleLinkElement(aValue, bOptional) ||
    _isMultiLinkElement(aValue, bOptional)
  );
}

function _isSomeNumberElement(
  aValue: any,
  bOptional?: boolean
): aValue is SingleNumberElement | MultiNumberElement {
  return (
    _isSingleNumberElement(aValue, bOptional) ||
    _isMultiNumberElement(aValue, bOptional)
  );
}

function _isSomeOptionSelectionElement(
  aValue: any,
  bOptional?: boolean
): aValue is SingleOptionSelectionElement | MultiOptionSelectionElement {
  return (
    _isSingleOptionSelectionElement(aValue, bOptional) ||
    _isMultiOptionSelectionElement(aValue, bOptional)
  );
}

function _isSomeReferenceElement(
  aValue: any,
  bOptional?: boolean
): aValue is SingleReferenceElement | MultiReferenceElement {
  return (
    _isSingleReferenceElement(aValue, bOptional) ||
    _isMultiReferenceElement(aValue, bOptional)
  );
}

function _isSomeTextElement(
  aValue: any,
  bOptional?: boolean
): aValue is SingleTextElement | MultiTextElement {
  return (
    _isSingleTextElement(aValue, bOptional) ||
    _isMultiTextElement(aValue, bOptional)
  );
}

function _isSomeProductElement(
  aValue: any,
  bOptional?: boolean
): aValue is SingleProductElement | MultiProductElement {
  return (
    _isSingleProductElement(aValue, bOptional) ||
    _isMultiProductElement(aValue, bOptional)
  );
}

function _isSomeToggleElement(
  aValue: any,
  bOptional?: boolean
): aValue is SingleToggleElement | MultiToggleElement {
  return (
    _isSingleToggleElement(aValue, bOptional) ||
    _isMultiToggleElement(aValue, bOptional)
  );
}

function _isSomeVideoElement(
  aValue: any,
  bOptional?: boolean
): aValue is SingleVideoElement | MultiVideoElement {
  return (
    _isSingleVideoElement(aValue, bOptional) ||
    _isMultiVideoElement(aValue, bOptional)
  );
}

type OptionalPredicate<T> = (aValue: T, bOptional?: boolean) => boolean;

/**
 * Maps from element type to handler function
 */
const ELEMENT_HANDLERS: Record<string, OptionalPredicate<any>> = {
  [ELEMENT_TYPE_CATEGORY]: _isCategoryElement,
  [ELEMENT_TYPE_DATE]: _isSomeDateElement,
  [ELEMENT_TYPE_FILE]: _isSomeFileElement,
  [ELEMENT_TYPE_FORMATTED_TEXT]: _isSomeFormattedTextElement,
  [ELEMENT_TYPE_GROUP]: _isSomeGroupElement,
  [ELEMENT_TYPE_IMAGE]: _isSomeImageElement,
  [ELEMENT_TYPE_LINK]: _isSomeLinkElement,
  [ELEMENT_TYPE_LOCATION]: _isLocationElement,
  [ELEMENT_TYPE_NUMBER]: _isSomeNumberElement,
  [ELEMENT_TYPE_OPTION_SELECTION]: _isSomeOptionSelectionElement,
  [ELEMENT_TYPE_REFERENCE]: _isSomeReferenceElement,
  [ELEMENT_TYPE_TEXT]: _isSomeTextElement,
  [ELEMENT_TYPE_PRODUCT]: _isSomeProductElement,
  [ELEMENT_TYPE_TOGGLE]: _isSomeToggleElement,
  [ELEMENT_TYPE_VIDEO]: _isSomeVideoElement
};

/**
 * Maps from element type to handler function
 */
const VALUE_HANDLERS: Record<string, OptionalPredicate<any>> = {
  [ELEMENT_TYPE_CATEGORY]: _isCategory,
  [ELEMENT_TYPE_DATE]: _isDate,
  [ELEMENT_TYPE_FILE]: _isFile,
  [ELEMENT_TYPE_FORMATTED_TEXT]: _isString,
  [ELEMENT_TYPE_GROUP]: _isGroup,
  [ELEMENT_TYPE_IMAGE]: _isImage,
  [ELEMENT_TYPE_LINK]: _isLink,
  [ELEMENT_TYPE_LOCATION]: _isLocation,
  [ELEMENT_TYPE_NUMBER]: _isNumber,
  [ELEMENT_TYPE_OPTION_SELECTION]: _isOptionSelection,
  [ELEMENT_TYPE_REFERENCE]: _isReference,
  [ELEMENT_TYPE_TEXT]: _isString,
  [ELEMENT_TYPE_PRODUCT]: _isString,
  [ELEMENT_TYPE_TOGGLE]: _isBoolean,
  [ELEMENT_TYPE_VIDEO]: _isVideo
};

const _falseHandler = () => false;

const _getElementHandler = (
  aElementType: string,
  bOptional?: boolean
): OptionalPredicate<any> => ELEMENT_HANDLERS[aElementType] || _falseHandler;

const _getValueHandler = (
  aElementType: string,
  bOptional?: boolean
): OptionalPredicate<any> => VALUE_HANDLERS[aElementType] || _falseHandler;

/**
 * Tests if the value is a value element
 *
 * @param aValue - the value
 * @returns true if the value is a valid element
 */
function _isElement(aValue: any, bOptional?: boolean): aValue is Element {
  // check if the element exists
  return (
    isPlainObject(aValue) &&
    isString(aValue[_PROP_TYPE]) &&
    _getElementHandler(aValue[_PROP_TYPE])(aValue, bOptional)
  );
}

/**
 * Tests if the value is a value element
 *
 * @param aValue - the value
 * @returns true if the value is a valid element
 */
function _isValueOf(aType: string, aValue: any, bOptional?: boolean): boolean {
  // check if the element exists
  return isString(aType) && _getValueHandler(aType)(aValue, bOptional);
}

/**
 * Tests if the value is a valid element type
 *
 * @param aValue - the value
 *
 * @returns true if the element is a valid type
 */
function _isElementType(aValue: any): aValue is ELEMENT_TYPE {
  // tests if the value is a valid string
  return isString(aValue) && isFunction(VALUE_HANDLERS[aValue]);
}

export {
  _isElementType as isElementType,
  _isOptionSelectionElement as isOptionSelectionElement,
  _isCategoryElement as isCategoryElement,
  _isDateElement as isDateElement,
  _isLinkElement as isLinkElement,
  _isTextElement as isTextElement,
  _isProductElement as isProductElement,
  _isSingleTextElement as isSingleTextElement,
  _isMultiTextElement as isMultiTextElement,
  _isSingleProductElement as isSingleProductElement,
  _isMultiProductElement as isMultiProductElement,
  _isGroupElement as isGroupElement,
  _isSingleGroupElement as isSingleGroupElement,
  _isMultiGroupElement as isMultiGroupElement,
  _isFormattedTextElement as isFormattedTextElement,
  _isSingleFormattedTextElement as isSingleFormattedTextElement,
  _isMultiFormattedTextElement as isMultiFormattedTextElement,
  _isNumberElement as isNumberElement,
  _isSingleNumberElement as isSingleNumberElement,
  _isMultiNumberElement as isMultiNumberElement,
  _isImageElement as isImageElement,
  _isFileElement as isFileElement,
  _isVideoElement as isVideoElement,
  _isToggleElement as isToggleElement,
  _isSingleToggleElement as isSingleToggleElement,
  _isMultiToggleElement as isMultiToggleElement,
  _isReferenceElement as isReferenceElement,
  _isSingleReferenceElement as isSingleReferenceElement,
  _isMultiReferenceElement as isMultiReferenceElement,
  _isLocationElement as isLocationElement,
  _isSingleDateElement as isSingleDateElement,
  _isMultiDateElement as isMultiDateElement,
  _isSingleFileElement as isSingleFileElement,
  _isMultiFileElement as isMultiFileElement,
  _isSingleImageElement as isSingleImageElement,
  _isMultiImageElement as isMultiImageElement,
  _isSingleLinkElement as isSingleLinkElement,
  _isMultiLinkElement as isMultiLinkElement,
  _isSingleVideoElement as isSingleVideoElement,
  _isMultiVideoElement as isMultiVideoElement,
  _isSingleOptionSelectionElement as isSingleOptionSelectionElement,
  _isMultiOptionSelectionElement as isMultiOptionSelectionElement,
  _isElement as isElement,
  _isValueOf as isValueOf,
  _isLink as isLink,
  _isImage as isImage,
  _isFile as isFile,
  _isVideo as isVideo,
  _isCategory as isCategory,
  _isLocation as isLocation
};
