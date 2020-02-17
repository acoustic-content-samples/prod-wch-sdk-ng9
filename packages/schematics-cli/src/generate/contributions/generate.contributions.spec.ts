import { createTransientTree } from '@acoustic-content-sdk/schematics-utils';
import { ArtifactMode } from '@acoustic-content-sdk/tooling-contributions';
import { MergeStrategy, Tree } from '@angular-devkit/schematics';
import { join } from 'path';
import { Observable } from 'rxjs';

import { ASSETS_DIR } from './../../test/assets';
import { generateContributions } from './generate.contributions';

describe('generate.contributions', () => {
  it('should generate contributions', async () => {
    // root dir
    const ROOT_DIR = join(ASSETS_DIR, 'proto-sites-next-app');
    // generate the data
    const tree = createTransientTree(ROOT_DIR);
    // get the contributions
    const contributions = generateContributions({
      configuration: 'production, edit',
      mode: ArtifactMode.PREVIEW
    });
    // apply the rule
    const tree$ = contributions(tree, {
      strategy: MergeStrategy.Overwrite
    } as any) as Observable<Tree>;

    const output = await tree$.toPromise();

    return output;
  });
});
