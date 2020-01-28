import { normalize, Path } from '@angular-devkit/core';
import { FileEntry, HostTree, Rule, Tree } from '@angular-devkit/schematics';
import { NodeJsSyncHost } from '@angular-devkit/core/node';
import { ScopedHost } from '@angular-devkit/core/src/virtual-fs/host';
import { findAllModules, isBaseModule } from './modules';

describe('modules', () => {
  it('should find all modules', () => {
    // test project
    const projectTree = new HostTree(
      new ScopedHost(
        new NodeJsSyncHost(),
        normalize('C:\\d\\proto-sites-next-app')
      )
    );
    // locate all modules
    const modules = findAllModules(projectTree, 'src').filter(isBaseModule);
    console.log(modules.map(([name]) => name));
  });
});
