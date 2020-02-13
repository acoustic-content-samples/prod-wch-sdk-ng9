import {
  createTransientTree,
  findProjectName,
  getWorkspace
} from '@acoustic-content-sdk/schematics-utils';
import { ArtifactMode } from '@acoustic-content-sdk/tooling-contributions';
import { getPath, rxPipe } from '@acoustic-content-sdk/utils';
import { chain, Tree } from '@angular-devkit/schematics';
import { join } from 'path';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ASSET_DIR } from '../test/assets';
import { generateModeFiles } from './generate.modes';
import { Schema } from './schema';
import {
  KEY_MAIN,
  KEY_TS_CONFIG,
  updateAngularJson
} from './update.angular.json';

describe('generate modes', () => {
  const ROOT = join(ASSET_DIR, 'ng9-app-with-routing');

  function validateFilesForMode(
    aMode: ArtifactMode,
    aConfig: Record<string, any>,
    aTree: Tree
  ) {
    // extract the config
    const opts: Record<string, string> = aConfig[aMode];
    expect(opts).toBeDefined();
    // check all files
    expect(aTree.exists(opts[KEY_MAIN])).toBeTruthy();
    expect(aTree.exists(opts[KEY_TS_CONFIG])).toBeTruthy();
  }

  function validateFiles(aName: string, aTree: Tree) {
    // read the workspace
    const ws = getWorkspace(aTree);
    // configs
    const config = getPath(ws, [
      'projects',
      aName,
      'architect',
      'build',
      'configurations'
    ]);
    // check
    validateFilesForMode(ArtifactMode.LIVE, config, aTree);
    validateFilesForMode(ArtifactMode.PREVIEW, config, aTree);
  }

  it('should generate the correct files', () => {
    // options
    const options: Schema = {};
    // our host tree
    const tree = createTransientTree(ROOT);
    // get the project name
    const projectName = findProjectName(tree, options);
    // update
    const jsonRule = updateAngularJson(options);
    const modeRule = generateModeFiles(options);
    // combine both
    const fullRule = chain([jsonRule, modeRule]);

    const tree$ = fullRule(tree, undefined) as Observable<Tree>;
    console.log('Carsten', tree$);

    const test$ = rxPipe(
      tree$,
      map((host) => validateFiles(projectName, host))
    );

    return test$.toPromise();
  });
});
