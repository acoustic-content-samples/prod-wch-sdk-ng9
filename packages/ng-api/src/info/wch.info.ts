import { HubInfoUrlProvider, UrlConfig } from '@acoustic-content-sdk/api';
import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';

/**
 * Injection token for the url config
 */
export const ACOUSTIC_TOKEN_URL_CONFIG = new InjectionToken<Observable<UrlConfig>>(
  'ACOUSTIC_TOKEN_URL_CONFIG'
);

/**
 * URL to access the API layer
 *
 * Naming of this field according to the field in the rendering context
 *
 * @example 'https://content-us-1.content-cms.com/api/345563cf-a83c-40e5-a065-1d6ff36b05c1'
 * @example 'https://content-us-1.content-cms.com/api/345563cf-a83c-40e5-a065-1d6ff36b05c1/dxsites/mysite'
 */
export const ACOUSTIC_TOKEN_API_URL = new InjectionToken<HubInfoUrlProvider>(
  'ACOUSTIC_TOKEN_API_URL'
);

/**
 * URL to access the delivery
 *
 * Naming of this field according to the field in the rendering context
 *
 * @example 'https://content-us-1.content-cms.com/345563cf-a83c-40e5-a065-1d6ff36b05c1'
 * @example 'https://content-us-1.content-cms.com/345563cf-a83c-40e5-a065-1d6ff36b05c1/dxsites/mysite'
 */
export const ACOUSTIC_TOKEN_RESOURCE_URL = new InjectionToken<HubInfoUrlProvider>(
  'ACOUSTIC_TOKEN_RESOURCE_URL'
);

/**
 * URL that represents the base URL of the path based routing of the application. This prefix will be
 * preserved when generating and recognizing URLs. If this property is not configured, then it will be decoded
 * from the window location.
 *
 * @example 'https://content-us-1.content-cms.com/345563cf-a83c-40e5-a065-1d6ff36b05c1'
 * @example 'https://content-us-1.content-cms.com/345563cf-a83c-40e5-a065-1d6ff36b05c1/dxsites/mysite'
 * @example 'https://my.external.example.com/'
 */
export const ACOUSTIC_TOKEN_BASE_URL = new InjectionToken<HubInfoUrlProvider>(
  'ACOUSTIC_TOKEN_BASE_URL'
);
