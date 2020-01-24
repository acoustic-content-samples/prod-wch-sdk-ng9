/** Copyright IBM Corp. 2018 */
import { AuthoringSelectedLayout } from '../../../../authoring/v1/layout/layout';
import { Layouts } from '../../layout/layout';
import { ELEMENT_TYPE } from './../../content/elements';
import { ContentItemWithLayout } from './content.item.with.layout';
import { ExtendedContext } from './extended.context';

export interface AbstractElement {
  readonly elementType: ELEMENT_TYPE;
}

/**
 * Common base class for all text elements
 */
export interface TextElement extends AbstractElement {
  readonly elementType: 'text';
}

/**
 * The text element holds text value in a JSON string.
 */
export interface SingleTextElement extends TextElement {
  readonly value: string;
}

/**
 * The text element holds text value in a JSON string.
 */
export interface MultiTextElement extends TextElement {
  readonly values: string[];
}

export interface ProductElement extends AbstractElement {
  readonly elementType: 'product';
}

/**
 * The text element holds text value in a JSON string.
 */
export interface SingleProductElement extends ProductElement {
  readonly value: string;
}

/**
 * The text element holds text value in a JSON string.
 */
export interface MultiProductElement extends ProductElement {
  readonly values: string[];
}

/**
 * Reference to a content type
 */
export interface TypeRef {
  readonly id: string;
  readonly name?: string;
  readonly description?: string;
}

/**
 * Common base class for all group elements
 */
export interface GroupElement extends AbstractElement {
  readonly elementType: 'group';
  /**
   * Reference to the actual type
   */
  readonly typeRef: TypeRef;
  /**
   * The layouts for the content item, ordered by mode. The 'default' mode
   * always exists and denotes the default layout.
   */
  readonly layouts?: Layouts;
  /**
   * Optionally the explicitly assigned layouts
   */
  readonly selectedLayouts?: AuthoringSelectedLayout[];
}

/**
 * Interface that represents a grouping of elements
 */
export interface Group {
  readonly [key: string]: Element;
}

/**
 * The text element holds group value in a JSON string.
 */
export interface SingleGroupElement extends GroupElement {
  readonly value: Group;
}

/**
 * The text element holds text value in a JSON string.
 */
export interface MultiGroupElement extends GroupElement {
  readonly values: Group[];
}

/**
 * Representation of a selection
 */
export interface OptionSelection {
  readonly label?: string;
  readonly selection: string;
}

/**
 * Common base class for all options election elements
 */
export interface OptionSelectionElement extends AbstractElement {
  readonly elementType: 'optionselection';
}

/**
 * The text element holds text value in a JSON string.
 */
export interface SingleOptionSelectionElement extends OptionSelectionElement {
  readonly value: OptionSelection;
}

/**
 * The text element holds text value in a JSON string.
 */
export interface MultiOptionSelectionElement extends OptionSelectionElement {
  readonly values: OptionSelection[];
}

/**
 * Common base class for all text elements
 */
export interface FormattedTextElement extends AbstractElement {
  readonly elementType: 'formattedtext';
}

/**
 * The text element holds text value in a JSON string.
 */
export interface SingleFormattedTextElement extends FormattedTextElement {
  readonly value: string;
}

/**
 * The text element holds text value in a JSON string.
 */
export interface MultiFormattedTextElement extends FormattedTextElement {
  readonly values: string[];
}

/**
 * Common base class for all number elements
 */
export interface NumberElement extends AbstractElement {
  readonly elementType: 'number';
}

/**
 * The Number element stores the value in the JSON as a number type.
 */
export interface SingleNumberElement extends NumberElement {
  readonly value: number;
}

/**
 * The Number element stores the value in the JSON as a number type.
 */
export interface MultiNumberElement extends NumberElement {
  readonly values: number[];
}

/**
 * Common base class for all toggle elements
 */
export interface ToggleElement extends AbstractElement {
  readonly elementType: 'toggle';
}

/**
 * Toggle just uses JSON Boolean.
 */
export interface SingleToggleElement extends ToggleElement {
  readonly value: boolean;
}

/**
 * Toggle just uses JSON Boolean.
 */
export interface MultiToggleElement extends ToggleElement {
  readonly values: boolean[];
}

export interface Link {
  readonly linkURL?: string;
  readonly linkText?: string;
  readonly linkDescription?: string;
}

/**
 * Common base class for all link elements
 */
export interface LinkElement extends AbstractElement {
  readonly elementType: 'link';
}

/**
 * Link element has three text fields linkURL, linkText, and linkDescription.
 */
export interface SingleLinkElement extends LinkElement, Link {}

/**
 * Link element has three text fields linkURL, linkText, and linkDescription.
 */
export interface MultiLinkElement extends LinkElement {
  readonly values: Link[];
}

/**
 * Common base class for all date elements
 */
export interface DateElement extends AbstractElement {
  readonly elementType: 'datetime';
}

/**
 * Date element uses a string property, the value must be an ISO 8601 date time.
 */
export interface SingleDateElement extends DateElement {
  readonly value: string;
}

/**
 * Date element uses a string property, the value must be an ISO 8601 date time.
 */
export interface MultiDateElement extends DateElement {
  readonly values: string[];
}

/**
 * Category is a reference element. The contents that are stored in the category
 * element are references to categories created in content hub. When ?include=metadata
 * is used, the categories property is included which has the full name path for each
 * selected category.
 *
 * Note: When you set categories on the category element, you need to add the
 * UUID of the category to the categoryIds property. The categories property,
 * which returns the name path of the category is a read-only property and is
 * not used when the content is updated. If you set it during an update, it is ignored.
 */
export interface Category {
  readonly categoryIds?: string[];
  readonly categories?: string[];
  // extension for the local rendering context for convenience
  readonly categoryPaths?: string[][];
}

/**
 * Category is a reference element. The contents that are stored in the category
 * element are references to categories created in content hub. When ?include=metadata
 * is used, the categories property is included which has the full name path for each
 * selected category.
 *
 * Note: When you set categories on the category element, you need to add the
 * UUID of the category to the categoryIds property. The categories property,
 * which returns the name path of the category is a read-only property and is
 * not used when the content is updated. If you set it during an update, it is ignored.
 */
export interface CategoryElement extends AbstractElement, Category {
  readonly elementType: 'category';
}

export interface Asset {
  readonly id: string;
  readonly resourceUri: string;
  readonly fileSize: number;
  readonly fileName: string;
  readonly mediaType: string;
  readonly altText?: string;
  // added by delivery
  readonly width: number;
  readonly height: number;
}

export interface Resource {
  readonly resourceId: string;
  readonly resourceUri: string;
  readonly fileName: string;
}

export interface File {
  readonly asset?: Asset;
  readonly url?: string;
}

/**
 * Common base class for all file elements
 */
export interface FileElement extends AbstractElement {
  readonly elementType: 'file';
}

/**
 * File element is the most basic asset reference element. It is a reference element
 * that is used to point to an asset in content hub.
 * Except for asset ID, all the other properties are read-only and are added from the
 * asset at the time it is selected on a content.
 *
 * With asset references most of the properties are read-only and come from the asset.
 * So when you set a file on file element you need to set the asset.id property. The other
 * information is fetched automatically by the content service and stored in read-only fields.
 */
export interface SingleFileElement extends FileElement, File {}

export interface MultiFileElement extends FileElement {
  readonly values: File[];
}

export interface Video {
  readonly caption?: Resource;
  readonly thumbnail?: Resource;
  readonly asset?: Asset;
  readonly url?: string;
}

/**
 * Common base class for all video elements
 */
export interface VideoElement extends AbstractElement {
  readonly elementType: 'video';
}

/**
 *  Standard video element is similar to the file element.
 * The video asset is represented in the asset section. Optionally a video asset can
 * have a caption and a thumbnail as well, and in this case both of these point
 * two resources in content hub.
 * As mentioned with file, most of the properties here are inlined data from the
 * asset/resource and is read-only. To update a video asset or its caption/thumbnail
 * update the relevant asset/resource ID. The related information is retrieved again and
 * added. Attempts to change the read-only fields are ignored.
 */
export interface SingleVideoElement extends VideoElement, Video {}

export interface MultiVideoElement extends VideoElement {
  readonly values: Video[];
}

export interface Rendition {
  readonly renditionId: string;
  readonly source: string;
  readonly transform?: any;
  // added by delivery
  readonly url: string;
  readonly width: number;
  readonly height: number;
}

export interface Image {
  readonly renditions?: { [key: string]: Rendition };
  readonly profiles?: string[];
  readonly asset?: Asset;
  readonly altText?: string;
  readonly url?: string;
}

/**
 * Common base class for all image elements
 */
export interface ImageElement extends AbstractElement {
  readonly elementType: 'image';
}

/**
 * Image is one of the more complex elements and the following
 * section describes a normal image without an image profile configured.
 * For information on updating and formatting the image element,
 * go to Updating image element format.
 *
 * Note: You are always selecting a rendition of an asset and not the asset directly.
 * As a result interactions with image elements involve setting and
 * updating a rendition reference. Most other fields that are displayed
 * in image element are read only!
 */
export interface SingleImageElement extends ImageElement, Image {}

export interface MultiImageElement extends ImageElement {
  readonly values: Image[];
}

/**
 * Common base class for all reference elements
 */
export interface ReferenceElement extends AbstractElement {
  readonly elementType: 'reference';
}

export interface SingleReferenceElement extends ReferenceElement {
  readonly value: RenderingContext;
}

export interface MultiReferenceElement extends ReferenceElement {
  readonly values: RenderingContext[];
}

export interface Location {
  readonly latitude?: number;
  readonly longitude?: number;
}

export interface LocationElement extends AbstractElement, Location {
  readonly elementType: 'location';
}

/**
 * An element is one of the following
 */
export type Element =
  | LocationElement
  | SingleReferenceElement
  | MultiReferenceElement
  | SingleImageElement
  | MultiImageElement
  | SingleVideoElement
  | MultiVideoElement
  | SingleFileElement
  | MultiFileElement
  | SingleToggleElement
  | MultiToggleElement
  | SingleTextElement
  | MultiTextElement
  | SingleProductElement
  | MultiProductElement
  | SingleNumberElement
  | MultiNumberElement
  | SingleLinkElement
  | MultiLinkElement
  | SingleFormattedTextElement
  | MultiFormattedTextElement
  | SingleOptionSelectionElement
  | MultiOptionSelectionElement
  | SingleDateElement
  | MultiDateElement
  | SingleGroupElement
  | MultiGroupElement;

export interface ElementMap<T> {
  readonly [key: string]: T | undefined;
}

export type SimpleType =
  | string
  | string[]
  | number
  | number[]
  | Image
  | Image[]
  | Date
  | Date[]
  | Video
  | Video[]
  | File
  | File[]
  | boolean
  | boolean[]
  | Link
  | Link[]
  | OptionSelection
  | OptionSelection[]
  | RenderingContext
  | RenderingContext[]
  | Category
  | Location
  | { readonly [key: string]: SimpleType };

export type GroupType = ElementMap<SimpleType>;

export interface RenderingContext extends ContentItemWithLayout {
  // typings
  readonly product?: ElementMap<string>;
  readonly products?: ElementMap<string[]>;
  readonly text?: ElementMap<string>;
  readonly texts?: ElementMap<string[]>;
  readonly number?: ElementMap<number>;
  readonly numbers?: ElementMap<number[]>;
  readonly formattedtext?: ElementMap<string>;
  readonly formattedtexts?: ElementMap<string[]>;
  readonly group?: ElementMap<any>;
  readonly groups?: ElementMap<any[]>;
  readonly image?: ElementMap<SingleImageElement>;
  readonly images?: ElementMap<Image[]>;
  readonly datetime?: ElementMap<Date>;
  readonly datetimes?: ElementMap<Date[]>;
  readonly video?: ElementMap<SingleVideoElement>;
  readonly videos?: ElementMap<Video[]>;
  readonly file?: ElementMap<SingleFileElement>;
  readonly files?: ElementMap<File[]>;
  readonly toggle?: ElementMap<boolean>;
  readonly toggles?: ElementMap<boolean[]>;
  readonly link?: ElementMap<SingleLinkElement>;
  readonly links?: ElementMap<Link[]>;
  readonly optionselection?: ElementMap<OptionSelection>;
  readonly optionselections?: ElementMap<OptionSelection[]>;
  readonly reference?: ElementMap<RenderingContext>;
  readonly references?: ElementMap<RenderingContext[]>;
  readonly category?: ElementMap<CategoryElement>;
  readonly location?: ElementMap<LocationElement>;

  readonly markups: ElementMap<string>;

  readonly context: ExtendedContext;
}
