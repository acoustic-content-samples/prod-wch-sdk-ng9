import { LoggerService } from '@acoustic-content-sdk/api';
import { WindowType } from '@acoustic-content-sdk/component-api';
import { ReduxRootStore, STORE_ID } from '@acoustic-content-sdk/redux-store';
import { isNil, boxLoggerService } from '@acoustic-content-sdk/utils';

const LOGGER = 'WchComponentParentFrameReduxStoreModule';

export function getStoreFromParent(
  aHostWindow: WindowType,
  aLogSvc: LoggerService
): ReduxRootStore {
  const logSvc = boxLoggerService(aLogSvc);
  const logger = logSvc.get(LOGGER);
  // get parent
  const rootStore: ReduxRootStore = aHostWindow[STORE_ID];
  // warn if not there
  if (isNil(rootStore)) {
    // error message
    const msg = `Unable to access [${STORE_ID}] from parent.`;
    // log this
    logger.warn(msg);
  }
  // always return the store
  return rootStore;
}
