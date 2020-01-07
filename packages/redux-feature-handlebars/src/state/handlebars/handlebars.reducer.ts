import { selectPayload } from '@acoustic-content-sdk/redux-store';
import { Reducer } from 'redux';
import { handleActions } from 'redux-actions';

import {
  ACTION_HANDLEBARS_SET_ERROR,
  ACTION_HANDLEBARS_SET_TEMPLATE,
  HandlebarsActionsPayload,
  HandlebarsSetErrorAction,
  HandlebarsSetTemplateAction
} from './handlebars.actions';
import { HandlebarsState } from './handlebars.state';

// default
const DEFAULT_STATE: HandlebarsState = {};

/** Indicates that the processing of a template resulted in an error */
function setError(
  state: HandlebarsState,
  action: HandlebarsSetErrorAction
): HandlebarsState {
  // extract the data
  const { key, error } = selectPayload(action);
  // TODO we could be more lenient here
  // update
  return {
    ...state,
    [key]: {
      error
    }
  };
}

function setTemplate(
  state: HandlebarsState,
  action: HandlebarsSetTemplateAction
): HandlebarsState {
  // extract the data
  const { key, stringTemplate, compiledTemplate } = selectPayload(action);
  // check if we need an update
  const oldEntry = state[key];
  const isClean =
    oldEntry &&
    oldEntry.compiledTemplate &&
    oldEntry.stringTemplate === stringTemplate;
  // no update required
  if (isClean) {
    return state;
  }
  // update
  return {
    ...state,
    [key]: {
      stringTemplate,
      compiledTemplate
    }
  };
}

/**
 * reducers for templates
 */
export const handlebarsReducer: Reducer<
  HandlebarsState,
  HandlebarsSetTemplateAction | HandlebarsSetErrorAction
> = handleActions<HandlebarsState, HandlebarsActionsPayload>(
  {
    [ACTION_HANDLEBARS_SET_TEMPLATE]: setTemplate,
    [ACTION_HANDLEBARS_SET_ERROR]: setError
  },
  DEFAULT_STATE
);
