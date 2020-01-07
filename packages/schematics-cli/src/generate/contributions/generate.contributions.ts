import { join, Path } from '@angular-devkit/core';
import {
  branchAndMerge,
  chain,
  Rule,
  SchematicContext,
  Tree
} from '@angular-devkit/schematics';
import {
  findDataDir,
  findProjectName,
  getWorkspace,
  ProjectType,
  readTextFileOnTree,
  syncDir,
  WorkspaceProject,
  writeTextFileOnTree,
  createLoggerService
} from '@acoustic-content-sdk/schematics-utils';
import {
  createDriverArtifacts,
  ensureDirPath,
  FileDescriptor,
  rxFindDataDir,
  rxWriteFileDescriptor,
  wchToolsFileDescriptor
} from '@acoustic-content-sdk/tooling';
import { getPath, pluckPath, rxPipe, rxNext } from '@acoustic-content-sdk/utils';
import { combineLatest, MonoTypeOperatorFunction } from 'rxjs';
import { count, map, mapTo, mergeMap } from 'rxjs/operators';

import { Schema } from './schema';

function createFileDescriptor<T>(aPath: string, aValue: T): FileDescriptor<T> {
  return [aPath, aValue];
}

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
    const writeFile = writeTextFileOnTree(host);
    // the artifacts
    const artifacts$ = rxPipe(
      createDriverArtifacts(readFile),
      map(wchToolsFileDescriptor),
      log('artifact')
    );
    // locate the data directory
    const dataDir$ = rxFindDataDir(readFile, options);
    // compose so we have the correct filenames
    const files$ = rxPipe(
      combineLatest([dataDir$, artifacts$]),
      map(([dataDir, [path, data]]) =>
        createFileDescriptor(`${dataDir}${path}`, data)
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

const selectOutputPath = pluckPath<string>([
  'architect',
  'build',
  'options',
  'outputPath'
]);

function copyFiles(options: Schema): Rule {
  return (host: Tree, context: SchematicContext) => {
    // construct the logger
    const logSvc = createLoggerService(context);
    const logger = logSvc.get(LOGGER);
    // next logger
    const log: <T>(...v: any[]) => MonoTypeOperatorFunction<T> = rxNext(logger);
    // locate source and target
    const workspace = getWorkspace(host);
    const projectName = findProjectName(workspace, options);
    // get the project
    const project = getPath<WorkspaceProject<ProjectType.Application>>(
      workspace,
      ['projects', projectName]
    );
    // build path
    const srcPath: Path = ensureDirPath(selectOutputPath(project)) as any;
    // target path
    const dataDir: Path = ensureDirPath(findDataDir(host, options)) as any;
    const dstPath: Path = ensureDirPath(
      join(dataDir, 'assets', projectName)
    ) as any;
    // copy
    return syncDir(srcPath, dstPath, host, logger);
  };
}

export function generateContributions(options: Schema): Rule {
  return (host: Tree, context: SchematicContext) => {
    return chain([
      branchAndMerge(chain([generateArtifacts(options), copyFiles(options)]))
    ])(host, context);
  };
}
