export type HandlebarsProcessor = (aContext: any) => string;

export type HandlebarsCompiler = (input: string) => HandlebarsProcessor;

/*
 * Compiles the template string
 *
 * @param aTemplate - the template
 */
export function compileTemplate(
  aModule: HandlebarsCompiler,
  aTemplate: string
): HandlebarsProcessor {
  // dispatch to our private handlebars instance
  return aModule(aTemplate);
}
