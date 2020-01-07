import { rxReadJsonFile } from '@acoustic-content-sdk/rx-utils';
import {
  identity,
  jsonParse,
  NOOP_LOGGER_SERVICE,
  rxPipe
} from '@acoustic-content-sdk/utils';
import { readFileSync } from 'fs';
import { join } from 'path';
import { tap } from 'rxjs/operators';

import {
  createBreadcrumb,
  getNavSelectors,
  navigationFromJson,
  ROOT_ID
} from './navigation.service';
import { ASSET_BASE } from '../utils/assets';

describe('navigation.service', () => {
  const logSvc = NOOP_LOGGER_SERVICE;

  const NAV_ASSETS = join(ASSET_BASE, 'navigation-service');

  it('should create the breadcrumb', () => {
    const logger = logSvc.get('should create the breadcrumb');

    const JSON = join(NAV_ASSETS, 'simple.nav.json');

    // read the json
    const json$ = rxReadJsonFile(JSON);

    // load the assets
    const navSel = getNavSelectors(json$, logSvc);

    // our id
    const id = '7c7e928d-4702-438a-9f24-51a5a2b150d6';
    const breadcrumb$ = createBreadcrumb(id, navSel.selectParent, identity);

    // compute the breadcrumb trail
    const test$ = rxPipe(breadcrumb$, tap(console.log));

    return test$.toPromise();
  });

  it('should load the navigation', () => {
    const logger = logSvc.get('should load the navigation');

    const JSON = join(NAV_ASSETS, 'simple.nav.json');

    // load the assets
    const nav = navigationFromJson(
      jsonParse(readFileSync(JSON, 'utf-8')),
      logger
    );

    expect(nav.parents[ROOT_ID]).toEqual(ROOT_ID);
    expect(nav.children[ROOT_ID]).toBeDefined();
  });
});
