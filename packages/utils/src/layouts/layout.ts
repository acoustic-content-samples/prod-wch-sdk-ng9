/** Copyright IBM Corp. 2017 */
import {
  AuthoringLayoutItem,
  AuthoringLayoutMapping,
  DeliveryLayout,
  DeliveryLayoutMapping,
  Layout
} from '@acoustic-content-sdk/api';
import { identity, UnaryFunction } from 'rxjs';

export const DEFAULT_LAYOUT_MODE = 'default';
export const LAYOUT_TYPE_ANGULAR = 'angular';
export const LAYOUT_TYPE_HANDLEBARS = 'handlebars';

export const LAYOUT_MODE_NAVIGATION = 'wch-navigation';
export const LAYOUT_MODE_HEADER = 'wch-header';
export const LAYOUT_MODE_FOOTER = 'wch-footer';
export const LAYOUT_MODE_ERROR = 'wch-error';

export const LAYOUT_TEMPLATE_NAVIGATION = 'wch-navigation';
export const LAYOUT_TEMPLATE_HEADER = 'wch-header';
export const LAYOUT_TEMPLATE_FOOTER = 'wch-footer';
export const LAYOUT_TEMPLATE_ERROR = 'wch-error';

export const LAYOUT_NAVIGATION: Layout = {
  id: LAYOUT_TEMPLATE_NAVIGATION,
  name: LAYOUT_TEMPLATE_NAVIGATION,
  templateType: LAYOUT_TYPE_ANGULAR,
  template: LAYOUT_TEMPLATE_NAVIGATION
};

export const LAYOUT_HEADER: Layout = {
  id: LAYOUT_TEMPLATE_HEADER,
  name: LAYOUT_TEMPLATE_HEADER,
  templateType: LAYOUT_TYPE_ANGULAR,
  template: LAYOUT_TEMPLATE_HEADER
};

export const LAYOUT_FOOTER: Layout = {
  id: LAYOUT_TEMPLATE_FOOTER,
  name: LAYOUT_TEMPLATE_FOOTER,
  templateType: LAYOUT_TYPE_ANGULAR,
  template: LAYOUT_TEMPLATE_FOOTER
};

export const LAYOUT_ERROR: Layout = {
  id: LAYOUT_TEMPLATE_ERROR,
  name: LAYOUT_TEMPLATE_ERROR,
  templateType: LAYOUT_TYPE_ANGULAR,
  template: LAYOUT_TEMPLATE_ERROR
};

export const DEFAULT_LAYOUT_MAPPING: { [layoutMode: string]: Layout } = {};
DEFAULT_LAYOUT_MAPPING[LAYOUT_MODE_NAVIGATION] = LAYOUT_NAVIGATION;
DEFAULT_LAYOUT_MAPPING[LAYOUT_MODE_HEADER] = LAYOUT_HEADER;
DEFAULT_LAYOUT_MAPPING[LAYOUT_MODE_FOOTER] = LAYOUT_FOOTER;
DEFAULT_LAYOUT_MAPPING[LAYOUT_MODE_ERROR] = LAYOUT_ERROR;

/**
 * Converts an authoring layout item to a delivery layout item
 */
export const authoringLayoutToDeliveryLayout: UnaryFunction<
  AuthoringLayoutItem,
  DeliveryLayout
> = identity;

/**
 * Converts an authoring layout item to a delivery layout item
 */
export const authoringLayoutMappingToDeliveryLayoutMapping: UnaryFunction<
  AuthoringLayoutMapping,
  DeliveryLayoutMapping
> = identity;
