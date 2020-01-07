import { AuthoringLayoutItem, LoggerService } from '@acoustic-content-sdk/api';
import {
  ACTION_ADD_AUTH_LAYOUT,
  AddAuthoringLayoutAction
} from '@acoustic-content-sdk/redux-feature-auth-layout';
import { setErrorAction } from '@acoustic-content-sdk/redux-feature-error';
import {
  createLoader,
  guaranteeEpic,
  LoaderType
} from '@acoustic-content-sdk/redux-feature-load';
import { selectPayload } from '@acoustic-content-sdk/redux-store';
import { FetchText } from '@acoustic-content-sdk/rest-api';
import {
  anyToString,
  constGenerator,
  escapeHtml,
  getProperty,
  isNotNil,
  isString,
  LAYOUT_TYPE_HANDLEBARS,
  rxNext,
  rxPipe
} from '@acoustic-content-sdk/utils';
import { combineEpics, Epic, ofType } from 'redux-observable';
import { MonoTypeOperatorFunction, of } from 'rxjs';
import { catchError, filter, map } from 'rxjs/operators';
import {
  compileTemplate,
  HandlebarsCompiler,
  HandlebarsProcessor
} from '../../utils/handlebars';
import {
  ACTION_HANDLEBARS_ADD_TEMPLATE,
  ACTION_HANDLEBARS_GUARANTEE_TEMPLATE,
  ACTION_HANDLEBARS_LOAD_TEMPLATE,
  HandlebarsAddTemplateAction,
  handlebarsAddTemplateAction,
  HandlebarsAddTemplatePayload,
  handlebarsGuaranteeTemplateAction,
  HandlebarsLoadTemplateAction,
  handlebarsLoadTemplateAction,
  handlebarsSetErrorAction,
  handlebarsSetTemplateAction
} from './handlebars.actions';
import { selectHandlebarsFeature } from './handlebars.feature';
import { isValidHandlebarsTemplateState } from './handlebars.selectors';
import { HandlebarsKey, HandlebarsState } from './handlebars.state';

export interface HandlebarsDependencies {
  fetchText: FetchText;
  logSvc: LoggerService;
  templateCompiler: HandlebarsCompiler;
}

const REL_DELIVERY_RESOURCES = 'mydelivery/v1/resources';

const LOGGER = 'HandlebarsEpic';

/**
 * Initialize the active page
 */
const loadHandlebarsEpic: Epic = (
  actions$,
  state$,
  { fetchText, logSvc }: HandlebarsDependencies
) => {
  // logger
  const logger = logSvc.get(LOGGER);
  // the loader logic
  const loadTemplate: LoaderType = (key) =>
    rxPipe(
      fetchText(`${REL_DELIVERY_RESOURCES}?path=${encodeURIComponent(key)}`),
      map((stringTemplate) =>
        handlebarsAddTemplateAction({ key, stringTemplate })
      ),
      catchError((error) =>
        of(setErrorAction(error), handlebarsSetErrorAction({ key, error }))
      )
    );
  // the loader operator
  const opLoader = createLoader(state$, loadTemplate, logger);

  return rxPipe(
    actions$,
    ofType<HandlebarsLoadTemplateAction>(ACTION_HANDLEBARS_LOAD_TEMPLATE),
    // extract payload
    map(selectPayload),
    // load
    opLoader
  );
};

/** Verifies that we have indeed a handlebars layout */
function isHandlebarsLayout(aLayoutItem: AuthoringLayoutItem): boolean {
  return (
    aLayoutItem &&
    aLayoutItem.templateType === LAYOUT_TYPE_HANDLEBARS &&
    isString(aLayoutItem.template)
  );
}

const resolveLayoutEpic: Epic = (
  actions$,
  state$,
  { logSvc }: HandlebarsDependencies
) => {
  // logger
  const logger = logSvc.get(LOGGER);
  // next logger
  const log: <T>(...v: any[]) => MonoTypeOperatorFunction<T> = rxNext(
    logger,
    'resolveLayoutEpic'
  );

  return rxPipe(
    actions$,
    ofType<AddAuthoringLayoutAction>(ACTION_ADD_AUTH_LAYOUT),
    // extract payload
    map(selectPayload),
    // make sure we have a handlebars layout
    filter(isHandlebarsLayout),
    // load template
    log('handlebarsLayout'),
    // load the beast
    map((layout) => handlebarsGuaranteeTemplateAction(layout.template))
  );
};

// escapes markup for use with handlebars
function escapeForHtml(aValue: any): string {
  return escapeHtml(anyToString(aValue));
}

// compiles the error template
function compileError<T>(
  aKey: string,
  aTemplate: string,
  aError: any
): HandlebarsProcessor {
  // the raw blocks
  const rawKey = escapeForHtml(aKey);
  const rawError = escapeForHtml(aError);
  const rawTemplate = escapeForHtml(aTemplate);
  // construct the fallback template
  const fallback = `<div><div>${rawKey}</div><pre>${rawError}</pre><pre>${rawTemplate}</pre></div>`;
  // generate the fallback string
  return constGenerator(fallback);
}

/**
 * Compiles a handlebars template into a delegate. In case of an error, this will dynamically
 * create a handlebars template that displays the error
 *
 * @param aKey - the key to the template for debugging purposes
 * @param aTemplate - the original template
 *
 * @returns the delegate
 */
function safeCompileTemplate<T = any>(
  aKey: string,
  aTemplate: string,
  aModule: HandlebarsCompiler
): HandlebarsProcessor {
  try {
    // compile
    return compileTemplate(aModule, aTemplate);
  } catch (error) {
    // the raw blocks
    return compileError(aKey, aTemplate, error);
  }
}
const compileTemplateEpic: Epic = (
  actions$,
  state$,
  { templateCompiler, logSvc }: HandlebarsDependencies
) => {
  // logger
  const logger = logSvc.get(LOGGER);
  // next logger
  const log: <T>(...v: any[]) => MonoTypeOperatorFunction<T> = rxNext(
    logger,
    'compileTemplateEpic'
  );

  return rxPipe(
    actions$,
    ofType<HandlebarsAddTemplateAction>(ACTION_HANDLEBARS_ADD_TEMPLATE),
    // extract payload
    map<HandlebarsAddTemplateAction, HandlebarsAddTemplatePayload>(
      selectPayload
    ),
    // load template
    log('template'),
    // load the beast
    map(({ key, stringTemplate }) =>
      handlebarsSetTemplateAction({
        key,
        stringTemplate,
        compiledTemplate: safeCompileTemplate(
          key,
          stringTemplate,
          templateCompiler
        )
      })
    )
  );
};

/** Tests if the store has a valid entry */
function handlebarsTemplateStateValid(
  aId: HandlebarsKey,
  aState: HandlebarsState
): boolean {
  // check
  return (
    isString(aId) &&
    isNotNil(aState) &&
    isValidHandlebarsTemplateState(getProperty(aState, aId))
  );
}

/**
 * Handles handlebars guarantees
 */
const guaranteeHandlebarsEpic: Epic = guaranteeEpic(
  ACTION_HANDLEBARS_GUARANTEE_TEMPLATE,
  handlebarsLoadTemplateAction,
  selectHandlebarsFeature,
  handlebarsTemplateStateValid
);

export const handlebarsEpic: Epic = combineEpics(
  loadHandlebarsEpic,
  guaranteeHandlebarsEpic,
  resolveLayoutEpic,
  compileTemplateEpic
);
