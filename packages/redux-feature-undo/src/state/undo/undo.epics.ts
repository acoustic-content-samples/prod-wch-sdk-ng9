import { Logger, User } from '@acoustic-content-sdk/api';
import {
  AuthoringAssetState,
  isAuthoringAsset,
  selectAuthAssetFeature,
  selectAuthoringAsset
} from '@acoustic-content-sdk/redux-feature-auth-asset';
import {
  AuthoringContentState,
  isAuthoringContentItem,
  selectAuthContentFeature,
  selectAuthoringContentItem
} from '@acoustic-content-sdk/redux-feature-auth-content';
import {
  InlineEditState,
  selectInlineEditFeature,
  selectInlineEditSelectedItem
} from '@acoustic-content-sdk/redux-feature-inline-edit';
import {
  ACTION_SAVE_AUTH_BATCH,
  augmentGenericProperties,
  AuthoringSaveItem,
  reduceSaveActions,
  SaveAuthoringBatchAction,
  saveAuthoringBatchAction
} from '@acoustic-content-sdk/redux-feature-save';
import { selectCurrentUserFeature } from '@acoustic-content-sdk/redux-feature-user';
import { rxSelect, selectPayload } from '@acoustic-content-sdk/redux-store';
import { getDeliveryIdFromAuthoringItem } from '@acoustic-content-sdk/redux-utils';
import {
  arrayPush,
  isNotEmpty,
  isNotNil,
  isString,
  mapArray,
  reduceArray,
  rxPipe
} from '@acoustic-content-sdk/utils';
import { Action } from 'redux';
import { combineEpics, Epic, ofType } from 'redux-observable';
import { from } from 'rxjs';
import { filter, map, mergeMap, withLatestFrom } from 'rxjs/operators';
import {
  ACTION_REDO_AUTH_CONTENT,
  ACTION_UNDO_AUTH_CONTENT,
  RedoAuthoringContentAction,
  redoAuthoringContentInternalAction,
  UndoAuthoringContentAction,
  undoAuthoringContentInternalAction,
  undoSetAuthoringContentInternalAction
} from './undo.actions';
import { selectUndoFeature } from './undo.feature';
import {
  selectNextUndoItem,
  selectPreviousUndoItem,
  selectUndoScope
} from './undo.selectors';
import { UndoItems, UndoState } from './undo.state';

export interface UndoDependencies {
  logger: Logger;
}

interface UndoAction extends Action {
  type: string;
  payload: any;
  fromUndo?: Boolean;
}

function itemWithPublishedData(
  aSrc: AuthoringSaveItem,
  items: AuthoringContentState
): Boolean {
  if (isString(aSrc)) {
    const currentItem = items[aSrc];
    if (
      isAuthoringContentItem(currentItem) &&
      isNotNil(currentItem) &&
      currentItem?.links?.linkedDoc
    ) {
      return true;
    }
  }
  return false;
}

function currentItem(
  aDst: UndoItems,
  aSrc: AuthoringSaveItem,
  aItems: AuthoringContentState,
  aAssets: AuthoringAssetState
): UndoItems {
  // access the current version of the previous item
  const id = getId(aSrc);
  // check for the type of the item
  const current = isAuthoringContentItem(aSrc)
    ? selectAuthoringContentItem(id)(aItems)
    : isAuthoringAsset(aSrc)
    ? selectAuthoringAsset(id)(aAssets)
    : id;
  // the item to redo
  const item: AuthoringSaveItem = itemWithPublishedData(aSrc, aItems)
    ? aItems[id]
    : isNotNil(current)
    ? current
    : id;
  // add the internal undo action
  arrayPush(item, aDst);
  // ok
  return aDst;
}

/**
 * Constructs an undo item based on the current state
 *
 * @param aActions - the target actions
 * @param aItem - the undo item to restore
 */
function currentUndoItem(
  aSrc: UndoItems,
  aItems: AuthoringContentState,
  aAssets: AuthoringAssetState
) {
  // if the previous item was a deletion marker, delete the item
  return reduceArray(
    aSrc,
    (dst, item) => currentItem(dst, item, aItems, aAssets),
    []
  );
}

/**
 * When an item is saved update the undo history with this item
 */
const saveAuthBatchEpic: Epic = (actions$, store$) => {
  // select the current items from the store
  const authContent$ = rxPipe(store$, rxSelect(selectAuthContentFeature));
  const authAssets$ = rxPipe(store$, rxSelect(selectAuthAssetFeature));
  const inlineEdit$ = rxPipe(store$, rxSelect(selectInlineEditFeature));
  // selected item
  const undoScope$ = rxPipe(
    inlineEdit$,
    rxSelect(selectInlineEditSelectedItem)
  );

  return rxPipe(
    actions$,
    ofType<SaveAuthoringBatchAction>(ACTION_SAVE_AUTH_BATCH),
    filter((action) => !action.fromUndo),
    // select the internal actions to execute
    map(selectPayload),
    // ignore noops
    filter(isNotEmpty),
    // augment
    withLatestFrom(authContent$, authAssets$),
    // map to the current state of the item
    map(([items, authContent, authAssets]) =>
      currentUndoItem(items, authContent, authAssets)
    ),
    // augment with the current selection
    withLatestFrom(undoScope$),
    // add to the actual action
    map(([items, scope]) =>
      undoSetAuthoringContentInternalAction({ items, scope })
    )
  );
};

/**
 * Constructs the actions required to restore the given undo item
 *
 * @param aActions - the target actions
 * @param aItems - the undo item to restore
 */
function restoreUndoItemActions(
  aActions: UndoAction[],
  aItems: UndoItems,
  aUser: User
): UndoAction[] {
  // augment the items
  const items = mapArray(aItems, (item) =>
    augmentGenericProperties(item, aUser)
  );
  // if the previous item was a deletion marker, delete the item
  // return reduceArray(items, reduceSaveActions, aActions) as UndoAction[];
  return arrayPush(
    { ...saveAuthoringBatchAction(items), fromUndo: true },
    aActions
  );
}

/**
 * Returns the ID from the undo item. Either the item is an id (in which case the item is a deletion marker)
 * or we access the id field
 *
 * @param aItem - the undo item
 * @returns the actual id
 */
function getId(aItem: AuthoringSaveItem): string {
  return isString(aItem) ? aItem : getDeliveryIdFromAuthoringItem(aItem);
}

/**
 * Constructs the internal actions to implement an undo operation
 *
 * @param aUndoState - the undo state
 * @param aItems - the currently loaded items
 *
 * @returns the set of actions
 */
function createUndoActions(
  aUndoState: UndoState,
  aSelection: InlineEditState,
  aItems: AuthoringContentState,
  aAssets: AuthoringAssetState,
  aUser: User
): UndoAction[] {
  // actions
  const actions: UndoAction[] = [];
  // current selection
  const scope = selectInlineEditSelectedItem(aSelection);
  if (isNotNil(scope)) {
    // get the scoped state
    const scopedState = selectUndoScope(scope)(aUndoState);
    // check if we have something to undo
    const previous = selectPreviousUndoItem(scopedState);
    if (isNotNil(previous)) {
      // add the actions to restore the new item
      restoreUndoItemActions(actions, previous, aUser);
      // access the current version of the previous set of items
      const items: UndoItems = currentUndoItem(previous, aItems, aAssets);
      // add the internal undo action
      arrayPush(undoAuthoringContentInternalAction({ scope, items }), actions);
    }
  }
  // the actual ations
  return actions;
}

/**
 * Constructs the internal actions to implement a redo operation
 *
 * @param aUndoState - the undo state
 * @param aItems - the currently loaded items
 *
 * @returns the set of actions
 */
function createRedoActions(
  aUndoState: UndoState,
  aSelection: InlineEditState,
  aItems: AuthoringContentState,
  aAssets: AuthoringAssetState,
  aUser: User
): UndoAction[] {
  // actions
  const actions: UndoAction[] = [];
  // current selection
  const scope = selectInlineEditSelectedItem(aSelection);
  if (isNotNil(scope)) {
    // get the scoped state
    const scopedState = selectUndoScope(scope)(aUndoState);
    // check if we have something to undo
    const next = selectNextUndoItem(scopedState);
    if (isNotNil(next)) {
      // add the actions to restore the new item
      restoreUndoItemActions(actions, next, aUser);
      // access the current version of the next set of items
      const items: UndoItems = currentUndoItem(next, aItems, aAssets);
      // add the internal redo action
      arrayPush(redoAuthoringContentInternalAction({ scope, items }), actions);
    }
  }
  // the actual ations
  return actions;
}

/**
 * Reacts on the undo action
 *
 * @param actions$
 * @param store$
 */
const undoContentEpic: Epic = (actions$, store$) => {
  // select the current content
  const authContent$ = rxPipe(store$, rxSelect(selectAuthContentFeature));
  const authAssets$ = rxPipe(store$, rxSelect(selectAuthAssetFeature));
  const undo$ = rxPipe(store$, rxSelect(selectUndoFeature));
  const currentUser$ = rxPipe(store$, rxSelect(selectCurrentUserFeature));
  const inlineEdit$ = rxPipe(store$, rxSelect(selectInlineEditFeature));

  return rxPipe(
    actions$,
    ofType<UndoAuthoringContentAction>(ACTION_UNDO_AUTH_CONTENT),
    withLatestFrom(undo$, authContent$, authAssets$, currentUser$, inlineEdit$),
    map(([, undo, authContent, authAssets, currentUser, inlineEdit]) =>
      createUndoActions(undo, inlineEdit, authContent, authAssets, currentUser)
    ),
    filter(isNotEmpty),
    mergeMap((actions) => from(actions))
  );
};

const redoContentEpic: Epic = (actions$, store$) => {
  // select the current content
  const authContent$ = rxPipe(store$, rxSelect(selectAuthContentFeature));
  const authAssets$ = rxPipe(store$, rxSelect(selectAuthAssetFeature));
  const undo$ = rxPipe(store$, rxSelect(selectUndoFeature));
  const currentUser$ = rxPipe(store$, rxSelect(selectCurrentUserFeature));
  const inlineEdit$ = rxPipe(store$, rxSelect(selectInlineEditFeature));

  return rxPipe(
    actions$,
    ofType<RedoAuthoringContentAction>(ACTION_REDO_AUTH_CONTENT),
    withLatestFrom(undo$, authContent$, authAssets$, currentUser$, inlineEdit$),
    map(([, undo, authContent, authAssets, currentUser, inlineEdit]) =>
      createRedoActions(undo, inlineEdit, authContent, authAssets, currentUser)
    ),
    filter(isNotEmpty),
    mergeMap((actions) => from(actions))
  );
};

export const undoEpic: Epic = combineEpics(
  saveAuthBatchEpic,
  undoContentEpic,
  redoContentEpic
);
