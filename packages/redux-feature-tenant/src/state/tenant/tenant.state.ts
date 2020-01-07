import { Tenant } from '@acoustic-content-sdk/api';
import { selectPayload } from '@acoustic-content-sdk/redux-store';
import { Reducer } from 'redux';
import { handleActions } from 'redux-actions';

import {
  ACTION_CLEAR_TENANT,
  ACTION_SET_TENANT,
  ClearTenantAction,
  SetTenantAction
} from './tenant.actions';

// default
const DEFAULT_TENANT: Tenant = {
  _id: null
};

// defines the tenant state
export type TenantState = Tenant;

/**
 * reducers for config settings
 */
export const tenantReducer: Reducer<TenantState> = handleActions(
  {
    [ACTION_SET_TENANT]: (state: TenantState, action: SetTenantAction) =>
      selectPayload(action),
    [ACTION_CLEAR_TENANT]: (state: TenantState, action: ClearTenantAction) =>
      DEFAULT_TENANT
  },
  DEFAULT_TENANT
);
