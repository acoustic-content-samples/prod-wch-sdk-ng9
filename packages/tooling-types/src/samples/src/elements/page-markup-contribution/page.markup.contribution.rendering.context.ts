/**
 * Do not modify this file, it is auto-generated.
 */
/** tslint:disable:max-line-length */
import { PageMarkupContributionType } from './page.markup.contribution.type';
import { DeliveryContentMetadata, RenderingContextV2 } from '@acoustic-content-sdk/api';

/**
 * Strongly typed rendering context for the {@link PageMarkupContributionType} type.
 *
 * See {@link TYPE_ID_PAGE_MARKUP_CONTRIBUTION} and {@link TYPE_NAME_PAGE_MARKUP_CONTRIBUTION}
 * @remarks
 * A page markup contribution directly added into the markup
 */
export interface PageMarkupContributionRenderingContext extends RenderingContextV2, PageMarkupContributionType {

  /**
   * Metadata object
   */
  $metadata: DeliveryContentMetadata;
}
