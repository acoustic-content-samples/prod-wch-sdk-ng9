/**
 * Do not modify this file, it is auto-generated.
 */
/** tslint:disable:max-line-length */
import { PageStyleContributionType } from './page.style.contribution.type';
import { DeliveryContentMetadata, RenderingContextV2 } from '@acoustic-content-sdk/api';

/**
 * Strongly typed rendering context for the {@link PageStyleContributionType} type.
 *
 * See {@link TYPE_ID_PAGE_STYLE_CONTRIBUTION} and {@link TYPE_NAME_PAGE_STYLE_CONTRIBUTION}
 * @remarks
 * A style contribution added as a <link rel="stylesheet" href="..."> element to the page markup
 */
export interface PageStyleContributionRenderingContext extends RenderingContextV2, PageStyleContributionType {

  /**
   * Metadata object
   */
  $metadata: DeliveryContentMetadata;
}
