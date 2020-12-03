import { selectPayload } from '@acoustic-content-sdk/redux-store';
import { Reducer } from 'redux';
import { handleActions } from 'redux-actions';

import { ACTION_EDIT_MODE, EditModeAction } from './edit.mode.actions';

// default
export const DEFAULT_EDIT_MODE = false;

// defines if edit mode is on or off
export type EditModeState = boolean;

/**
 * reducers for edit mode
 */
export const editModeReducer: Reducer<EditModeState> = handleActions(
  {
    [ACTION_EDIT_MODE]: (state: EditModeState, action: EditModeAction) =>
      selectPayload(action)
  },
  DEFAULT_EDIT_MODE
);
