import { selectFeature } from '@acoustic-content-sdk/redux-store';

import { URL_CONFIG_FEATURE } from './url.config.id';
import { urlConfigReducer, UrlConfigState } from './url.config.state';

/**
 * Represents the {@link UrlConfigState | configuration} of the URLs to be used
 * when working with {@link https://acoustic.com/products/content | WCH REST} services.
 */
export interface UrlConfigFeatureState {
  [URL_CONFIG_FEATURE]: UrlConfigState;
}
/**
 */
export const urlConfigFeatureReducer = {
  [URL_CONFIG_FEATURE]: urlConfigReducer
};

/**
 * Select the URL config feature
 *
 * @param aState - the feature state
 * @returns the URL configuration object
 */
export const selectUrlConfigFeature = selectFeature<UrlConfigState>(
  URL_CONFIG_FEATURE
);
