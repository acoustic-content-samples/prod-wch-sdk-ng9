import { DeliverySearchResolver } from '@acoustic-content-sdk/component-api';
import { constGenerator } from '@acoustic-content-sdk/utils';
import { EMPTY } from 'rxjs';

/**
 * Constant for the navigation service
 */
export const ACOUSTIC_DELIVERY_SEARCH_RESOLVER: DeliverySearchResolver = {
  getDeliverySearchResults: constGenerator(EMPTY)
};
