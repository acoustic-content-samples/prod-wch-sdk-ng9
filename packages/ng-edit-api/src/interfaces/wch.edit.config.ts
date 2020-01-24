import { HubInfoUrlProvider } from '@acoustic-content-sdk/api';
import { getProperty } from '@acoustic-content-sdk/utils';

import {
  DEFAULT_DEBUG_PLACEHOLDERS,
  DEFAULT_INLINE_EDIT_URL
} from './default.wch.edit.config';
import { WchDefaultPlaceholder } from './placeholder';

/** Copyright IBM Corp. 2017 */
/*
 * Exposes information
 */
export interface EditHubInfoService {
  /*
   * URL to the inline edit script
   */
  readonly inlineEditUrl?: HubInfoUrlProvider;

  /**
   * Tag used to find placeholder content items. If left undefined, placeholders
   * will not be inserted, automatically
   */
  readonly placeholderTag?: string;

  /**
   * Enable or disable placeholders even if inline edit mode has not been enabled
   */
  readonly debugPlaceholders?: boolean;

  /**
   * Throttle loading of lib
   */
  readonly throttleLoading?: number;

  /**
   * Provide a default placeholder text
   */
  readonly defaultPlaceholderText?: WchDefaultPlaceholder;
}

export function selectDefaultPlaceholder(
  aConfig?: EditHubInfoService
): WchDefaultPlaceholder {
  return getProperty(aConfig, 'defaultPlaceholderText');
}

export function selectDebugPlaceholder(aConfig?: EditHubInfoService): boolean {
  return getProperty(aConfig, 'debugPlaceholders', DEFAULT_DEBUG_PLACEHOLDERS);
}

export function selectInlineEditURL(
  aConfig?: EditHubInfoService
): HubInfoUrlProvider {
  return getProperty(aConfig, 'inlineEditUrl', DEFAULT_INLINE_EDIT_URL);
}

export function selectPlaceholderTag(aConfig?: EditHubInfoService): string {
  return getProperty(aConfig, 'placeholderTag');
}

export function selectThrottleLoading(aConfig?: EditHubInfoService): number {
  return getProperty(aConfig, 'throttleLoading', 0);
}
