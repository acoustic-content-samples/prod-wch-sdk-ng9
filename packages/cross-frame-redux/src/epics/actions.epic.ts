import {
  Consumer,
  isString,
  opFilterNever,
  pluckProperty,
  Predicate,
  rxPipe
} from '@acoustic-content-sdk/utils';
import { Action } from 'redux';
import { Epic } from 'redux-observable';
import { filter, map } from 'rxjs/operators';

const selectType = pluckProperty<Action, 'type'>('type');

const ACTION_TEST = /^ACTION_SET_[\w]+$/;

/**
 * Checks if an action is a SET_XXX action
 *
 * @param aAction  - action to test
 * @returns true if this is a SET_XXX action, else false
 */
export function isSetAction(aAction: Action): boolean {
  const type = selectType(aAction);
  return isString(type) && ACTION_TEST.test(type);
}

/**
 * Checks if an action is NOT a SET_XXX action
 *
 * @param aAction  - action to test
 * @returns true if this is NOT a SET_XXX action, else false
 */
export function isNotSetAction(aAction: Action): boolean {
  const type = selectType(aAction);
  return isString(type) && !ACTION_TEST.test(type);
}

/**
 * Constructs an epic that dispatches actions
 *
 * @param aActionFilter - filter that tests for applicable actions
 * @param aSendMessage  - callback that dispatches the action
 *
 * @returns the epic
 */
export function createActionsEpic(
  aActionFilter: Predicate<Action>,
  aSendMessage: Consumer<Action>
): Epic {
  /**
   * Initialize the active page
   */
  const dispatchActionEpic: Epic = (actions$) =>
    rxPipe(
      actions$,
      // select the right set of actions
      filter(aActionFilter),
      // dispatch to the parent
      map(aSendMessage),
      // nothing to return
      opFilterNever
    );

  return dispatchActionEpic;
}
