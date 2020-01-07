import { UnaryFunction } from 'rxjs';
import { createAction } from 'redux-actions';
import { PayloadAction } from '@acoustic-content-sdk/redux-store';
import { {{{baseItem}}} } from './{{{stateFileName}}}';

/**
 * Adds a `{{{baseItem}}}` to the system. This action will dispatch
 * to the `{{{setActionConstant}}}` action. It is safe to register side
 * effects on `{{{addActionConstant}}}`.
 */
export const {{{addActionConstant}}} = '{{{addActionConstant}}}';
export type {{{addAction}}} = PayloadAction<{{{baseItem}}}>;

export const {{{addActionCreator}}}: UnaryFunction<
  {{{baseItem}}},
  {{{addAction}}}
> = createAction({{{addActionConstant}}});

/**
 * Adds a `{{{baseItem}}}` to the system. This action will trigger
 * the actual reducer. Make sure to NOT add side effects to
 * this `{{{setActionConstant}}}`.
 */
 export const {{{setActionConstant}}} = '{{{setActionConstant}}}';
export type {{{setAction}}} = PayloadAction<{{{baseItem}}}>;

export const {{{setActionCreator}}}: UnaryFunction<
  {{{baseItem}}},
  {{{setAction}}}
> = createAction({{{setActionConstant}}});
