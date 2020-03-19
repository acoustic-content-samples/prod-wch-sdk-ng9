import { LoggerService } from '@acoustic-content-sdk/api';
import { WindowType } from '@acoustic-content-sdk/component-api';
import {
  ACOUSTIC_TOKEN_LOGGER_SERVICE,
  ACOUSTIC_TOKEN_WINDOW
} from '@acoustic-content-sdk/ng-api';
import {
  boxLoggerService,
  createLruCache,
  createSingleSubject,
  pluckProperty,
  rxNext,
  rxPipe
} from '@acoustic-content-sdk/utils';
import { DOCUMENT } from '@angular/common';
import { Inject, Injectable, OnDestroy, Optional } from '@angular/core';
import { MonoTypeOperatorFunction } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { map } from 'rxjs/operators';

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
  get: (aBundle: string) => Promise<any>;

  constructor(
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
    const bundleCache = createLruCache<Promise<Record<string, any>>>(
      BUNDLE_TIMEOUT,
      undefined,
      logger
    );

    function requireModule(aName: string): any {
      logger.info('requireModule', aName);

      return undefined;
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
     * Loads a bundle from an UMD bundle
     *
     * @param aUrl - URL to the main entry of the bundle
     * @returns the exported symbols
     */
    const loadBundle = (aUrl: string): Promise<Record<string, any>> =>
      rxPipe(
        ajax({ url: aUrl, responseType: 'text' }),
        log(aUrl),
        map(decodeModule)
      ).toPromise();

    /**
     * Returns the bundle from a cache
     *
     * @param aUrl - the URL to the bundle
     * @returns the promise
     */
    const getBundle = (aUrl: string): Promise<Record<string, any>> =>
      bundleCache(aUrl, loadBundle);

    /**
     * Returns the exported symbol from the bundle
     */
    function getExport(aBundle: string): Promise<any> {
      // split
      const [url, name = DEFAULT_BUNDLE_EXPORT] = aBundle.split('#');
      // returns the export
      return getBundle(url).then(pluckProperty(name));
    }

    /**
     * Assign the getter
     */
    this.get = getExport;
  }

  ngOnDestroy() {
    this.done$.next();
  }
}
