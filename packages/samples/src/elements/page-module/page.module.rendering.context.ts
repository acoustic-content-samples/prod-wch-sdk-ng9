/**
 * Do not modify this file, it is auto-generated.
 */
/* tslint:disable:max-line-length */
import { PageModuleType } from './page.module.type';
import { DeliveryContentMetadata, RenderingContextV2 } from '@acoustic-content-sdk/api';

/*
 * @name 📄 Page Module
 * @id aab86460-0018-44c2-9f52-3a326e58f7f7
 * @description The list of related page contribution content items for the head and body elements of the pages of a given site. Content items of this type may be generated by a build step generating unique IDs for the given item. Markup contributions are added to the markup of every individual page. Page modules can contribute to both, the "head" and the "body" element of the page. Future version may support overriding page modules for specific pages.
 */
export interface  extends RenderingContextV2, PageModuleType {

  /**
   * Metadata object
   */
   $metadata: DeliveryContentMetadata;
}
