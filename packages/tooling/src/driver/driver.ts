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
  getPath,
  JSONObject,
  opShareLast,
  pluckProperty,
  reduceArray,
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

import { ReadTextFile } from '../file/file';
import { rxGetWorkspace, selectOptionsForTarget } from '../utils/config';
import { createGuid, createRevision } from '../utils/guid';
import { canonicalizeJson } from '../utils/json';
import { ensureDirPath } from '../utils/url.utils';
import { rxFindProjectName } from '../utils/wch.utils';
import { ProjectType, WorkspaceProject } from '../utils/workspace-models';
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
  return `${baseName} - ${aBaseName}`;
}

/**
 * Construct a new content item based on the style link
 *
 */
function createStyleItem(
  aStyle: HTMLLinkElement,
  aBasePath: string
): AuthoringContentItem {
  // url
  const href = aStyle.href;
  const name = createName(href, aBasePath);
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
  aBasePath: string
): AuthoringContentItem {
  // url
  const src = aScript.src;
  const name = createName(src, aBasePath);
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
  aBasePath: string
): Observable<AuthoringContentItem> {
  // head links
  const style$ = rxPipe(
    selectStyleLinks(aHead),
    map((link) => createStyleItem(link, aBasePath))
  );
  // head scripts
  const script$ = rxPipe(
    selectScripts(aHead),
    map((script) => createScriptItem(script, aBasePath))
  );
  // merge
  return merge(style$, script$);
}

function createBodyArtifacts(
  aBody: HTMLElement,
  aBasePath: string
): Observable<AuthoringContentItem> {
  // body scripts
  return rxPipe(
    selectScripts(aBody),
    map((script) => createScriptItem(script, aBasePath))
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
}

function reference(aItem: AuthoringContentItem): AuthoringIdRef {
  return {
    id: aItem.id
  };
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
  aValues: AuthoringIdRef[]
) =>
  createGuid(
    reduceArray(aValues, (values, ref) => arrayPush(ref.id, values), [
      aSelection
    ]).join('/')
  );

function referenceContributions(selection: string, values: AuthoringIdRef[]) {
  // generate a key
  const key = createReferenceContributionsGuid(selection, values);
  // the reference
  return {
    reference: {
      values,
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
function referenceContribution(
  aMode: string
): OperatorFunction<AuthoringContentItem, any> {
  return (item$) =>
    rxPipe(
      item$,
      map(reference),
      rxToArray(),
      map((values) => referenceContributions(aMode, values))
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

function headContribution(
  aMode: string
): OperatorFunction<AuthoringContentItem, any> {
  return (item$) =>
    rxPipe(
      item$,
      referenceContribution(aMode),
      rxToArray(),
      map(createPageContribution)
    );
}

function bodyContribution(
  aMode: string
): OperatorFunction<AuthoringContentItem, any> {
  return (item$) =>
    rxPipe(
      item$,
      referenceContribution(aMode),
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

const DEFAULT_CONFIGURATION = 'production';

const DEFAULT_TARGET = 'build';

function createArtifactsForProject(
  aProject: WorkspaceProject<ProjectType.Application>,
  aProjectName: string,
  aMode: string,
  aConfigurations: string,
  aReadTextFile: ReadTextFile
): Observable<Artifact> {
  // access the options
  const selOptions = selectOptionsForTarget(DEFAULT_TARGET, aConfigurations);
  const options = selOptions(aProject);
  // get the output path
  const root = ensureDirPath(selectRootPath(aProject));
  const outPath = ensureDirPath(anyToString(selectOutputPath(options)));
  // index
  const indexPath = `${root}${outPath}/index.html`;
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
    mergeMap((el) => createHeadArtifacts(el, aProjectName)),
    shareReplay()
  );
  const body$ = rxPipe(
    dom$,
    pluck('body'),
    mergeMap((el) => createBodyArtifacts(el, aProjectName)),
    shareReplay()
  );
  // build the contributions
  const headContribution$ = rxPipe(head$, headContribution(aMode), first());
  const bodyContribution$ = rxPipe(body$, bodyContribution(aMode), first());
  // combine to build the item
  const pageContribution$ = rxPipe(
    combineLatest([headContribution$, bodyContribution$]),
    map(([hc, bc]) => createPageContributions(aProjectName, hc, bc))
  );
  // combine the contributions
  return rxPipe(
    merge(head$, body$, pageContribution$),
    map(canonicalizeJson),
    map(addRevision)
  );
}

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
    map(([name, ws]) =>
      getPath<WorkspaceProject<ProjectType.Application>>(ws, ['projects', name])
    )
  );
  // the mode
  const mode = aSchema.mode || ArtifactMode.ALWAYS;
  // the configurations
  const config = aSchema.configuration || DEFAULT_CONFIGURATION;
  // dispatch
  return rxPipe(
    combineLatest([projectName$, prj$]),
    mergeMap(([name, prj]) =>
      createArtifactsForProject(prj, name, mode, config, aHost)
    )
  );
}
