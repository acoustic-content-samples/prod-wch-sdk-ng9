import { isNotNil, pluckProperty } from '@acoustic-content-sdk/utils';
import { UnaryFunction } from 'rxjs';

import { isValidUrl } from '../../utils/general.selectors';
import { UrlConfigState } from './url.config.state';

export const selectIsPreviewMode: UnaryFunction<
  UrlConfigState,
  boolean
> = pluckProperty<UrlConfigState, 'isPreviewMode'>('isPreviewMode');

export const selectApiUrl: UnaryFunction<UrlConfigState, URL> = pluckProperty<
  UrlConfigState,
  'apiUrl'
>('apiUrl');

export const selectResourceUrl: UnaryFunction<
  UrlConfigState,
  URL
> = pluckProperty<UrlConfigState, 'resourceUrl'>('resourceUrl');

/**
 * Tests if an object is a valid {@link UrlConfigState} object
 *
 * @param aState - the object to test
 * @returns true if the state is valid else false
 */
export function isValidUrlConfig(aState: any): aState is UrlConfigState {
  return (
    isNotNil(aState) &&
    isValidUrl(selectApiUrl(aState)) &&
    isValidUrl(selectResourceUrl(aState))
  );
}
