import {
  compose,
  getProperty,
  isNotEmpty,
  lastElement,
  pluckProperty
} from '@acoustic-content-sdk/utils';
import { UnaryFunction } from 'rxjs';

import {
  ScopedUndoState,
  UndoHistory,
  UndoItems,
  UndoState
} from './undo.state';

export const selectUndoScope: UnaryFunction<
  string,
  UnaryFunction<UndoState, ScopedUndoState>
> = (scope) => (state) => getProperty(state, scope);

const selectUndo: UnaryFunction<ScopedUndoState, UndoHistory> = pluckProperty<
  ScopedUndoState,
  'undo'
>('undo');

const selectRedo: UnaryFunction<ScopedUndoState, UndoHistory> = pluckProperty<
  ScopedUndoState,
  'redo'
>('redo');

/**
 * Tests if we have undo actions
 */
export const selectUndoEnabled: UnaryFunction<
  ScopedUndoState,
  boolean
> = compose(selectUndo, isNotEmpty);

/**
 * Tests if we have redo actions
 */
export const selectRedoEnabled: UnaryFunction<
  ScopedUndoState,
  boolean
> = compose(selectRedo, isNotEmpty);

/**
 * Selects the last item from the undo history if it exists
 *
 * @param state - the state
 * @returns the last item or undefined
 */
export const selectPreviousUndoItem: UnaryFunction<
  ScopedUndoState,
  UndoItems
> = (state) => lastElement(selectUndo(state));

/**
 * Selects the next item from the redo history if it exists
 *
 * @param state - the state
 * @returns the next item or undefined
 */
export const selectNextUndoItem: UnaryFunction<ScopedUndoState, UndoItems> = (
  state
) => lastElement(selectRedo(state));
