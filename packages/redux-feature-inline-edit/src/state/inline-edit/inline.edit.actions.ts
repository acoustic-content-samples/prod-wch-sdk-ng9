import { AccessorType } from '@acoustic-content-sdk/edit-api';
import { PayloadAction } from '@acoustic-content-sdk/redux-store';
import { Generator, isNotNil } from '@acoustic-content-sdk/utils';
import { Action } from 'redux';
import { createAction } from 'redux-actions';
import { UnaryFunction } from 'rxjs';

export const ACTION_ADD_INLINE_EDITING = 'ACTION_ADD_INLINE_EDITING';
export type AddInlineEditingAction = PayloadAction<string>;

export const addInlineEditingAction: UnaryFunction<
  string,
  AddInlineEditingAction
> = createAction(ACTION_ADD_INLINE_EDITING);

export const ACTION_SET_INLINE_EDITING = 'ACTION_SET_INLINE_EDITING';
export type SetInlineEditingAction = PayloadAction<string>;

export const setInlineEditingAction: UnaryFunction<
  string,
  SetInlineEditingAction
> = createAction(ACTION_SET_INLINE_EDITING);

export const ACTION_CLEAR_INLINE_EDITING = 'ACTION_CLEAR_INLINE_EDITING';
export type ClearInlineEditingAction = Action;

export const clearInlineEditingAction: Generator<ClearInlineEditingAction> = createAction(
  ACTION_SET_INLINE_EDITING
);

export const ACTION_SET_INLINE_EDIT_SELECTED_CELL =
  'ACTION_SET_INLINE_EDIT_SELECTED_CELL';
export type SetInlineEditSelectedCellAction = PayloadAction<string>;
const _setInlineEditSelectedCellAction = createAction(
  ACTION_SET_INLINE_EDIT_SELECTED_CELL
);
export const setInlineEditSelectedCellAction = (
  id: string,
  accessor?: AccessorType
): SetInlineEditSelectedCellAction =>
  _setInlineEditSelectedCellAction(
    isNotNil(accessor) ? `${id}#${accessor}` : id
  );

export const ACTION_CLEAR_INLINE_EDIT_SELECTED_CELL =
  'ACTION_CLEAR_INLINE_EDIT_SELECTED_CELL';
export type ClearInlineEditSelectedCellAction = Action;

export const clearInlineEditSelectedCellAction: Generator<ClearInlineEditSelectedCellAction> = createAction(
  ACTION_CLEAR_INLINE_EDIT_SELECTED_CELL
);

export const ACTION_SET_INLINE_EDIT_SELECTED_ITEM =
  'ACTION_SET_INLINE_EDIT_SELECTED_ITEM';
export type SetInlineEditSelectedItemAction = PayloadAction<string>;

export const setInlineEditSelectedItemAction: UnaryFunction<
  string,
  SetInlineEditSelectedItemAction
> = createAction(ACTION_SET_INLINE_EDIT_SELECTED_ITEM);

export const ACTION_ADD_INLINE_EDIT_SELECTED_ITEM =
  'ACTION_ADD_INLINE_EDIT_SELECTED_ITEM';
export type AddInlineEditSelectedItemAction = PayloadAction<string>;

export const addInlineEditSelectedItemAction: UnaryFunction<
  string,
  AddInlineEditSelectedItemAction
> = createAction(ACTION_ADD_INLINE_EDIT_SELECTED_ITEM);

export const ACTION_CLEAR_INLINE_EDIT_SELECTED_ITEM =
  'ACTION_CLEAR_INLINE_EDIT_SELECTED_ITEM';
export type ClearInlineEditSelectedItemAction = Action;

export const clearInlineEditSelectedItemAction: Generator<ClearInlineEditSelectedItemAction> = createAction(
  ACTION_CLEAR_INLINE_EDIT_SELECTED_ITEM
);

export const ACTION_SET_INLINE_EDIT_SELECTED_LINK =
  'ACTION_SET_INLINE_EDIT_SELECTED_LINK';
export type SetInlineEditSelectedLinkAction = PayloadAction<string | number>;

export const setInlineEditSelectedLinkAction: UnaryFunction<
  string | number,
  SetInlineEditSelectedLinkAction
> = createAction(ACTION_SET_INLINE_EDIT_SELECTED_LINK);

export const ACTION_CLEAR_INLINE_EDIT_SELECTED_LINK =
  'ACTION_CLEAR_INLINE_EDIT_SELECTED_LINK';
export type ClearInlineEditSelectedLinkAction = Action;

export const clearInlineEditSelectedLinkAction: Generator<ClearInlineEditSelectedLinkAction> = createAction(
  ACTION_CLEAR_INLINE_EDIT_SELECTED_LINK
);

export const ACTION_SET_INLINE_EDIT_CLICKED_ELEMENT =
  'ACTION_SET_INLINE_EDIT_CLICKED_ELEMENT';
export type SetInlineEditClickedElementAction = PayloadAction<string>;

export const setInlineEditClickedElementAction: UnaryFunction<
  string,
  SetInlineEditClickedElementAction
> = createAction(ACTION_SET_INLINE_EDIT_CLICKED_ELEMENT);

export const ACTION_CLEAR_INLINE_EDIT_CLICKED_ELEMENT =
  'ACTION_CLEAR_INLINE_EDIT_CLICKED_ELEMENT';
export type ClearInlineEditClickedElementAction = Action;

export const clearInlineEditClickedElementAction: Generator<ClearInlineEditClickedElementAction> = createAction(
  ACTION_CLEAR_INLINE_EDIT_CLICKED_ELEMENT
);
