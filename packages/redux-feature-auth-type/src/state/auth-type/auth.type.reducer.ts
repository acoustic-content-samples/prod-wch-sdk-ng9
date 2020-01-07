import { AuthoringType } from '@acoustic-content-sdk/api';
import { selectPayload } from '@acoustic-content-sdk/redux-store';
import { updateItemsWithRevision } from '@acoustic-content-sdk/redux-utils';
import { isGroupElement, mapArray } from '@acoustic-content-sdk/utils';
import { Reducer } from 'redux';
import { handleActions } from 'redux-actions';

import {
  ACTION_ADD_AUTH_CONTENT_TYPE,
  ACTION_SET_AUTH_CONTENT_TYPE,
  AddAuthoringContentTypeAction,
  SetAuthoringContentTypeAction
} from './auth.type.actions';
import { AuthoringTypeState } from './auth.type.state';

const DEFAULT_STATE: AuthoringTypeState = {};

const setType = (
  state: AuthoringTypeState,
  action: AddAuthoringContentTypeAction | SetAuthoringContentTypeAction
): AuthoringTypeState =>
  updateItemsWithRevision(
    state,
    removeResolvedTypeReferences(selectPayload(action))
  );

function removeResolvedTypeReferences(
  authoringType: AuthoringType
): AuthoringType {
  return {
    // create a shallow copy
    ...authoringType,
    elements: mapArray(authoringType.elements, element => {
      // do we need to remove a resolved type reference?
      if (isGroupElement(element)) {
        // cannot be nil for group elements
        const { typeRef } = element;
        const { id, description, name } = typeRef;
        // return copy of element and replace typeRef property
        return { ...element, typeRef: { id, description, name } };
      } else {
        // return element as-is
        return element;
      }
    })
  };
}

/**
 * reducers for templates
 */
export const authoringTypeReducer: Reducer<
  AuthoringTypeState,
  AddAuthoringContentTypeAction | SetAuthoringContentTypeAction
> = handleActions(
  {
    [ACTION_ADD_AUTH_CONTENT_TYPE]: setType,
    [ACTION_SET_AUTH_CONTENT_TYPE]: setType
  },
  DEFAULT_STATE
);
