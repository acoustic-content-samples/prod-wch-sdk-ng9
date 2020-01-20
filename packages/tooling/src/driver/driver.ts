import {
  AuthoringContentItem,
  CLASSIFICATION_CONTENT,
  ELEMENT_TYPE_GROUP,
  ELEMENT_TYPE_OPTION_SELECTION,
  ELEMENT_TYPE_REFERENCE,
  ELEMENT_TYPE_TEXT,
  Status
} from '@acoustic-content-sdk/api';
import { rxCacheSingle } from '@acoustic-content-sdk/rx-utils';
import {
  anyToString,
  arrayPush,
  assertArray,
  filterArray,
  getPath,
  isNotEmpty,
  JSONObject,
  mapArray,
  opShareLast,
  pluckProperty,
  reduceArray,
  reduceForIn,
  rxPipe,
  toArray
} from '@acoustic-content-sdk/utils';
import { JSDOM } from 'jsdom';
import { combineLatest, from, merge, Observable, OperatorFunction } from 'rxjs';
import {
  first,
  map,
  mergeMap,
  pluck,
  shareReplay,
  toArray as rxToArray
} from 'rxjs/operators';

import {
  createFileDescriptor,
  FileDescriptor,
  ReadTextFile
} from '../file/file';
import { rxGetWorkspace, selectOptionsForTarget } from '../utils/config';
import { createGuid, createRevision } from '../utils/guid';
import { canonicalizeJson } from '../utils/json';
import { ensureDirPath } from '../utils/url.utils';
import { rxFindProjectName } from '../utils/wch.utils';
import {
  ProjectType,
  WorkspaceProject,
  WorkspaceSchema
} from '../utils/workspace-models';
import { ReadDirectory } from './../dir/dir';
import { ArtifactMode, CreateDriverArtifactsSchema } from './schema';

export type Artifact = AuthoringContentItem;

const selectOutputPath = pluckProperty<JSONObject, 'outputPath'>('outputPath');

const selectRootPath = pluckProperty<
  WorkspaceProject<ProjectType.Application>,
  'root'
>('root', '');

/**
 * Extracts the style elements from an element
 *
 * @param aElement - the element
 * @returns the style links
 */
function selectStyleLinks(aElement: HTMLElement): Observable<HTMLLinkElement> {
  return from(
    toArray(
      aElement.querySelectorAll<HTMLLinkElement>('link[rel="stylesheet"]')
    )
  );
}

/**
 * Extracts the script elements from an element
 *
 * @param aElement - the element
 * @returns the script elements
 */
function selectScripts(aElement: HTMLElement): Observable<HTMLScriptElement> {
  return from(
    toArray(aElement.querySelectorAll<HTMLScriptElement>('script[src]'))
  );
}

const NAME_MATCH = /^([\w-_]+)(\.\w+)?(\.\w+)$/;

function createBaseName(aName: string): string {
  return aName.replace(NAME_MATCH, '$1$3');
}

const PAGE_CONTRIBUTIONS_ID = 'aab86460-0018-44c2-9f52-3a326e58f7f7';
const PAGE_CONTRIBUTION_ID = '354743b2-f89a-482b-b447-2b5a2367c8bd';
const STYLE_CONTRIBUTION_ID = '3a3726b8-e0b2-4f10-98ed-b1c82e851b99';
const SCRIPT_CONTRIBUTION_ID = '5c473463-db07-4132-b8a1-bd40cbdf4b18';

function createName(aLink: string, aBaseName: string): string {
  const baseName = createBaseName(aLink);
  return `${aBaseName} - ${baseName}`;
}

/**
 * Construct a new content item based on the style link
 *
 */
function createStyleItem(
  aStyle: HTMLLinkElement,
  aBaseName: string,
  aBasePath: string
): AuthoringContentItem {
  // url
  const href = aStyle.href;
  const name = createName(href, aBaseName);
  const id = createGuid(name);
  const path = `${aBasePath}/${href}`;
  const key = createGuid(path);
  // construct the item
  const item = {
    id,
    name,
    classification: CLASSIFICATION_CONTENT,
    typeId: STYLE_CONTRIBUTION_ID,
    elements: {
      href: {
        elementType: ELEMENT_TYPE_TEXT,
        value: path
      },
      key: {
        elementType: ELEMENT_TYPE_TEXT,
        value: key
      }
    },
    status: Status.READY
  };
  // ok
  return item as any;
}

/**
 * Construct a new content item based on the style link
 *
 */
function createScriptItem(
  aScript: HTMLScriptElement,
  aBaseName: string,
  aBasePath: string
): AuthoringContentItem {
  // url
  const src = aScript.src;
  const name = createName(src, aBaseName);
  const id = createGuid(name);
  const path = `${aBasePath}/${src}`;
  const key = createGuid(path);
  // check for the type
  const selection = aScript.hasAttribute('nomodule')
    ? 'nomodule'
    : 'application/javascript';
  // construct the item
  const item = {
    id,
    name,
    classification: CLASSIFICATION_CONTENT,
    typeId: SCRIPT_CONTRIBUTION_ID,
    elements: {
      src: {
        elementType: ELEMENT_TYPE_TEXT,
        value: path
      },
      type: {
        elementType: ELEMENT_TYPE_OPTION_SELECTION,
        value: {
          selection
        }
      },
      key: {
        elementType: ELEMENT_TYPE_TEXT,
        value: key
      }
    },
    status: Status.READY
  };
  // ok
  return item as any;
}

function createHeadArtifacts(
  aHead: HTMLElement,
  aBaseName: string,
  aBasePath: string
): Observable<AuthoringContentItem> {
  // head links
  const style$ = rxPipe(
    selectStyleLinks(aHead),
    map((link) => createStyleItem(link, aBaseName, aBasePath))
  );
  // head scripts
  const script$ = rxPipe(
    selectScripts(aHead),
    map((script) => createScriptItem(script, aBaseName, aBasePath))
  );
  // merge
  return merge(style$, script$);
}

function createBodyArtifacts(
  aBody: HTMLElement,
  aBaseName: string,
  aBasePath: string
): Observable<AuthoringContentItem> {
  // body scripts
  return rxPipe(
    selectScripts(aBody),
    map((script) => createScriptItem(script, aBaseName, aBasePath))
  );
}

/**
 * Adds the contribution for the app root element
 *
 * @param selection - the selection mode
 * @returns the element
 */
function appRootContribution(selection: string) {
  return {
    embed: {
      elementType: ELEMENT_TYPE_TEXT,
      values: ['<app-root></app-root>']
    },
    mode: {
      elementType: ELEMENT_TYPE_OPTION_SELECTION,
      value: {
        selection
      }
    }
  };
}

interface AuthoringIdRef {
  id: string;
  mode: ArtifactMode;
}

function reference(aItem: ItemWithMode): AuthoringIdRef {
  return {
    id: aItem.item.id,
    mode: aItem.mode
  };
}

/**
 * Organize the IDs by mode
 *
 * @param aValues - the authoring IDs
 * @returns the values organized by mode
 */
function byMode(aValues: AuthoringIdRef[]): Record<string, string[]> {
  // reduce
  return reduceArray(
    aValues,
    (aDst: Record<string, string[]>, aRef: AuthoringIdRef) => {
      // insert
      arrayPush(aRef.id, assertArray(aRef.mode, aDst));
      return aDst;
    },
    {}
  );
}

/**
 * Generates a reproducible guid for the configuration
 *
 * @param selection  - selection
 * @param values - reference values
 *
 * @returns the guid
 */
const createReferenceContributionsGuid = (
  aSelection: string,
  aValues: string[]
) => createGuid([aSelection, ...aValues].join('/'));

function referenceContributions(selection: string, values: string[]) {
  // generate a key
  const key = createReferenceContributionsGuid(selection, values);
  // the reference
  return {
    reference: {
      values: mapArray(values, (id) => ({ id })),
      elementType: ELEMENT_TYPE_REFERENCE
    },
    mode: {
      elementType: ELEMENT_TYPE_OPTION_SELECTION,
      value: {
        selection
      }
    },
    key: {
      elementType: ELEMENT_TYPE_TEXT,
      value: key
    }
  };
}

/**
 * Generates a reference contribution from all items on the stream
 *
 * @param aMode - the mode
 * @returns the operation that creates the contribution
 */
function referenceContribution(): OperatorFunction<ItemWithMode, any> {
  return (item$) =>
    rxPipe(
      item$,
      map(reference),
      rxToArray(),
      map(byMode),
      map((values) =>
        reduceForIn(
          values,
          (dst: any[], val: string[], mode: string) =>
            arrayPush(referenceContributions(mode, val), dst),
          []
        )
      ),
      mergeMap((all) => from(all))
    );
}

function createPageContribution(values: any[]) {
  return {
    values,
    elementType: ELEMENT_TYPE_GROUP,
    typeRef: {
      id: PAGE_CONTRIBUTION_ID
    }
  };
}

function headContribution(): OperatorFunction<ItemWithMode, any> {
  return (item$) =>
    rxPipe(
      item$,
      referenceContribution(),
      rxToArray(),
      map(createPageContribution)
    );
}

function bodyContribution(): OperatorFunction<ItemWithMode, any> {
  return (item$) =>
    rxPipe(
      item$,
      referenceContribution(),
      //      startWith(appRootContribution(aMode)),
      rxToArray(),
      map(createPageContribution)
    );
}

function createPageContributions(
  aProjectName: string,
  head: any,
  body: any
): AuthoringContentItem {
  // generate some ids
  const name = `${aProjectName} - Profile`;
  const id = createGuid(name);
  const key = id;

  const item = {
    classification: CLASSIFICATION_CONTENT,
    elements: {
      head,
      body,
      key: {
        elementType: ELEMENT_TYPE_TEXT,
        value: key
      }
    },
    name,
    typeId: PAGE_CONTRIBUTIONS_ID,
    id,
    status: Status.READY
  };
  // some magic casting
  return item as any;
}

function addRevision<T>(aValue: T): T {
  // patch
  const value = aValue as any;
  value.rev = createRevision(aValue);
  // ok
  return value;
}

const DEFAULT_MODE = `${ArtifactMode.LIVE},${ArtifactMode.PREVIEW}`;

const DEFAULT_CONFIGURATION = 'production';

const DEFAULT_TARGET = 'build';

interface ModeConfig {
  /**
   * The mode
   */
  mode: ArtifactMode;
  /**
   * The matching output path
   */
  outputPath: string;
}

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

interface ItemWithMode {
  mode: ArtifactMode;
  item: AuthoringContentItem;
}

const createItemWithMode = (
  mode: ArtifactMode,
  item: AuthoringContentItem
): ItemWithMode => ({ mode, item });

interface Artifacts {
  head$: Observable<ItemWithMode>;
  body$: Observable<ItemWithMode>;
}

/**
 * Constructs the artifacts for a particular root
 *
 * @param aConfig - the config
 * @param aRootDir  - root directory
 * @param aProjectName - name of the project
 * @param aReadTextFile - read callback
 *
 * @returns the contributions
 */
function createArtifacts(
  aConfig: ModeConfig,
  aRootDir: string,
  aProjectName: string,
  aReadTextFile: ReadTextFile
): Artifacts {
  // decode the config
  const { mode, outputPath } = aConfig;
  // the base name
  const baseName = `${aProjectName} - ${mode}`;
  // index
  const indexPath = `${aRootDir}${outputPath}/index.html`;
  // parse the index
  const dom$ = rxPipe(
    aReadTextFile(indexPath),
    map((data) => new JSDOM(data)),
    map((jsdom) => jsdom.window.document),
    opShareLast
  );
  // head and body contributions
  const head$ = rxPipe(
    dom$,
    pluck('head'),
    mergeMap((el) => createHeadArtifacts(el, baseName, outputPath)),
    map((item) => createItemWithMode(mode, item)),
    shareReplay()
  );
  const body$ = rxPipe(
    dom$,
    pluck('body'),
    mergeMap((el) => createBodyArtifacts(el, baseName, outputPath)),
    map((item) => createItemWithMode(mode, item)),
    shareReplay()
  );
  // returns the artifacts
  return { head$, body$ };
}

function createArtifactsForProject(
  aProject: WorkspaceProject<ProjectType.Application>,
  aProjectName: string,
  aModes: string[],
  aConfigurations: string,
  aReadTextFile: ReadTextFile
): Observable<Artifact> {
  // root path
  const root = ensureDirPath(selectRootPath(aProject));
  // the configs
  const modeConfigs = getModeConfigs(aProject, aConfigurations, aModes);
  // read the configs
  const artifacts = mapArray(modeConfigs, (config) =>
    createArtifacts(config, root, aProjectName, aReadTextFile)
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
    map(([hc, bc]) => createPageContributions(aProjectName, hc, bc))
  );
  // combine the contributions
  return rxPipe(
    merge(raw$, pageContribution$),
    map(canonicalizeJson),
    map(addRevision)
  );
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
const getModes = (aSchema: CreateDriverArtifactsSchema) =>
  filterArray(
    mapArray((aSchema.mode || DEFAULT_MODE).split(','), (m) => m.trim()),
    isNotEmpty
  );

/**
 * Decodes the configuration from the schema
 *
 * @param aSchema - the schema
 * @returns the configuration
 */
const getConfig = (aSchema: CreateDriverArtifactsSchema) =>
  aSchema.configuration || DEFAULT_CONFIGURATION;

function readFilesForConfig(
  aRoot: string,
  aConfig: ModeConfig,
  aReadDir: ReadDirectory
): Observable<FileDescriptor<Buffer>> {
  // target directory
  const outDir = `${aRoot}${aConfig.outputPath}`;
  // scan the files
  return rxPipe(
    aReadDir(outDir),
    map(([name, buffer]) => createFileDescriptor(`${outDir}${name}`, buffer))
  );
}

/**
 * Generates the binary artifacts that make up the driver
 *
 * @param aHost  - callback to read the binary files
 * @param aSchema - configuration
 *
 * @returns the sequence of file descriptors
 */
export function copyDriverFiles(
  aReadFile: ReadTextFile,
  aReadDir: ReadDirectory,
  aSchema: CreateDriverArtifactsSchema = {}
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
 * Generates the content items that describe a driver
 *
 * @param aHost  - callback to read a text file
 * @param aSchema - configuration
 *
 * @returns the sequence of files
 */
export function createDriverArtifacts(
  aHost: ReadTextFile,
  aSchema: CreateDriverArtifactsSchema = {}
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
      createArtifactsForProject(prj, name, modes, config, aHost)
    )
  );
}
