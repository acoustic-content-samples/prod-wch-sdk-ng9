import { selectPayload } from "@acoustic-content-sdk/redux-store";
import { getDeliveryId } from "@acoustic-content-sdk/redux-utils";
import {
  filterArray,
  isEqual,
  isNotNil,
  isString,
  Predicate
} from "@acoustic-content-sdk/utils";
import { ReactNode } from "react";
import { Reducer } from "redux";
import { handleActions } from "redux-actions";

import {
  ACTION_ADD_INLINE_EDIT_PORTAL,
  ACTION_CLEAR_INLINE_EDIT_CLICKED_ELEMENT,
  ACTION_CLEAR_INLINE_EDIT_SELECTED_CELL,
  ACTION_CLEAR_INLINE_EDIT_SELECTED_ITEM,
  ACTION_CLEAR_INLINE_EDIT_SELECTED_LINK,
  ACTION_CLEAR_INLINE_EDITING,
  ACTION_REMOVE_INLINE_EDIT_PORTAL,
  ACTION_SET_INLINE_EDIT_CLICKED_ELEMENT,
  ACTION_SET_INLINE_EDIT_SELECTED_CELL,
  ACTION_SET_INLINE_EDIT_SELECTED_ITEM,
  ACTION_SET_INLINE_EDIT_SELECTED_LINK,
  ACTION_SET_INLINE_EDITING,
  AddInlineEditPortalAction,
  ClearInlineEditClickedElementAction,
  ClearInlineEditingAction,
  ClearInlineEditSelectedCellAction,
  ClearInlineEditSelectedItemAction,
  ClearInlineEditSelectedLinkAction,
  RemoveInlineEditPortalAction,
  SetInlineEditClickedElementAction,
  SetInlineEditingAction,
  SetInlineEditSelectedCellAction,
  SetInlineEditSelectedItemAction,
  SetInlineEditSelectedLinkAction
} from "./inline.edit.actions";
import { InlineEditPortal, InlineEditState } from "./inline.edit.state";

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
 * Returns a predicate that matches neither the element key nor the node
 *
 * @param elementKey - the key
 * @param node - the node
 * @returns the predicate
 */
function matchesNeither(
  elementKey: Element,
  node: ReactNode
): Predicate<InlineEditPortal> {
  return portal => portal.elementKey !== elementKey && portal.node !== node;
}

/**
 * Returns a predicate that matches the element key and the node
 *
 * @param elementKey - the key
 * @param node - the node
 * @returns the predicate
 */
function matchesExact(
  elementKey: Element,
  node: ReactNode
): Predicate<InlineEditPortal> {
  return portal =>
    isEqual(portal.elementKey, elementKey) && isEqual(portal.node, node);
}

/**
 * Adds a new portal in case it does not exist, yet
 *
 * @param state   - current state
 * @param action  - the add portal action
 *
 * @returns the new state
 */
const addPortal: Reducer<InlineEditState, AddInlineEditPortalAction> = (
  state: InlineEditState,
  action: AddInlineEditPortalAction
): InlineEditState => {
  // select the payload
  const { elementKey, node, id } = selectPayload(action);
  // current portals
  const portals = state.portals || [];
  // check if we need to modify anything
  return isNotNil(portals.find(matchesExact(elementKey, node)))
    ? state
    : {
        ...state,
        portals: [
          ...filterArray(portals, matchesNeither(elementKey, node)),
          { elementKey, node, id }
        ]
      };
};

/**
 * Removes a portal
 *
 * @param state   - current state
 * @param action  - the remove portal action
 *
 * @returns the new state
 */
const removePortal: Reducer<InlineEditState, RemoveInlineEditPortalAction> = (
  state: InlineEditState,
  action: RemoveInlineEditPortalAction
): InlineEditState => {
  // select the payload
  const elementKey = selectPayload(action);
  // current portals
  const portals = state.portals || [];
  const filtered = portals.filter(portal => portal.elementKey !== elementKey);
  // check if we need to modify the state
  return portals.length === filtered.length
    ? state
    : {
        ...state,
        portals: filtered
      };
};

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
    [ACTION_ADD_INLINE_EDIT_PORTAL]: addPortal,
    [ACTION_REMOVE_INLINE_EDIT_PORTAL]: removePortal,
    [ACTION_SET_INLINE_EDIT_CLICKED_ELEMENT]: setClickedElement,
    [ACTION_CLEAR_INLINE_EDIT_CLICKED_ELEMENT]: clearClickedElement
  },
  DEFAULT_STATE
);
