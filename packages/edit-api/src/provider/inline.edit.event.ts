/** Copyright IBM Corp. 2018 */

/**
 * Event issued by the edit library
 */
export interface WchInlineEditEvent {
  type: string;

  data: any;
}

export const EVENT_INLINE_EDIT_SET_SELECTED_CELL =
  'EVENT_INLINE_EDIT_SET_SELECTED_CELL';

export const EVENT_EDIT_START = 'EVENT_EDIT_START';
export const EVENT_EDIT_END = 'EVENT_EDIT_END';

export const EVENT_INLINE_EDIT_START = 'EVENT_INLINE_EDIT_START';
export const EVENT_INLINE_EDIT_END = 'EVENT_INLINE_EDIT_END';
