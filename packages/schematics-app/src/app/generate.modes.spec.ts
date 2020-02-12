import {
  createTransientTree,
  findProjectName,
  getWorkspace,
  WorkspaceSchema
} from '@acoustic-content-sdk/schematics-utils';
import { ArtifactMode } from '@acoustic-content-sdk/tooling-contributions';
import { getPath, rxPipe } from '@acoustic-content-sdk/utils';
import { Tree } from '@angular-devkit/schematics';
import { join } from 'path';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ASSET_DIR } from '../test/assets';
import { Schema } from './schema';
import { updateAngularJson } from './update.angular.json';
import { generateModeFiles } from './generate.modes';

describe('generate modes', () => {
  const ROOT = join(ASSET_DIR, 'ng9-app-with-routing');

  it('should generate the correct files', () => {
    // options
    const options: Schema = {};
    // our host tree
    const tree = createTransientTree(ROOT);
    // get the project name
    const projectName = findProjectName(tree, options);
    // update
    const rule = generateModeFiles(options);
    const tree$ = rule(tree, undefined) as Observable<Tree>;

    const test$ = rxPipe(tree$);

    return test$.toPromise();
  });
});
