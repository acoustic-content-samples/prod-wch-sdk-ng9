import { normalize, Path } from '@angular-devkit/core';
import {
  Rule,
  SchematicContext,
  FileEntry,
  SchematicsException,
  Tree
} from '@angular-devkit/schematics';
import { NodeJsSyncHost } from '@angular-devkit/core/node';
import { ScopedHost } from '@angular-devkit/core/src/virtual-fs/host';
import { HostTree } from '@angular-devkit/schematics';
import { addFeatureModuleToApplication } from './add.feature.module';
import { AddFeatureModuleToApplicationSchema } from './feature.module.schema';

describe('add.feature.module', () => {
  const ctx: SchematicContext = {} as any;

  it('should find all modules', () => {
    // test project
    const projectTree = new HostTree(
      new ScopedHost(
        new NodeJsSyncHost(),
        normalize('C:\\d\\proto-sites-next-app')
      )
    );
    // merge
    const tree = new HostTree();
    projectTree.visit(
      (path: Path, entry?: Readonly<FileEntry>) =>
        path.indexOf('node_modules') < 0 && tree.create(path, entry.content)
    );
    // schema
    const schema: AddFeatureModuleToApplicationSchema = {
      module: 'TestModule'
    };
    const rule = addFeatureModuleToApplication(schema);
    rule(tree, ctx);

    // read back
    const data = tree.read('/src/app/app.module.ts');
    console.log(data.toString('utf-8'));
  });
});
