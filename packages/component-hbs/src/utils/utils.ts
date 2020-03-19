import { Layout } from '@acoustic-content-sdk/api';
import {
  isEqual,
  isNotNil,
  LAYOUT_TYPE_HANDLEBARS
} from '@acoustic-content-sdk/utils';

export const isHandlebarsLayout = ({ templateType, template }: Layout) =>
  isEqual(templateType, LAYOUT_TYPE_HANDLEBARS) && isNotNil(template);

/**
 * Weight of the handlebars component resolver
 */
export const HBS_COMPONENT_RESOLVER_WEIGHT = 2000;
