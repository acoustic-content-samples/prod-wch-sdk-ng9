import { LoggerService } from '@acoustic-content-sdk/api';
import { createCompiler } from '@acoustic-content-sdk/hbs-tooling';
import { HandlebarsCompiler } from '@acoustic-content-sdk/redux-feature-handlebars';
import {
  createReduxRootStore,
  ReduxRootStore
} from '@acoustic-content-sdk/redux-store';
import { FetchText } from '@acoustic-content-sdk/rest-api';
import { NOOP_LOGGER_SERVICE } from '@acoustic-content-sdk/utils';

import { createFetchTextOnFolder } from '../fetch-text/fetch.text';

export function createReduxRootStoreOnFolder(
  aFolder: string,
  aLogSvc?: LoggerService
): ReduxRootStore {
  // construct the services
  const fetchText: FetchText = createFetchTextOnFolder(aFolder);
  const logSvc: LoggerService = aLogSvc || NOOP_LOGGER_SERVICE;
  const templateCompiler: HandlebarsCompiler = createCompiler();
  // create the store
  return createReduxRootStore({ fetchText, logSvc, templateCompiler });
}
