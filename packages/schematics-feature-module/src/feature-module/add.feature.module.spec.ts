import { join } from 'path';
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
import { ASSET_ROOT } from '../utils/test.assets';
import { Observable } from 'rxjs';
import { rxPipe } from '@acoustic-content-sdk/utils';
import { map, tap } from 'rxjs/operators';

describe('add.feature.module', () => {
  // construct the context
  const ctx: SchematicContext = {
    schematic: { description: { schema: __dirname } }
  } as any;

  it('should find all modules', () => {
    // app root
    const root = join(ASSET_ROOT, 'proto-sites-next-app');

    // test project
    const projectTree = new HostTree(
      new ScopedHost(new NodeJsSyncHost(), normalize(root))
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
    const result$ = rule(tree, ctx) as Observable<Tree>;

    const test$ = rxPipe(
      result$,
      tap((tr) => {
        // read back
        const data = tree.read('/src/app/app.module.ts');
        // validate
        expect(data.includes('TestModule')).toBeTruthy();
      })
    );

    return test$.toPromise();
  });
});
