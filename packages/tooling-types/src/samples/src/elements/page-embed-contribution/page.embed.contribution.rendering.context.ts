/**
 * Do not modify this file, it is auto-generated.
 */
/** tslint:disable:max-line-length */
import { PageEmbedContributionType } from './page.embed.contribution.type';
import { DeliveryContentMetadata, RenderingContextV2 } from '@acoustic-content-sdk/api';

/**
 * Strongly typed rendering context for the {@link PageEmbedContributionType} type.
 *
 * See {@link TYPE_ID_PAGE_EMBED_CONTRIBUTION} and {@link TYPE_NAME_PAGE_EMBED_CONTRIBUTION}
 * @remarks
 * A page markup contribution directly added into the markup
 */
export interface PageEmbedContributionRenderingContext extends RenderingContextV2, PageEmbedContributionType {

  /**
   * Metadata object
   */
  $metadata: DeliveryContentMetadata;
}
