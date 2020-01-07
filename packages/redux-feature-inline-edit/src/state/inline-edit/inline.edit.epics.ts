import { Logger } from '@acoustic-content-sdk/api';
import { guaranteeAuthoringContentAction } from '@acoustic-content-sdk/redux-feature-auth-content';
import { selectPayload } from '@acoustic-content-sdk/redux-store';
import { addToSetEpic } from '@acoustic-content-sdk/redux-utils';
import { opFilterNotNil, rxPipe } from '@acoustic-content-sdk/utils';
import { combineEpics, Epic, ofType } from 'redux-observable';
import { map } from 'rxjs/operators';

import {
  ACTION_ADD_INLINE_EDIT_SELECTED_ITEM,
  ACTION_ADD_INLINE_EDITING,
  ACTION_SET_INLINE_EDIT_SELECTED_ITEM,
  ACTION_SET_INLINE_EDITING,
  SetInlineEditSelectedItemAction
} from './inline.edit.actions';

export interface InlineEditDependencies {
  logger: Logger;
}

// epic to convert from ACTION_ADD_INLINE_EDITING to ACTION_SET_INLINE_EDITING
const setInlineEditingEpic = addToSetEpic(
  ACTION_ADD_INLINE_EDITING,
  ACTION_SET_INLINE_EDITING
);

// epic to convert from ACTION_ADD_INLINE_EDIT_SELECTED_ITEM to ACTION_SET_INLINE_EDIT_SELECTED_ITEM
const setInlineEditSelectedItemEpic = addToSetEpic(
  ACTION_ADD_INLINE_EDIT_SELECTED_ITEM,
  ACTION_SET_INLINE_EDIT_SELECTED_ITEM
);

/**
 * Make sure the selected item is loaded
 */
const loadSelectedItemEpic: Epic = (actions$) =>
  rxPipe(
    actions$,
    ofType<SetInlineEditSelectedItemAction>(
      ACTION_SET_INLINE_EDIT_SELECTED_ITEM
    ),
    // extract the id of the selected item
    map(selectPayload),
    // sanity check
    opFilterNotNil,
    // make sure we load the item
    map(guaranteeAuthoringContentAction)
  );

export const inlineEditEpic: Epic = combineEpics(
  loadSelectedItemEpic,
  setInlineEditingEpic,
  setInlineEditSelectedItemEpic
);
