import {
  MergeStrategy,
  SchematicContext,
  Tree,
  HostTree
} from '@angular-devkit/schematics';
import { parse } from 'comment-json';
import { isObservable, of } from 'rxjs';
import { tap } from 'rxjs/operators';

import { Schema } from './schema';
import { LAUNCH_CONFIG_PATH, updateLaunchConfig } from './update.launch.config';

const TEST_CONFIG = `
{
    // Use IntelliSense to learn about possible attributes.
    // Hover to view descriptions of existing attributes.
    // For more information, visit: https://go.microsoft.com/fwlink/?linkid=830387
    "version": "0.2.0",
    "configurations": [
        {
            "type": "chrome",
            "request": "launch",
            "name": "Launch Chrome against localhost",
            "url": "http://localhost:4200/home",
            "webRoot": "\${workspaceFolder}"
        }
    ]
}
`;

describe('update.launch.config', () => {
  const context: SchematicContext = ({
    engine: null,
    debug: false,
    strategy: MergeStrategy.Default
  } as {}) as SchematicContext;

  it('should update a config with comments', () => {
    const opts: Schema = {
      url: 'http://www.example.org',
      editable: true,
      target: 'build'
    };

    const tree = new HostTree();
    tree.create(LAUNCH_CONFIG_PATH, TEST_CONFIG);

    const host = updateLaunchConfig(opts)(tree, context);
    const rxHost = isObservable(host) ? host : of(host as Tree);

    return rxHost
      .pipe(
        tap((h) => {
          expect(h).toBeTruthy();
          if (h) {
            expect(h.exists(LAUNCH_CONFIG_PATH));
            // read content
            const data = parse(h.read(LAUNCH_CONFIG_PATH)!.toString());
            expect(data).toBeTruthy();
          }
        })
      )
      .toPromise();
  });

  it('should update an empty config', () => {
    const opts: Schema = {
      url: 'http://www.example.org',
      editable: true,
      target: 'build'
    };

    const tree = new HostTree();

    const host = updateLaunchConfig(opts)(tree, context);
    const rxHost = isObservable(host) ? host : of(host as Tree);

    return rxHost
      .pipe(
        tap((h) => {
          expect(h).toBeTruthy();
          if (h) {
            expect(h.exists(LAUNCH_CONFIG_PATH));
            // read content
            const data = parse(h.read(LAUNCH_CONFIG_PATH)!.toString());
            expect(data).toBeTruthy();
          }
        })
      )
      .toPromise();
  });
});
