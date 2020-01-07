import { PayloadAction } from '@acoustic-content-sdk/redux-store';
import { createAction } from 'redux-actions';
import { UnaryFunction } from 'rxjs';

export const ACTION_EDIT_MODE = 'ACTION_EDIT_MODE';

export type EditModeAction = PayloadAction<boolean>;

export const editModeAction: UnaryFunction<
  boolean,
  EditModeAction
> = createAction(ACTION_EDIT_MODE);
