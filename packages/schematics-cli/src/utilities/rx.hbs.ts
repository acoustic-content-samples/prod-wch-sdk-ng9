import { rxReadTextFile } from '@acoustic-content-sdk/schematics-utils';
import { lazyGenerator, opShareLast, rxPipe } from '@acoustic-content-sdk/utils';
import * as Handlebars from 'handlebars';
import * as jsStringEscape from 'js-string-escape';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

const helpers = require('handlebars-helpers');

/**
 * lazy instance of the hbs code
 */
const hbs = lazyGenerator(() => {
  // create a new hbs instance
  const handlebars = Handlebars.create();
  // add custom helpers
  helpers({ handlebars });
  handlebars.registerHelper('jsEscape', jsStringEscape);
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
