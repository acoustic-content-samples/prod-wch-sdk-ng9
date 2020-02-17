import { AuthoringSaveBatchItems } from '@acoustic-content-sdk/redux-feature-save';

// type if items to be part of the history
export type UndoItems = AuthoringSaveBatchItems;
export type UndoHistory = UndoItems[];

/**
 * Item level undo
 */
export interface ScopedUndoItems {
  /**
   * The scope of the operation
   */
  scope: string;
  /**
   * The actual operation
   */
  items: UndoItems;
}

// defines the undo state
export interface ScopedUndoState {
  undo: UndoHistory;
  redo: UndoHistory;
}

// defines the undo state
export type UndoState = Record<string, ScopedUndoState>;
