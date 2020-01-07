import { HubInfoUrlProvider, UrlConfig } from '@acoustic-content-sdk/api';
import { Observable } from 'rxjs';

import { createReactContext } from '../utils/context';

/**
 * Injection token for the url config
 */
export const WCH_CONTEXT_URL_CONFIG = createReactContext<Observable<UrlConfig>>(
  'WCH_CONTEXT_URL_CONFIG'
);

/**
 * URL to access the API layer
 *
 * Naming of this field according to the field in the rendering context
 *
 * @example 'https://my.digitalexperience.ibm.com/api/345563cf-a83c-40e5-a065-1d6ff36b05c1'
 * @example 'https://my.digitalexperience.ibm.com/api/345563cf-a83c-40e5-a065-1d6ff36b05c1/dxsites/mysite'
 */
export const WCH_CONTEXT_API_URL = createReactContext<HubInfoUrlProvider>(
  'WCH_CONTEXT_API_URL'
);

/**
 * URL to access the delivery
 *
 * Naming of this field according to the field in the rendering context
 *
 * @example 'https://my.digitalexperience.ibm.com/345563cf-a83c-40e5-a065-1d6ff36b05c1'
 * @example 'https://my.digitalexperience.ibm.com/345563cf-a83c-40e5-a065-1d6ff36b05c1/dxsites/mysite'
 */
export const WCH_CONTEXT_RESOURCE_URL = createReactContext<HubInfoUrlProvider>(
  'WCH_CONTEXT_RESOURCE_URL'
);

/**
 * URL that represents the base URL of the path based routing of the application. This prefix will be
 * preserved when generating and recognizing URLs. If this property is not configured, then it will be decoded
 * from the window location.
 *
 * @example 'https://my.digitalexperience.ibm.com/345563cf-a83c-40e5-a065-1d6ff36b05c1'
 * @example 'https://my.digitalexperience.ibm.com/345563cf-a83c-40e5-a065-1d6ff36b05c1/dxsites/mysite'
 * @example 'https://my.external.example.com/'
 */
export const WCH_CONTEXT_BASE_URL = createReactContext<HubInfoUrlProvider>(
  'WCH_CONTEXT_BASE_URL'
);
