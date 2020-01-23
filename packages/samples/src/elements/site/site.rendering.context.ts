/**
 * Do not modify this file, it is auto-generated.
 */
/* tslint:disable:max-line-length */
import { SiteType } from './site.type';
import { DeliveryContentMetadata, RenderingContextV2 } from '@acoustic-content-sdk/api';

/*
 * @name 📄 Site
 * @id 40404250-aa99-427d-a5ac-cb9ce1ebb714
 * @description This item describes an individual site in the site model. The "id" value of this content item is considered the ID for the site. It provides the anchor point that all Page-Descriptor elements of all pages in the site are pointing to. It further defines the site navigation strucutre and the page modules to be added to all pages of this site. Page modules are used to manage style files and JavaScript libraries that shall be loaded into all pages of the site.
 */
export interface  extends RenderingContextV2, SiteType {

  /**
   * Metadata object
   */
   $metadata: DeliveryContentMetadata;
}
