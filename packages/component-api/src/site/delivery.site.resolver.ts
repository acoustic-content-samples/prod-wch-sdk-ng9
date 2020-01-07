import { SiteDeliveryContentItem } from '@acoustic-content-sdk/api';
import { Observable } from 'rxjs';

export interface DeliverySiteResolver {
  /**
   * Resolves the current site
   *
   * @returns the site record
   */
  getSiteDeliveryContentItem(): Observable<SiteDeliveryContentItem>;
}
