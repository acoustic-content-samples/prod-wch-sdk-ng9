import { normalize, Path, virtualFs } from '@angular-devkit/core';
import { NodeJsSyncHost } from '@angular-devkit/core/node';
import { ScopedHost } from '@angular-devkit/core/src/virtual-fs/host';
import {
  HostTree,
  VirtualTree,
  FileEntry,
  Tree,
  DelegateTree,
  url,
  Rule
} from '@angular-devkit/schematics';
import { join } from 'path';

import { TEST_DIR } from '../../test/assets';
import { generateComponents } from './generate.components';
import { Observable } from 'rxjs';

describe('generate.components', () => {
  // root directory for the test project
  const PROJECT_DIR = join(TEST_DIR, 'project');
  const SIMPLE_DATA_DIR = join(TEST_DIR, 'data', 'simple');

  it('should generate components', () => {
    // generate the data
    const projectTree = new HostTree(
      new ScopedHost(new NodeJsSyncHost(), normalize(PROJECT_DIR))
    );
    const dataTree = new HostTree(
      new ScopedHost(new NodeJsSyncHost(), normalize(SIMPLE_DATA_DIR))
    );
    // merge
    const tree = new VirtualTree();
    projectTree.visit((path: Path, entry?: Readonly<FileEntry>) =>
      tree.create(path, entry.content)
    );
    dataTree.visit((path: Path, entry?: Readonly<FileEntry>) =>
      tree.create(`/data${path}`, entry.content)
    );

    // call our rule
    const gen: Rule = generateComponents({});
    const res$ = gen(tree, undefined) as Observable<Tree>;

    return res$.toPromise();
  });
});
