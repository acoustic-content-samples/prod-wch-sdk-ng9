/**
 * Do not modify this file, it is auto-generated.
 */
/* tslint:disable:max-line-length */
import { SitesContentType } from './sites.content.type';
import { DeliveryContentMetadata, RenderingContextV2 } from '@acoustic-content-sdk/api';

/**
 * Strongly typed rendering context for the {@link SitesContentType} type.
 *
 * See {@link TYPE_ID_SITES_CONTENT} and {@link TYPE_NAME_SITES_CONTENT}
 * @remarks
 * This element represent a content block of variable type. The possible types are represented by corresponding elements each. The element named "selected" identifies the actual block content item of the corresponding type. To support an additional block content type, you need to add a corresponding element of that type and a corresponding option value in the "selected" element definition.
 */
export interface SitesContentRenderingContext extends RenderingContextV2, SitesContentType {

  /**
   * Metadata object
   */
  $metadata: DeliveryContentMetadata;
}
