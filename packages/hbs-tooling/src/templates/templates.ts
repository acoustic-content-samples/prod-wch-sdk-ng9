import { FileDescriptor, rxReadDir } from '@acoustic-content-sdk/tooling';
import { rxPipe } from '@acoustic-content-sdk/utils';
import { compile, create } from 'handlebars';
import { Observable, UnaryFunction } from 'rxjs';
import { map, mergeMap, shareReplay } from 'rxjs/operators';

export type TemplateType = ReturnType<typeof compile>;
export type HandlebarsType = ReturnType<typeof create>;

export type TemplateDescriptor = [TemplateType, TemplateType];

/**
 * Construct a new handlebars instance
 *
 * @returns the handlebars instance
 */
function createHandlebars() {
  // load the helpers
  const helpers = require('handlebars-helpers');
  // the instance
  const hbs = create();
  helpers(hbs);
  // ok
  return hbs;
}

/**
 * Constructs a handlebars compiler
 *
 * @param aHandlebars - optionally a handlebars instance
 * @returns the compiler
 */
export function createCompiler(
  aHandlebars?: HandlebarsType
): UnaryFunction<string, TemplateType> {
  // the instance
  const hbs = aHandlebars || createHandlebars();
  // compile the value
  return (aValue: string) => hbs.compile(aValue);
}

/**
 * Reads a list of files and interprets them as templates, both in the filename and the
 * content.
 *
 * @param aDir - directory to start in
 * @param aHandlebars - optionally the handlebars instance
 *
 * @returns the compiled templates
 */
export function rxReadTemplates(
  aDir: string,
  aHandlebars?: HandlebarsType
): Observable<TemplateDescriptor> {
  // compile the value
  const cmp = createCompiler(aHandlebars);
  // iterate and compile
  return rxPipe(
    rxReadDir(aDir),
    map(([name, data]) => [name, data.toString()]),
    map(([name, data]) => [cmp(name), cmp(data)])
  );
}

function applyTemplates(
  aTemp$: Observable<TemplateDescriptor>,
  aCtx: any
): Observable<FileDescriptor<string>> {
  return rxPipe(
    aTemp$,
    map(([nameTmp, dataTmp]) => [nameTmp(aCtx), dataTmp(aCtx)])
  );
}

/**
 * Applies templates to a set of contexts
 *
 * @param aCtx$  - the set of contexts
 * @param aTemp$ - the set of templates
 *
 * @returns the final data stream
 */
export function rxApplyTemplates(
  aCtx$: Observable<any>,
  aTemp$: Observable<TemplateDescriptor>
): Observable<FileDescriptor<string>> {
  // share
  const temp$ = rxPipe(aTemp$, shareReplay());
  // combine
  return rxPipe(
    aCtx$,
    mergeMap((ctx) => applyTemplates(temp$, ctx))
  );
}
