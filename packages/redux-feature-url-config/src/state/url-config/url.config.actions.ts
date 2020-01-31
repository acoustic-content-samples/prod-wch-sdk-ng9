import { StaticHubInfoUrlProvider, UrlConfig } from '@acoustic-content-sdk/api';
import { PayloadAction } from '@acoustic-content-sdk/redux-store';
import {
  Generator,
  urlFromProvider,
  urlToString
} from '@acoustic-content-sdk/utils';
import { Action } from 'redux';
import { createAction } from 'redux-actions';
import { UnaryFunction } from 'rxjs';

import { isStaticHubInfoUrlProvider } from '../../utils/predicates';

export const ACTION_SET_URL_CONFIG = 'ACTION_SET_URL_CONFIG';
export type SetUrlConfigAction = PayloadAction<string | UrlConfig>;

export const ACTION_CLEAR_URL_CONFIG = 'ACTION_CLEAR_URL_CONFIG';
export type ClearUrlConfigAction = Action;

export const clearUrlConfigAction: Generator<ClearUrlConfigAction> = createAction(
  ACTION_CLEAR_URL_CONFIG
);

const _setUrlConfigAction = createAction(ACTION_SET_URL_CONFIG);
export const setUrlConfigAction: UnaryFunction<
  StaticHubInfoUrlProvider | UrlConfig,
  SetUrlConfigAction
> = (provider) =>
  _setUrlConfigAction(
    isStaticHubInfoUrlProvider(provider)
      ? urlToString(urlFromProvider(provider))
      : provider
  );
