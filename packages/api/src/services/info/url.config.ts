/** Copyright IBM Corp. 2018 */
import { HubInfo } from './../hub-info/hub-info';

/**
 * Name of the 'rel' attribute of a link element used to configure the API URL
 */
export const WCH_CONFIG_API_URL = 'wch-config-api-url';

/**
 * Name of the 'rel' attribute of a link element used to configure the delivery URL
 */
export const WCH_CONFIG_RESOURCE_URL = 'wch-config-resource-url';

/**
 * Name of the 'rel' attribute of a link element used to configure the base URL
 */
export const WCH_CONFIG_BASE_URL = 'wch-config-base-url';

/**
 * Exposes the URL configuration to the client.
 *
 * See {@link HubInfoConfig}
 */
export interface UrlConfig extends HubInfo {
  /** The base URL used to access WCH APIs. The URL ends with a slash. */
  readonly apiUrl: URL;

  /** The base URL used to access WCH delivery resources. The URL ends with a slash. */
  readonly resourceUrl: URL;

  /** True if the system runs in preview mode, else false. */
  readonly isPreviewMode: boolean;

  /**
   * The base URL of the host the application is running on. This can be undefined if the
   * application is rendered standalone as part of the universal renderer. This prefix will be
   * preserved when generating and recognizing URLs.
   *
   * In many cases it is identical to the resourceUrl, but it will e.g. be different for applications
   * that are not hosted on WCH.
   */
  readonly baseUrl?: URL;
}
