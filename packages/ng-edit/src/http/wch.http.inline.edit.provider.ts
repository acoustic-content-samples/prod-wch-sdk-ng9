import {
  ActivePageV2,
  LoggerService,
  StaticHubInfoUrlProvider,
  UrlConfig
} from '@acoustic-content-sdk/api';
import {
  WCH_ACTIVE_PAGE_MODULE,
  WCH_CONFIG_MODULE,
  WCH_INFO_MODULE,
  WCH_LOGGER_MODULE,
  WchConfig,
  WchInlineEditProviderV2,
  WchInlineEditRequireMapV2,
  WchInlineEditRequireV2
} from '@acoustic-content-sdk/edit-api';
import { DEFAULT_INLINE_EDIT_URL } from '@acoustic-content-sdk/ng-edit-api';
import {
  assertFromFunction,
  isFunction,
  NOOP_LOGGER_SERVICE,
  opDistinctUntilChanged,
  opFilterNotNil,
  rxNext,
  rxPipe,
  urlFromProvider,
  urlToString
} from '@acoustic-content-sdk/utils';
import { HttpClient } from '@angular/common/http';
import { MonoTypeOperatorFunction, Observable } from 'rxjs';
import { first, map, switchMap, take } from 'rxjs/operators';

import { replaceWithTokens } from '../utils/replacement';

const LOGGER = 'WchHttpInlineEditProviderV2';

/**
 * Resolves a relative URL against a base URL
 *
 * @param base      the base URL
 * @param relative  the relative URL
 *
 * @return the result
 */
function _getAbsoluteUrl(base: string, relative: string): string {
  // remove everything after #
  const hashPosition = base.indexOf('#');
  if (hashPosition > 0) {
    base = base.slice(0, hashPosition);
  }

  // the rest of the function is taken from http://stackoverflow.com/a/14780463
  // http://stackoverflow.com/a/25833886 - this doesn't work in cordova
  // http://stackoverflow.com/a/14781678 - this doesn't work in cordova
  const stack = base.split('/');
  const parts = relative.split('/');
  stack.pop(); // remove current file name (or empty string)
  // (omit if "base" is the current folder without trailing slash)
  for (let i = 0; i < parts.length; i++) {
    if (parts[i] === '..') {
      stack.pop();
    } else if (parts[i] !== '.') {
      stack.push(parts[i]);
    }
  }
  return stack.join('/');
}

/**
 * Constructs an http inline edit provider by loading it from the configured authoring host
 *
 * @param aHttpClient
 * @param aUrlConfig$
 * @param aWchConfig$
 * @param aActivePage
 * @param aInlineEditUrl
 * @param aLogSvc
 */
export function createWchHttpInlineEditProviderV2(
  aHttpClient: HttpClient,
  aUrlConfig$: Observable<UrlConfig>,
  aWchConfig$: Observable<WchConfig>,
  aActivePage: ActivePageV2,
  aInlineEditUrl?: StaticHubInfoUrlProvider,
  aLogSvc?: LoggerService
): Observable<WchInlineEditProviderV2> {
  // global registrations
  const global = {
    exports: {}
  };

  // logger
  const logSvc = aLogSvc || NOOP_LOGGER_SERVICE;

  const logger = logSvc.get(LOGGER);

  const log: <T>(value: string) => MonoTypeOperatorFunction<T> = rxNext(logger);

  // the inline edit URL
  const inlineEditUrl: string =
    urlToString(urlFromProvider(aInlineEditUrl)) || DEFAULT_INLINE_EDIT_URL;

  // construct the script URL
  const inlineEditUrl$ = rxPipe(
    aWchConfig$,
    map((config) => replaceWithTokens(inlineEditUrl, config)),
    log('inlineEditUrl'),
    opDistinctUntilChanged
  );

  // load text via http
  const httpText = () => (url$: Observable<string>) =>
    rxPipe(
      url$,
      switchMap((url) =>
        // make sure to make the request without credentials, else it will fail
        aHttpClient.get(url, {
          responseType: 'text',
          withCredentials: false
        })
      )
    );

  /**
   * Loads a file
   *
   * @param aRelUrl   the relative URL to resolve
   * @return observable of the result
   */
  function _loadFile(aRelUrl: string): Promise<string> {
    // use the HTTP service to load the file
    return rxPipe(
      inlineEditUrl$,
      map((base) => _getAbsoluteUrl(base, aRelUrl)),
      log('onLoadingModule'),
      httpText(),
      take(1)
    ).toPromise();
  }

  const urlConfigPromise$ = rxPipe(
    aUrlConfig$,
    opFilterNotNil,
    first()
  ).toPromise();
  const wchConfigPromise$ = rxPipe(
    aWchConfig$,
    opFilterNotNil,
    first()
  ).toPromise();

  // the available modules
  const modules: WchInlineEditRequireMapV2 = {
    [WCH_LOGGER_MODULE]: Promise.resolve(logSvc),
    [WCH_INFO_MODULE]: urlConfigPromise$,
    [WCH_ACTIVE_PAGE_MODULE]: Promise.resolve(aActivePage),
    [WCH_CONFIG_MODULE]: wchConfigPromise$
  };

  /**
   * Basic require support for edit library
   *
   * @param aModule   the module
   * @return the value
   */
  const moduleRequire: WchInlineEditRequireV2 = (aModule: string) => {
    // log the require call
    logger.info('require', aModule);
    // assert
    return assertFromFunction(aModule, modules, _loadFile);
  };

  // load the module, make sure it does not pollute the global namespace
  return rxPipe(
    inlineEditUrl$,
    httpText(),
    map((code) =>
      // this path exists only for testing purposes
      isFunction(code)
        ? code
        : // normal path, we construct the function from the loaded string
          new Function(
            'self',
            'module',
            'require',
            `'use strict';return ${code}`
          )
    ),
    map(
      (f) =>
        f.call(global, global, global, moduleRequire) as WchInlineEditProviderV2
    ),
    log('moduleLoaded')
  );
}
