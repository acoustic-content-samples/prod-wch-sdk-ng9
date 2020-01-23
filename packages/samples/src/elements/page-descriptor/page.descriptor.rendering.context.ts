/**
 * Do not modify this file, it is auto-generated.
 */
/* tslint:disable:max-line-length */
import { PageDescriptorType } from './page.descriptor.type';
import { DeliveryContentMetadata, RenderingContextV2 } from '@acoustic-content-sdk/api';

/*
 * @name 📄 Page Descriptor
 * @id 74f83bd2-2ef6-43f9-8264-bd538e5aad28
 * @description This type aggregates all information required by the sites framework to treat content items exposing an element of this type as a page. This includes support for page URL handling and showing the item in the Sites Composer UI. To turn an arbitrary content type into a page content type, add a custom element of this type and element name "descriptor" to this type and add "kind:page" flag to the type and content items.
 */
export interface  extends RenderingContextV2, PageDescriptorType {

  /**
   * Metadata object
   */
   $metadata: DeliveryContentMetadata;
}
