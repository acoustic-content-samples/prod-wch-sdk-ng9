import { selectPayload } from '@acoustic-content-sdk/redux-store';
import { Reducer } from 'redux';
import { handleActions } from 'redux-actions';

import {
  ACTION_UPLOADING_END,
  ACTION_UPLOADING_PROGRESS,
  ACTION_UPLOADING_START,
  UploadActions,
  UploadActionsPayload,
  UploadingEndAction,
  UploadingProgressAction,
  UploadingStartAction
} from './upload.actions';
import { UploadingState } from './upload.state';

const DEFAULT_STATE: UploadingState = {};
export const initialState = (fileName: string) => {
  return {
    fileName,
    loaded: -1,
    total: -1
  };
};

const reduceUploadingStart = (
  state: UploadingState,
  action: UploadingStartAction
): UploadingState => {
  // select the payload
  const { id, fileName } = selectPayload(action);
  // sanity check
  if (state[id]) {
    console.warn('reduceUploadingStart', 'already loading', id);
  }
  // make a copy
  return {
    ...state,
    [id]: initialState(fileName)
  };
};

const reduceUploadingEnd = (
  state: UploadingState,
  action: UploadingEndAction
): UploadingState => {
  // select the payload
  const id = selectPayload(action);
  // sanity check
  if (!state[id]) {
    console.warn('reduceUploadingEnd', 'not loading', id);
  }
  // remove from the set
  const { [id]: old, ...copy } = state;
  // return copy
  return copy;
};

const reduceUploadingProgress = (
  state: UploadingState,
  action: UploadingProgressAction
): UploadingState => {
  // select the payload
  const { id, progress } = selectPayload(action);
  // make a copy
  return {
    ...state,
    [id]: progress
  };
};

/**
 * reducers for undo and redo
 */
export const uploadingReducer: Reducer<
  UploadingState,
  UploadActions
> = handleActions<UploadingState, UploadActionsPayload>(
  {
    [ACTION_UPLOADING_START]: reduceUploadingStart,
    [ACTION_UPLOADING_PROGRESS]: reduceUploadingProgress,
    [ACTION_UPLOADING_END]: reduceUploadingEnd
  },
  DEFAULT_STATE
);
