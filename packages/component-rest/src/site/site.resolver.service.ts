import {
  createVersionString,
  LoggerService,
  SiteDeliveryContentItem
} from '@acoustic-content-sdk/api';
import {
  DeliverySiteResolver,
  ProtectedContent
} from '@acoustic-content-sdk/component-api';
import { FetchText } from '@acoustic-content-sdk/rest-api';
import {
  boxLoggerService,
  constGenerator,
  jsonParse,
  opCacheLast,
  rxNext,
  rxPipe
} from '@acoustic-content-sdk/utils';
import { MonoTypeOperatorFunction, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { MODULE, VERSION } from './../version';

const LOGGER = 'AbstractSiteResolverService';

const REL_PUBLIC_PATH_SITE = 'delivery/v2/sites/@current';
const REL_PROTECTED_PATH_SITE = 'mydelivery/v2/sites/@current';

/**
 * Actually send a request
 *
 * @param aUrlConfig - the URL config
 * @param aQuery - the query object
 * @param aHttp - the http client used to make the request
 *
 * @returns the observable of the search result
 */
function sendRequest<T>(
  aIsProtected: boolean,
  aFetchText: FetchText
): Observable<SiteDeliveryContentItem> {
  // the path
  const path = aIsProtected ? REL_PROTECTED_PATH_SITE : REL_PUBLIC_PATH_SITE;
  // make the request
  return rxPipe(
    aFetchText(path),
    map<string, SiteDeliveryContentItem>(jsonParse)
  );
}

export class AbstractSiteResolverService implements DeliverySiteResolver {
  getSiteDeliveryContentItem: () => Observable<SiteDeliveryContentItem>;

  protected constructor(
    aFetchText: FetchText,
    aProtected: ProtectedContent,
    aLogSvc?: LoggerService
  ) {
    // logger
    const logSvc = boxLoggerService(aLogSvc);
    // construct a logger
    const logger = logSvc.get(LOGGER);
    // next logger
    const log: <T>(...v: any[]) => MonoTypeOperatorFunction<T> = rxNext(logger);
    // load the site
    const site$ = rxPipe(
      aProtected.protected$,
      switchMap((bIsProtected) => sendRequest(bIsProtected, aFetchText)),
      log('siteItem'),
      opCacheLast
    );
    // the callback
    const getSiteDeliveryContentItem = constGenerator(site$);

    // log this service
    logger.info(MODULE, createVersionString(VERSION));

    // load the layout
    this.getSiteDeliveryContentItem = getSiteDeliveryContentItem;
  }
}
