import {
  DeliveryContentMetadata,
  DeliveryReferenceElement
} from './content.item';

export interface SiteDeliveryContentItem {
  /**
   * Metadata record
   */
  $metadata: DeliveryContentMetadata;
  /**
   * Navigation reference
   */
  navigation: DeliveryReferenceElement;
  /**
   * Title
   */
  title?: string;
}
