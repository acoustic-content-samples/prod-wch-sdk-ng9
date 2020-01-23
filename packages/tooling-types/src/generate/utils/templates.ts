import { TemplateType } from '@acoustic-content-sdk/hbs-tooling';
import { rxCacheSingle, rxReadTextFile } from '@acoustic-content-sdk/rx-utils';
import { rxPipe } from '@acoustic-content-sdk/utils';
import { create } from 'handlebars';
import jsStringEscape from 'js-string-escape';
import { Observable, UnaryFunction } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';

import { ASSET_ROOT$ } from '../../utils/assets';

/**
 * Construct a new handlebars instance
 *
 * @returns the handlebars instance
 */
export function createHandlebars() {
  // load the helpers
  const helpers = require('handlebars-helpers');
  // the instance
  const hbs = create();
  helpers(hbs);
  hbs.registerHelper('jsEscape', jsStringEscape);
  // ok
  return hbs;
}

/**
 * Loads a template from the assets folder
 *
 * @param aName  - name of the template relative to the assets
 * @param aCompiler - the compiler
 *
 * @returns the compiled function
 */
export function rxReadTemplate(
  aName: string,
  aCompiler: UnaryFunction<string, TemplateType>
): Observable<TemplateType> {
  return rxCacheSingle(
    rxPipe(
      ASSET_ROOT$,
      map((root) => `${root}${aName}`),
      mergeMap((path) => rxReadTextFile(path)),
      map((file) => aCompiler(file))
    )
  );
}
