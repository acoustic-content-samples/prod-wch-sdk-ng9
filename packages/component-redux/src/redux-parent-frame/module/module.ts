import { LoggerService } from '@acoustic-content-sdk/api';
import { WindowType } from '@acoustic-content-sdk/component-api';
import { ReduxRootStore, STORE_ID } from '@acoustic-content-sdk/redux-store';
import {
  boxLoggerService,
  isNil,
  pluckProperty
} from '@acoustic-content-sdk/utils';

const LOGGER = 'WchComponentParentFrameReduxStoreModule';

/**
 * Safely select the root from the parent ID
 */
const selectParent = pluckProperty<any, typeof STORE_ID>(STORE_ID);

export function getStoreFromParent(
  aHostWindow: WindowType,
  aLogSvc?: LoggerService
): ReduxRootStore {
  // some logging
  const logSvc = boxLoggerService(aLogSvc);
  const logger = logSvc.get(LOGGER);
  // get parent
  const rootStore: ReduxRootStore = selectParent(aHostWindow);
  // warn if not there
  if (isNil(rootStore)) {
    // error message
    const msg = `Unable to access [${STORE_ID}] from parent [${aHostWindow}].`;
    // log this
    logger.warn(msg);
  }
  // always return the store
  return rootStore;
}
