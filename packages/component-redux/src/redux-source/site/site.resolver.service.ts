import {
  createVersionString,
  KEY_METADATA,
  LoggerService,
  SiteDeliveryContentItem
} from '@acoustic-content-sdk/api';
import {
  DeliveryContentResolver,
  DeliverySiteResolver
} from '@acoustic-content-sdk/component-api';
import {
  guaranteeDefaultSiteAction,
  selectDefaultSite,
  selectSiteFeature
} from '@acoustic-content-sdk/redux-feature-site';
import {
  ReduxRootStore,
  rxSelect,
  rxStore
} from '@acoustic-content-sdk/redux-store';
import {
  isNotNil,
  boxLoggerService,
  opCacheLast,
  opFilterNotNil,
  rxNext,
  rxPipe,
  safeSwitchMap
} from '@acoustic-content-sdk/utils';
import { MonoTypeOperatorFunction, Observable } from 'rxjs';
import { filter } from 'rxjs/operators';

import { MODULE, VERSION } from './../../version';

const LOGGER = 'AbstractSiteResolverService';

function isSiteDeliveryContentItem(
  aItem: any
): aItem is SiteDeliveryContentItem {
  return (
    isNotNil(aItem) &&
    isNotNil(aItem[KEY_METADATA]) &&
    isNotNil(aItem.navigation)
  );
}

export class AbstractSiteResolverService implements DeliverySiteResolver {
  getSiteDeliveryContentItem: () => Observable<SiteDeliveryContentItem>;

  protected constructor(
    aStore: ReduxRootStore,
    aContentResolver: DeliveryContentResolver,
    aLogSvc?: LoggerService
  ) {
    // logger
    const logSvc = boxLoggerService(aLogSvc);
    // construct a logger
    const logger = logSvc.get(LOGGER);
    // next logger
    const log: <T>(...v: any[]) => MonoTypeOperatorFunction<T> = rxNext(logger);
    // rx
    const store$ = rxStore(aStore);

    // bind the callback
    const getDeliveryContentItem = (id: string) =>
      aContentResolver.getDeliveryContentItem(id);

    // the default site
    const defaultSite$ = rxPipe(
      store$,
      rxSelect(selectSiteFeature),
      rxSelect(selectDefaultSite),
      log('defaultSite')
    );

    // derive the content item
    const siteDeliveryContentItem$ = rxPipe(
      defaultSite$,
      opFilterNotNil,
      safeSwitchMap(getDeliveryContentItem),
      filter(isSiteDeliveryContentItem),
      log('siteItem'),
      opCacheLast
    );

    // select the item
    const getSiteDeliveryContentItem = (): Observable<SiteDeliveryContentItem> => {
      // make sure the item is loaded
      aStore.dispatch(guaranteeDefaultSiteAction());
      // returns the item
      return siteDeliveryContentItem$;
    };

    // log this service
    logger.info(MODULE, createVersionString(VERSION));

    // load the layout
    this.getSiteDeliveryContentItem = getSiteDeliveryContentItem;
  }
}
