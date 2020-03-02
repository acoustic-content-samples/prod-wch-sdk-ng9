import { rxReadTextFile } from '@acoustic-content-sdk/schematics-utils';
import {
  jsonStringEscape,
  lazyGenerator,
  opShareLast,
  rxPipe
} from '@acoustic-content-sdk/utils';
import { create } from 'handlebars';
import hbsHelpers from 'handlebars-helpers';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

/**
 * lazy instance of the hbs code
 */
const hbs = lazyGenerator(() => {
  // strange workaround
  const helpers = hbsHelpers;
  // create a new hbs instance
  const handlebars = create();
  // add custom helpers
  helpers({ handlebars });
  handlebars.registerHelper('jsEscape', jsonStringEscape);
  // ok
  return handlebars;
});

/**
 *
 * @param aFile
 */
function _compile(aFile: string): Observable<HandlebarsTemplateDelegate> {
  // read and compile
  return rxPipe(
    rxReadTextFile(aFile),
    map((data) => hbs().compile(data)),
    opShareLast
  );
}

export { _compile as hbsCompile };
