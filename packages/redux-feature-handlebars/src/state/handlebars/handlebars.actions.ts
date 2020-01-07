import { PayloadAction } from '@acoustic-content-sdk/redux-store';
import { createAction } from 'redux-actions';
import { UnaryFunction } from 'rxjs';

import { HandlebarsProcessor } from '../../utils/handlebars';
import { HandlebarsKey } from './handlebars.state';

export const ACTION_HANDLEBARS_SET_ERROR = 'ACTION_HANDLEBARS_SET_ERROR';

export const ACTION_HANDLEBARS_LOAD_TEMPLATE =
  'ACTION_HANDLEBARS_LOAD_TEMPLATE';

export type HandlebarsLoadTemplateAction = PayloadAction<HandlebarsKey>;

export const ACTION_HANDLEBARS_GUARANTEE_TEMPLATE =
  'ACTION_HANDLEBARS_GUARANTEE_TEMPLATE';

export type HandlebarsGuaranteeTemplateAction = PayloadAction<HandlebarsKey>;

/**
 * Do not add a side effect to this action
 */
export const ACTION_HANDLEBARS_SET_TEMPLATE = 'ACTION_HANDLEBARS_SET_TEMPLATE';
export interface HandlebarsSetTemplatePayload {
  key: HandlebarsKey;
  stringTemplate: string;
  compiledTemplate: HandlebarsProcessor;
}

export const ACTION_HANDLEBARS_ADD_TEMPLATE = 'ACTION_HANDLEBARS_ADD_TEMPLATE';
export interface HandlebarsAddTemplatePayload {
  key: HandlebarsKey;
  stringTemplate: string;
}

export interface HandlebarsSetErrorPayload {
  key: HandlebarsKey;
  error: Error;
}

export type HandlebarsSetErrorAction = PayloadAction<HandlebarsSetErrorPayload>;

export type HandlebarsAddTemplateAction = PayloadAction<
  HandlebarsAddTemplatePayload
>;

export type HandlebarsSetTemplateAction = PayloadAction<
  HandlebarsSetTemplatePayload
>;

export const handlebarsAddTemplateAction: UnaryFunction<
  HandlebarsAddTemplatePayload,
  HandlebarsAddTemplateAction
> = createAction(ACTION_HANDLEBARS_ADD_TEMPLATE);

export const handlebarsSetTemplateAction: UnaryFunction<
  HandlebarsSetTemplatePayload,
  HandlebarsSetTemplateAction
> = createAction(ACTION_HANDLEBARS_SET_TEMPLATE);

export const handlebarsLoadTemplateAction: UnaryFunction<
  HandlebarsKey,
  HandlebarsLoadTemplateAction
> = createAction(ACTION_HANDLEBARS_LOAD_TEMPLATE);

export const handlebarsGuaranteeTemplateAction: UnaryFunction<
  HandlebarsKey,
  HandlebarsGuaranteeTemplateAction
> = createAction(ACTION_HANDLEBARS_GUARANTEE_TEMPLATE);

export const handlebarsSetErrorAction: UnaryFunction<
  HandlebarsSetErrorPayload,
  HandlebarsSetErrorAction
> = createAction(ACTION_HANDLEBARS_SET_ERROR);

export type HandlebarsActions =
  | HandlebarsSetTemplateAction
  | HandlebarsSetErrorAction;

export type HandlebarsActionsPayload =
  | HandlebarsSetTemplatePayload
  | HandlebarsSetErrorPayload;
