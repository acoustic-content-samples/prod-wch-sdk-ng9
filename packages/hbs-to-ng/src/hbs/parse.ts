import { AST, parse } from 'handlebars/dist/handlebars';

/**
 * Exposes the handlebars parser
 *
 * @param aTemplate  - the template as a string
 * @returns the parser
 */
export function parseHbsTemplate(aTemplate: string): AST {
  return parse(aTemplate);
}
