import {
  DeliveryContentItem,
  DeliveryGroupElement,
  DeliveryReferenceElement,
  KEY_ID,
  KEY_METADATA,
  RenderingContextV2
} from '@acoustic-content-sdk/api';
import { pluckPath, pluckProperty } from '@acoustic-content-sdk/utils';

const METADATA_PATH = [KEY_METADATA, KEY_ID];

export const selectIdFromRenderingContext = pluckPath<string>(METADATA_PATH);

export const selectMetadata = pluckProperty<
  | DeliveryContentItem
  | DeliveryReferenceElement
  | DeliveryGroupElement
  | RenderingContextV2,
  '$metadata'
>(KEY_METADATA);

export const selectId = pluckProperty<any, 'id'>(KEY_ID);
