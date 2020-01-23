/**
 * Do not modify this file, it is auto-generated.
 */
/* tslint:disable:max-line-length */
import { PageContributionType } from './page.contribution.type';
import { DeliveryContentMetadata, RenderingContextV2 } from '@acoustic-content-sdk/api';

/**
 * Strongly typed rendering context for the {@link PageContributionType} type.
 *
 * See {@link TYPE_ID_PAGE_CONTRIBUTION} and {@link TYPE_NAME_PAGE_CONTRIBUTION}
 * @remarks
 * An set of related markup contributions to be added to markup of individual pages. Page contributions can contribute to both, the "head" and the "body" element of the page.
 */
export interface PageContributionRenderingContext extends RenderingContextV2, PageContributionType {

  /**
   * Metadata object
   */
  $metadata: DeliveryContentMetadata;
}
