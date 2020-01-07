import { selectPayload } from '@acoustic-content-sdk/redux-store';
import { getDeliveryId } from '@acoustic-content-sdk/redux-utils';
import { isString } from '@acoustic-content-sdk/utils';
import { Reducer } from 'redux';
import { handleActions } from 'redux-actions';
import {
  ACTION_CLEAR_INLINE_EDITING,
  ACTION_CLEAR_INLINE_EDIT_CLICKED_ELEMENT,
  ACTION_CLEAR_INLINE_EDIT_SELECTED_CELL,
  ACTION_CLEAR_INLINE_EDIT_SELECTED_ITEM,
  ACTION_CLEAR_INLINE_EDIT_SELECTED_LINK,
  ACTION_SET_INLINE_EDITING,
  ACTION_SET_INLINE_EDIT_CLICKED_ELEMENT,
  ACTION_SET_INLINE_EDIT_SELECTED_CELL,
  ACTION_SET_INLINE_EDIT_SELECTED_ITEM,
  ACTION_SET_INLINE_EDIT_SELECTED_LINK,
  ClearInlineEditClickedElementAction,
  ClearInlineEditingAction,
  ClearInlineEditSelectedCellAction,
  ClearInlineEditSelectedItemAction,
  ClearInlineEditSelectedLinkAction,
  SetInlineEditClickedElementAction,
  SetInlineEditingAction,
  SetInlineEditSelectedCellAction,
  SetInlineEditSelectedItemAction,
  SetInlineEditSelectedLinkAction
} from './inline.edit.actions';
import { InlineEditState } from './inline.edit.state';

const DEFAULT_STATE: InlineEditState = {};

const setEditing = (
  state: InlineEditState,
  action: SetInlineEditingAction
): InlineEditState => ({ ...state, editing: selectPayload(action) });

const clearEditing = (
  state: InlineEditState,
  action: ClearInlineEditingAction
) => ({ ...state, editing: undefined });

const setSelectedCell = (
  state: InlineEditState,
  action: SetInlineEditSelectedCellAction
) => ({ ...state, selectedCell: getDeliveryId(selectPayload(action)) });

const clearSelectedCell = (
  state: InlineEditState,
  action: ClearInlineEditSelectedCellAction
) => ({ ...state, selectedCell: undefined });

const setSelectedItem = (
  state: InlineEditState,
  action: SetInlineEditSelectedItemAction
) => ({ ...state, selectedItem: getDeliveryId(selectPayload(action)) });

const clearSelectedItem = (
  state: InlineEditState,
  action: ClearInlineEditSelectedItemAction
) => ({ ...state, selectedItem: undefined });

const setClickedElement = (
  state: InlineEditState,
  action: SetInlineEditClickedElementAction
) => ({ ...state, clickedElement: selectPayload(action) });

const clearClickedElement = (
  state: InlineEditState,
  action: ClearInlineEditClickedElementAction
) => {
  const { clickedElement, ...rest } = state;
  return rest;
};

const getDeliveryIdOrIndex = (aId: string | number) =>
  isString(aId) ? getDeliveryId(aId) : aId;

const setSelectedLink: Reducer<
  InlineEditState,
  SetInlineEditSelectedLinkAction
> = (state: InlineEditState, action: SetInlineEditSelectedLinkAction) => ({
  ...state,
  selectedLink: getDeliveryIdOrIndex(selectPayload(action))
});

const clearSelectedLink: Reducer<
  InlineEditState,
  ClearInlineEditSelectedLinkAction
> = (state: InlineEditState, action: ClearInlineEditSelectedLinkAction) => ({
  ...state,
  selectedLink: undefined
});

/**
 * Reducer for modal dialog state
 */
export const inlineEditReducer = handleActions(
  {
    [ACTION_SET_INLINE_EDITING]: setEditing,
    [ACTION_CLEAR_INLINE_EDITING]: clearEditing,
    [ACTION_SET_INLINE_EDIT_SELECTED_CELL]: setSelectedCell,
    [ACTION_CLEAR_INLINE_EDIT_SELECTED_CELL]: clearSelectedCell,
    [ACTION_SET_INLINE_EDIT_SELECTED_ITEM]: setSelectedItem,
    [ACTION_CLEAR_INLINE_EDIT_SELECTED_ITEM]: clearSelectedItem,
    [ACTION_SET_INLINE_EDIT_SELECTED_LINK]: setSelectedLink,
    [ACTION_CLEAR_INLINE_EDIT_SELECTED_LINK]: clearSelectedLink,
    [ACTION_SET_INLINE_EDIT_CLICKED_ELEMENT]: setClickedElement,
    [ACTION_CLEAR_INLINE_EDIT_CLICKED_ELEMENT]: clearClickedElement
  },
  DEFAULT_STATE
);
