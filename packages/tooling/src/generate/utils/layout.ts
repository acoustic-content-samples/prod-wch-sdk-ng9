import {
  AuthoringLayoutItem,
  AuthoringLayoutMapping,
  AuthoringType,
  Logger,
  LoggerService
} from '@acoustic-content-sdk/api';
import {
  rxReadBinaryFile,
  rxReadTextFile
} from '@acoustic-content-sdk/rx-utils';
import {
  getPath,
  isEqual,
  isNil,
  isNotNil,
  isString,
  LAYOUT_TYPE_HANDLEBARS,
  NOOP_LOGGER_SERVICE,
  objectAssign,
  opShareLast,
  Predicate,
  reduceForIn,
  rxNext,
  rxPipe
} from '@acoustic-content-sdk/utils';
import { join } from 'path';
import {
  combineLatest,
  EMPTY,
  merge,
  MonoTypeOperatorFunction,
  Observable,
  of,
  UnaryFunction
} from 'rxjs';
import { filter, map, mergeMap, pluck } from 'rxjs/operators';

import { ReadDirectory } from '../../dir/dir';
import { createFileDescriptor, FileDescriptor } from '../../file/file';
import { ASSET_ROOT$, ASSETS_FOLDER } from '../../utils/assets';
import { createRevision } from '../../utils/guid';
import { canonicalizeJson } from '../../utils/json';
import {
  addLayoutToMapping,
  isValidLayoutMapping,
  selectDefaultLayoutMappingId
} from '../../utils/layout.mappings';
import { selectThumbnailPath } from '../../utils/layouts';
import { selectPath, selectTypeId } from '../../utils/selectors';
import { ensureDirPath } from '../../utils/url.utils';
import {
  JsonEntryMap,
  rxFindAuthoringTypes,
  rxReadAuthoringLayoutMappings,
  rxReadAuthoringLayouts
} from '../../utils/wch.tools';
import { wchToolsCleanup, wchToolsFileDescriptor } from '../../utils/wchtools';

const LOGGER = 'GenerateLayout';

/**
 * Reads the template file for the layout
 *
 * @returns the template file
 */
function getLayoutThumb(): Observable<Buffer> {
  return rxPipe(
    ASSET_ROOT$,
    map((dir) => join(dir, 'generate', 'layouts', 'layout-thumb.jpg')),
    mergeMap(rxReadBinaryFile)
  );
}

/**
 * Reads the layout file for the layout
 *
 * @returns the template file
 */
function getLayoutTemplate(): Observable<string> {
  return rxPipe(
    ASSET_ROOT$,
    map((dir) => join(dir, 'generate', 'layouts', 'layout-template.hbs')),
    mergeMap(rxReadTextFile)
  );
}

/**
 * Returns the thumbnail for the layout
 *
 * @param aLayout - the layout to create the thumbnail for
 * @return the thumbnail resource
 */
function createLayoutThumb(
  aLayout: AuthoringLayoutItem,
  aDefaultThumb$: Observable<Buffer>
): Observable<FileDescriptor<Buffer>> {
  // check if we have a thumb
  const thumbPath = selectThumbnailPath(aLayout);
  if (isNotNil(thumbPath)) {
    // combine
    return rxPipe(
      aDefaultThumb$,
      map((thumb) =>
        createFileDescriptor(`/${ASSETS_FOLDER}${thumbPath}`, thumb)
      )
    );
  }
  // nothing
  return EMPTY;
}

/**
 * Returns the thumbnail for the layout
 *
 * @param aLayout - the layout to create the thumbnail for
 * @return the thumbnail resource
 */
function createLayoutTemplate(
  aLayout: AuthoringLayoutItem,
  aDefaultTemplate$: Observable<string>
): Observable<FileDescriptor<string>> {
  // extract
  const { template, templateType } = aLayout;
  // check if we have a thumb
  if (isEqual(templateType, LAYOUT_TYPE_HANDLEBARS) && isNotNil(template)) {
    // combine
    return rxPipe(
      aDefaultTemplate$,
      map((tmp) => createFileDescriptor(`/${ASSETS_FOLDER}${template}`, tmp))
    );
  }
  // nothing
  return EMPTY;
}

/**
 * Tests if the item has an existing thumbnail
 *
 * @param aLayout - the item
 * @returns true if the item has a thumb, else false
 */
function hasExistingThumb(aLayout?: AuthoringLayoutItem): boolean {
  return isNotNil(selectThumbnailPath(aLayout));
}

/**
 * Tests if the item has an existing template
 *
 * @param aLayout - the item
 * @returns true if the item has a template, else false
 */
function hasExistingTemplate(aLayout?: AuthoringLayoutItem): boolean {
  return (
    aLayout &&
    isEqual(aLayout.templateType, LAYOUT_TYPE_HANDLEBARS) &&
    isString(aLayout.template)
  );
}

/**
 * Returns the operator that creates layouts and layout mappings
 *
 * @param aLayouts - layouts by id
 * @param aLayoutMappings - layout mappings by id
 *
 * @returns the operator
 */
function updateLayoutsForTypes(
  aLayoutCreator: UnaryFunction<AuthoringType, AuthoringLayoutItem>,
  aLayoutMappingCreator: UnaryFunction<AuthoringType, AuthoringLayoutMapping>,
  aLayouts: JsonEntryMap<AuthoringLayoutItem>,
  aLayoutMappings: JsonEntryMap<AuthoringLayoutMapping>,
  aLogger: Logger
) {
  // default resources
  const defaultThumb$ = rxPipe(getLayoutThumb(), opShareLast);
  const defaultTemplate$ = rxPipe(getLayoutTemplate(), opShareLast);
  // sort layout mappings by type ID
  const mappingsByType: Record<string, AuthoringLayoutMapping> = reduceForIn(
    aLayoutMappings,
    (aRes, aMapping) =>
      objectAssign(selectTypeId(aMapping.entry), aMapping.entry, aRes),
    {}
  );
  // sort layouts  by path
  const layoutsByPath: Record<string, AuthoringLayoutItem> = reduceForIn(
    aLayouts,
    (aRes, aLayout) =>
      objectAssign(selectPath(aLayout.entry), aLayout.entry, aRes),
    {}
  );

  function generateLayoutAndMapping(
    aType: AuthoringType
  ): Observable<
    FileDescriptor<
      AuthoringLayoutItem | AuthoringLayoutMapping | Buffer | string
    >
  > {
    // the potentially existing layout mapping
    const mapping = mappingsByType[aType.id];
    // test if we need a layout mapping
    if (isNil(mapping) || !isValidLayoutMapping(mapping)) {
      // only then generate a new layout and update the mapping
      const layout = aLayoutCreator(aType);
      const layoutPath = selectPath(layout);
      // merge with a potentially existing layout
      const existingLayout = layoutsByPath[layoutPath];
      const mergedLayout = { ...layout, ...existingLayout };
      // now check the mapping
      const layoutMapping: AuthoringLayoutMapping =
        mapping || aLayoutMappingCreator(aType);
      // augment
      addLayoutToMapping(layoutMapping, mergedLayout);
      const thumb$: Observable<FileDescriptor<Buffer>> = hasExistingThumb(
        existingLayout
      )
        ? EMPTY
        : createLayoutThumb(mergedLayout, defaultThumb$);
      const template$: Observable<FileDescriptor<string>> = hasExistingTemplate(
        existingLayout
      )
        ? EMPTY
        : createLayoutTemplate(mergedLayout, defaultTemplate$);
      // result
      const desc$ = of(
        wchToolsFileDescriptor(mergedLayout),
        wchToolsFileDescriptor(layoutMapping)
      );
      return merge(desc$, thumb$, template$);
    } else {
      // select the default layout id
      const layoutId = selectDefaultLayoutMappingId(mapping);
      // do we have a layout?
      const existingLayout = getPath<AuthoringLayoutItem>(aLayouts, [
        layoutId,
        'entry'
      ]);
      const layout = aLayoutCreator(aType);
      // merge with a potentially existing layout
      const mergedLayout = { ...layout, ...existingLayout, id: layoutId };
      const thumb$ = hasExistingThumb(existingLayout)
        ? EMPTY
        : createLayoutThumb(mergedLayout, defaultThumb$);
      const template$ = hasExistingTemplate(existingLayout)
        ? EMPTY
        : createLayoutTemplate(mergedLayout, defaultTemplate$);
      // result
      const desc$ = of(wchToolsFileDescriptor(mergedLayout));
      return merge(desc$, thumb$, template$);
    }
  }

  return (type$: Observable<AuthoringType>) =>
    rxPipe(type$, mergeMap(generateLayoutAndMapping));
}

/**
 * Canonicalize and add revision
 *
 * @param aValue - value
 * @returns the canonicalized version
 */
function normalizeArtifact<T>(aValue: T): T {
  // check if we can normalize
  if (Buffer.isBuffer(aValue) || isString(aValue)) {
    return aValue;
  }
  // normalize
  const canon = canonicalizeJson(aValue);
  canon.rev = createRevision(canon);
  return canon;
}

export function generate(
  aDataDir: string,
  aTypeFilter: Predicate<AuthoringType>,
  aCreateLayout: UnaryFunction<AuthoringType, AuthoringLayoutItem>,
  aCreateLayoutMapping: UnaryFunction<AuthoringType, AuthoringLayoutMapping>,
  aReadDir: ReadDirectory,
  logSvc: LoggerService = NOOP_LOGGER_SERVICE
) {
  // logging
  const logger = logSvc.get(LOGGER);
  // next logger
  const log: <T>(...v: any[]) => MonoTypeOperatorFunction<T> = rxNext(logger);
  // make sure the data dir does not end with a slash
  const dataDir = ensureDirPath(aDataDir);
  // log this
  logger.info('dataDir', dataDir);
  // read the relevant structures
  const layouts$ = rxReadAuthoringLayouts(dataDir, aReadDir);
  const layoutMappings$ = rxReadAuthoringLayoutMappings(dataDir, aReadDir);
  // find types
  const types$ = rxPipe(
    rxFindAuthoringTypes(dataDir, aReadDir),
    pluck('entry'),
    filter(aTypeFilter),
    log('type')
  );
  // the operator
  const typeOperator = rxPipe(
    combineLatest(layouts$, layoutMappings$),
    map(([layouts, layoutMappings]) =>
      updateLayoutsForTypes(
        aCreateLayout,
        aCreateLayoutMapping,
        layouts,
        layoutMappings,
        logger
      )
    )
  );
  // build the result
  return rxPipe(
    // stateful operator for conversion
    typeOperator,
    // converts a type into the generated artifacts
    mergeMap((op) => rxPipe(types$, op)),
    // fix path and add revision ID
    map(([name, artifact]) =>
      createFileDescriptor(`${dataDir}${name}`, normalizeArtifact(artifact))
    ),
    map(wchToolsCleanup),
    log('artifact')
  );
}
