import { PayloadAction } from '@acoustic-content-sdk/redux-store';
import { Action } from 'redux';
import { createAction } from 'redux-actions';
import { UnaryFunction } from 'rxjs';

export const ACTION_DATABASE_ITEM_SAVED = 'ACTION_DATABASE_ITEM_SAVED';
export type DatabaseItemSavedAction = PayloadAction<string>;

export const databaseItemSavedAction: UnaryFunction<
  string,
  DatabaseItemSavedAction
> = createAction(ACTION_DATABASE_ITEM_SAVED);

export const ACTION_DATABASE_READ = 'ACTION_DATABASE_READ';

export interface DatabaseReadItemPayload<T = any> {
  id: string;
  action: UnaryFunction<T, Action>;
}

export type DatabaseReadItemAction<T = any> = PayloadAction<
  DatabaseReadItemPayload<T>
>;

const _databaseReadItemAction = createAction(ACTION_DATABASE_READ);

/**
 * Constructs an action that tries to read an item from the database
 *
 * @param id - the ID of the item
 * @param action - action generator to create the action after the item has been loaded
 *
 * @returns the actual action
 */
export const databaseReadItemAction: <T>(
  id: string,
  action: UnaryFunction<T, Action>
) => DatabaseReadItemAction<T> = (id, action) =>
  _databaseReadItemAction({ id, action });
