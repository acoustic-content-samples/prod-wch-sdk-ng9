/**
 * Do not modify this file, it is auto-generated.
 */
/* tslint:disable:max-line-length */
import { SitesPromotionType } from './sites.promotion.type';
import { DeliveryContentMetadata, RenderingContextV2 } from '@acoustic-content-sdk/api';

/**
 * Strongly typed rendering context for the {@link SitesPromotionType} type.
 *
 * See {@link TYPE_ID_SITES_PROMOTION} and {@link TYPE_NAME_SITES_PROMOTION}
 * @remarks
 * This block represents a promotion item to be rendered on a page. A promotion is comprised by an image, a text, and a clickable button.
 */
export interface SitesPromotionRenderingContext extends RenderingContextV2, SitesPromotionType {

  /**
   * Metadata object
   */
  $metadata: DeliveryContentMetadata;
}
