import { normalize } from '@angular-devkit/core';
import { NodeJsSyncHost } from '@angular-devkit/core/node';
import { ScopedHost } from '@angular-devkit/core/src/virtual-fs/host';
import { HostTree, Tree } from '@angular-devkit/schematics';

/**
 * Creates a transient copy of a tree
 *
 * @param aRoot - root folder for the tree
 * @returns the tree
 */
export function createTransientTree(aRoot: string): Tree {
  return new HostTree(new ScopedHost(new NodeJsSyncHost(), normalize(aRoot)));
}
