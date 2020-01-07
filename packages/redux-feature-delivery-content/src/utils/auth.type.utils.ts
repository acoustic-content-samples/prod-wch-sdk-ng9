import {
  AuthoringContentItem,
  ContentItem,
  RenderingContext
} from "@acoustic-content-sdk/api";
import { pluckProperty } from "@acoustic-content-sdk/utils";

/**
 * Extracts the type ID from an item
 */
export const pluckTypeId = pluckProperty<
  RenderingContext | AuthoringContentItem | ContentItem,
  "typeId"
>("typeId");
