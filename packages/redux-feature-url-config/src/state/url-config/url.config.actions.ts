import { StaticHubInfoUrlProvider } from '@acoustic-content-sdk/api';
import { PayloadAction } from '@acoustic-content-sdk/redux-store';
import {
  Generator,
  urlFromProvider,
  urlToString
} from '@acoustic-content-sdk/utils';
import { Action } from 'redux';
import { createAction } from 'redux-actions';
import { UnaryFunction } from 'rxjs';

export const ACTION_LOAD_URL_CONFIG = 'ACTION_LOAD_URL_CONFIG';
export interface LoadUrlConfigAction extends Action {}

export const ACTION_SET_URL_CONFIG = 'ACTION_SET_URL_CONFIG';
export type SetUrlConfigAction = PayloadAction<string>;

export const ACTION_CLEAR_URL_CONFIG = 'ACTION_CLEAR_URL_CONFIG';
export type ClearUrlConfigAction = Action;

export const loadUrlConfigAction: Generator<LoadUrlConfigAction> = createAction(
  ACTION_LOAD_URL_CONFIG
);

export const clearUrlConfigAction: Generator<ClearUrlConfigAction> = createAction(
  ACTION_CLEAR_URL_CONFIG
);

const _setUrlConfigAction = createAction(ACTION_SET_URL_CONFIG);
export const setUrlConfigAction: UnaryFunction<
  StaticHubInfoUrlProvider,
  SetUrlConfigAction
> = provider => _setUrlConfigAction(urlToString(urlFromProvider(provider)));
