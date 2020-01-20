import { normalize, Path } from '@angular-devkit/core';
import { NodeJsSyncHost } from '@angular-devkit/core/node';
import {
  MergeStrategy,
  FileEntry,
  HostTree,
  Rule,
  Tree
} from '@angular-devkit/schematics';
import { ScopedHost } from '@angular-devkit/core/src/virtual-fs/host';
import { rxPipe } from '@acoustic-content-sdk/utils';
import { NodeJsAsyncHost } from '@angular-devkit/core/node';
import { ASSETS_DIR } from './../../test/assets';
import { join } from 'path';
import { generateContributions } from './generate.contributions';
import { ArtifactMode } from '@acoustic-content-sdk/tooling';
import { Observable } from 'rxjs';

describe('generate.contributions', () => {
  it('should generate contributions', async () => {
    // root dir
    const ROOT_DIR = join(ASSETS_DIR, 'proto-sites-next-app');
    // generate the data
    const projectTree = new HostTree(
      new ScopedHost(new NodeJsSyncHost(), normalize(ROOT_DIR))
    );
    // merge
    const tree = new HostTree();
    projectTree.visit((path: Path, entry?: Readonly<FileEntry>) =>
      tree.create(path, entry.content)
    );
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
