import { readFileSync } from 'fs';
import { join } from 'path';

import { ASSET_ROOT } from './../test/assets';
import { astToNg } from './ast.to.ng';
import { parseHbsTemplate } from './parse';

describe('ast.to.ng', () => {
  it('should convert a template', () => {
    const hbs = readFileSync(join(ASSET_ROOT, 'layout.hbs'), 'utf-8');
    // parse the template
    const ast = parseHbsTemplate(hbs);

    console.log(astToNg(ast));

    console.log(JSON.stringify(ast, undefined, 2));
  });
});
