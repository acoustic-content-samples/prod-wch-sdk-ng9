import { User } from '@acoustic-content-sdk/api';
import { selectPayload } from '@acoustic-content-sdk/redux-store';
import { Reducer } from 'redux';
import { handleActions } from 'redux-actions';

import {
  ACTION_CLEAR_CURRENT_USER,
  ACTION_SET_CURRENT_USER,
  ClearCurrentUserAction,
  SetCurrentUserAction
} from './user.actions';
import { UserState } from './user.state';

// default anonymous user
const DEFAULT_USER: User = {
  externalId: 'ibm_anonymous_user@de.ibm.com',
  firstName: 'Anonymous',
  lastName: 'User',
  displayName: 'Anonymous User',
  roles: [],
  id: '0fa4ae03-84a8-fb5e-ad6d-1eef5fb8359b'
};

/**
 * reducers for config settings
 */
export const userReducer: Reducer<UserState> = handleActions(
  {
    [ACTION_SET_CURRENT_USER]: (
      state: UserState,
      action: SetCurrentUserAction
    ) => selectPayload(action),
    [ACTION_CLEAR_CURRENT_USER]: (
      state: UserState,
      action: ClearCurrentUserAction
    ) => DEFAULT_USER
  },
  DEFAULT_USER
);
