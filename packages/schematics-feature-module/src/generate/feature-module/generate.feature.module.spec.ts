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
import { ASSET_ROOT } from '../../utils/test.assets';
import { Observable } from 'rxjs';
import { rxPipe, jsonParse } from '@acoustic-content-sdk/utils';
import { map, tap } from 'rxjs/operators';
import { GenerateFeatureModuleSchema } from './generate.feature.module.schema';
import { generateFeatureModuleSchematic } from './generate.feature.module';

describe('generate.feature.module', () => {
  // construct the context
  const ctx: SchematicContext = {
    schematic: { description: { schema: __dirname } }
  } as any;

  it('should add schematics support', () => {
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
    const schema: GenerateFeatureModuleSchema = {
      module: 'TestModule'
    };
    const rule = generateFeatureModuleSchematic(schema);
    const result$ = rule(tree, ctx) as Observable<Tree>;

    const test$ = rxPipe(
      result$,
      tap((tr) => {
        // read back
        const data = tr.read('/assets/collection.json');
        // validate
        expect(data).toBeDefined();
        // parse it
        const coll = jsonParse<any>(data.toString());
        expect(coll.schematics['ng-add']).toBeDefined();
      }),
      tap((tr) => {
        // read back
        const data = tr.read('/assets/ng-add/schema.json');
        // validate
        expect(data).toBeDefined();
        // parse it
        const schema = jsonParse<any>(data.toString());
        expect(schema.id).toBeDefined();
      }),
      tap((tr) => {
        // read back
        const data = tr.read('/package.json');
        // validate
        expect(data).toBeDefined();
        // parse it
        const pkg = jsonParse<any>(data.toString());
        expect(pkg.schematics).toBeDefined();
      })
    );

    return test$.toPromise();
  });
});
