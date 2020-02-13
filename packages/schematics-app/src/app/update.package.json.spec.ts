import { createTransientTree } from '@acoustic-content-sdk/schematics-utils';
import { jsonParse, rxPipe } from '@acoustic-content-sdk/utils';
import { Tree } from '@angular-devkit/schematics';
import { join } from 'path';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ASSET_DIR } from '../test/assets';
import { MODULE } from './../version';
import { Schema } from './schema';
import { updatePackageJson } from './update.package.json';

describe('update package json', () => {
  const ROOT = join(ASSET_DIR, 'ng9-app-with-routing');

  it('should fix the package json', () => {
    // options
    const options: Schema = {};
    // our host tree
    const tree = createTransientTree(ROOT);

    const pkgRule = updatePackageJson(options);

    const tree$ = pkgRule(tree, undefined) as Observable<Tree>;

    const test$ = rxPipe(
      tree$,
      map((host) =>
        jsonParse<any>(host.get('/package.json').content.toString())
      ),
      map((pkg) => {
        expect(pkg.devDependencies[MODULE]).toBeDefined();
      })
    );

    return test$.toPromise();
  });
});
