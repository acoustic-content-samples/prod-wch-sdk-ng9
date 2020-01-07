import { AuthoringLayoutItem } from '../../authoring/v1/layout/layout';
import { AuthoringLayoutMapping } from '../../authoring/v1/layout/layout.mapping';
import { AuthoringType } from '../../authoring/v1/types/type';

export const KEY_ACCESSOR = 'accessor';
export const KEY_ID = 'id';

export interface DeliveryLayoutRef {
  id: string;
}

export interface DeliverySelectedLayout {
  layout: DeliveryLayoutRef;
}

export type DeliverySelectedLayouts = DeliverySelectedLayout[];

export interface DeliveryThumbnail {
  id: string;
  url: string;
}

/**
 * Common fields in all metadata records
 */
export interface DeliveryContentMetadata {
  rev: string;
  thumbnail?: DeliveryThumbnail;
  keywords?: string[];
  kind?: string[];
  created: string;
  creatorId: string;
  description?: string;
  classification: 'content';
  locale: string;
  tags?: string[];
  name: string;
  lastModifierId: string;
  /**
   * ID of the content item. For group items is this
   * the ID of the hosting content item, for references it's  the
   * ID of the referenced item. This ID will always be a 'ready ID'.
   */
  id: string;
  lastModified: string;
  systemModified: string;
  /**
   * ID of the type of the content item. Note that for
   * group elements this is the ID of the hosting
   * content item, not of the type of the group element.
   */
  typeId: string;

  type?: string;

  selectedLayouts?: DeliverySelectedLayouts;

  draftId?: string;

  url?: string;
  protectedUrl: string;

  /**
   * Accessor that references the main element
   * relative to the root of the authoring data structure
   */
  accessor: string;
}

export interface DeliveryAsset {
  fileName: string;
  fileSize: number;
  mediaType: string;
  id: string;
  resourceUri: string;
}

export type DeliveryFileAsset = DeliveryAsset;

export interface DeliveryImageAsset extends DeliveryAsset {
  altText: string;
  width: number;
  height: number;
}

export type DeliveryImageScale = number;
export interface DeliveryImageCrop {
  x: number;
  y: number;
  width: number;
  height: number;
}

export type DeliveryImageMode = 'shared' | 'snapshot';

export interface DeliveryImageTransform {
  scale?: DeliveryImageScale;
  crop?: DeliveryImageCrop;
}

export interface DeliveryImageRendition {
  width: number;
  source: string;
  height: number;
  url: string;
  transform?: DeliveryImageTransform;
}

export interface DeliveryImageElement {
  mode?: DeliveryImageMode;
  asset: DeliveryImageAsset;
  url: string;
  renditions: Record<string, DeliveryImageRendition>;
}

export interface DeliveryCategoryElement {
  categoryIds: string[];
  categoryPath: string[];
}

export interface DeliveryLinkElement {
  linkURL: string;
  linkText: string;
  linkDescription?: string;
}

export interface DeliveryGroupElementMetadata {
  /**
   * Accessor that references the group element
   * relative to the root of the authoring data structure
   */
  accessor: string;
  /**
   * Optionally the selected layouts for the group element
   */
  selectedLayouts?: DeliverySelectedLayouts;
}

export interface DeliveryGroupElement {
  /**
   * Optional metadata
   */
  $metadata?: DeliveryGroupElementMetadata;
  /**
   * Properties of our content item
   */
  [key: string]: DeliveryElement;
}

export interface DeliveryReferenceElementMetadata
  extends Partial<DeliveryContentMetadata> {
  id: string;
}

export interface DeliveryReferenceElement {
  $metadata: DeliveryReferenceElementMetadata;
}

export interface DeliveryFileElement {
  asset: DeliveryFileAsset;
  url: string;
}

export type DeliveryDateElement = string;

export type DeliveryNumberElement = number;

export type DeliveryFormattedTextElement = string;

export type DeliveryTextElement = string;

export type DeliveryToggleElement = boolean;

export interface DeliveryVideoElement {}

export interface DeliveryLocationElement {
  latitude: number;
  longitude: number;
}

export type DeliveryOptionsElement = string;

export type SingleDeliveryElements =
  | DeliveryImageElement
  | DeliveryLinkElement
  | DeliveryGroupElement
  | DeliveryReferenceElement
  | DeliveryFileElement
  | DeliveryDateElement
  | DeliveryNumberElement
  | DeliveryFormattedTextElement
  | DeliveryTextElement
  | DeliveryToggleElement
  | DeliveryVideoElement
  | DeliveryLocationElement
  | DeliveryOptionsElement;

export type MultiDeliveryElements =
  | DeliveryCategoryElement
  | DeliveryImageElement[]
  | DeliveryCategoryElement[]
  | DeliveryLinkElement[]
  | DeliveryGroupElement[]
  | DeliveryReferenceElement[]
  | DeliveryFileElement[]
  | DeliveryDateElement[]
  | DeliveryNumberElement[]
  | DeliveryFormattedTextElement[]
  | DeliveryTextElement[]
  | DeliveryToggleElement[]
  | DeliveryVideoElement[]
  | DeliveryOptionsElement[];

export type DeliveryElement = SingleDeliveryElements | MultiDeliveryElements;

export interface DeliveryContentItem {
  /**
   * Metadata record
   */
  $metadata: DeliveryContentMetadata;
  /**
   * Properties of our content item
   */
  [key: string]: DeliveryElement;
}

export type DeliveryType = AuthoringType;
export type DeliveryLayout = AuthoringLayoutItem;
export type DeliveryLayoutMapping = AuthoringLayoutMapping;

export const KEY_METADATA: keyof DeliveryReferenceElement = '$metadata';
