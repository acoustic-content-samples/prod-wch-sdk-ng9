/**
 * @jest-environment node
 */
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
import {
  isNotEmpty,
  opFilterNotNil,
  rxPipe
} from '@acoustic-content-sdk/utils';
import { JSDOM } from 'jsdom';
import { join } from 'path';
import { filter, first, map, tap } from 'rxjs/operators';

import { ASSET_ROOT } from '../../utils/assets';
import { getLoggerService } from './../../utils/logger';
import { createMarkupRenderer } from './markup.renderer';

describe('markup.renderer', () => {
  const ROOT = join(ASSET_ROOT, 'markup-renderer');

  const CONTENT_ITEM_ID = '593730b0-c45e-4888-8d94-9a986be3d51f';
  const HBS_TEXT_MARKER = 'ebb76c34-41f0-4e82-8909-69bbb2401e68';

  // logger
  const logSvc: LoggerService = getLoggerService();

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

  fit('should render an embedded content item', () => {
    // accessor
    const ACCESSOR =
      'elements.rows.values[0].cells.values[0].content.values[0].hbText.value';
    const ID = `${CONTENT_ITEM_ID}#${ACCESSOR}`;
    // construct the renderer
    const renderer = createMarkupRenderer(store, logSvc);

    const markup$ = renderer(ID);

    return rxPipe(
      markup$,
      filter(isNotEmpty),
      tap(console.log),
      map((markup) => JSDOM.fragment(markup)),
      map((dom) => dom.querySelector(`[data-key='${HBS_TEXT_MARKER}']`)),
      opFilterNotNil,
      tap((el) => console.log(el.innerHTML)),
      first()
    ).toPromise();
  });

  it('should render a full page with an embedded text item', () => {
    // construct the renderer
    const renderer = createMarkupRenderer(store, logSvc);

    const markup$ = renderer(CONTENT_ITEM_ID);

    return rxPipe(
      markup$,
      filter(isNotEmpty),
      map((markup) => JSDOM.fragment(markup)),
      map((dom) => dom.querySelector(`[data-key='${HBS_TEXT_MARKER}']`)),
      opFilterNotNil,
      tap((el) => console.log(el.innerHTML)),
      first()
    ).toPromise();
  });
});
