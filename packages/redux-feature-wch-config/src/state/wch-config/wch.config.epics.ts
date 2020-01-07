import { Logger } from '@acoustic-content-sdk/api';
import { WchConfig } from '@acoustic-content-sdk/edit-api';
import { ACTION_INIT } from '@acoustic-content-sdk/redux-actions';
import {
  createPreviewAwareLoader,
  LoaderType
} from '@acoustic-content-sdk/redux-feature-load';
import { ofInitFeature } from '@acoustic-content-sdk/redux-store';
import { FetchText } from '@acoustic-content-sdk/rest-api';
import {
  isNotNil,
  isString,
  jsonParse,
  parseURL,
  reduceForIn,
  rxPipe
} from '@acoustic-content-sdk/utils';
import { combineEpics, Epic, ofType } from 'redux-observable';
import { map, mapTo } from 'rxjs/operators';

import {
  ACTION_LOAD_WCH_CONFIG,
  LoadWchConfigAction,
  loadWchConfigAction,
  setWchConfigAction
} from './wch.config.actions';
import { WCH_CONFIG_FEATURE } from './wch.config.id';

export interface ConfigDependencies {
  fetchText: FetchText;
  logger: Logger;
}

// build the URL
const RENDERING_CONFIG_URL = 'delivery/v1/rendering/config';

/**
 * Tests if a value is a valid URL
 *
 * @param aValue - the value
 * @returns the URL
 */
function isURL(aValue: any): aValue is URL {
  return isNotNil(aValue) && isString(aValue.href);
}

/**
 * Makes sure to provide a correct URL object
 *
 * @param aConfig - the wch config to rewrite
 * @returns the rewritten config
 */
function fixWchConfig(aConfig: WchConfig): WchConfig {
  // rewrite
  return reduceForIn(
    aConfig,
    (aDst: any, value: any, key: string) => {
      // update the target
      if (isURL(value)) {
        aDst[key] = parseURL(value.href);
      }
      return aDst;
    },
    {}
  );
}

/**
 * Loads the configuration
 */
const loadConfigEpic: Epic = (
  actions$,
  state$,
  { fetchText, logger }: ConfigDependencies
) => {
  // loader
  const loader: LoaderType = (id) =>
    rxPipe(
      /**
       * load the resource right away
       */
      fetchText(id),
      // parse
      map<string, WchConfig>(jsonParse),
      // fix
      map(fixWchConfig),
      // dispatch the toggles to the store
      map(setWchConfigAction)
    );
  // our loader
  const opLoader = createPreviewAwareLoader(state$, loader, logger);

  return rxPipe(
    actions$,
    // load
    ofType<LoadWchConfigAction>(ACTION_LOAD_WCH_CONFIG),
    // map to the config
    mapTo(RENDERING_CONFIG_URL),
    // load
    opLoader
  );
};

/**
 * Initializes the configuration
 */
const initConfigEpic: Epic = (actions$) =>
  rxPipe(actions$, ofType(ACTION_INIT), map(loadWchConfigAction));

/**
 * Initializes the configuration as a feature epic
 */
const initFeatureConfigEpic: Epic = (actions$) =>
  rxPipe(actions$, ofInitFeature(WCH_CONFIG_FEATURE), map(loadWchConfigAction));

export const wchConfigEpic: Epic = combineEpics(
  initConfigEpic,
  initFeatureConfigEpic,
  loadConfigEpic
);
