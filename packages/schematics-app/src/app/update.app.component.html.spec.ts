import { createTransientTree } from '@acoustic-content-sdk/schematics-utils';
import { rxPipe } from '@acoustic-content-sdk/utils';
import { Tree } from '@angular-devkit/schematics';
import { join } from 'path';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { ASSET_DIR } from '../test/assets';
import { Schema } from './schema';
import { updateAppComponentHtml } from './update.app.component.html';

describe('update app component', () => {
  function validateTree(aHost: Tree) {
    // options
    const options: Schema = {};
    // the rule
    const rule = updateAppComponentHtml(options);

    const tree$ = rule(aHost, undefined) as Observable<Tree>;

    return rxPipe(
      tree$,
      map((host) => host.get('/src/app/app.component.html').content.toString()),
      tap(console.log)
    );
  }

  it('should update the default component', () => {
    // default root
    const ROOT = join(ASSET_DIR, 'ng9-app-with-routing');
    // our host tree
    return validateTree(createTransientTree(ROOT)).toPromise();
  });
});
