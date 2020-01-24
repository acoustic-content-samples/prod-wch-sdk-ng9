/** Copyright IBM Corp. 2017 */
import { LoggerFactory } from '@acoustic-content-sdk/api';
import { isDevMode } from '@acoustic-content-sdk/react-utils';
import {
  forEach,
  fromObservableOrT,
  getProperty,
  isNotNil,
  isString,
  isStringArray,
  jsonParse,
  mapArray,
  opDeepDistinctUntilChanged,
  opShareLast,
  rxPipe,
  UNDEFINED_TYPE
} from '@acoustic-content-sdk/utils';
import { Level, Log } from 'ng2-logger/browser';
import { combineLatest, EMPTY, interval, Subject, Unsubscribable } from 'rxjs';
import { map, pluck, startWith, takeUntil } from 'rxjs/operators';

import {
  ReactLoggerConfig,
  ReactLoggerConfigService
} from '../config/wch.logger.config';

const KEY_ONLY_MODULES = 'ReactLoggerFactory.onlyModules';
const KEY_ONLY_LEVEL = 'ReactLoggerFactory.onlyLevel';

// logs for prod mode
const _PROD_MODE_LOGGING: string[] = ['ERROR'];

// logs for dev mode
const _DEV_MODE_LOGGING: string[] = undefined;

declare type NameValuePairs = Record<string, string[]>;

/**
 * Enable logging levels
 *
 * @param aLevels - the levels
 * @param aModules - the modules
 */
const internalEnableLevels = (aLevels: string[], aModules: string[]) => {
  // tests
  const levelsIsArray = isStringArray(aLevels);
  const modulesIsArray = isStringArray(aModules);
  // check if we have config
  if (levelsIsArray || modulesIsArray) {
    // log this
    console.log('enable logging for', 'levels', aLevels, 'modules', aModules);
    // enable modules
    if (modulesIsArray) {
      Log.onlyModules(...aModules);
    }
    // enable levels
    if (levelsIsArray) {
      Log.onlyLevel(
        ...mapArray(aLevels, (l) => Level[l.toUpperCase()] || Level.__NOTHING)
      );
    }
  }
};

/**
 * Safely parses a string
 *
 * @param aValue - the value
 * @returns the string array
 */
const internalParseStringToStringArray = (
  aValue?: string
): string[] | undefined => {
  // try to parse the value
  if (isString(aValue)) {
    try {
      return jsonParse<string[]>(aValue);
    } catch (error) {
      // nothing
    }
  }
  // nothing to return
  return undefined;
};

function _addKey(aKey: string, aValue: string[], aConfig: NameValuePairs) {
  if (isNotNil(aValue)) {
    aConfig[aKey] = aValue;
  }
}

function _addKeyFromLocalStorage(aKey: string, aConfig: NameValuePairs) {
  _addKey(
    aKey,
    internalParseStringToStringArray(localStorage.getItem(aKey)),
    aConfig
  );
}

function _getDefaults(aConfig: NameValuePairs) {
  aConfig[KEY_ONLY_LEVEL] = isDevMode()
    ? _DEV_MODE_LOGGING
    : _PROD_MODE_LOGGING;
}

function _getLocaleStorage(aConfig: NameValuePairs) {
  // check if we have a config
  if (typeof localStorage !== UNDEFINED_TYPE) {
    // decode the keys
    _addKeyFromLocalStorage(KEY_ONLY_LEVEL, aConfig);
    _addKeyFromLocalStorage(KEY_ONLY_MODULES, aConfig);
  }
}

/**
 * Decodes the cookies
 */
function _getCookies(aConfig: NameValuePairs) {
  if (
    typeof document !== UNDEFINED_TYPE &&
    document.cookie &&
    // tslint:disable-next-line:triple-equals
    document.cookie != ''
  ) {
    // decompoose
    forEach(document.cookie.split(';'), (s) => {
      // further split
      const idx = s.indexOf('=');
      if (idx > 0) {
        // split
        const key = s.substr(0, idx);
        const value = s.substr(idx + 1);
        _addKey(
          decodeURIComponent(key).trim(),
          internalParseStringToStringArray(decodeURIComponent(value).trim()),
          aConfig
        );
      }
    });
  }
}

function _getConfig(aConfig: NameValuePairs): NameValuePairs {
  _getDefaults(aConfig);
  _getLocaleStorage(aConfig);
  _getCookies(aConfig);
  // ok
  return aConfig;
}

/**
 * Returns the logger config by periodically checking for the actual configuration
 *
 * @param aTimeout - the poll timeout
 * @returns the config
 */
function _defaultReactLoggerConfig(aTimeout: number): ReactLoggerConfig {
  // the trigger
  const trigger$ = aTimeout > 0 ? interval(aTimeout) : EMPTY;
  // config stream
  const config$ = rxPipe(
    trigger$,
    startWith(0),
    map(() => _getConfig({})),
    opDeepDistinctUntilChanged,
    opShareLast
  );
  // the modules
  const onlyModules$ = rxPipe(
    config$,
    pluck<NameValuePairs, string[]>(KEY_ONLY_MODULES),
    opDeepDistinctUntilChanged
  );
  // the levels
  const onlyLevels$ = rxPipe(
    config$,
    pluck<NameValuePairs, string[]>(KEY_ONLY_LEVEL),
    opDeepDistinctUntilChanged
  );
  // return the config
  return {
    onlyModules: onlyModules$,
    onlyLevel: onlyLevels$
  };
}

function getPropertyFallback<T, K extends keyof T>(
  aValue1: T,
  aValue2: T,
  aKey: K
): T[K] {
  return getProperty(aValue1, aKey, getProperty(aValue2, aKey));
}

/*
 * Implementation of the LoggerFactory that dispatches to React
 */
export class ReactLoggerFactory implements LoggerFactory, Unsubscribable {
  // set the creation method
  create = Log.create;

  // done trigger
  private readonly done$ = new Subject<any>();

  constructor(aConfig?: ReactLoggerConfigService) {
    // create a default
    const timeout = getProperty(aConfig, 'pollTime', 5000);
    // default config
    const defaultConfig = _defaultReactLoggerConfig(timeout);
    // map
    const onlyModules$ = fromObservableOrT(
      getPropertyFallback(aConfig, defaultConfig, 'onlyModules')
    );
    const onlyLevel$ = fromObservableOrT(
      getPropertyFallback(aConfig, defaultConfig, 'onlyLevel')
    );
    // enable
    const all$ = rxPipe(
      combineLatest(onlyLevel$, onlyModules$),
      map(([levels, modules]) => internalEnableLevels(levels, modules)),
      takeUntil(this.done$)
    );
    // start logging
    all$.subscribe();
  }

  unsubscribe() {
    this.done$.next();
  }
}
