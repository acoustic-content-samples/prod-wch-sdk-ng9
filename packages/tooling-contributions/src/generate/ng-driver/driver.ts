import { rxCacheSingle } from '@acoustic-content-sdk/rx-utils';
import {
  canonicalizeJson,
  createFileDescriptor,
  dotCase,
  ensureDirPath,
  FileDescriptor,
  ProjectType,
  ReadDirectory,
  ReadTextFile,
  rxFindProjectName,
  rxGetWorkspace,
  rxWchToolsManifest,
  selectOptionsForTarget,
  WCHTOOLS_FOLDER_ASSET,
  wchToolsFileDescriptor,
  WorkspaceProject
} from '@acoustic-content-sdk/tooling';
import {
  anyToString,
  isNotEmpty,
  JSONObject,
  jsonParse,
  mapArray,
  opShareLast,
  pluckProperty,
  rxPipe
} from '@acoustic-content-sdk/utils';
import { combineLatest, from, merge, Observable } from 'rxjs';
import { first, map, mergeMap, share } from 'rxjs/operators';

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
import { getProject } from './../../ng-utils/utils';
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
function copyNgDriverFiles(
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
    }),
    map(([path, data]) =>
      createFileDescriptor(`/${WCHTOOLS_FOLDER_ASSET}${path}`, data)
    )
  );
}

/**
 * Read the version information
 *
 * @param aHost - the host
 */
function rxReadVersion(aHost: ReadTextFile): Observable<string> {
  // load the package json
  return rxPipe(
    aHost('/package.json'),
    map(jsonParse),
    map(({ version }) => version)
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
  aReadDir: ReadDirectory,
  aSchema: CreateNgDriverArtifactsSchema = {}
): Observable<FileDescriptor<Artifact | Buffer>> {
  // read the descriptor
  const ws$ = rxCacheSingle(rxGetWorkspace(aHost));
  // get the project information
  const projectName$ = rxCacheSingle(
    rxPipe(
      ws$,
      mergeMap((ws) => rxFindProjectName(ws, aSchema)),
      opShareLast
    )
  );
  const prj$ = rxPipe(
    combineLatest([projectName$, ws$]),
    map(([name, ws]) => getProject(name, ws))
  );
  const version$ = rxReadVersion(aHost);
  // the modes
  const modes = getModes(aSchema);
  // the configurations
  const config = getConfig(aSchema);
  // sync
  return rxPipe(
    combineLatest([projectName$, prj$, version$]),
    mergeMap(([name, prj, version]) => {
      // dispatch
      const artifacts$ = rxPipe(
        createArtifactsForProject(
          prj,
          name,
          modes,
          config,
          getTags(aSchema, name),
          aHost
        ),
        map(wchToolsFileDescriptor),
        share()
      );
      // the raw files
      const files$ = rxPipe(
        copyNgDriverFiles(aHost, aReadDir, aSchema),
        share()
      );
      // dot name
      const manifestBase = dotCase(name);
      // versioned manifest name
      const versionedManifest = `${manifestBase}-${version}`;
      // manifest for the raw files
      const versionedManifest$ = rxPipe(
        files$,
        rxWchToolsManifest(versionedManifest)
      );
      // all
      const all$ = rxPipe(
        merge(artifacts$, files$, versionedManifest$),
        share()
      );
      // all manifest name
      const allManifest = manifestBase;
      const allManifest$ = rxPipe(all$, rxWchToolsManifest(allManifest));
      // all artifacts
      return merge(all$, allManifest$);
    })
  );
}
