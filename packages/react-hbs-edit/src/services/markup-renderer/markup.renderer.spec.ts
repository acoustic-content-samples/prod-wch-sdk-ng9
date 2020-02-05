import { LoggerService } from '@acoustic-content-sdk/api';
import { authoringContentFeature } from '@acoustic-content-sdk/redux-feature-auth-content';
import { authoringLayoutMappingFeature } from '@acoustic-content-sdk/redux-feature-auth-layout-mapping';
import { authoringTypeFeature } from '@acoustic-content-sdk/redux-feature-auth-type';
import { deliveryContentFeature } from '@acoustic-content-sdk/redux-feature-delivery-content';
import { handlebarsFeature } from '@acoustic-content-sdk/redux-feature-handlebars';
import { loggedInAction } from '@acoustic-content-sdk/redux-feature-login';
import { setUrlConfigAction } from '@acoustic-content-sdk/redux-feature-url-config';
import {
  createReduxRootStoreOnFolder,
  DEFAULT_URL_CONFIG
} from '@acoustic-content-sdk/redux-testing';
import { isNotEmpty, rxPipe } from '@acoustic-content-sdk/utils';
import { join } from 'path';
import { filter, first } from 'rxjs/operators';

import { ASSET_ROOT } from '../../utils/assets';
import { getLoggerService } from './../../utils/logger';
import { createMarkupRenderer } from './markup.renderer';

describe('markup.renderer', () => {
  const ROOT = join(ASSET_ROOT, 'markup-renderer');

  // logger
  const logSvc: LoggerService = getLoggerService();

  it('should render a compound item', () => {
    // the store
    const store = createReduxRootStoreOnFolder(ROOT, logSvc);
    // add the content feature
    store.addFeatureModule(authoringContentFeature);
    store.addFeatureModule(authoringTypeFeature);
    store.addFeatureModule(authoringLayoutMappingFeature);
    store.addFeatureModule(deliveryContentFeature);
    store.addFeatureModule(handlebarsFeature);
    // init
    store.dispatch(setUrlConfigAction(DEFAULT_URL_CONFIG));
    store.dispatch(loggedInAction());

    // construct the renderer
    const renderer = createMarkupRenderer(store, logSvc);

    const markup$ = renderer('593730b0-c45e-4888-8d94-9a986be3d51f');

    return rxPipe(markup$, filter(isNotEmpty), first()).toPromise();
  });
});
