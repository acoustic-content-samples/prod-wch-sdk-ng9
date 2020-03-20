import { DeliverySiteResolver } from '@acoustic-content-sdk/component-api';
import { constGenerator } from '@acoustic-content-sdk/utils';
import { EMPTY } from 'rxjs';

/**
 * Constant for the site service
 */
export const ACOUSTIC_DELIVERY_SITE_RESOLVER: DeliverySiteResolver = {
  getSiteDeliveryContentItem: constGenerator(EMPTY)
};
