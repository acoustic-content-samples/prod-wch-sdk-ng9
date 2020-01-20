import {
  createLoggerService,
  readDirectoryOnTree,
  readTextFileOnTree,
  writeTextFileOnTree
} from '@acoustic-content-sdk/schematics-utils';
import {
  copyDriverFiles,
  createDriverArtifacts,
  createFileDescriptor,
  rxFindDataDir,
  rxWriteFileDescriptor,
  wchToolsFileDescriptor
} from '@acoustic-content-sdk/tooling';
import { rxNext, rxPipe } from '@acoustic-content-sdk/utils';
import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import { merge, MonoTypeOperatorFunction } from 'rxjs';
import { count, map, mapTo, mergeMap } from 'rxjs/operators';

import { Schema } from './schema';

const LOGGER = 'GenerateContributions';

function generateArtifacts(options: Schema): Rule {
  return (host: Tree, context: SchematicContext) => {
    // logger
    const logSvc = createLoggerService(context);
    const logger = logSvc.get(LOGGER);
    // next logger
    const log: <T>(...v: any[]) => MonoTypeOperatorFunction<T> = rxNext(logger);
    // create the read callback
    const readFile = readTextFileOnTree(host);
    const readDir = readDirectoryOnTree(host);
    const writeFile = writeTextFileOnTree(host);
    // the artifacts
    const artifacts$ = rxPipe(
      createDriverArtifacts(readFile, options),
      map(wchToolsFileDescriptor),
      log('artifact')
    );
    // the binary files
    const binary$ = copyDriverFiles(readFile, readDir, options);
    // all items
    const all$ = merge(artifacts$, binary$);
    // locate the data directory
    const dataDir$ = rxFindDataDir(readFile, options);
    // compose so we have the correct filenames
    const files$ = rxPipe(
      dataDir$,
      mergeMap((dataDir) =>
        rxPipe(
          all$,
          map(([path, data]) => createFileDescriptor(`${dataDir}${path}`, data))
        )
      )
    );
    // write these files
    const written$ = rxPipe(
      files$,
      mergeMap((file) => rxWriteFileDescriptor(file, writeFile))
    );

    // done
    return rxPipe(written$, count(), mapTo(host));
  };
}

export function generateContributions(options: Schema): Rule {
  // rule for the artifact
  return generateArtifacts(options);
}
