import { LoggerService, StaticHubInfoUrlProvider } from '@acoustic-content-sdk/api';
import { FETCH_PRIORITY, FetchText, WriteText } from '@acoustic-content-sdk/rest-api';
import {
  boxLoggerService,
  createLruCache,
  idleFrameScheduler,
  isAbsoluteURL,
  isNil,
  isNotNil,
  isString,
  jsonStringify,
  opCacheLast,
  pluckPath,
  rxPipe,
  typedPluck,
  urlFromProvider,
  wchGetResourceUrlFromApiURL,
  wchIsPreviewMode,
} from '@acoustic-content-sdk/utils';
import { asyncScheduler, from, merge, Observable, Subject, Subscriber, throwError } from 'rxjs';
import { ajax, AjaxResponse } from 'rxjs/ajax';
import { catchError, mapTo, observeOn, pluck, subscribeOn, switchMap } from 'rxjs/operators';

import { isBaseAuthoringItem } from './auth.content.utils';
import { fromFetch } from './fetch';

const SLASH = '/';
export const PUBLISH_PRIORITY_HEADER_VALUE = 'now';
export const CONTENT_TYPE_HEADER_VALUE_JSON = 'application/json';

const USE_CACHE = true;

const FETCH_TEXT_LOGGER = 'FetchTextAjax';

/*
 * Makes sure our path ends with a proper trailing slash
 */
function _ensureTrailingSlash(aUrl: string): string {
  return aUrl.endsWith(SLASH) ? aUrl : aUrl + SLASH;
}

/*
 * Makes sure our path ends with a proper trailing slash
 */
export function removeStartingSlash(aUrl: string): string {
  return aUrl.indexOf(SLASH) === 0 ? aUrl.substr(1) : aUrl;
}

/**
 * Fetch text using the normal APIs
 *
 * @param url  - URL used to fetch the text
 * @param withCredentials  - credential flag
 *
 * @returns the text
 */
function fetchTextNormal(
  url: string,
  withCredentials: boolean
): Observable<string> {
  return rxPipe(
    ajax({ url, withCredentials, responseType: 'text' }),
    typedPluck('response'),
    // make sure to decouple the result handling on a new thread
    observeOn(asyncScheduler)
  );
}

/**
 * Fetch text with lower priority
 *
 * @param url  - URL used to fetch the text
 * @param withCredentials  - credential flag
 *
 * @returns the text
 */
function fetchTextLow(
  url: string,
  withCredentials: boolean
): Observable<string> {
  // config
  const init: any = { importance: 'low' };
  // credentials
  if (withCredentials) {
    init.credentials = 'include';
  }
  // fetch
  return rxPipe(
    fromFetch(url, init),
    switchMap((resp) => resp.text()),
    // subscribe on the idle frame
    subscribeOn(idleFrameScheduler),
    // make sure to decouple the result handling on a new thread
    observeOn(asyncScheduler)
  );
}

/**
 * Creates a callback function that loads content via HTTP GET from the API routes.
 *
 * @param apiBase - the {@link https://developer.ibm.com/customer-engagement/tutorials/accessing-your-sites-through-watson-content-hub-apis/#tocstep1 | API URL}.
 * @param logger - an optional logger
 * @returns the callback function
 */
function internalFetchTextAjax(
  apiBase: StaticHubInfoUrlProvider,
  logSvc: LoggerService
): FetchText {
  // logger
  const logger = logSvc.get(FETCH_TEXT_LOGGER);
  // decode the API URL
  const apiURL = urlFromProvider(apiBase);
  // get the delivery URL
  const deliveryURL = wchGetResourceUrlFromApiURL(apiURL);
  // check if we are in preview mode
  const isPreview = wchIsPreviewMode(apiURL);
  // delivery prefix
  const deliveryPrefix = `${apiURL.href}delivery/`;
  function fetch(
    aPath: string,
    aPriority?: FETCH_PRIORITY
  ): Observable<string> {
    // load using ajax
    const fetchFct =
      aPriority === FETCH_PRIORITY.LOW ? fetchTextLow : fetchTextNormal;
    // check for the delivery part
    const isDelivery = aPath.indexOf(SLASH) === 0;
    // check if we need to use delivery or API
    const baseURL = isDelivery ? deliveryURL : apiURL;
    const path = removeStartingSlash(aPath);
    // prepend with the api URL
    const url = isAbsoluteURL(aPath) ? aPath : `${baseURL.href}${path}`;
    // check if we need to use credentials
    const withCredentials =
      isPreview || (!isDelivery && url.indexOf(deliveryPrefix) !== 0);
    // log this
    logger.info('fetch text', withCredentials, path);
    // dispatch
    return fetchFct(url, withCredentials);
  }

  // returns the fetch function
  // return safeFetchText(fetch);
  return fetch;
}

/**
 * Creates a callback function that loads content via HTTP GET from the API routes.
 *
 * @param apiBase - the {@link https://developer.ibm.com/customer-engagement/tutorials/accessing-your-sites-through-watson-content-hub-apis/#tocstep1 | API URL}.
 * @param logger - an optional logger
 * @returns the callback function
 */
export function fetchTextAjax(
  apiBase: StaticHubInfoUrlProvider | PromiseLike<StaticHubInfoUrlProvider>,
  aLoggerService?: LoggerService
): FetchText {
  // resolve the logger
  const logSvc = boxLoggerService(aLoggerService);
  const logger = logSvc.get(FETCH_TEXT_LOGGER);
  // construct a cache
  const cache = createLruCache<Observable<string>>();
  // attach to the provider
  const fetchText$ = Promise.resolve(apiBase).then((url) =>
    internalFetchTextAjax(url, logSvc)
  );

  // dispatch
  const fetch = (
    aPath: string,
    aPriority?: FETCH_PRIORITY
  ): Observable<string> =>
    rxPipe(
      from(fetchText$),
      switchMap((fetchText) => fetchText(aPath, aPriority))
    );

  const cachedFetch = (
    aPath: string,
    aPriority?: FETCH_PRIORITY
  ): Observable<string> => rxPipe(fetch(aPath, aPriority), opCacheLast);

  /**
   * Returns a response from the cache. This response will emit the last cached
   * value immeditately but also request a new, fresh value if the observable
   * is not running, already
   *
   * @param aPath - the path
   * @param aPriority - optionally the priority
   *
   * @return the observable with the desired behaviour
   */
  const fromCache = (
    aPath: string,
    aPriority?: FETCH_PRIORITY
  ): Observable<string> =>
    cache(aPath, (path) => cachedFetch(path, aPriority), logger);

  // returns the fetch function
  return USE_CACHE ? fromCache : fetch;
}

function hasRevision(aItem: any): boolean {
  return isBaseAuthoringItem(aItem) && isString(aItem.rev);
}

function sendText(
  logSvc: LoggerService,
  url: string,
  aBody: any
): Observable<string> {
  // check for the method
  const isDelete = isNil(aBody);
  const method = isDelete ? 'DELETE' : hasRevision(aBody) ? 'PUT' : 'POST';

  // delete
  const delete$ = rxPipe(
    ajax({ url, method, withCredentials: true }),
    mapTo(aBody)
  );

  const requestDetails = {
    url,
    method,
    body: jsonStringify(aBody),
    withCredentials: true,
    responseType: 'json',
    headers: {
      'Content-Type': CONTENT_TYPE_HEADER_VALUE_JSON
    }
  };

  // add publish priority header for authoring requests only
  if (url.indexOf('authoring') > 0) {
    requestDetails.headers[
      'x-ibm-dx-publish-priority'
    ] = PUBLISH_PRIORITY_HEADER_VALUE;
  }

  // update
  const update$ = rxPipe(
    ajax(requestDetails),
    typedPluck('response'),
    // make sure to decouple the result handling on a new thread
    observeOn(asyncScheduler)
  );
  // ok
  return isDelete ? delete$ : update$;
}

export function isProgressEvent(object: any): object is ProgressEvent {
  return object instanceof ProgressEvent;
}

export function isResponseEvent(object: any) {
  return !isProgressEvent(object);
}

const selectError = pluckPath<any>([
  'currentTarget',
  'response',
  'errors',
  '0'
]);

function mapError(aError: any) {
  if (isProgressEvent(aError)) {
    // get the actual error
    const originalError = selectError(aError);
    if (isNotNil(originalError)) {
      return throwError(originalError);
    }
  }
  // just return as is
  return throwError(aError);
}

function sendFile<T>(
  aLogSvc: LoggerService,
  aUrl: string,
  aFile: File
): Observable<T> | Observable<ProgressEvent> {
  const progress$ = new Subject<any>();
  const response$ = rxPipe(
    ajax({
      url: aUrl,
      method: 'POST',
      withCredentials: true,
      responseType: 'json',
      headers: {
        'Content-Type': aFile.type
      },
      body: aFile,
      progressSubscriber: new Subscriber(progress$)
    }),
    pluck<AjaxResponse, T>('response'),
    observeOn(asyncScheduler)
  );
  // progress event with error handling
  const prg$ = rxPipe(progress$, catchError(mapError));
  // combine
  return merge(response$, prg$);
}

/**
 * Creates a callback function that writes content to API routes via PUST, POST or delete
 *
 * @param apiBase - the {@link https://developer.ibm.com/customer-engagement/tutorials/accessing-your-sites-through-watson-content-hub-apis/#tocstep1 | API URL}.
 * @param logSvc - an optional logger service
 * @returns the callback function
 */
function internalWriteJsonAjax(
  apiBase: StaticHubInfoUrlProvider,
  logSvc: LoggerService
): WriteText {
  // logger
  const logger = logSvc.get('WriteJsonAjax');
  // decode the API URL
  const apiURL = urlFromProvider(apiBase);
  function write(
    aPath: string,
    aBody: any
  ): Observable<any> | Observable<ProgressEvent> {
    // check if we need to use delivery or API
    const path = removeStartingSlash(aPath);
    // prepend with the api URL
    const url = `${apiURL.href}${path}`;
    // log this
    logger.info('send request', url);
    if (aBody instanceof File) {
      // request is built based upon explicitly provided details
      return sendFile(logSvc, url, aBody);
    } else {
      // request is built based upon implicit conventions)
      return sendText(logSvc, url, aBody);
    }
  }

  // returns the write function
  return write;
}

/**
 * Creates a callback function that writes content to API routes via PUST, POST or delete
 *
 * @param apiBase - the {@link https://developer.ibm.com/customer-engagement/tutorials/accessing-your-sites-through-watson-content-hub-apis/#tocstep1 | API URL}.
 * @param logger - an optional logger
 * @returns the callback function
 */
export function writeJsonAjax(
  apiBase: StaticHubInfoUrlProvider | PromiseLike<StaticHubInfoUrlProvider>,
  aLoggerService?: LoggerService
): WriteText {
  // resolve the logger
  const logSvc = boxLoggerService(aLoggerService);
  // attach to the provider
  const writeText$ = Promise.resolve(apiBase).then((url) =>
    internalWriteJsonAjax(url, logSvc)
  );

  // dispatch
  function write(aPath: string, aBody: any): Observable<string> {
    return rxPipe(
      from(writeText$),
      switchMap((writeText) => writeText(aPath, aBody))
    );
  }

  // returns the write function
  return write;
}
