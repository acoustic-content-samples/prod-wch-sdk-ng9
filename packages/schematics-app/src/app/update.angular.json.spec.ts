import { Tree } from '@angular-devkit/schematics';
import { join } from 'path';
import { ASSET_DIR } from '../test/assets';
import {
  createTransientTree,
  WorkspaceSchema,
  getWorkspace,
  findProjectName
} from '@acoustic-content-sdk/schematics-utils';
import { updateAngularJson } from './update.angular.json';
import { Observable } from 'rxjs';
import { rxPipe, getPath, jsonStringify } from '@acoustic-content-sdk/utils';
import { map, tap } from 'rxjs/operators';
import { Schema } from './schema';
import { ArtifactMode } from '@acoustic-content-sdk/tooling-contributions';

describe('update angular json', () => {
  const ROOT = join(ASSET_DIR, 'ng9-app-with-routing');

  function validateMode(aMode: ArtifactMode, aConfig: any) {
    const cfg = aConfig[aMode];
    expect(cfg).toBeDefined();
    // check for the keys
    expect(cfg).toHaveProperty('main');
    expect(cfg).toHaveProperty('tsConfig');
    expect(cfg).toHaveProperty('outputPath');
  }

  function validateModes(aWorkspace: WorkspaceSchema, aProjectName: string) {
    // configs
    const config = getPath(aWorkspace, [
      'projects',
      aProjectName,
      'architect',
      'build',
      'configurations'
    ]);
    expect(config).toBeDefined();
    // check for live and preview
    validateMode(ArtifactMode.LIVE, config);
    validateMode(ArtifactMode.PREVIEW, config);
  }

  it('should generate the correct config', () => {
    // options
    const options: Schema = {};
    // our host tree
    const tree = createTransientTree(ROOT);
    // get the project name
    const projectName = findProjectName(tree, options);
    // update
    const rule = updateAngularJson(options);
    const tree$ = rule(tree, undefined) as Observable<Tree>;

    const test$ = rxPipe(
      tree$,
      map((host) => getWorkspace(host)),
      map((ws) => validateModes(ws, projectName))
    );

    return test$.toPromise();
  });
});
