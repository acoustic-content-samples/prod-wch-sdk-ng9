import {
  AuthoringContentItem,
  CLASSIFICATION_CONTENT,
  ELEMENT_TYPE_GROUP,
  ELEMENT_TYPE_IMAGE,
  ELEMENT_TYPE_OPTION_SELECTION,
  ELEMENT_TYPE_REFERENCE,
  ELEMENT_TYPE_TEXT,
  Status
} from '@acoustic-content-sdk/api';
import {
  createFileDescriptor,
  createGuid,
  createRevision,
  FileDescriptor,
  kebabCase,
  ReadDirectory,
  ReadTextFile
} from '@acoustic-content-sdk/tooling';
import {
  arrayPush,
  assertArray,
  filterArray,
  isAbsoluteURL,
  isNotEmpty,
  mapArray,
  opShareLast,
  reduceArray,
  reduceForIn,
  rxPipe,
  toArray
} from '@acoustic-content-sdk/utils';
import { JSDOM } from 'jsdom';
import { from, merge, Observable, OperatorFunction, UnaryFunction, MonoTypeOperatorFunction } from 'rxjs';
import {
  map,
  mergeMap,
  pluck,
  shareReplay,
  toArray as rxToArray
} from 'rxjs/operators';

import { ArtifactMode } from './schema';

export type Artifact = AuthoringContentItem;

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
const EMBED_CONTRIBUTION_ID = 'eedce4a0-9647-4301-9247-6793e08652ea';
const MARKUP_CONTRIBUTION_ID = '2b0cd235-16ad-42ec-aea7-a05df105604c';

const ATTR_HREF = 'href';
const ATTR_SRC = 'src';

function createName(aLink: string, aBaseName: string): string {
  const baseName = createBaseName(aLink);
  return `${aBaseName} - ${baseName}`;
}

const isAbsoluteLink = (aLink: HTMLLinkElement) =>
  isAbsoluteURL(aLink.getAttribute(ATTR_HREF));
const isAbsoluteScript = (aScript: HTMLScriptElement) =>
  isAbsoluteURL(aScript.getAttribute(ATTR_SRC));

function createEmbedStyleItem(
  aLink: HTMLLinkElement,
  tags: string[]
): AuthoringContentItem {
  // url
  const href = aLink.getAttribute(ATTR_HREF);
  const name = kebabCase(href);
  const id = createGuid(name);
  const key = id;
  // construct the item
  const item = {
    id,
    name,
    tags,
    classification: CLASSIFICATION_CONTENT,
    typeId: EMBED_CONTRIBUTION_ID,
    elements: {
      embed: {
        elementType: ELEMENT_TYPE_TEXT,
        value: aLink.outerHTML
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

function createEmbedScriptItem(
  aScript: HTMLScriptElement,
  tags: string[]
): AuthoringContentItem {
  // url
  const src = aScript.getAttribute(ATTR_SRC);
  const name = kebabCase(src);
  const id = createGuid(name);
  const key = id;
  // construct the item
  const item = {
    id,
    name,
    tags,
    classification: CLASSIFICATION_CONTENT,
    typeId: EMBED_CONTRIBUTION_ID,
    elements: {
      embed: {
        elementType: ELEMENT_TYPE_TEXT,
        value: aScript.outerHTML
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

function createMarkupScriptItem(
  aScript: HTMLScriptElement,
  tags: string[]
): AuthoringContentItem {
  // url
  const src = aScript.getAttribute(ATTR_SRC);
  const name = kebabCase(src);
  const id = createGuid(name);
  const key = id;
  // construct the item
  const item = {
    id,
    name,
    tags,
    classification: CLASSIFICATION_CONTENT,
    typeId: MARKUP_CONTRIBUTION_ID,
    elements: {
      markup: {
        elementType: ELEMENT_TYPE_TEXT,
        value: aScript.outerHTML
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
function createStyleItem(
  aStyle: HTMLLinkElement,
  aBaseName: string,
  aBasePath: string,
  tags: string[]
): AuthoringContentItem {
  // url
  const href = aStyle.getAttribute(ATTR_HREF);
  const name = createName(href, aBaseName);
  const id = createGuid(name);
  const path = `${aBasePath}/${href}`;
  const key = createGuid(path);
  // construct the item
  const item = {
    id,
    name,
    tags,
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
  aBasePath: string,
  tags: string[]
): AuthoringContentItem {
  // url
  const src = aScript.getAttribute(ATTR_SRC);
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
    tags,
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
  aBasePath: string,
  tags: string[]
): Observable<AuthoringContentItem> {
  // head links
  const style$ = rxPipe(
    selectStyleLinks(aHead),
    map((link) =>
      isAbsoluteLink(link)
        ? createEmbedStyleItem(link, tags)
        : createStyleItem(link, aBaseName, aBasePath, tags)
    )
  );
  // head scripts
  const script$ = rxPipe(
    selectScripts(aHead),
    map((script) =>
      isAbsoluteScript(script)
        ? createEmbedScriptItem(script, tags)
        : createScriptItem(script, aBaseName, aBasePath, tags)
    )
  );
  // merge
  return merge(style$, script$);
}

function createBodyArtifacts(
  aBody: HTMLElement,
  aBaseName: string,
  aBasePath: string,
  tags: string[]
): Observable<AuthoringContentItem> {
  // body scripts
  return rxPipe(
    selectScripts(aBody),
    map((script) =>
      isAbsoluteScript(script)
        ? createMarkupScriptItem(script, tags)
        : createScriptItem(script, aBaseName, aBasePath, tags)
    )
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
    },
    embed: {
      elementType: ELEMENT_TYPE_TEXT
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

export function headContribution(): OperatorFunction<ItemWithMode, any> {
  return (item$) =>
    rxPipe(
      item$,
      referenceContribution(),
      rxToArray(),
      map(createPageContribution)
    );
}

export function bodyContribution(): OperatorFunction<ItemWithMode, any> {
  return (item$) =>
    rxPipe(
      item$,
      referenceContribution(),
      //      startWith(appRootContribution(aMode)),
      rxToArray(),
      map(createPageContribution)
    );
}

export function createPageContributions(
  aProjectName: string,
  head: any,
  body: any,
  tags: string[],
  isSystem: boolean
): AuthoringContentItem {
  // generate some ids
  const name = `${aProjectName} - Profile`;
  const id = createGuid(name);
  const key = id;

  const item = {
    tags,
    classification: CLASSIFICATION_CONTENT,
    elements: {
      head,
      body,
      key: {
        elementType: ELEMENT_TYPE_TEXT,
        value: key
      },
      preview: {
        elementType: ELEMENT_TYPE_IMAGE
      }
    },
    name,
    typeId: PAGE_CONTRIBUTIONS_ID,
    id,
    status: Status.READY
  };
  if (isSystem) {
    item['isSystem'] = true;
  }
  // some magic casting
  return item as any;
}

export function addRevision<T>(aValue: T): T {
  // patch
  const value = aValue as any;
  value.rev = createRevision(aValue);
  // ok
  return value;
}

export const DEFAULT_MODE = `${ArtifactMode.LIVE},${ArtifactMode.PREVIEW}`;

export interface ModeConfig {
  /**
   * The mode
   */
  mode: ArtifactMode;
  /**
   * The matching output path
   */
  outputPath: string;
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
 * Trims the leading slash from a path
 *
 * @param aPath - the path that might contain a leading slash
 * @returns the path without leading slash
 */
export const removeLeadingSlash = (aPath: string) =>
  aPath.startsWith('/') ? aPath.substr(1) : aPath;

/**
 * Constructs the artifacts for a particular root
 *
 * @param aConfig - the config
 * @param aRootDir  - root directory
 * @param aProjectName - name of the project
 * @param aTags - the tags for the artifacts
 * @param aReadTextFile - read callback
 *
 * @returns the contributions
 */
export function createArtifacts(
  aConfig: ModeConfig,
  aRootDir: string,
  aProjectName: string,
  aTags: string[],
  aReadTextFile: ReadTextFile,
  outputPathTransform: UnaryFunction<string, string>,
  isSystem: boolean
): Artifacts {
  // decode the config
  const { mode, outputPath } = aConfig;
  // the base name
  const baseName = `${aProjectName} - ${mode}`;
  // index
  const indexPath = `${aRootDir}${outputPath}/index.html`;
  // rel root path
  const relOutputPath = removeLeadingSlash(outputPathTransform(outputPath));
  // parse the index
  const dom$ = rxPipe(
    aReadTextFile(indexPath),
    map((data) => new JSDOM(data)),
    map((jsdom) => jsdom.window.document),
    opShareLast
  );
  const opSetIsSystem: MonoTypeOperatorFunction<AuthoringContentItem> = map((item) => {
    if (isSystem) {
      item['isSystem'] = true;
    }
    return item;
  });
  // head and body contributions
  const head$ = rxPipe(
    dom$,
    pluck('head'),
    mergeMap((el) => createHeadArtifacts(el, baseName, relOutputPath, aTags)),
    opSetIsSystem,
    map((item) => createItemWithMode(mode, item)),
    shareReplay()
  );
  const body$ = rxPipe(
    dom$,
    pluck('body'),
    mergeMap((el) => createBodyArtifacts(el, baseName, relOutputPath, aTags)),
    opSetIsSystem,
    map((item) => createItemWithMode(mode, item)),
    shareReplay()
  );
  // returns the artifacts
  return { head$, body$ };
}

/**
 * Splits the array into individual values
 *
 * @param aValue - the value, separated by ','
 * @returns the split array
 */
export const splitArray = (aValue: string): string[] =>
  filterArray(
    mapArray(aValue.split(','), (m) => m.trim()),
    isNotEmpty
  );

export function readFilesForConfig(
  aRoot: string,
  aConfig: ModeConfig,
  aReadDir: ReadDirectory,
  outputPathTransform: UnaryFunction<string, string>
): Observable<FileDescriptor<Buffer>> {
  // target directory
  const outDir = `${aRoot}${aConfig.outputPath}`;
  // scan the files
  return rxPipe(
    aReadDir(outDir),
    map(([name, buffer]) => createFileDescriptor(outputPathTransform(`${outDir}${name}`), buffer))
  );
}
