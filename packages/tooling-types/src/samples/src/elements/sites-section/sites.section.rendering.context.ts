/**
 * Do not modify this file, it is auto-generated.
 */
/* tslint:disable:max-line-length */
import { SitesSectionType } from './sites.section.type';
import { DeliveryContentMetadata, RenderingContextV2 } from '@acoustic-content-sdk/api';

/**
 * Strongly typed rendering context for the {@link SitesSectionType} type.
 *
 * See {@link TYPE_ID_SITES_SECTION} and {@link TYPE_NAME_SITES_SECTION}
 * @remarks
 * This item represents a top level container on a page. It contains a list of second level containers of type "Sites Cell" which in turn contain the actual page blocks
 */
export interface SitesSectionRenderingContext extends RenderingContextV2, SitesSectionType {

  /**
   * Metadata object
   */
  $metadata: DeliveryContentMetadata;
}
