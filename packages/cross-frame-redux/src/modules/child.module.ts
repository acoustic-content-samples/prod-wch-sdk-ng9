import { createReduxFeatureModule } from '@acoustic-content-sdk/redux-store';
import { bindMember, rxPipe } from '@acoustic-content-sdk/utils';
import { combineEpics, Epic } from 'redux-observable';
import { filter } from 'rxjs/operators';

import {
  createActionsEpic,
  isNotSetAction,
  isSetAction
} from '../epics/actions.epic';
import { MessageService } from '../messages/message.service';

/**
 * Constructs the epic for the redux store in the child frame that receives all SET_XXX actions
 * from the parent frame and dispatches all other actions to the parent frame
 *
 * @param aMessageService  - the message service used for the communication from the child frame to the parent frame
 * @returns the epic
 */
function createChildFrameEpic(aMessageService: MessageService): Epic {
  /**
   * Dispatch non-set actions to the parent
   */
  const dispatchActions = createActionsEpic(
    isNotSetAction,
    bindMember(aMessageService, 'sendMessage')
  );
  /**
   * Receive set actions from the parent
   */
  const receiveActions: Epic = () =>
    rxPipe(aMessageService.messages$, filter(isSetAction));

  // dispatch
  return combineEpics(dispatchActions, receiveActions);
}

/**
 * Redux module for the child store
 *
 * @param aMessageService  - message service
 * @returns the child module
 */
export function createChildModule(aMessageService: MessageService) {
  return createReduxFeatureModule(
    undefined,
    undefined,
    createChildFrameEpic(aMessageService),
    undefined
  );
}
