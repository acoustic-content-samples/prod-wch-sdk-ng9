import { Action } from 'redux';
import { rxPipe } from '@acoustic-content-sdk/utils';
import { ofInitFeature } from '@acoustic-content-sdk/redux-store';
import { combineEpics, Epic } from 'redux-observable';
import { mergeMapTo } from 'rxjs/operators';
import { EMPTY } from 'rxjs';
import { addToSetEpic } from '@acoustic-content-sdk/redux-utils';
import { {{{idConstant}}} } from './{{{idFileName}}}';
import { {{{baseItem}}} } from './{{{stateFileName}}}';
import { {{{addActionConstant}}}, {{{setActionConstant}}} } from './{{{actionsFileName}}}';

/**
 * Perform initialization actions of the `{{{idConstant}}}` feature.
 */
const initEpic: Epic = (actions$) =>
  rxPipe(actions$, ofInitFeature({{{idConstant}}}), mergeMapTo(EMPTY));

/**
 * Epic to dispatch an `{{{addActionConstant}}}` action to a `{{{setActionConstant}}}`.
 */
const setEpic = addToSetEpic<{{{baseItem}}}>(
  {{{addActionConstant}}},
  {{{setActionConstant}}}
);

export const {{{baseEpic}}}: Epic = combineEpics(
  initEpic,
  setEpic
);
