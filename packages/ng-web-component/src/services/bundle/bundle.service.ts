import { LoggerService } from '@acoustic-content-sdk/api';
import { WindowType } from '@acoustic-content-sdk/component-api';
import {
  ACOUSTIC_TOKEN_LOGGER_SERVICE,
  ACOUSTIC_TOKEN_WINDOW
} from '@acoustic-content-sdk/ng-api';
import { ACOUSTIC_TOKEN_FETCH_TEXT } from '@acoustic-content-sdk/ng-rest-api';
import { FetchText } from '@acoustic-content-sdk/rest-api';
import {
  boxLoggerService,
  createLruCache,
  createSingleSubject,
  hashRandomClassName,
  isAbsoluteURL,
  isNil,
  kebabCase,
  Maybe,
  pluckProperty,
  rxNext,
  rxPipe
} from '@acoustic-content-sdk/utils';
import { DOCUMENT } from '@angular/common';
import { Inject, Injectable, OnDestroy, Optional } from '@angular/core';
import { MonoTypeOperatorFunction, Observable } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { map, pluck } from 'rxjs/operators';

import { AcNgContextService } from '../context/context.service';
import { RX_MODULE } from './rx.module';
import { RX_OP_MODULE } from './rx.operators.module';
import { UTILS_MODULE } from './utils.module';

const LOGGER = 'AcNgBundleService';

const BUNDLE_TIMEOUT = 60 * 60 * 1000;

const DEFAULT_BUNDLE_EXPORT = 'default';

@Injectable()
export class AcNgBundleService implements OnDestroy {
  // destroy callback
  private readonly done$ = createSingleSubject<void>();

  /**
   * Returns the named bundle export
   */
  get: (aBundle: string) => Promise<string>;

  constructor(
    aContextService: AcNgContextService,
    @Inject(ACOUSTIC_TOKEN_FETCH_TEXT)
    aFetchText: FetchText,
    @Inject(ACOUSTIC_TOKEN_WINDOW)
    aWnd: WindowType,
    @Inject(DOCUMENT)
    aDocument: any,
    @Optional()
    @Inject(ACOUSTIC_TOKEN_LOGGER_SERVICE)
    aLogSvc?: LoggerService
  ) {
    // logger
    const logSvc = boxLoggerService(aLogSvc);
    const logger = logSvc.get(LOGGER);

    // logging
    const log: <T>(...v: any[]) => MonoTypeOperatorFunction<T> = rxNext(logger);

    /**
     * Cache of loaded bundles
     */
    const bundleCache = createLruCache<
      Promise<Record<string, CustomElementConstructor>>
    >(BUNDLE_TIMEOUT, undefined, logger);

    /**
     * Cache of elements
     */
    const elementsCache = createLruCache<Promise<string>>(
      BUNDLE_TIMEOUT,
      undefined,
      logger
    );

    /**
     * Supported modules for require
     */
    const modules = {
      ...RX_MODULE,
      ...RX_OP_MODULE,
      ...UTILS_MODULE,
      ...aContextService.context
    };

    function requireModule(aName: string): any {
      // log this
      logger.info('require', aName);
      // dispatch
      return modules[aName];
    }

    /**
     * Given the UMD version of a module as a string, execute that code
     * and return a map of exported symbols
     *
     * @param aModule - the module content as a string
     * @returns the exported symbols
     */
    function decodeModule(aModule: string): Record<string, any> {
      // create the context
      const exports: any = {};
      const module: any = {};
      // execute the function
      const fct = new Function(
        'exports',
        'module',
        'require',
        'document',
        'window',
        aModule
      );
      fct(exports, module, requireModule, aDocument, aWnd);
      // use the exports
      return module.exports;
    }

    /**
     * Load the bundle from an absolute URL
     *
     * @param aUrl - the absolute URL
     *
     * @returns the observable
     */
    const loadBundleAbsolute = (aUrl: string): Observable<string> =>
      rxPipe(ajax({ url: aUrl, responseType: 'text' }), pluck('response'));

    /**
     * Load the bundle from a relative URL
     *
     * @param aUrl - the relative URL
     *
     * @returns the observable
     */
    const loadBundleRelative = aFetchText;

    /**
     * Loads the bundle string for an absolute or relative URL
     *
     * @param aUrl - the URL
     * @returns the observable
     */
    const loadBundleFromUrl = (aUrl: string): Observable<string> =>
      isAbsoluteURL(aUrl) ? loadBundleAbsolute(aUrl) : loadBundleRelative(aUrl);

    /**
     * Loads a bundle from an UMD bundle
     *
     * @param aUrl - URL to the main entry of the bundle
     * @returns the exported symbols
     */
    const loadBundle = (aUrl: string): Promise<Record<string, any>> =>
      rxPipe(loadBundleFromUrl(aUrl), log(aUrl), map(decodeModule)).toPromise();

    /**
     * Returns the bundle from a cache
     *
     * @param aUrl - the URL to the bundle
     * @returns the promise
     */
    const getBundle = (
      aUrl: string
    ): Promise<Record<string, CustomElementConstructor>> =>
      bundleCache(aUrl, loadBundle);

    /**
     * Returns the exported symbol from the bundle
     */
    function getExport(aBundle: string): Promise<CustomElementConstructor> {
      // split
      const [url, name = DEFAULT_BUNDLE_EXPORT] = aBundle.split('#');
      // returns the export
      return getBundle(url).then(pluckProperty(name));
    }

    /**
     * Registers a component with a new, random name
     *
     * @param aComponent - the component to register, may be undefined
     * @returns the new component name
     */
    function registerComponent(
      aComponent?: CustomElementConstructor
    ): Maybe<string> {
      // sanity check
      if (isNil(aComponent)) {
        return undefined;
      }
      // create a name
      const name = kebabCase(`ac-${hashRandomClassName()}`);
      // log this
      logger.info('Registering', name, aComponent);
      // register the component
      customElements.define(name, aComponent);
      return name;
    }

    /**
     * Contructs a new registration
     *
     * @param aBundle - the bundle identifier
     * @returns the name of the registered component
     */
    const createComponent = (aBundle: string): Promise<string> =>
      getExport(aBundle).then(registerComponent);

    /**
     * Returns a new registration
     */
    const getComponent = (aBundle: string): Promise<string> =>
      elementsCache(aBundle, createComponent);

    /**
     * Assign the getter
     */
    this.get = getComponent;
  }

  ngOnDestroy() {
    this.done$.next();
  }
}
