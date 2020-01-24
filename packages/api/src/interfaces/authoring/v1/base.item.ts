/** Copyright IBM Corp. 2018 */

/**
 * Base interface for all items
 */
export interface BaseAuthoringItem {
  /**
   * The ID of the content item.
   */
  readonly id?: string;

  /** Optionally the ID of the ready item */
  readonly linkedDocId?: string;

  /**
   * The current revision of the document.
   */
  rev?: string;

  /**
   * The name of the content item.
   */
  readonly name: string;

  path?: string;

  /**
   * The classification defines the document type. For content items, all documents are classified as \"content\".
   */
  classification?: string;

  /**
   * The last modified date of this content item in ISO 8601 with the format YYYY-MM-DDTHH:mm:ss.sssZ. This field is read only.
   */
  lastModified?: string;

  /**
   * name of user for now, this property may change once user management is defined (read only).
   */
  lastModifierId?: string;

  /**
   * The created date of this content item in ISO 8601 with the format YYYY-MM-DDTHH:mm:ss.sssZ. This field is read only.
   */
  created?: string;

  creatorId?: string;

  /**
   * The description of the item.
   */
  readonly description?: string;
}
