import { Action } from 'redux';
import { createAction } from 'redux-actions';

export const ACTION_INIT = 'ACTION_INIT';

export type InitAction = Action;

export const initAction: () => InitAction = createAction(ACTION_INIT);

// export const initEpic: Epic = actions$ => rxPipe(actions$, ofType(ACTION_INIT));
