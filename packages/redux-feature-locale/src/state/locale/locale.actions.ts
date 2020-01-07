import { Locale } from '@acoustic-content-sdk/api';
import { PayloadAction } from '@acoustic-content-sdk/redux-store';
import { createAction } from 'redux-actions';
import { UnaryFunction } from 'rxjs';

export const ACTION_SET_LOCALE = 'ACTION_SET_LOCALE';

export type SetLocaleAction = PayloadAction<Locale>;

export const setLocaleAction: UnaryFunction<
  Locale,
  SetLocaleAction
> = createAction(ACTION_SET_LOCALE);
