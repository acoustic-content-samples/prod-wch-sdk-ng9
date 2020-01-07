import { Tenant } from '@acoustic-content-sdk/api';
import { PayloadAction } from '@acoustic-content-sdk/redux-store';
import { Generator } from '@acoustic-content-sdk/utils';
import { Action } from 'redux';
import { createAction } from 'redux-actions';
import { UnaryFunction } from 'rxjs';

export const ACTION_LOAD_TENANT = 'ACTION_LOAD_TENANT';
export interface LoadTenantAction extends Action {}

export const ACTION_GUARANTEE_TENANT = 'ACTION_GUARANTEE_TENANT';
export interface GuaranteeTenantAction extends Action {}

export const ACTION_SET_TENANT = 'ACTION_SET_TENANT';
export type SetTenantAction = PayloadAction<Tenant>;

export const ACTION_CLEAR_TENANT = 'ACTION_CLEAR_TENANT';
export type ClearTenantAction = Action;

export const loadTenantAction: Generator<LoadTenantAction> = createAction(
  ACTION_LOAD_TENANT
);

export const guaranteeTenantAction: Generator<LoadTenantAction> = createAction(
  ACTION_GUARANTEE_TENANT
);

export const clearTenantAction: Generator<ClearTenantAction> = createAction(
  ACTION_CLEAR_TENANT
);

export const setTenantAction: UnaryFunction<
  Tenant,
  SetTenantAction
> = createAction(ACTION_SET_TENANT);
