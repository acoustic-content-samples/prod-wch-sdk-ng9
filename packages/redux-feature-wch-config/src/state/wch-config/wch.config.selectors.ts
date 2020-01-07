import { isValidUrl } from '@acoustic-content-sdk/redux-feature-url-config';
import { isNotNil, pluckProperty } from '@acoustic-content-sdk/utils';

import { WchConfigState } from './wch.config.state';

// selectors for the fields
export const selectApiUrl = pluckProperty<WchConfigState, 'apiUrl'>('apiUrl');
export const selectPreviewApiUrl = pluckProperty<
  WchConfigState,
  'previewApiUrl'
>('previewApiUrl');
export const selectAuthoringUIBaseUrl = pluckProperty<
  WchConfigState,
  'authoringUIBaseUrl'
>('authoringUIBaseUrl');
export const selectDeliveryUrl = pluckProperty<WchConfigState, 'deliveryUrl'>(
  'deliveryUrl'
);
export const selectPreviewDeliveryUrl = pluckProperty<
  WchConfigState,
  'previewDeliveryUrl'
>('previewDeliveryUrl');

/**
 * Tests if an object is a valid {@link WchConfigState} object
 *
 * @param aState - the object to test
 * @returns true if the state is valid else false
 */
export function isValidWchConfig(aState: any): aState is WchConfigState {
  return (
    isNotNil(aState) &&
    isValidUrl(selectApiUrl(aState)) &&
    isValidUrl(selectDeliveryUrl(aState)) &&
    isValidUrl(selectPreviewApiUrl(aState)) &&
    isValidUrl(selectPreviewDeliveryUrl(aState)) &&
    isValidUrl(selectAuthoringUIBaseUrl(aState))
  );
}
