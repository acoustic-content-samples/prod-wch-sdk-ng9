import { selectPayload } from '@acoustic-content-sdk/redux-store';
import { getProperty, isNotEmpty, isNotNil } from '@acoustic-content-sdk/utils';
import { Reducer } from 'redux';
import { handleActions } from 'redux-actions';

import {
  ACTION_REDO_AUTH_CONTENT_INTERNAL,
  ACTION_UNDO_AUTH_CONTENT_INTERNAL,
  ACTION_UNDO_SET_AUTH_CONTENT_INTERNAL,
  RedoAuthoringContentInternalAction,
  UndoAuthoringContentInternalAction,
  UndoSetAuthoringContentInternalAction
} from './undo.actions';
import {
  ScopedUndoItems,
  ScopedUndoState,
  UndoHistory,
  UndoItems,
  UndoState
} from './undo.state';

const DEFAULT_STATE: UndoState = null;

const EMPTY_HISTORY: UndoHistory = [];

/**
 * Makes a copy of the array and reverses its order
 *
 * @param aArray - the array
 * @returns the inverted array
 */
function arrayReverse<T>(aArray: T[]): T[] {
  return [...aArray].reverse();
}

/**
 * These operations only operate on the undo and redo stack, they do NOT influence the actual store. This store is
 * modified via side effects instead.
 */

/**
 * Pushes an item to the end of the state
 *
 * @param aItem - the item to push
 * @param aState - the current state
 *
 * @returns the new state
 */
function pushState(aItem: UndoItems, aState: UndoHistory): UndoHistory {
  return isNotEmpty(aState) ? [...aState, aItem] : [aItem];
}

/**
 * Removes top from the history
 *
 * @param aState - the state
 * @returns a new array with the last element removed
 */
function popState(aState: UndoHistory): UndoHistory {
  return isNotEmpty(aState)
    ? aState.slice(0, aState.length - 1)
    : EMPTY_HISTORY;
}

/**
 * The undo operation removes the last element from the undo
 * stack and adds the current element to the redo stack
 *
 * @param state - undo state
 * @param action - the undo action
 */
const reduceUndo = (
  state: UndoState,
  action: UndoAuthoringContentInternalAction
): UndoState => {
  // sanity check
  if (isNotNil(state)) {
    // select the payload
    const scopedItems: ScopedUndoItems = selectPayload(action);
    const { scope, items } = scopedItems;
    // select the item
    const item = arrayReverse(items);
    // select the scope
    const scopedState: ScopedUndoState = getProperty(state, scope);
    if (isNotNil(scopedState)) {
      // work on the arrays
      const { undo, redo } = scopedState;
      // check if we have something to undo
      return {
        ...state,
        [scope]: {
          undo: popState(undo),
          redo: pushState(item, redo)
        }
      };
    }
  }
  // nothing to do
  return state;
};

/**
 * The redo operation removes the first element from the redo
 * stack and adds the current element to the redo stack
 *
 * @param state - undo state
 * @param action - the undo action
 */
const reduceRedo = (
  state: UndoState,
  action: RedoAuthoringContentInternalAction
): UndoState => {
  // sanity check
  if (isNotNil(state)) {
    // select the payload
    const scopedItems: ScopedUndoItems = selectPayload(action);
    const { scope, items } = scopedItems;
    // select the item
    const item = arrayReverse(items);
    // select the scope
    const scopedState: ScopedUndoState = getProperty(state, scope);
    if (isNotNil(scopedState)) {
      // work on the arrays
      const { undo, redo } = scopedState;
      // remove the first item from redo and add the current state to undo
      return {
        ...state,
        [scope]: {
          undo: pushState(item, undo),
          redo: popState(redo)
        }
      };
    }
  }
  // nothing to do
  return state;
};

/**
 * Reducer that is invoked if we save a new batch. In this case we need to
 * clear the redo history, but append to undo
 */
const reduceSet = (
  state: UndoState,
  action: UndoSetAuthoringContentInternalAction
): UndoState => {
  // select the item
  const scopedItems: ScopedUndoItems = selectPayload(action);
  const { scope, items } = scopedItems;
  if (isNotEmpty(items)) {
    // swap the order of items
    const undoItems = arrayReverse(items);
    // sanity check
    if (isNotNil(state)) {
      // access the existing scoped state
      const scopedState: ScopedUndoState = getProperty(state, scope);
      if (isNotNil(scopedState)) {
        // work on the arrays
        const { undo } = scopedState;
        // add the new item
        return {
          ...state,
          [scope]: {
            undo: pushState(undoItems, undo),
            redo: EMPTY_HISTORY
          }
        };
      }
      // add a new scope
      return {
        ...state,
        [scope]: {
          undo: [undoItems],
          redo: EMPTY_HISTORY
        }
      };
    }
    // new initial state
    return {
      [scope]: {
        undo: [undoItems],
        redo: EMPTY_HISTORY
      }
    };
  }
  // nothing to change
  return state;
};

/**
 * reducers for undo and redo
 */
export const undoReducer: Reducer<
  UndoState,
  | UndoAuthoringContentInternalAction
  | UndoSetAuthoringContentInternalAction
  | RedoAuthoringContentInternalAction
> = handleActions(
  {
    [ACTION_UNDO_AUTH_CONTENT_INTERNAL]: reduceUndo,
    [ACTION_REDO_AUTH_CONTENT_INTERNAL]: reduceRedo,
    [ACTION_UNDO_SET_AUTH_CONTENT_INTERNAL]: reduceSet
  },
  DEFAULT_STATE
);
