import { join, normalize } from '@angular-devkit/core';
import { NodeJsSyncHost } from '@angular-devkit/core/node';
import { ScopedHost } from '@angular-devkit/core/src/virtual-fs/host';
import { HostTree } from '@angular-devkit/schematics';
import { objectKeys } from '@acoustic-content-sdk/utils';

import { TEST_DIR } from '../test/assets';
import { getLayoutComponents } from './layout.component';
import { getLayoutModules } from './layout.module';
import { readSourceFiles } from './typescript';

describe('layout.module', () => {
  const PROJECT_DIR = join(normalize(TEST_DIR), 'layout.component');

  it('should resolve the layout module', () => {
    // generate the data
    const sourceTree = new HostTree(
      new ScopedHost(new NodeJsSyncHost(), normalize(PROJECT_DIR))
    );
    // load the source files
    const sourceFiles = readSourceFiles(normalize('/src'), sourceTree);

    // find the layout component files
    const layoutComponents = getLayoutComponents(sourceFiles);

    // find the modules
    const layoutModules = getLayoutModules(sourceFiles, layoutComponents);

    // validate
    const layoutModulesSet = new Set(objectKeys(layoutModules));
    expect(layoutModulesSet.size).toBe(1);
  });
});
