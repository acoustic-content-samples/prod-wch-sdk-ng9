/**
 * @jest-environment node
 */
import {
  CLASSIFICATION_CONTENT,
  ContentItemWithLayout,
  LoggerService,
  Query
} from '@acoustic-content-sdk/api';
import {
  DeliverySearchResolver,
  ReconciledDeliverySearchInput,
  ReconciledDeliverySearchResolver
} from '@acoustic-content-sdk/component-api';
import {
  authoringContentFeature,
  guaranteeAuthoringContentAction
} from '@acoustic-content-sdk/redux-feature-auth-content';
import { deliveryContentFeature } from '@acoustic-content-sdk/redux-feature-delivery-content';
import { loggedInAction } from '@acoustic-content-sdk/redux-feature-login';
import { setUrlConfigAction } from '@acoustic-content-sdk/redux-feature-url-config';
import {
  createReduxRootStoreOnFolder,
  DEFAULT_URL_CONFIG
} from '@acoustic-content-sdk/redux-testing';
import {
  Predicate,
  rxPipe,
  isNilOrEmpty,
  reduceToObject,
  getPath
} from '@acoustic-content-sdk/utils';
import { join } from 'path';
import { tap, filter, first } from 'rxjs/operators';

import { ASSET_ROOT } from '../../utils/assets';
import { getLoggerService } from './../../utils/logger';
import { MockDeliverySearchResolver } from './mock.delivery.search.resolver';
import { ReconciledDeliverySearchResolverService } from './reconciled.search.resolver.service';

describe('reconciled.search.resolver.service', () => {
  const ROOT = join(ASSET_ROOT, 'reconciled-search');

  // logger
  const logSvc: LoggerService = getLoggerService();

  // the store
  const store = createReduxRootStoreOnFolder(ROOT, logSvc);
  // add the content feature
  store.addFeatureModule(deliveryContentFeature);
  store.addFeatureModule(authoringContentFeature);
  // init
  store.dispatch(setUrlConfigAction(DEFAULT_URL_CONFIG));
  store.dispatch(loggedInAction());

  it('should find items', () => {
    // base service
    const deliverySearch: DeliverySearchResolver = new MockDeliverySearchResolver(
      join(ROOT, 'search', 'result1.json')
    );
    // our service
    const reconciledSearch: ReconciledDeliverySearchResolver = new ReconciledDeliverySearchResolverService(
      store,
      deliverySearch,
      logSvc
    );
    // load some data into the store
    const ROOT_ITEM = '796751ff-f44f-45d8-99c9-8bf0d45b428c';
    store.dispatch(guaranteeAuthoringContentAction(ROOT_ITEM));
    // the search
    const query: Query = { fq: 'name:(*ag*)' };
    const predicate: Predicate<ContentItemWithLayout> = (item) =>
      item.name.indexOf('ag') >= 0;
    const input: ReconciledDeliverySearchInput<ContentItemWithLayout> = {
      query,
      predicate
    };
    // execute the search
    const result$ = reconciledSearch.getDeliverySearchResults(
      input,
      CLASSIFICATION_CONTENT
    );

    function isValidResult(aResult: ContentItemWithLayout[]): boolean {
      if (isNilOrEmpty(aResult) || aResult.length !== 2) {
        return false;
      }
      // check
      const obj = reduceToObject(aResult, (item) => item.id);
      const tags = getPath(obj, [ROOT_ITEM, 'tags'], []);
      return tags.indexOf('local') >= 0;
    }

    const test$ = rxPipe(result$, filter(isValidResult), first());

    return test$.toPromise();
  });
});
