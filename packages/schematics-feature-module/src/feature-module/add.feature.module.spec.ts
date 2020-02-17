import { createTransientTree } from '@acoustic-content-sdk/schematics-utils';
import { rxPipe } from '@acoustic-content-sdk/utils';
import { SchematicContext, Tree } from '@angular-devkit/schematics';
import { join } from 'path';
import { Observable, noop } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ASSET_ROOT } from '../utils/test.assets';
import { addFeatureModuleToApplication } from './add.feature.module';
import { AddFeatureModuleToApplicationSchema } from './feature.module.schema';

describe('add.feature.module', () => {
  // construct the context
  const ctx: SchematicContext = {
    schematic: { description: { schema: __dirname } },
    addTask: noop
  } as any;

  it('should find dependencies', () => {
    const root = 'C:\\temp\\with-package-manager';
    // merge
    const tree = createTransientTree(root);
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
        const data = tree.read('/src/app/app.module.ts').toString();
        // validate
        console.log(data);
      })
    );

    return test$.toPromise();
  });

  it('should find all modules', () => {
    // app root
    const root = join(ASSET_ROOT, 'proto-sites-next-app');

    // merge
    const tree = createTransientTree(root);
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
