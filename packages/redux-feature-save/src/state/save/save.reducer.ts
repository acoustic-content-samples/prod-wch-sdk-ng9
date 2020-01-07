import { Reducer } from 'redux';
import { handleActions } from 'redux-actions';

import {
  ACTION_SAVE_END,
  ACTION_SAVE_START,
  SaveEndAction,
  SaveStartAction
} from './save.actions';
import { SavingState } from './save.state';

const DEFAULT_STATE: SavingState = 0;

const reduceSavingStart = (
  state: SavingState,
  action: SaveStartAction
): SavingState => state + 1;

const reduceSavingEnd = (
  state: SavingState,
  action: SaveEndAction
): SavingState => state - 1;

/**
 * reducers for undo and redo
 */
export const savingReducer: Reducer<SavingState> = handleActions(
  {
    [ACTION_SAVE_START]: reduceSavingStart,
    [ACTION_SAVE_END]: reduceSavingEnd
  },
  DEFAULT_STATE
);
