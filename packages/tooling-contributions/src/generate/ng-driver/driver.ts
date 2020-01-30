import { rxCacheSingle } from '@acoustic-content-sdk/rx-utils';
import {
  canonicalizeJson,
  ensureDirPath,
  FileDescriptor,
  ProjectType,
  ReadDirectory,
  ReadTextFile,
  rxFindProjectName,
  rxGetWorkspace,
  selectOptionsForTarget,
  WorkspaceProject,
  WorkspaceSchema
} from '@acoustic-content-sdk/tooling';
import {
  anyToString,
  getPath,
  isNotEmpty,
  JSONObject,
  mapArray,
  opShareLast,
  pluckProperty,
  rxPipe
} from '@acoustic-content-sdk/utils';
import { combineLatest, from, merge, Observable } from 'rxjs';
import { first, map, mergeMap } from 'rxjs/operators';

import {
  addRevision,
  Artifact,
  bodyContribution,
  createArtifacts,
  createPageContributions,
  DEFAULT_MODE,
  headContribution,
  ModeConfig,
  readFilesForConfig,
  splitArray
} from '../artifacts';
import { ArtifactMode } from './../schema';
import { CreateNgDriverArtifactsSchema } from './schema';

const DEFAULT_CONFIGURATION = 'production';

const DEFAULT_TARGET = 'build';

const selectRootPath = pluckProperty<
  WorkspaceProject<ProjectType.Application>,
  'root'
>('root', '');

const selectOutputPath = pluckProperty<JSONObject, 'outputPath'>('outputPath');

/**
 * Constructs a config object
 *
 * @param aMode - the mode
 * @param aOptions - the options object
 * @returns the matching config
 */
const createModeConfig = (aMode: string, aOptions: JSONObject): ModeConfig => ({
  mode: aMode as ArtifactMode,
  outputPath: ensureDirPath(anyToString(selectOutputPath(aOptions)))
});

/**
 * Decodes the configuration from the schema
 *
 * @param aSchema - the schema
 * @returns the configuration
 */
const getConfig = (aSchema: CreateNgDriverArtifactsSchema) =>
  aSchema.configuration || DEFAULT_CONFIGURATION;

/**
 * Returns the configuration options for the project in question
 *
 * @param aProject - the project
 * @param aConfigurations - the basic configurations
 * @param aMode - the mode
 *
 * @returns the options for the mode
 */
function getOptions(
  aProject: WorkspaceProject<ProjectType.Application>,
  aConfigurations: string,
  aMode?: string
) {
  // generate an artificial config
  const config = isNotEmpty(aMode)
    ? `${aConfigurations},${aMode}`
    : aConfigurations;
  // access the options
  const selOptions = selectOptionsForTarget(DEFAULT_TARGET, config);
  return selOptions(aProject);
}

/**
 * Decodes the output configurations for a mode
 *
 * @param aProject - the project
 * @param aConfigurations - the configurations
 * @param aModes - the mode
 *
 * @returns the configurations
 */
function getModeConfigs(
  aProject: WorkspaceProject<ProjectType.Application>,
  aConfigurations: string,
  aModes?: string[]
): ModeConfig[] {
  // check if we have modes
  if (isNotEmpty(aModes)) {
    // map the modes to configurations
    return mapArray(aModes, (mode) =>
      createModeConfig(mode, getOptions(aProject, aConfigurations, mode))
    );
  }
  // just one config for always mode
  return [
    createModeConfig(ArtifactMode.ALWAYS, getOptions(aProject, aConfigurations))
  ];
}

/**
 * Extracts the project from a workspace
 *
 * @param aName - the project name
 * @param aWorkspace - the workspace schema
 *
 * @returns the project
 */
const getProject = (aName: string, aWorkspace: WorkspaceSchema) =>
  getPath<WorkspaceProject<ProjectType.Application>>(aWorkspace, [
    'projects',
    aName
  ]);

/**
 * Decodes the modes from the schema
 *
 * @param aSchema - the schema
 * @returns the modes
 */
const getModes = (aSchema: CreateNgDriverArtifactsSchema) =>
  splitArray(aSchema.mode || DEFAULT_MODE);

/**
 * Decodes the tags
 */
const getTags = (
  aSchema: CreateNgDriverArtifactsSchema,
  aProjectName: string
) =>
  Array.from(
    new Set([...splitArray(aSchema.tag || ''), aProjectName, 'sites-next'])
  );

function createArtifactsForProject(
  aProject: WorkspaceProject<ProjectType.Application>,
  aProjectName: string,
  aModes: string[],
  aConfigurations: string,
  aTags: string[],
  aReadTextFile: ReadTextFile
): Observable<Artifact> {
  // root path
  const root = ensureDirPath(selectRootPath(aProject));
  // the configs
  const modeConfigs = getModeConfigs(aProject, aConfigurations, aModes);
  // read the configs
  const artifacts = mapArray(modeConfigs, (config) =>
    createArtifacts(config, root, aProjectName, aTags, aReadTextFile)
  );
  // merge all body artifacts
  const head$ = merge(...mapArray(artifacts, (a) => a.head$));
  const body$ = merge(...mapArray(artifacts, (a) => a.body$));
  // raw contributions
  const raw$ = rxPipe(
    merge(head$, body$),
    map((item) => item.item)
  );

  // build the contributions
  const headContribution$ = rxPipe(head$, headContribution(), first());
  const bodyContribution$ = rxPipe(body$, bodyContribution(), first());
  // combine to build the item
  const pageContribution$ = rxPipe(
    combineLatest([headContribution$, bodyContribution$]),
    map(([hc, bc]) => createPageContributions(aProjectName, hc, bc, aTags))
  );
  // combine the contributions
  return rxPipe(
    merge(raw$, pageContribution$),
    map(canonicalizeJson),
    map(addRevision)
  );
}

/**
 * Generates the binary artifacts that make up the Angular driver
 *
 * @param aHost  - callback to read the binary files
 * @param aSchema - configuration
 *
 * @returns the sequence of file descriptors
 */
export function copyNgDriverFiles(
  aReadFile: ReadTextFile,
  aReadDir: ReadDirectory,
  aSchema: CreateNgDriverArtifactsSchema = {}
): Observable<FileDescriptor<Buffer>> {
  // read the descriptor
  const ws$ = rxCacheSingle(rxGetWorkspace(aReadFile));
  // get the project information
  const projectName$ = rxCacheSingle(
    rxPipe(
      ws$,
      mergeMap((ws) => rxFindProjectName(ws, aSchema))
    )
  );
  // the project
  const prj$ = rxPipe(
    combineLatest([projectName$, ws$]),
    map(([name, ws]) => getProject(name, ws)),
    opShareLast
  );
  // decode the configurations to work on
  return rxPipe(
    prj$,
    mergeMap((project) => {
      // root
      const root = ensureDirPath(selectRootPath(project));
      const configs = getModeConfigs(
        project,
        getConfig(aSchema),
        getModes(aSchema)
      );
      // merge everything
      return rxPipe(
        from(configs),
        mergeMap((config) => readFilesForConfig(root, config, aReadDir))
      );
    })
  );
}

/**
 * Generates the content items that describe a driver based on an Angular build output
 *
 * @param aHost  - callback to read a text file
 * @param aSchema - configuration
 *
 * @returns the sequence of artifacts
 */
export function createNgDriverArtifacts(
  aHost: ReadTextFile,
  aSchema: CreateNgDriverArtifactsSchema = {}
): Observable<Artifact> {
  // read the descriptor
  const ws$ = rxCacheSingle(rxGetWorkspace(aHost));
  // get the project information
  const projectName$ = rxCacheSingle(
    rxPipe(
      ws$,
      mergeMap((ws) => rxFindProjectName(ws, aSchema))
    )
  );
  const prj$ = rxPipe(
    combineLatest([projectName$, ws$]),
    map(([name, ws]) => getProject(name, ws))
  );
  // the modes
  const modes = getModes(aSchema);
  // the configurations
  const config = getConfig(aSchema);
  // dispatch
  return rxPipe(
    combineLatest([projectName$, prj$]),
    mergeMap(([name, prj]) =>
      createArtifactsForProject(
        prj,
        name,
        modes,
        config,
        getTags(aSchema, name),
        aHost
      )
    )
  );
}
