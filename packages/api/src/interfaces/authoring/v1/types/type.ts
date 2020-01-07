import { Status } from '../../../status';
import { BaseAuthoringItem } from '../base.item';
import { ELEMENT_TYPE } from './../../../delivery/v1/content/elements';
import { TypeRef } from './../../../delivery/v1/rendering/context/rendering.context';

export const REL_PATH_TYPE_BY_ID = 'authoring/v1/types/';

/**
 * Possible values kind
 */
export type AUTHORING_TYPE_KIND =
  | 'standalone'
  | 'page'
  | 'embedded'
  | 'landing-page'
  | 'catalog-page'
  | 'custom-ui'
  | 'email';

export interface AuthoringPlaceholder {
  show?: boolean;
  text?: string;
}

export type AUTHORING_ELEMENT_ROLE = 'content' | 'configuration';

export type AUTHORING_ELEMENT_TEXT_SEARCH_KEY =
  | 'string1'
  | 'string2'
  | 'string3'
  | 'string4'
  | 'sortableString1'
  | 'sortableString2'
  | 'sortableString3'
  | 'sortableString4';

export type AUTHORING_ELEMENT_NUMBER_SEARCH_KEY =
  | 'number1'
  | 'number2'
  | 'sortableNumber1'
  | 'sortableNumber2';

export interface AuthoringElement {
  /** Specifies the type of this element. */
  elementType: ELEMENT_TYPE | 'productcategory' | 'product';

  /** The display name of the element. */
  label: string;

  /** The element identifer. Within content items, elements are referred to by key only. */
  key: string;

  /** Indicates whether content items must specify a value for this element. */
  required?: boolean;

  /** Indicates whether content items using this content-type can contain multiple values of this element.
   Valid for all element types except category, toggle and location. */
  allowMultipleValues?: boolean;

  /** When allowMulitpleValues is true, indicates the minimum number of values are that required. */
  minimumValues?: number;

  /** When allowMulitpleValues is true, indicates the maximum number of values are that allowed. */
  maximumValues?: number;

  /** When allowMultipleValues is true, specifies a display name for each value within the multi valued list. */
  fieldLabel?: string;

  /** The informational text to show the content author when setting the value of this element. */
  helpText?: string;

  placeholder?: AuthoringPlaceholder;

  role?: AUTHORING_ELEMENT_ROLE[];

  uiExtensions?: AuthoringUiExtensions;
}

export interface AuthoringTextElement extends AuthoringElement {
  elementType: 'text';
  searchKey?: AUTHORING_ELEMENT_TEXT_SEARCH_KEY;
  minLength?: number;
  maxLength?: number;
  displayType?: 'singleLine' | 'multiLine';
  displayWidth?: number;
  displayHeight?: number;
}

export interface AuthoringNumberElement extends AuthoringElement {
  elementType: 'number';
  fieldType?: 'integer' | 'decimal';
  searchKey?: AUTHORING_ELEMENT_NUMBER_SEARCH_KEY;
  minimum?: number;
  maximum?: number;
}

export type AUTHORING_ELEMENT_IMAGE_TYPE =
  | 'jpg'
  | 'jpeg'
  | 'png'
  | 'gif'
  | 'svg';

export interface AuthoringImageElement extends AuthoringElement {
  elementType: 'image';
  acceptType?: AUTHORING_ELEMENT_IMAGE_TYPE[];
  searchKey?: AUTHORING_ELEMENT_TEXT_SEARCH_KEY;
  imageProfileId?: string;
  imageProfile?: Record<string, any>;
}

export type AUTHORING_ELEMENT_VIDEO_TYPE = 'mp4' | 'mov';

export interface AuthoringVideoElement extends AuthoringElement {
  elementType: 'video';
  acceptType?: AUTHORING_ELEMENT_VIDEO_TYPE[];
  searchKey?: AUTHORING_ELEMENT_TEXT_SEARCH_KEY;
}

export interface AuthoringReferenceElement extends AuthoringElement {
  elementType: 'reference';
  searchKey?: AUTHORING_ELEMENT_TEXT_SEARCH_KEY;
  restrictTypes?: TypeRef;
}

export type AUTHORING_ELEMENT_FILE_TYPE =
  | 'plain-text'
  | 'presentation'
  | 'rich-document'
  | 'spreadsheet'
  | 'pdf-document';

export interface AuthoringFileElement extends AuthoringElement {
  elementType: 'file';
  acceptType?: AUTHORING_ELEMENT_FILE_TYPE[];
  searchKey?: AUTHORING_ELEMENT_TEXT_SEARCH_KEY;
}

export interface AuthoringLinkElement extends AuthoringElement {
  elementType: 'link';
  searchKey?: AUTHORING_ELEMENT_TEXT_SEARCH_KEY;
}

export type AUTHORING_ELEMENT_DATETIME_SEARCH_KEY =
  | 'date1'
  | 'date2'
  | 'sortableDate1'
  | 'sortableDate2';

export interface AuthoringDatetimeElement extends AuthoringElement {
  elementType: 'datetime';
  fieldType?: 'date' | 'date-time';
  searchKey?: AUTHORING_ELEMENT_DATETIME_SEARCH_KEY;
}

export interface AuthoringFormattedTextElement extends AuthoringElement {
  elementType: 'formattedtext';
  searchKey?: AUTHORING_ELEMENT_TEXT_SEARCH_KEY;
}

export type AUTHORING_ELEMENT_TOGGLE_SEARCH_KEY = 'boolean1' | 'boolean2';

export interface AuthoringToggleElement extends AuthoringElement {
  elementType: 'toggle';
  searchKey?: AUTHORING_ELEMENT_TOGGLE_SEARCH_KEY;
  statement?: string;
}

export type AUTHORING_ELEMENT_LOCATION_SEARCH_KEY = 'location1';

export interface AuthoringLocationElement extends AuthoringElement {
  elementType: 'location';
  searchKey?: AUTHORING_ELEMENT_LOCATION_SEARCH_KEY;
}

export interface AuthoringCategoryElement extends AuthoringElement {
  elementType: 'category';
  searchKey?: AUTHORING_ELEMENT_TEXT_SEARCH_KEY;
  restrictedParents?: string[];
}

export interface AuthoringOption {
  label: string;
  selection: string;
}

export interface AuthoringOptionSelectionElement extends AuthoringElement {
  elementType: 'optionselection';
  searchKey?: AUTHORING_ELEMENT_TEXT_SEARCH_KEY;
  restrictedParents?: string[];
  options?: AuthoringOption[];
}

export interface AuthoringVariableTypeElement extends AuthoringElement {
  elementType: 'variabletype';
  elements: Record<string, any>[];
}

export interface AuthoringGroupElement extends AuthoringElement {
  elementType: 'group';
  typeRef: TypeRef;
  kind?: AUTHORING_TYPE_KIND[];
  elements?: any[];
  icon?: ELEMENT_TYPE;
}

export interface AuthoringCommerceProductCategoryElement
  extends AuthoringElement {
  elementType: 'productcategory';
  searchKey?: AUTHORING_ELEMENT_TEXT_SEARCH_KEY;
  restrictedParent?: string;
}

export interface AuthoringCommerceProductElement extends AuthoringElement {
  elementType: 'product';
  searchKey?: AUTHORING_ELEMENT_TEXT_SEARCH_KEY;
  restrictedCategories?: string[];
}

export interface AuthoringThumbnail {
  id?: string;
  path?: string;
  url?: string;
}

export interface AuthoringContentThumbnail {
  source: 'imageElementOrType' | 'imageElement' | 'type' | 'none';
  imageElement?: string;
}

export interface AuthoringUiExtensions {
  element?: string;
  elementBuiltin?: string;
  elementConfig: any;
}

export interface AuthoringType extends BaseAuthoringItem {
  /**
   * Optional icon to be used for the type
   */
  icon?: ELEMENT_TYPE;

  status: Status;

  uiExtensions?: AuthoringUiExtensions;

  tags?: string[];

  linkedDocId?: string;

  /**
   * Optional content thumbnail for the type
   */
  contentThumbnail?: AuthoringContentThumbnail;

  /**
   * Optional thumbnail for the type
   */
  thumbnail?: AuthoringThumbnail;

  /**
   * Unknown semantic
   */
  _revisions?: Record<string, any>;

  /**
   * Fixed classification
   */
  classification: 'content-type';

  /**
   * Lisz of possible kinds for the authoring type
   */
  kind?: AUTHORING_TYPE_KIND[];

  /**
   * Elements on the type, strange that this is an array and not a map
   */
  elements: AuthoringElement[];

  categoryIds?: string[];

  categories?: string[];
}
