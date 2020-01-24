/**
 * Do not modify this file, it is auto-generated.
 */
/** tslint:disable:max-line-length */
import { PageDescriptorType } from './page.descriptor.type';
import { DeliveryContentMetadata, RenderingContextV2 } from '@acoustic-content-sdk/api';

/**
 * Strongly typed rendering context for the {@link PageDescriptorType} type.
 *
 * See {@link TYPE_ID_PAGE_DESCRIPTOR} and {@link TYPE_NAME_PAGE_DESCRIPTOR}
 * @remarks
 * This type aggregates all information required by the sites framework to treat content items exposing an element of this type as a page. This includes support for page URL handling and showing the item in the Sites Composer UI. To turn an arbitrary content type into a page content type, add a custom element of this type and element name "descriptor" to this type and add "kind:page" flag to the type and content items.
 */
export interface PageDescriptorRenderingContext extends RenderingContextV2, PageDescriptorType {

  /**
   * Metadata object
   */
  $metadata: DeliveryContentMetadata;
}
