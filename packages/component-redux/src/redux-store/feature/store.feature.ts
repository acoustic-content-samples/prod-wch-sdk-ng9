import {
  createChildModule,
  MessageService,
  requestAuthoringContentAction,
  requestAuthoringLayoutAction,
  requestAuthoringLayoutMappingAction,
  requestAuthoringTypeAction,
  requestDeliveryContentAction,
  requestUrlConfigAction,
  requestWchConfigAction
} from '@acoustic-content-sdk/cross-frame-redux';
import {
  AUTH_ASSET_FEATURE,
  AuthAssetFeatureState,
  authoringAssetReducer,
  AuthoringAssetState
} from '@acoustic-content-sdk/redux-feature-auth-asset';
import {
  AUTH_CONTENT_FEATURE,
  AuthContentFeatureState,
  authoringContentReducer,
  AuthoringContentState
} from '@acoustic-content-sdk/redux-feature-auth-content';
import {
  AUTH_CONTENT_TEMPLATES_FEATURE,
  AuthContentTemplatesFeatureState,
  authoringContentTemplatesReducer,
  AuthoringContentTemplateState
} from '@acoustic-content-sdk/redux-feature-auth-content-template';
import {
  AUTH_LAYOUT_FEATURE,
  AuthLayoutFeatureState,
  authoringLayoutReducer,
  AuthoringLayoutState
} from '@acoustic-content-sdk/redux-feature-auth-layout';
import {
  AUTH_LAYOUT_MAPPING_FEATURE,
  AuthLayoutMappingFeatureState,
  authoringLayoutMappingReducer,
  AuthoringLayoutMappingState
} from '@acoustic-content-sdk/redux-feature-auth-layout-mapping';
import {
  AUTH_TYPE_FEATURE,
  authoringTypeReducer,
  AuthoringTypeState,
  AuthTypeFeatureState
} from '@acoustic-content-sdk/redux-feature-auth-type';
import {
  DELIVERY_CONTENT_FEATURE,
  DeliveryContentFeatureState,
  deliveryContentReducer,
  DeliveryContentState
} from '@acoustic-content-sdk/redux-feature-delivery-content';
import { inlineEditFeature } from '@acoustic-content-sdk/redux-feature-inline-edit';
import {
  URL_CONFIG_FEATURE,
  UrlConfigFeatureState,
  urlConfigReducer,
  UrlConfigState
} from '@acoustic-content-sdk/redux-feature-url-config';
import {
  CURRENT_USER_FEATURE,
  CurrentUserFeatureState,
  userReducer,
  UserState
} from '@acoustic-content-sdk/redux-feature-user';
import {
  ACOUSTIC_CONFIG_FEATURE,
  WchConfigFeatureState,
  wchConfigReducer,
  WchConfigState
} from '@acoustic-content-sdk/redux-feature-wch-config';
import {
  createReduxFeatureModule,
  ofInitFeature
} from '@acoustic-content-sdk/redux-store';
import { rxPipe } from '@acoustic-content-sdk/utils';
import { Epic } from 'redux-observable';
import { of } from 'rxjs';
import { first, mergeMapTo } from 'rxjs/operators';

import { VERSION } from './../../version';

/**
 * Identifier for out feature
 */
const ID_STORE_FEATURE = `[@acoustic-content-sdk/component-redux@${VERSION.version.major}.${VERSION.version.minor}.${VERSION.version.patch}] STORE_FEATURE`;

const initEpic: Epic = (actions$) =>
  rxPipe(
    actions$,
    ofInitFeature(ID_STORE_FEATURE),
    first(),
    mergeMapTo(
      of(
        requestUrlConfigAction(),
        requestWchConfigAction(),
        requestDeliveryContentAction(),
        requestAuthoringContentAction(),
        requestAuthoringLayoutAction(),
        requestAuthoringLayoutMappingAction(),
        requestAuthoringTypeAction()
      )
    )
  );

const urlConfigFeature = createReduxFeatureModule<
  UrlConfigState,
  UrlConfigFeatureState
>(URL_CONFIG_FEATURE, urlConfigReducer);

const wchConfigFeature = createReduxFeatureModule<
  WchConfigState,
  WchConfigFeatureState
>(ACOUSTIC_CONFIG_FEATURE, wchConfigReducer);

const authContentFeature = createReduxFeatureModule<
  AuthoringContentState,
  AuthContentFeatureState
>(AUTH_CONTENT_FEATURE, authoringContentReducer);

const authAssetFeature = createReduxFeatureModule<
  AuthoringAssetState,
  AuthAssetFeatureState
>(AUTH_ASSET_FEATURE, authoringAssetReducer);

const userFeature = createReduxFeatureModule<
  UserState,
  CurrentUserFeatureState
>(CURRENT_USER_FEATURE, userReducer);

const authLayoutFeature = createReduxFeatureModule<
  AuthoringLayoutState,
  AuthLayoutFeatureState
>(AUTH_LAYOUT_FEATURE, authoringLayoutReducer);

const authLayoutMappingFeature = createReduxFeatureModule<
  AuthoringLayoutMappingState,
  AuthLayoutMappingFeatureState
>(AUTH_LAYOUT_MAPPING_FEATURE, authoringLayoutMappingReducer);

const authContentTemplatesFeature = createReduxFeatureModule<
  AuthoringContentTemplateState,
  AuthContentTemplatesFeatureState
>(AUTH_CONTENT_TEMPLATES_FEATURE, authoringContentTemplatesReducer);

const authContentTypeFeature = createReduxFeatureModule<
  AuthoringTypeState,
  AuthTypeFeatureState
>(AUTH_TYPE_FEATURE, authoringTypeReducer);

const deliveryContentFeature = createReduxFeatureModule<
  DeliveryContentState,
  DeliveryContentFeatureState
>(DELIVERY_CONTENT_FEATURE, deliveryContentReducer);

export function createStoreFeature(aMessageService: MessageService) {
  return createReduxFeatureModule(ID_STORE_FEATURE, undefined, initEpic, [
    userFeature,
    authLayoutFeature,
    authLayoutMappingFeature,
    authContentTemplatesFeature,
    deliveryContentFeature,
    urlConfigFeature,
    wchConfigFeature,
    authContentFeature,
    authAssetFeature,
    authContentTypeFeature,
    inlineEditFeature,
    createChildModule(aMessageService)
  ]);
}
