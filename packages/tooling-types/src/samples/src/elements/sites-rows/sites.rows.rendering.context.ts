/**
 * Do not modify this file, it is auto-generated.
 */
/* tslint:disable:max-line-length */
import { SitesRowsType } from './sites.rows.type';
import { DeliveryContentMetadata, RenderingContextV2 } from '@acoustic-content-sdk/api';

/**
 * Strongly typed rendering context for the {@link SitesRowsType} type.
 *
 * See {@link TYPE_ID_SITES_ROWS} and {@link TYPE_NAME_SITES_ROWS}
 * @remarks
 * This type is used to represent individual pages. Page specific meta data is controlled via the "descriptor" element. Page content can be placed into the container elements of this page.
 */
export interface SitesRowsRenderingContext extends RenderingContextV2, SitesRowsType {

  /**
   * Metadata object
   */
  $metadata: DeliveryContentMetadata;
}
