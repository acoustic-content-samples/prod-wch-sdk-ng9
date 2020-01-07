import { HandlebarsProcessor } from '../../utils/handlebars';

// key is the URL
export type HandlebarsKey = string;

export interface HandlebarsTemplateState {
  stringTemplate?: string;
  compiledTemplate?: HandlebarsProcessor;
  error?: Error;
}

// registration of templates
export type HandlebarsState = Record<HandlebarsKey, HandlebarsTemplateState>;
