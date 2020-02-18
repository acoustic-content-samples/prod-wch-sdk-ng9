import {
  createLoggerService,
  readRelativeDirectoryOnTree,
  readTextFileOnTree,
  writeBufferOnTree
} from '@acoustic-content-sdk/schematics-utils';
import {
  createFileDescriptor,
  FileDescriptor,
  rxFindDataDir,
  rxWriteFileDescriptor,
  WCHTOOLS_FOLDER_ASSET,
  wchToolsFileDescriptor
} from '@acoustic-content-sdk/tooling';
import {
  copyNgDriverFiles,
  createNgDriverArtifacts,
  createPackageArtifacts
} from '@acoustic-content-sdk/tooling-contributions';
import { arrayPush, opShareLast, rxPipe } from '@acoustic-content-sdk/utils';
import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import { EMPTY, merge } from 'rxjs';
import {
  endWith,
  ignoreElements,
  map,
  mergeMap,
  reduce,
  share,
  tap
} from 'rxjs/operators';

import { Schema } from './schema';

const LOGGER = 'GenerateContributions';

function generateArtifacts(options: Schema): Rule {
  // decode flags
  const bPackage = options.package || false;

  return (host: Tree, context: SchematicContext) => {
    // logger
    const logSvc = createLoggerService(context);
    const logger = logSvc.get(LOGGER);
    // logs a filename
    const logFile = () =>
      tap<FileDescriptor<any>>(([name]) => logger.info('Generated file', name));
    // create the read callback
    const readFile = readTextFileOnTree(host);
    const readDir = readRelativeDirectoryOnTree(host);
    const writeFile = writeBufferOnTree(host);
    // the artifacts
    const artifacts$ = rxPipe(
      createNgDriverArtifacts(readFile, options),
      map(wchToolsFileDescriptor),
      logFile()
    );
    // the binary files
    const binary$ = rxPipe(
      copyNgDriverFiles(readFile, readDir, options),
      map(([path, data]) =>
        createFileDescriptor(`/${WCHTOOLS_FOLDER_ASSET}${path}`, data)
      ),
      logFile()
    );
    // all items
    const all$ = merge(artifacts$, binary$);
    // locate the data directory
    const dataDir$ = rxPipe(rxFindDataDir(readFile, options), opShareLast);
    // compose so we have the correct filenames
    const files$ = rxPipe(
      dataDir$,
      mergeMap((dataDir) =>
        rxPipe(
          all$,
          map(([path, data]) => createFileDescriptor(`${dataDir}${path}`, data))
        )
      ),
      share()
    );
    // package options
    const pkgOpt$ = rxPipe(
      files$,
      reduce(
        (aDst: string[], [aName]: FileDescriptor<any>) =>
          arrayPush(aName, aDst),
        []
      ),
      map((files) => ({ ...options, files }))
    );
    // the package file
    const pkg$ = bPackage
      ? rxPipe(
          pkgOpt$,
          mergeMap((opt) => createPackageArtifacts(readFile, opt, logSvc))
        )
      : EMPTY;
    // all files
    const allFiles$ = merge(files$, pkg$);
    // write these files
    const written$ = rxPipe(allFiles$, rxWriteFileDescriptor(writeFile));

    // done
    return rxPipe(written$, ignoreElements(), endWith(host));
  };
}

/**
 * Generates all wchtools artifacts required to bootstrap a sites next application
 * from the Angular build configuration that the schema points to.
 *
 * @param options  - the options
 * @returns the rule that generates the artifacts
 */
export function generateContributions(options: Schema): Rule {
  // rule for the artifact
  return generateArtifacts(options);
}
