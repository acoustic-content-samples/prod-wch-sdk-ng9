import { HubContext } from '../v1/rendering/context/hub.context';
import {
  DeliveryContentItem,
  DeliveryGroupElement,
  DeliveryReferenceElement,
  MultiDeliveryElements,
  SingleDeliveryElements
} from './content.item';

export interface ExtendedContextV2 {
  /**
   * Information about URLs that can be used
   * to access the REST APIs
   */
  hub?: HubContext;

  /**
   * Information about edit mode
   */
  editMode?: boolean;
}

export interface ElementWithMarkup {
  /**
   * Optionally the markup for an element
   */
  $markup?: string;
}

export interface RenderingContextGroupElement
  extends DeliveryGroupElement,
    ElementWithMarkup {}

export interface RenderingContextReferenceElement
  extends DeliveryReferenceElement,
    ElementWithMarkup {}

export type SingleRenderingContextElements =
  | Exclude<
      SingleDeliveryElements,
      DeliveryGroupElement | DeliveryReferenceElement
    >
  | RenderingContextGroupElement
  | RenderingContextReferenceElement;

export type MultiRenderingContextElements =
  | Exclude<
      MultiDeliveryElements,
      DeliveryGroupElement[] | DeliveryReferenceElement[]
    >
  | RenderingContextGroupElement[]
  | RenderingContextReferenceElement[];

export type RenderingContextElements =
  | SingleRenderingContextElements
  | MultiRenderingContextElements;

export interface RenderingContextV2 extends DeliveryContentItem {
  /**
   * Rendering context
   */
  $context: ExtendedContextV2;
  /**
   * Excess properties carry the actual data
   */
  [key: string]: RenderingContextElements;
}
