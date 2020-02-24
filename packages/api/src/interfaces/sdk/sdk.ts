/* Copyright IBM Corp. 2018 */
import { LoggerService } from './../../services/logging/logger.service';
import { WchSdkRouter } from './router/router';
import { WchSdkSearch } from './search/search';
import { WchSdkVersion } from './version/version';

export const ACOUSTIC_SDK_MODULE_NAME = 'WchSdk';

export interface WchSdk {

  /**
   * Refreshes the rendering context and all JSON data that is currently displayed
   */
  refresh: () => void;

  readonly router: WchSdkRouter;

  /**
   * Returns version information from the SDK
   *
   * @returns the version
   */
  readonly version: WchSdkVersion;

  /**
   * Returns a factory to access loggers
   */
  readonly logger?: LoggerService;

  /**
   * Optional search service
   */
  readonly search?: WchSdkSearch;
}
