import { Logger } from '@acoustic-content-sdk/api';
import {
  rxApplyTemplates,
  rxReadTemplates
} from '@acoustic-content-sdk/hbs-tooling';
import {
  createLoggerService,
  findProjectName,
  getWorkspace,
  getWorkspacePath,
  rxTransformJsonFile,
  WorkspaceSchema,
  writeFilesOnTree
} from '@acoustic-content-sdk/schematics-utils';
import { FileDescriptor } from '@acoustic-content-sdk/tooling';
import { ArtifactMode } from '@acoustic-content-sdk/tooling-contributions';
import {
  cloneDeep,
  forEach,
  forIn,
  getProperty,
  pluckPath,
  rxNext,
  rxPipe
} from '@acoustic-content-sdk/utils';
import { normalize, Path } from '@angular-devkit/core';
import {
  chain,
  Rule,
  SchematicContext,
  Tree
} from '@angular-devkit/schematics';
import { join } from 'path';
import { env } from 'process';
import { MonoTypeOperatorFunction, Observable, of } from 'rxjs';
import { endWith, ignoreElements, map, mergeMap } from 'rxjs/operators';

import { ASSET_ROOT$ } from './../../utils/assets';
import { GenerateVersionSchema } from './generate.version.schema';

export const ARTIFACT_MODES = [ArtifactMode.LIVE, ArtifactMode.PREVIEW];

const KEY_NPM_VERSION = 'npm_package_version';

const KEY_VERSION_STRING = 'VERSION_STRING';

const selectBuild = (aName: string) =>
  pluckPath<string>(['projects', aName, 'architect', 'build']);

const selectConfigurations = pluckPath<Record<string, any>>(['configurations']);

/**
 * Regular expression that detects the version string from the output path
 */
const RE_VERSION = /\/v\d+\.\d+\.\d+[^\/]*\//g;

// some logging
const LOGGER = 'generateVersionSchematic';

/**
 * Adds consistent version information
 *
 * @param options - the schematics object used to describe the version
 *
 * @returns the schematics rule that executes the transform
 */
export function generateVersionSchematic(options: GenerateVersionSchema): Rule {
  // detect version
  const version = options.version || env[KEY_NPM_VERSION];

  // locate the template dir
  const root$ = rxPipe(
    ASSET_ROOT$,
    map((root) => join(root, 'version'))
  );
  // templates
  const templates$ = rxPipe(
    root$,
    mergeMap((dir) => rxReadTemplates(dir))
  );

  /**
   * Generates the version information source files
   *
   * @param aSrcRoot - the target root file
   * @returns list of file descriptors
   */
  function generateTemplates(): Observable<FileDescriptor<string>> {
    // handlebars context
    const ctx$ = of({ [KEY_VERSION_STRING]: version });
    // apply the templates
    return rxApplyTemplates(ctx$, templates$);
  }

  /**
   * Constructs a rule that produces the templates
   *
   * @param aSrcRoot - source root
   * @returns the rule
   */
  function generateTemplatesRule(aSrcRoot: Path, aLogger: Logger): Rule {
    // next logging
    const log: <T>(...v: any[]) => MonoTypeOperatorFunction<T> = rxNext(
      aLogger
    );
    // the rule
    return (host: Tree) => {
      // files
      return rxPipe(
        generateTemplates(),
        log('version'),
        writeFilesOnTree(host, aSrcRoot),
        ignoreElements(),
        endWith(host)
      );
    };
  }

  function transformAngularJson(
    aWorkspace: WorkspaceSchema,
    aProjectName: string,
    aVersion: string
  ): Observable<WorkspaceSchema> {
    // be on the safe side
    const ws: WorkspaceSchema = cloneDeep(aWorkspace);
    // build root
    const build = selectBuild(aProjectName)(ws);
    const buildConfig = selectConfigurations(build);
    // new version string
    const newVersion = `/v${aVersion}/`;
    // fix the configurations
    forEach(ARTIFACT_MODES, (mode) => {
      // config
      const config: Record<string, string> = getProperty(buildConfig, mode);
      // handle the fields
      forIn(
        config,
        (aValue: string, aKey: string) =>
          (config[aKey] = aValue.replace(RE_VERSION, newVersion))
      );
    });
    // updated workspace
    return of(ws);
  }

  function transformAngularJsonRule(
    aProjectName: string,
    aLogger: Logger
  ): Rule {
    // next logging
    const log: <T>(...v: any[]) => MonoTypeOperatorFunction<T> = rxNext(
      aLogger
    );
    // the rule
    return (host: Tree) => {
      // filename
      const angularJson = getWorkspacePath(host);
      // execute the transform
      return rxPipe(
        rxTransformJsonFile(
          angularJson,
          (aWorkspace: WorkspaceSchema) =>
            transformAngularJson(aWorkspace, aProjectName, version),
          host
        ),
        log('angular.json'),
        ignoreElements(),
        endWith(host)
      );
    };
  }

  return (host: Tree, context: SchematicContext) => {
    // some logger
    const logSvc = createLoggerService(context);
    const logger = logSvc.get(LOGGER);
    // find the workspace
    const workspace = getWorkspace(host);
    // the project
    const projectName = findProjectName(workspace, options);
    // locate the project options
    const project = workspace.projects[projectName];
    // source folder
    const sourceFolder = normalize(
      project.sourceRoot ? `/${project.sourceRoot}` : `/${project.root}/src`
    );
    // go
    return chain([
      generateTemplatesRule(sourceFolder, logger),
      transformAngularJsonRule(projectName, logger)
    ])(host, context);
  };
}
