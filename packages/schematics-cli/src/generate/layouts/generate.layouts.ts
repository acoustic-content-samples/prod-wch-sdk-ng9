import { normalize } from '@angular-devkit/core';
import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import {
  createLoggerService,
  findDataDir,
  readDirectoryOnTree,
  writeFilesOnTree
} from '@acoustic-content-sdk/schematics-utils';
import { generateLayouts as generateLayoutsCommand } from '@acoustic-content-sdk/tooling';
import { rxPipe } from '@acoustic-content-sdk/utils';
import { identity } from 'rxjs';
import { reduce } from 'rxjs/operators';

import { Schema } from './schema';

export function generateLayouts(options: Schema): Rule {
  return (host: Tree, context: SchematicContext) => {
    // construct our logger
    const logSvc = createLoggerService(context);
    // locate the data directory
    const dataDir = normalize(findDataDir(host, options));
    // read directory callback
    const readDir = readDirectoryOnTree(host);
    // dispatch to the actual implementation
    const cmd = generateLayoutsCommand({ ...options, data: dataDir });
    // execute the command
    return rxPipe(
      // execute
      cmd(readDir, logSvc),
      // persist the files
      writeFilesOnTree(host, dataDir),
      // wait for an end
      reduce(identity, host)
    );
  };
}
