import { LoggerService } from '@acoustic-content-sdk/api';
import { createCompiler } from '@acoustic-content-sdk/hbs-tooling';
import {
  createReduxRootStore,
  ReduxRootStore
} from '@acoustic-content-sdk/redux-store';
import { FetchText } from '@acoustic-content-sdk/rest-api';
import { boxLoggerService } from '@acoustic-content-sdk/utils';
import { createFetchTextOnFolder } from '../fetch-text/fetch.text';

export function createReduxRootStoreOnFolder(
  aFolder: string,
  aLogSvc?: LoggerService
): ReduxRootStore {
  // construct the services
  const logSvc: LoggerService = boxLoggerService(aLogSvc);
  const fetchText: FetchText = createFetchTextOnFolder(aFolder, logSvc);
  const templateCompiler = createCompiler();
  // create the store
  return createReduxRootStore({ fetchText, logSvc, templateCompiler });
}
