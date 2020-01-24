import { ErrorResponse, HttpResourceOptions, Logger } from '@acoustic-content-sdk/api';
import { asyncScheduler, concat, defer, MonoTypeOperatorFunction, Observable, of, throwError, timer } from 'rxjs';
import { catchError, delayWhen, first, map, retryWhen, share, switchMap, tap, timeInterval } from 'rxjs/operators';

import { createLruCache } from '../cache/lru.utils';
import { lazyGenerator } from '../generators/lazy.generator';
import { CacheAccessor } from './../cache/cache.utils';
import { dbgAdd, dbgSourceCallback } from './../debug/debug.utils';
import { isErrorResponse } from './../error/error';
import { bindMember, partialLeft, random } from './../js/js.utils';
import { JSONObject, JSONValue } from './../json/json.utils';
import { NOOP_LOGGER } from './../logger/noop.logger';
import { identity } from './../misc';
import { opCacheLast, opDeepDistinctUntilChanged } from './../operators/operators';
import { isNotNil } from './../predicates/predicates';
import { rxPipe } from './../rx/rx.utils';

const LOGGER = 'http.utils';

/* Copyright IBM Corp. 2017 */
export interface HttpOptions {
  // check if we shoud send the request with credentials
  withCredentials: boolean;
  // if and error occurs, transport that as an ErrorResponse object
  dispatchError?: boolean;
}

export interface HttpService {
  getJson<T>(aUrl: string, aOptions: HttpOptions): Observable<T>;
  getText(aUrl: string, aOptions: HttpOptions): Observable<string>;
}

let ID = 0;

// the request sending method
export type Request<T> = (aUrl: string, aOptions: HttpOptions) => Observable<T>;

/**
 * Build an error response object
 *
 * @param aError - the error
 * @returns the response
 */
function _getErrorResponse(aError: any): ErrorResponse {
  // check if the error is already expected
  if (isErrorResponse(aError)) {
    return aError;
  }
  // the response
  const resp: Partial<ErrorResponse> = {};
  // some generic conversion
  if (isNotNil(aError)) {
    // copy
    resp.statusCode = aError.status || 500;
  }
  // make up a response
  return resp as any;
}

/**
 * Sends a request to the given options object and allows to trigger a refresh via the given
 * trigger.
 *
 * @param aOptions - the options
 * @param aTrigger - the trigger
 * @param aHttp - the http object
 *
 * @returns the response stream
 */
function _sendRequest<T>(
  aUrl: string,
  aOptions: HttpOptions,
  aTrigger: Observable<any>,
  aRequest: Request<T>,
  aLogger: Logger
): Observable<T> {
  // logger
  const logger = aLogger || NOOP_LOGGER;
  // the URL
  const url = aUrl;
  // share the trigger
  const trigger = rxPipe(aTrigger, share());
  const id = ID++;
  // handle the error case
  const handleError: MonoTypeOperatorFunction<
    ErrorResponse | T
  > = aOptions.dispatchError
    ? (op) =>
        rxPipe(
          op,
          catchError((err) =>
            concat(of(_getErrorResponse(err)), throwError(err))
          )
        )
    : identity;
  // make the requests
  return rxPipe(
    // whenever the trigger triggers
    trigger,
    // log this
    tap((cause: any) =>
      logger.info('Refresh because of', cause, 'for ID', id, 'and URL', url)
    ),
    // whenever a timeout or a trigger occurs, make the request
    switchMap(() =>
      rxPipe(
        // make the actual request
        aRequest(url, aOptions),
        // error handler
        handleError,
        // logs the error and retries after a timeout
        retryWhen<T>((errors) =>
          rxPipe(
            errors,
            first(),
            tap((error) =>
              logger.warn(
                'Error retrieving resource ',
                url,
                'retrying, id:',
                id,
                error
              )
            ),
            delayWhen<T>((error) => trigger)
          )
        )
      )
    ),
    // log the response
    tap((resp) => logger.info('Response received', id, url, resp))
  );
}

/**
 * Sends a request to the given options object and allows to trigger a refresh via the given
 * trigger.
 *
 * @param aOptions - the options
 * @param aTrigger - the trigger
 * @param aHttp - the http object
 *
 * @returns the response stream
 */
function _sendJsonRequest<T>(
  aUrl: string,
  aOptions: HttpOptions,
  aTrigger: Observable<any>,
  aHttpService: HttpService,
  aLogger?: Logger
): Observable<T> {
  // dispatch
  return _sendRequest(
    aUrl,
    aOptions,
    aTrigger,
    bindMember(aHttpService, 'getJson'),
    aLogger
  );
}

/**
 * Sends a request to the given options object and allows to trigger a refresh via the given
 * trigger.
 *
 * @param aOptions - the options
 * @param aTrigger - the trigger
 * @param aHttp - the http object
 *
 * @returns the response stream
 */
function _sendTextRequest(
  aUrl: string,
  aOptions: HttpOptions,
  aTrigger: Observable<any>,
  aHttpService: HttpService,
  aLogger?: Logger
): Observable<string> {
  // dispatch
  return _sendRequest(
    aUrl,
    aOptions,
    aTrigger,
    bindMember(aHttpService, 'getText'),
    aLogger
  );
}

/**
 * Returns the variation for polling times
 */
const DEFAULT_POLL_TIME_VARIATION = 0.15;

/**
 * Default time after which to poll in [ms]
 */
const DEFAULT_POLL_TIME = 10 * 1000;

/**
 * Default number of retries
 */
const DEFAULT_RETRIES = 10;

/**
 * Default flag for local storage usage
 */
const DEFAULT_USE_LOCAL_STORAGE = true;

/**
 * Default flag for REST API usage
 */
const DEFAULT_USE_API = true;

/**
 * Default flag for function _resources
 */
const DEFAULT_USE_STATIC_RESOURCES = true;

/**
 * Default flag for bootstrap usage
 */
const DEFAULT_USE_BOOTSTRAP = true;

/**
 * Default flag for using JSONP
 */
const DEFAULT_USE_JSONP = true;

/**
 * Default flag for using polling
 */
const DEFAULT_USE_POLLING = true;

// some sensible limits
const MIN_POLL_TIME = 1000;
const MAX_POLL_TIME = Number.MAX_SAFE_INTEGER;

// some sensible limits
const MIN_POLL_TIME_VARIATION = 0;
const MAX_POLL_TIME_VARIATION = 0.5;

/**
 * Clips the value to the given range
 *
 * @param aValue - value to clip
 * @param aMin - min value
 * @param aMax - max value
 */
function _clip(aValue: number, aMin: number, aMax: number): number {
  return aValue < aMin ? aMin : aValue > aMax ? aMax : aValue;
}

export const DEFAULT_HTTP_RESOURCE_OPTIONS: HttpResourceOptions = {
  pollTimeVariation: DEFAULT_POLL_TIME_VARIATION,
  pollTime: DEFAULT_POLL_TIME,
  retries: DEFAULT_RETRIES,
  useLocalStorage: DEFAULT_USE_LOCAL_STORAGE,
  useBootstrap: DEFAULT_USE_BOOTSTRAP,
  useStaticResources: DEFAULT_USE_STATIC_RESOURCES,
  useJsonP: DEFAULT_USE_JSONP,
  usePolling: DEFAULT_USE_POLLING,
  useApi: DEFAULT_USE_API
};

/**
 * Creates a cache that will generated lazily
 */
function _lazyCache<V>() {
  return lazyGenerator<CacheAccessor<V>>(createLruCache);
}

/** Maps from URL to connection to that URL */
const _publicUrlStringCache = _lazyCache<Observable<string>>();
const _publicUrlJsonCache = _lazyCache<Observable<JSONValue>>();

/** Maps from URL to connection to that URL */
const _privateUrlStringCache = _lazyCache<Observable<string>>();
const _privateUrlJsonCache = _lazyCache<Observable<JSONValue>>();

/**
 * Creates a timer that fires at a randomly chosen interval as soon as subscribed to it
 *
 * @param aOptions - the resource configuration options
 * @returns the observable
 */
function _createTimer(aOptions?: HttpResourceOptions): Observable<any> {
  // the options
  const options: HttpResourceOptions =
    aOptions || DEFAULT_HTTP_RESOURCE_OPTIONS;
  // check if we need a timer at all
  if (!options.usePolling) {
    // nothing to do
    return of('initial', asyncScheduler);
  }
  // timeout handling
  const pollTime = _clip(
    options.pollTime || DEFAULT_POLL_TIME,
    MIN_POLL_TIME,
    MAX_POLL_TIME
  );
  const pollTimeVariation = _clip(
    options.pollTimeVariation || DEFAULT_POLL_TIME_VARIATION,
    MIN_POLL_TIME_VARIATION,
    MAX_POLL_TIME_VARIATION
  );
  // check bounds for polling time
  const pollTimeInterval = pollTime * pollTimeVariation;
  const pollTimeMin = _clip(pollTime - pollTimeInterval, 0, pollTime);
  const pollTimeMax =
    pollTime + _clip(pollTimeInterval, 0, MAX_POLL_TIME - pollTime);
  // construct the trigger
  return defer(() => {
    // select the interval
    const selectedInterval = random(pollTimeMin, pollTimeMax);
    // construct the timer
    return rxPipe(timer(0, selectedInterval), timeInterval());
  });
}

// source callback
const _addDebugSource = dbgSourceCallback(LOGGER);

/**
 * Add debugging information to the result
 *
 * @param aUrl - the URL
 * @param aResult - the result
 */
function _addDebug(aUrl: string, aResult: JSONObject): JSONObject {
  // add source info
  return dbgAdd((aDbg: any) => {
    // dispatch
    _addDebugSource(aDbg);
    // add url
    aDbg.url = aUrl;
  }, aResult);
}

function _createJsonResource(
  aURL: string,
  aHttpService: HttpService,
  aWithCredentials: boolean,
  aTrigger: Observable<any>,
  aOptions: HttpResourceOptions,
  aLogger?: Logger
): Observable<JSONValue> {
  // logger
  const logger = aLogger || NOOP_LOGGER;
  // setup the options
  const opts: HttpOptions = {
    withCredentials: aWithCredentials
  };
  // log this
  logger.info('createJsonResource', opts);
  // add extra debug info
  const _addDebugUrl = partialLeft(_addDebug, aURL);
  // send the request
  return rxPipe(
    // actualy make the request
    _sendJsonRequest(aURL, opts, aTrigger, aHttpService, logger),
    // make sure to not load resources twice
    opDeepDistinctUntilChanged,
    // update
    map(_addDebugUrl),
    // cache the last value
    opCacheLast
  );
}

function _createStringResource(
  aURL: string,
  aHttpService: HttpService,
  aWithCredentials: boolean,
  aTrigger: Observable<any>,
  aOptions: HttpResourceOptions,
  aLogger?: Logger
): Observable<string> {
  // logger
  const logger = aLogger || NOOP_LOGGER;
  // setup the options
  const opts: HttpOptions = {
    withCredentials: aWithCredentials
  };
  // log this
  logger.info('createStringResource', aTrigger, opts);
  // make the requests
  return rxPipe(
    // make the actual text request
    _sendTextRequest(aURL, opts, aTrigger, aHttpService, logger),
    // make sure to not load resources twice
    opCacheLast
  );
}

/**
 * Represents an HTTP request, potentially made via the cache
 *
 * @param aURL -
 * @param aHttpService
 * @param aWithCredentials -
 * @param aTrigger -
 * @param aOptions -
 * @param aLogger
 */
function _getStringResource(
  aURL: string,
  aHttpService: HttpService,
  aWithCredentials: boolean,
  aTrigger: Observable<any>,
  aOptions: HttpResourceOptions,
  aLogger?: Logger
): Observable<string> {
  // logger
  const logger = aLogger || NOOP_LOGGER;
  // log this
  const tStart = Date.now();
  // select the cache
  const cache = aWithCredentials
    ? _privateUrlStringCache
    : _publicUrlStringCache;
  // lookup in the cache
  return rxPipe(
    cache()(
      aURL,
      (key, log) =>
        _createStringResource(
          key,
          aHttpService,
          aWithCredentials,
          aTrigger,
          aOptions,
          log
        ),
      logger
    ),
    tap(() =>
      logger.info('getStringResource', aURL, Date.now() - tStart, '[ms].')
    )
  );
}

function _getJsonResource(
  aURL: string,
  aHttpService: HttpService,
  aWithCredentials: boolean,
  aTrigger: Observable<any>,
  aOptions?: HttpResourceOptions,
  aLogger?: Logger
): Observable<JSONValue> {
  // logger
  const logger = aLogger || NOOP_LOGGER;
  // log this
  const tStart = Date.now();
  // use the correct cache
  const cache = aWithCredentials ? _privateUrlJsonCache : _publicUrlJsonCache;
  // lookup in the cache
  return rxPipe(
    cache()(
      aURL,
      (key, log) =>
        _createJsonResource(
          key,
          aHttpService,
          aWithCredentials,
          aTrigger,
          aOptions,
          log
        ),
      logger
    ),
    tap(() =>
      logger.info('getJsonResource', aURL, Date.now() - tStart, '[ms].')
    )
  );
}

export {
  _getStringResource as httpGetStringResource,
  _getJsonResource as httpGetJsonResource,
  _createTimer as httpCreateTimer,
  _sendRequest as sendRequest,
  _sendTextRequest as sendTextRequest,
  _sendJsonRequest as sendJsonRequest
};
