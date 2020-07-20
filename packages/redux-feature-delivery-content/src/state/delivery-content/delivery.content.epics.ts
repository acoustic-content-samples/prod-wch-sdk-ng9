import {
  AuthoringAsset,
  AuthoringContentItem,
  AuthoringLayoutItem,
  AuthoringSelectedLayout,
  AuthoringType,
  ContentItem,
  ContentItemWithLayout,
  Element,
  Image,
  Video,
  Layout,
  Logger,
  LoggerService,
  Rendition
} from '@acoustic-content-sdk/api';
import {
  ACTION_ADD_AUTH_ASSET,
  AddAuthoringAssetAction,
  selectAuthAssetFeature
} from '@acoustic-content-sdk/redux-feature-auth-asset';
import {
  ACTION_ADD_AUTH_CONTENT,
  AddAuthoringContentAction,
  selectAuthContentFeature
} from '@acoustic-content-sdk/redux-feature-auth-content';
import {
  ACTION_ADD_AUTH_LAYOUT,
  AddAuthoringLayoutAction,
  selectAuthLayoutFeature
} from '@acoustic-content-sdk/redux-feature-auth-layout';
import {
  ACTION_ADD_AUTH_CONTENT_TYPE,
  AddAuthoringContentTypeAction,
  guaranteeAuthoringContentTypeAction,
  selectAuthTypeFeature
} from '@acoustic-content-sdk/redux-feature-auth-type';
import { nonExistentEpic } from '@acoustic-content-sdk/redux-feature-load';
import {
  selectApiUrl,
  selectUrlConfigFeature,
  UrlConfigFeatureState
} from '@acoustic-content-sdk/redux-feature-url-config';
import { rxSelect, selectPayload } from '@acoustic-content-sdk/redux-store';
import {
  addToSetEpic,
  getDeliveryIdFromAuthoringItem
} from '@acoustic-content-sdk/redux-utils';
import {
  arrayPush,
  DEFAULT_LAYOUT_MODE,
  getPath,
  isMultiFormattedTextElement,
  isMultiGroupElement,
  isNil,
  isNotEmpty,
  isNotNil,
  isSingleFormattedTextElement,
  isSingleGroupElement,
  objectAssign,
  opFilterNotNil,
  parseQueryString,
  queryToString,
  reduceArray,
  reduceForIn,
  rxNext,
  rxPipe,
  UNDEFINED_TYPE
} from '@acoustic-content-sdk/utils';
import { combineEpics, Epic, ofType } from 'redux-observable';
import { from, MonoTypeOperatorFunction, Observable } from 'rxjs';
import { map, mergeMap, withLatestFrom } from 'rxjs/operators';

import {
  hasAsset,
  isMultiImageElementInAuthoring,
  isSingleImageElementInAuthoring,
  isMultiVideoElementInAuthoring,
  isSingleVideoElementInAuthoring
} from '../../utils/auth.content.utils';
import { pluckTypeId } from '../../utils/auth.type.utils';
import { removeStartingSlash } from '../../utils/fetch.text';
import { selectId } from '../general.selectors';
import {
  ACTION_ADD_DELIVERY_CONTENT,
  ACTION_ADD_DELIVERY_CONTENT_IF_NONEXISTENT,
  ACTION_RESOLVE_CONTENT_ITEM,
  ACTION_SET_DELIVERY_CONTENT,
  addDeliveryContentAction,
  ResolveContentItemAction,
  resolveContentItemAction,
  ResolveContentItemPayload
} from './delivery.content.actions';
import {
  DeliveryContentFeatureState,
  selectDeliveryContentFeature
} from './delivery.content.feature';

const LOGGER = 'DeliveryContentEpic';

export interface DeliveryContentDependencies {
  logSvc: LoggerService;
}

function rxGetApiURL(
  aStore$: Observable<UrlConfigFeatureState>
): Observable<URL> {
  // access the base URL
  return rxPipe(
    aStore$,
    rxSelect(selectUrlConfigFeature),
    rxSelect(selectApiUrl),
    opFilterNotNil
  );
}

const transformLayouts = (
  selected: AuthoringSelectedLayout[],
  layouts: Record<string, AuthoringLayoutItem>
): Record<string, Layout> => {
  // convert
  return reduceArray(
    selected,
    (aDst: Record<string, Layout>, aLayout: AuthoringSelectedLayout) => {
      // try to resolve the layout
      const { layoutMode, layout } = aLayout;
      // try to resolve
      const authLayout = layouts[layout.id];
      if (isNotNil(authLayout)) {
        // add it
        const key = layoutMode || DEFAULT_LAYOUT_MODE;
        // copy the props
        aDst[key] = authLayout;
      }
      // returns the object
      return aDst;
    },
    {}
  );
};

const transformMap = (
  aMap: Record<string, any>,
  assets: Record<string, AuthoringAsset>,
  apiURL: URL
): Record<string, any> =>
  reduceForIn(
    aMap,
    (aNewElements: Record<string, any>, aElement: Element, aKey: string) =>
      objectAssign(
        aKey,
        transformElement(aElement, assets, apiURL),
        aNewElements
      ),
    {}
  );

function getRenditions(
  aImage: Image,
  aAsset: AuthoringAsset,
  aApiURL: URL
): Record<string, Rendition> {
  const result = {} as Record<string, Rendition>;
  const defaultImageSize = getDefaultImageSize(aImage, aAsset);

  const defaultRenditionUrl = getAuthoringResourceUrl(aImage, aAsset, aApiURL);

  // in the current implementation with the authoring API, if an image is resized
  // that data is applied to the default rendition
  let source = defaultRenditionUrl;
  const defaultRenditionSource = aImage.renditions?.default?.source;
  const transformValues = aImage.renditions?.default?.transform;

  if (isNotNil(defaultRenditionSource) || isNotNil(transformValues)) {
    // initialize to something logical but should get overwritten below
    let queryParamMap = parseQueryString(`resize=${defaultImageSize[0]}px:${defaultImageSize[1]}px`);
    let isQueryParamMapUpdated = false;

    if (isNotNil(defaultRenditionSource)) {
      const idx = defaultRenditionSource.lastIndexOf('?'); // check if ? exists
      if (idx >= 0) {
        // add query params (expected to hold rendition parameters such as resize and crop)
        const queryParams = defaultRenditionSource.substring(idx + 1);
        queryParamMap = parseQueryString(queryParams);
        isQueryParamMapUpdated = true;
      }
    }

    if (isNotNil(transformValues)) {
      // set the same values that the Authoring API does in response to the transform
      if (transformValues.crop) {
        const { width, height, x, y } = transformValues.crop;
        queryParamMap.crop = `${width}:${height};${x},${y}`;
      }
      else {
        delete queryParamMap.crop;
      }
      if (transformValues.scale) {
        const width = Math.round(aAsset.metadata.width * transformValues.scale);
        const height = Math.round(aAsset.metadata.height * transformValues.scale);
        queryParamMap.resize = `${width}px:${height}px`;
      }
      isQueryParamMapUpdated = true;
    }
    if (isQueryParamMapUpdated) {
      source = `${source}?${queryToString(queryParamMap)}`;
    }
  }

  // each image element has a default rendition
  result['default'] = {
    url: defaultRenditionUrl,
    width: defaultImageSize[0],
    height: defaultImageSize[1],
    source: source
  } as Rendition;

  // check which image profiles are referenced by the current type
  const imageProfileIds = aImage.profiles;
  if (isNotNil(imageProfileIds)) {
    // resolve image profile ids against the asset and include matching renditions
    const profileRenditions = aAsset.profileRenditions;
    profileRenditions.forEach((rendition) => {
      if (imageProfileIds.includes(rendition.profileId)) {
        const authoringRenditionUri = rendition.uri;
        const idx = authoringRenditionUri.lastIndexOf('?'); // check if ? exists
        let url = `${getAuthoringResourceUrl(aImage, aAsset, aApiURL)}`;
        if (idx >= 0) {
          // add query params (expected to hold rendition parameters such as cropping)
          const queryParams = authoringRenditionUri.substring(idx + 1);
          const queryParamMap = parseQueryString(queryParams);
          url = `${url}?${queryToString(queryParamMap)}`;
        }
        const deliveryRendition = {
          width: rendition.width,
          height: rendition.height,
          transform: rendition['transform'],
          url
        };
        result[rendition['key']] = deliveryRendition as Rendition;
      }
    });
  }
  return result;
}

/**
 * Computes the default image size.
 *
 * @param aImage - the image element
 * @param aAsset - the asset
 * @returns an array of size 2 ([width, height])
 */
function getDefaultImageSize(aImage: Image, aAsset: AuthoringAsset): number[] {
  const scale = getPath(
    aImage,
    ['renditions', 'default', 'transform', 'scale'],
    1
  );

  // try to load height and width from the image element on the content item first, if it does not exist, fall-back to loading it from the asset itself
  const assetWidth = getPath(
    aImage,
    ['asset', 'width'],
    getPath(aAsset, ['metadata', 'width'], -1)
  );
  const assetHeight = getPath(
    aImage,
    ['asset', 'height'],
    getPath(aAsset, ['metadata', 'height'], -1)
  );
  return [Math.round(scale * assetWidth), Math.round(scale * assetHeight)];
}

function transformImageElement(
  aImage: Image,
  assets: Record<string, AuthoringAsset>,
  aApiUrl: URL
): Partial<Image> {
  // transform the asset
  const { asset } = aImage;
  if (isNil(asset)) {
    return aImage;
  }
  // do we know the asset?
  const assetItem = assets[asset.id];
  if (isNil(assetItem)) {
    return aImage;
  }
  // insert the resource url
  const url = `${aApiUrl.pathname}${getAuthoringResourceUrl(aImage, assetItem, aApiUrl)}`;
  // resolve renditions and compute resource url
  return {
    ...aImage,
    renditions: getRenditions(aImage, assetItem, aApiUrl),
    url,
    asset: {
      id: assetItem.id,
      fileSize: assetItem.fileSize,
      resourceUri: url,
      fileName: assetItem.fileName,
      mediaType: assetItem.mediaType,
      width: getPath(assetItem, ['metadata', 'width']),
      height: getPath(assetItem, ['metadata', 'height']),
      altText: assetItem.altText
    }
  };
}

function transformVideoElement(
  aVideo: Video,
  assets: Record<string, AuthoringAsset>,
  aApiUrl: URL
): Partial<Video> {
  // transform the asset
  const { asset } = aVideo;
  if (isNil(asset)) {
    return aVideo;
  }
  // do we know the asset?
  const assetItem = assets[asset.id];
  if (isNil(assetItem)) {
    return aVideo;
  }
  // insert the resource url
  const url = `${aApiUrl.pathname}${getAuthoringResourceUrl(aVideo, assetItem, aApiUrl)}`;
  // resolve renditions and compute resource url
  return {
    ...aVideo,
    url,
    asset: {
      id: assetItem.id,
      fileSize: assetItem.fileSize,
      resourceUri: url,
      fileName: assetItem.fileName,
      mediaType: assetItem.mediaType,
      // TODO review  this after clarification by Thomas Steinheber
      width: getPath(assetItem, ['metadata', 'width']),
      height: getPath(assetItem, ['metadata', 'height'])
    }
  };
}

const HAS_DOCUMENT = typeof document !== UNDEFINED_TYPE;

export function transformFormattedText(
  htmlString: string,
  baseUrl: URL
): string {
  // parse value as HTML
  if (HAS_DOCUMENT) {
    const htmlTemplate = document.createElement('template');
    htmlTemplate.innerHTML = htmlString;

    // select all image tags with data attribute "data-wch-asset-id"j
    const nodes = htmlTemplate.content.querySelectorAll(
      'img[data-wch-asset-id][src^="/api/authoring/"]'
    );

    // convert relative (authoring) URLs to absolute URLs
    nodes.forEach((node) => {
      const src = node.getAttribute('src');
      if (src) {
        const newSrc = src.replace('/api/', baseUrl.pathname);
        node.setAttribute('src', newSrc);
      }
    });

    return htmlTemplate.innerHTML;
  }
  // fallback
  return htmlString;
}

function transformElement(
  aElement: Element,
  assets: Record<string, AuthoringAsset>,
  aApiUrl: URL
): Element {
  // nesting
  if (isSingleGroupElement(aElement)) {
    const { value } = aElement;
    return isNotNil(value)
      ? {
        ...aElement,
        value: transformMap(value, assets, aApiUrl)
      }
      : aElement;
  } else if (isMultiGroupElement(aElement)) {
    const { values } = aElement;
    return isNotEmpty(values)
      ? {
        ...aElement,
        values: values.map((value) => transformMap(value, assets, aApiUrl))
      }
      : aElement;
  } else if (isSingleImageElementInAuthoring(aElement)) {
    return {
      ...aElement,
      ...transformImageElement(aElement, assets, aApiUrl)
    };
  } else if (isMultiImageElementInAuthoring(aElement)) {
    const { values } = aElement;
    return isNotEmpty(values)
      ? {
        ...aElement,
        values: values.map((value) => ({
          ...value,
          ...transformImageElement(value, assets, aApiUrl)
        }))
      }
      : aElement;
  } else if (isSingleVideoElementInAuthoring(aElement)) {
    return {
      ...aElement,
      ...transformVideoElement(aElement, assets, aApiUrl)
    };
  } else if (isMultiVideoElementInAuthoring(aElement)) {
    const { values } = aElement;
    return isNotEmpty(values)
      ? {
        ...aElement,
        values: values.map((value) => ({
          ...value,
          ...transformVideoElement(value, assets, aApiUrl)
        }))
      }
      : aElement;
  } else if (isSingleFormattedTextElement(aElement)) {
    return {
      ...aElement,
      value: transformFormattedText(aElement.value, aApiUrl)
    };
  } else if (isMultiFormattedTextElement(aElement)) {
    const { values } = aElement;
    return isNotEmpty(values)
      ? {
        ...aElement,
        values: values.map((value) => transformFormattedText(value, aApiUrl))
      }
      : aElement;
  } else {
    // in the general case, nothing to copy
    return aElement;
  }
  // TODO add support for file
}

const transformElements = (
  elements: Record<string, any>,
  assets: Record<string, AuthoringAsset>,
  apiUrl: URL
): Record<string, any> => {
  return transformMap(elements, assets, apiUrl);
};

function getAuthoringResourceUrl(
  aImage: Image,
  aAsset: AuthoringAsset,
  apiUrl: URL
): string {
  // need to use the authoring resource URL here because it is not guaranteed that the
  // delivery URL is available at rendering time (e.g. if publishing is slow)

  // e.g. "/authoring/v1/resources/867b0d64-4df0-4f79-8003-a9936242f367"
  const resourceUriFromImageElement = getPath<string>(aImage, [
    'asset',
    'resourceUri'
  ]);

  if (resourceUriFromImageElement) {
    return resourceUriFromImageElement;
  } else {
    // load resource id from referenced asset, e.g. "867b0d64-4df0-4f79-8003-a9936242f367"
    const { resource } = aAsset;
    return `/authoring/v1/resources/${resource}`;
  }
}

const transformAuthToDelivery = (
  aData: ResolveContentItemPayload
): ContentItemWithLayout => {
  // access members
  const { contentItem, contentTypes, layouts, assets, apiURL } = aData;
  // access the type
  const contentType = contentTypes[pluckTypeId(contentItem)];
  // some quick hack
  const deliveryItem: ContentItem = contentItem as any;
  // the delivery id
  const deliveryId = getDeliveryIdFromAuthoringItem(contentItem);
  // if the type is not available, proceed without it for now
  if (isNil(contentType)) {
    return {
      ...contentItem,
      ...deliveryItem,
      id: deliveryId,
      layouts: transformLayouts(contentItem.selectedLayouts, layouts),
      elements: transformElements(contentItem.elements, assets, apiURL)
    };
  } else {
    // augment
    return {
      ...contentItem,
      ...deliveryItem,
      id: deliveryId,
      type: contentType.name,
      layouts: transformLayouts(contentItem.selectedLayouts, layouts),
      elements: transformElements(contentItem.elements, assets, apiURL)
    };
  }
};

/**
 * Trigger loading of the type
 */
const transformContentItemEpic: Epic = (
  actions$,
  state$,
  { logSvc }: DeliveryContentDependencies
) => {
  // access the logger
  const logger = logSvc.get(LOGGER);
  // next logger
  const log: <T>(...v: any[]) => MonoTypeOperatorFunction<T> = rxNext(
    logger,
    'transformContentItemEpic'
  );

  return rxPipe(
    actions$,
    ofType<ResolveContentItemAction>(ACTION_RESOLVE_CONTENT_ITEM),
    // all data needed to do the transform
    map(selectPayload),
    // transform
    map(transformAuthToDelivery),
    // create store action
    map(addDeliveryContentAction),
    // this would be a delivery result
    log('action')
  );
};

/**
 * Trigger loading of the type
 */
const loadContentTypeEpic: Epic = (actions$) =>
  rxPipe(
    actions$,
    ofType<AddAuthoringContentAction>(ACTION_ADD_AUTH_CONTENT),
    // extract the authoring content item
    map(selectPayload),
    // sanity check
    opFilterNotNil,
    // select the type id
    map(pluckTypeId),
    // load the content type
    map(guaranteeAuthoringContentTypeAction)
  );

/**
 * Assemble all information to transform the content item
 */
const resolveContentItemEpic: Epic = (
  actions$,
  store$,
  { logSvc }: DeliveryContentDependencies
) => {
  // access the logger
  const logger = logSvc.get(LOGGER);
  // next logger
  const log: <T>(...v: any[]) => MonoTypeOperatorFunction<T> = rxNext(
    logger,
    'resolveContentItemEpic'
  );

  // extract the types
  const authTypes$ = rxPipe(store$, rxSelect(selectAuthTypeFeature));
  const authLayouts$ = rxPipe(store$, rxSelect(selectAuthLayoutFeature));
  const authAssets$ = rxPipe(store$, rxSelect(selectAuthAssetFeature));
  // get the delivery URL
  const apiURL$ = rxGetApiURL(store$);

  return rxPipe(
    actions$,
    ofType<AddAuthoringContentAction>(ACTION_ADD_AUTH_CONTENT),
    // log this action
    log('action'),
    // extract the authoring content item
    map(selectPayload),
    // also access the content types
    withLatestFrom(authTypes$, authLayouts$, authAssets$, apiURL$),
    // extract the type
    map(([contentItem, contentTypes, layouts, assets, apiURL]) =>
      resolveContentItemAction({
        contentItem,
        contentTypes,
        layouts,
        assets,
        apiURL
      })
    )
  );
};

/**
 * Update all items that depend on a certain type
 */
function actionsByType(
  contentType: AuthoringType,
  contentItems: Record<string, AuthoringContentItem>,
  contentTypes: Record<string, AuthoringType>,
  layouts: Record<string, AuthoringLayoutItem>,
  assets: Record<string, AuthoringAsset>,
  apiURL: URL
): ResolveContentItemAction[] {
  // the type
  const id = getDeliveryIdFromAuthoringItem(contentType);
  // types override
  const types = { ...contentTypes, [id]: contentType };
  // return all authoring items for that type
  return reduceForIn(
    contentItems,
    (
      aActions: ResolveContentItemAction[],
      contentItem: AuthoringContentItem
    ) => {
      // check if the type is the same
      if (contentItem.typeId === id) {
        arrayPush(
          resolveContentItemAction({
            contentItem,
            contentTypes: types,
            layouts,
            assets,
            apiURL
          }),
          aActions
        );
      }
      // return the actions
      return aActions;
    },
    []
  );
}

/**
 * When an authoring type gets loaded, update all items
 * that reference the type
 */
const resolveContentTypeEpic: Epic = (
  actions$,
  store$,
  { logSvc }: DeliveryContentDependencies
) => {
  // access the logger
  const logger = logSvc.get(LOGGER);
  // next logger
  const log: <T>(...v: any[]) => MonoTypeOperatorFunction<T> = rxNext(
    logger,
    'resolveContentTypeEpic'
  );

  // extract the types
  const authContent$ = rxPipe(store$, rxSelect(selectAuthContentFeature));
  const authTypes$ = rxPipe(store$, rxSelect(selectAuthTypeFeature));
  const authLayouts$ = rxPipe(store$, rxSelect(selectAuthLayoutFeature));
  const authAssets$ = rxPipe(store$, rxSelect(selectAuthAssetFeature));

  // get the delivery URL
  const apiURL$ = rxGetApiURL(store$);

  return rxPipe(
    actions$,
    ofType<AddAuthoringContentTypeAction>(ACTION_ADD_AUTH_CONTENT_TYPE),
    // extract the authoring content item
    map(selectPayload),
    // also select the current content
    withLatestFrom(
      authContent$,
      authTypes$,
      authLayouts$,
      authAssets$,
      apiURL$
    ),
    // extract the type
    map(([authType, contentItems, contentTypes, layouts, assets, apiURL]) =>
      actionsByType(
        authType,
        contentItems,
        contentTypes,
        layouts,
        assets,
        apiURL
      )
    ),
    // dispatch the actions
    mergeMap((actions) => from(actions))
  );
};

function hasLayout(aId: string, aItem: AuthoringContentItem): boolean {
  // scan the selected layouts
  const selLayouts = aItem.selectedLayouts;
  if (isNotEmpty(selLayouts)) {
    // scan
    return isNotNil(
      selLayouts.find((selLayout) => selLayout.layout.id === aId)
    );
  }
  // not found
  return false;
}

/**
 * Update all items that depend on a certain type
 */
function actionsByLayout(
  layout: AuthoringLayoutItem,
  contentItems: Record<string, AuthoringContentItem>,
  contentTypes: Record<string, AuthoringType>,
  layouts: Record<string, AuthoringLayoutItem>,
  assets: Record<string, AuthoringAsset>,
  apiURL: URL
): ResolveContentItemAction[] {
  // the type
  const id = getDeliveryIdFromAuthoringItem(layout);
  // layouts override
  const lyts = { ...layouts, [id]: layout };
  // return all authoring items for that layout
  return reduceForIn(
    contentItems,
    (
      aActions: ResolveContentItemAction[],
      contentItem: AuthoringContentItem
    ) => {
      // check if the type is the same
      if (hasLayout(id, contentItem)) {
        arrayPush(
          resolveContentItemAction({
            contentItem,
            contentTypes,
            layouts: lyts,
            assets,
            apiURL
          }),
          aActions
        );
      }
      // return the actions
      return aActions;
    },
    []
  );
}

/**
 * Update all items that depend on a certain asset
 */
function actionsByAsset(
  asset: AuthoringAsset,
  contentItems: Record<string, AuthoringContentItem>,
  contentTypes: Record<string, AuthoringType>,
  layouts: Record<string, AuthoringLayoutItem>,
  assets: Record<string, AuthoringAsset>,
  apiURL: URL,
  logger: Logger
): ResolveContentItemAction[] {
  // the asset
  const id = getDeliveryIdFromAuthoringItem(asset);
  // add the asset to the array
  const currentAssets = { ...assets, [id]: asset };

  // return all authoring items for that layout
  return reduceForIn(
    contentItems,
    (
      aActions: ResolveContentItemAction[],
      contentItem: AuthoringContentItem
    ) => {
      // check if the type is the same
      if (hasAsset(id, contentItem, logger)) {
        logger.info(`Asset ${id} referenced by content item ${contentItem.id}`);
        arrayPush(
          resolveContentItemAction({
            contentItem,
            contentTypes,
            layouts,
            assets: currentAssets,
            apiURL
          }),
          aActions
        );
      }
      // return the actions
      return aActions;
    },
    []
  );
}

/**
 * When an authoring layout gets loaded, update all items
 * that reference the layout
 */
const resolveLayoutEpic: Epic = (
  actions$,
  store$,
  { logSvc }: DeliveryContentDependencies
) => {
  // access the logger
  const logger = logSvc.get(LOGGER);
  // next logger
  const log: <T>(...v: any[]) => MonoTypeOperatorFunction<T> = rxNext(
    logger,
    'resolveLayoutEpic'
  );

  // extract the types
  const authContent$ = rxPipe(store$, rxSelect(selectAuthContentFeature));
  const authTypes$ = rxPipe(store$, rxSelect(selectAuthTypeFeature));
  const authLayouts$ = rxPipe(store$, rxSelect(selectAuthLayoutFeature));
  const authAssets$ = rxPipe(store$, rxSelect(selectAuthAssetFeature));

  // get the delivery URL
  const apiURL$ = rxGetApiURL(store$);

  return rxPipe(
    actions$,
    ofType<AddAuthoringLayoutAction>(ACTION_ADD_AUTH_LAYOUT),
    // extract the authoring content item
    map(selectPayload),
    // also select the current content
    withLatestFrom(
      authContent$,
      authTypes$,
      authLayouts$,
      authAssets$,
      apiURL$
    ),
    // extract the type
    map(([authLayout, contentItems, contentTypes, layouts, assets, apiURL]) =>
      actionsByLayout(
        authLayout,
        contentItems,
        contentTypes,
        layouts,
        assets,
        apiURL
      )
    ),
    // dispatch the actions
    mergeMap((actions) => from(actions))
  );
};

/**
 * When an authoring asset gets loaded, update all items
 * that reference the asset
 */
const resolveAssetEpic: Epic = (
  actions$,
  store$,
  { logSvc }: DeliveryContentDependencies
) => {
  // access the logger
  const logger = logSvc.get(LOGGER);
  // next logger
  const log: <T>(...v: any[]) => MonoTypeOperatorFunction<T> = rxNext(
    logger,
    'resolveAssetEpic'
  );

  // extract the types
  const authContent$ = rxPipe(store$, rxSelect(selectAuthContentFeature));
  const authTypes$ = rxPipe(store$, rxSelect(selectAuthTypeFeature));
  const authLayouts$ = rxPipe(store$, rxSelect(selectAuthLayoutFeature));
  const authAssets$ = rxPipe(store$, rxSelect(selectAuthAssetFeature));

  // get the delivery URL
  const apiURL$ = rxGetApiURL(store$);

  return rxPipe(
    actions$,
    ofType<AddAuthoringAssetAction>(ACTION_ADD_AUTH_ASSET),
    // extract the authoring content item
    map(selectPayload),
    // also select the current content
    withLatestFrom(
      authContent$,
      authTypes$,
      authLayouts$,
      authAssets$,
      apiURL$
    ),
    // extract the type
    map(([asset, content, types, layouts, assets, apiURL]) =>
      actionsByAsset(asset, content, types, layouts, assets, apiURL, logger)
    ),
    // dispatch the actions
    mergeMap((actions) => from(actions))
  );
};

// epic to convert from ACTION_ADD_DELIVERY_CONTENT to ACTION_SET_DELIVERY_CONTENT
const setItemEpic = addToSetEpic<ContentItemWithLayout>(
  ACTION_ADD_DELIVERY_CONTENT,
  ACTION_SET_DELIVERY_CONTENT
);

/**
 * Handles non existent items
 */
const nonExistentContentEpic: Epic = nonExistentEpic<
  ContentItemWithLayout,
  DeliveryContentFeatureState
>(
  ACTION_ADD_DELIVERY_CONTENT_IF_NONEXISTENT,
  addDeliveryContentAction,
  selectId,
  selectDeliveryContentFeature
);

export const deliveryContentEpic: Epic = combineEpics(
  loadContentTypeEpic,
  setItemEpic,
  nonExistentContentEpic,
  transformContentItemEpic,
  resolveContentItemEpic,
  resolveContentTypeEpic,
  resolveLayoutEpic,
  resolveAssetEpic
);
