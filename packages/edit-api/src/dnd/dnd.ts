import { KEY_ACCESSOR, KEY_ID } from '@acoustic-content-sdk/api';

import { AccessorType } from '../interfaces/inline.edit.service';

/**
 * Transfer format for our custom dnd components
 */
export const TRANSFER_FORMAT = 'application/x-dnd-fragment';

/**
 * Data transfer format for content items
 */
export interface DataTransferContentItem {
  /**
   * ID of the content item
   */
  [KEY_ID]: string;

  /**
   * The accessor string
   */
  [KEY_ACCESSOR]: AccessorType;
}
