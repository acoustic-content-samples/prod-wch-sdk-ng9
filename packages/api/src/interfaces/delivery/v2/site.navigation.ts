import { DeliveryContentMetadata } from './content.item';

/**
 * Reference to a page in the site navigation
 */
export interface SiteNavigationPage {
  /**
   * ID of the referenced page
   */
  id: string;
  /**
   * Optionally, the navigation children of the page
   */
  children?: SiteNavigationPage[];
}

/**
 * The list of root pages
 */
export type SiteNavigation = SiteNavigationPage[];

/**
 * Delivery record for the site content item
 *
 * 843fb991-7413-4517-bfcb-b59fc4b1f449
 */
export interface SiteNavigationDeliveryContentItem {
  /**
   * Metadata record
   */
  $metadata: DeliveryContentMetadata;
  /**
   * JSON tree. The content is a serialization of `SiteNavigation`
   */
  tree: string;
  /**
   * Default page
   */
  defaultPage?: string;
}
