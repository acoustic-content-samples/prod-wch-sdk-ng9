import { join, normalize } from '@angular-devkit/core';
import { NodeJsSyncHost } from '@angular-devkit/core/node';
import { ScopedHost } from '@angular-devkit/core/src/virtual-fs/host';
import { HostTree } from '@angular-devkit/schematics';
import { objectKeys, reduceForIn, assignObject } from '@acoustic-content-sdk/utils';

import { TEST_DIR } from '../test/assets';
import { debugLog } from '../test/log';
import { readSourceFiles } from './typescript';
import { getLayoutComponents, resolveClassHierarchy } from './layout.component';

describe('layout.component', () => {
  const PROJECT_DIR = join(normalize(TEST_DIR), 'layout.component');

  it('should resolve the type hierarchy', () => {
    // generate the data
    const sourceTree = new HostTree(
      new ScopedHost(new NodeJsSyncHost(), normalize(PROJECT_DIR))
    );
    // load the source files
    const sourceFiles = readSourceFiles(normalize('/src'), sourceTree);

    // find the layout component files
    const layoutComponents = getLayoutComponents(sourceFiles);

    // validate
    const layoutComponentsSet = new Set(objectKeys(layoutComponents));
    expect(layoutComponentsSet.size).toBe(1);

    // resolve the base classes

    const allClasses = reduceForIn(
      layoutComponents,
      (res, component) =>
        assignObject(res, resolveClassHierarchy(sourceFiles, component)),
      {}
    );

    // validate
    const allClassesSet = new Set(objectKeys(allClasses));
    expect(allClassesSet.size).toBe(3);
  });
});
