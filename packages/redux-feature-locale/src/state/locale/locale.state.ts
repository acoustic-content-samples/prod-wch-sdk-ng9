import { Locale } from '@acoustic-content-sdk/api';
import { selectPayload } from '@acoustic-content-sdk/redux-store';
import { Reducer } from 'redux';
import { handleActions } from 'redux-actions';

import { ACTION_SET_LOCALE, SetLocaleAction } from './locale.actions';

// default
const DEFAULT_LOCALE = 'en';

// defines the UI locale
export type LocaleState = Locale;

/**
 * reducers for locale
 */
export const localeReducer: Reducer<LocaleState> = handleActions(
  {
    [ACTION_SET_LOCALE]: (state: LocaleState, action: SetLocaleAction) =>
      selectPayload(action)
  },
  DEFAULT_LOCALE
);
