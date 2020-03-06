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
   * Styles reference
   */
  styles?: DeliveryReferenceElement;
  /**
   * Title
   */
  title?: string;
}
