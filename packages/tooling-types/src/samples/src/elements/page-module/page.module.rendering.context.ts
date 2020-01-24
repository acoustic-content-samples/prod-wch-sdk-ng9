/**
 * Do not modify this file, it is auto-generated.
 */
/** tslint:disable:max-line-length */
import { PageModuleType } from './page.module.type';
import { DeliveryContentMetadata, RenderingContextV2 } from '@acoustic-content-sdk/api';

/**
 * Strongly typed rendering context for the {@link PageModuleType} type.
 *
 * See {@link TYPE_ID_PAGE_MODULE} and {@link TYPE_NAME_PAGE_MODULE}
 * @remarks
 * The list of related page contribution content items for the head and body elements of the pages of a given site. Content items of this type may be generated by a build step generating unique IDs for the given item. Markup contributions are added to the markup of every individual page. Page modules can contribute to both, the "head" and the "body" element of the page. Future version may support overriding page modules for specific pages.
 */
export interface PageModuleRenderingContext extends RenderingContextV2, PageModuleType {

  /**
   * Metadata object
   */
  $metadata: DeliveryContentMetadata;
}