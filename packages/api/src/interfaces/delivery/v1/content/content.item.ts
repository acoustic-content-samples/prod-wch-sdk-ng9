/* Copyright IBM Corp. 2018 */
import { AUTHORING_CONTENT_ITEM_KIND } from '../../../authoring/v1/content/content.item';
import { DraftStatus } from '../../../status';
import { BaseDeliveryItem } from './../base.item';

export type CONTENT_ITEM_KIND = AUTHORING_CONTENT_ITEM_KIND;

/**
 * Representation of a generic content item.
 */
export interface ContentItem extends BaseDeliveryItem {
  /**
   * Kind of a content item
   */
  kind: CONTENT_ITEM_KIND[];

  /**
   * TBD
   */
  draftId?: string;

  /**
   * TBD
   */
  draftStatus?: DraftStatus;

  /**
   * The ID of the content type this item belongs to.
   */
  typeId?: string;

  /**
   * locale of the document (e.g \"en\", or \"de\").
   */
  locale?: string;

  /**
   * The tags describing the content item.
   */
  tags?: Array<string>;

  /**
   * Defined by the type and capture in the schema given by the type,
   *  in a real content, this property will be filled with more information.
   *
   * Note, we are using any here, because union types are hard to handle
   * in templates.
   */
  elements: {
    [key: string]: any;
  };

  /**
   * this is the link to the content type document this content is based on.
   */
  type?: string;

  /**
   * The project ID
   */
  projectId?: string;
}
