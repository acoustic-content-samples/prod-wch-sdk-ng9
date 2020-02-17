import { PayloadAction } from '@acoustic-content-sdk/redux-store';
import { Generator } from '@acoustic-content-sdk/utils';
import { Action } from 'redux';
import { createAction } from 'redux-actions';
import { UnaryFunction } from 'rxjs';

import { ScopedUndoItems } from './undo.state';

export const ACTION_UNDO_AUTH_CONTENT = 'ACTION_UNDO_AUTH_CONTENT';
export type UndoAuthoringContentAction = Action;
export const undoAuthoringContentAction: Generator<UndoAuthoringContentAction> = createAction(
  ACTION_UNDO_AUTH_CONTENT
);

export const ACTION_REDO_AUTH_CONTENT = 'ACTION_REDO_AUTH_CONTENT';
export type RedoAuthoringContentAction = Action;
export const redoAuthoringContentAction: Generator<RedoAuthoringContentAction> = createAction(
  ACTION_REDO_AUTH_CONTENT
);

export const ACTION_UNDO_AUTH_CONTENT_INTERNAL =
  'ACTION_UNDO_AUTH_CONTENT_INTERNAL';
export type UndoAuthoringContentInternalAction = PayloadAction<ScopedUndoItems>;

/**
 * The parameter is the current version of the content item
 */
export const undoAuthoringContentInternalAction: UnaryFunction<
  ScopedUndoItems,
  UndoAuthoringContentInternalAction
> = createAction(ACTION_UNDO_AUTH_CONTENT_INTERNAL);

export const ACTION_REDO_AUTH_CONTENT_INTERNAL =
  'ACTION_REDO_AUTH_CONTENT_INTERNAL';
export type RedoAuthoringContentInternalAction = PayloadAction<ScopedUndoItems>;

/**
 * The parameter is the current version of the content item
 */
export const redoAuthoringContentInternalAction: UnaryFunction<
  ScopedUndoItems,
  RedoAuthoringContentInternalAction
> = createAction(ACTION_REDO_AUTH_CONTENT_INTERNAL);

export const ACTION_UNDO_SET_AUTH_CONTENT_INTERNAL =
  'ACTION_UNDO_SET_AUTH_CONTENT_INTERNAL';
export type UndoSetAuthoringContentInternalAction = PayloadAction<
  ScopedUndoItems
>;

/**
 * The parameter is the current version of the content item
 */
export const undoSetAuthoringContentInternalAction: UnaryFunction<
  ScopedUndoItems,
  UndoSetAuthoringContentInternalAction
> = createAction(ACTION_UNDO_SET_AUTH_CONTENT_INTERNAL);
