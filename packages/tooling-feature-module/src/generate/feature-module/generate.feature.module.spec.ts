import { join } from 'path';
import { ASSET_ROOT } from '../../utils/test.assets';
import { Observable } from 'rxjs';
import { rxPipe, jsonParse, objectAssign } from '@acoustic-content-sdk/utils';
import { map, tap, reduce } from 'rxjs/operators';
import { GenerateFeatureModuleSchema } from './generate.feature.module.schema';
import { generateFeatureModule } from './generate.feature.module';
import {
  readTextFile,
  createReadTextFile,
  FileDescriptor
} from '@acoustic-content-sdk/tooling';

describe('generate.feature.module', () => {
  it('should add schematics support', () => {
    // app root
    const root = join(ASSET_ROOT, 'proto-sites-next-app');
    // the read callback
    const readFile = createReadTextFile(root);

    // schema
    const schema: GenerateFeatureModuleSchema = {
      module: 'TestModule'
    };
    const rule = generateFeatureModule(schema);
    const result$ = rule(readFile);

    const test$ = rxPipe(
      result$,
      reduce(
        (dst: Record<string, string>, [name, data]: FileDescriptor<string>) =>
          objectAssign(name, data, dst),
        {}
      ),
      tap((tr) => {
        // read back
        const data = tr['/assets/collection.json'];
        // validate
        expect(data).toBeDefined();
        // parse it
        const coll = jsonParse<any>(data.toString());
        expect(coll.schematics['ng-add']).toBeDefined();
      }),
      tap((tr) => {
        // read back
        const data = tr['/assets/ng-add/schema.json'];
        // validate
        expect(data).toBeDefined();
        // parse it
        const schma = jsonParse<any>(data.toString());
        expect(schma.id).toBeDefined();
      }),
      tap((tr) => {
        // read back
        const data = tr['/package.json'];
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
