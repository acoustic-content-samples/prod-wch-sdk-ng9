## API Report File for "@acoustic-content-sdk/react-edit-api"

> Do not edit this file. It is a report generated by [API Extractor](https://api-extractor.com/).

```ts

import { AccessorType } from '@acoustic-content-sdk/edit-api';
import { AuthoringPlaceholder } from '@acoustic-content-sdk/api';
import { HubInfoUrlProvider } from '@acoustic-content-sdk/api';
import { InlineEditSelectionProvider } from '@acoustic-content-sdk/edit-api';
import { LocalizedText } from '@acoustic-content-sdk/api';
import { Observable } from 'rxjs';
import { ObservableOrT } from '@acoustic-content-sdk/utils';
import { RenderingContextProviderV2 } from '@acoustic-content-sdk/api';
import { StaticHubInfoUrlProvider } from '@acoustic-content-sdk/api';
import { WchConfig } from '@acoustic-content-sdk/edit-api';
import { WchInlineEditProviderV2 } from '@acoustic-content-sdk/edit-api';
import { WchInlineEditServiceV2 } from '@acoustic-content-sdk/edit-api';
import { WindowType } from '@acoustic-content-sdk/component-api';

// @public
export const DEFAULT_DEBUG_PLACEHOLDERS = false;

// @public
export const DEFAULT_INLINE_EDIT_URL = "${authoringUIBaseUrl.protocol}//${authoringUIBaseUrl.host}/authoring-sites-ui/inline-edit/inline-edit.js";

// @public (undocumented)
export interface EditHubInfoService {
    readonly debugPlaceholders?: boolean;
    readonly defaultPlaceholderText?: WchDefaultPlaceholder;
    // (undocumented)
    readonly inlineEditUrl?: HubInfoUrlProvider;
    readonly placeholderTag?: string;
    readonly throttleLoading?: number;
}

// @public (undocumented)
export const EVENT_EDIT_END = "wchEditEnd";

// @public (undocumented)
export const EVENT_EDIT_START = "wchEditStart";

// @public (undocumented)
export const EVENT_INLINE_EDIT_END = "wchInlineEditEnd";

// @public (undocumented)
export const EVENT_INLINE_EDIT_START = "wchInlineEditStart";

// @public (undocumented)
export function selectDebugPlaceholder(aConfig?: EditHubInfoService): boolean;

// @public (undocumented)
export function selectDefaultPlaceholder(aConfig?: EditHubInfoService): WchDefaultPlaceholder;

// @public (undocumented)
export function selectInlineEditURL(aConfig?: EditHubInfoService): HubInfoUrlProvider;

// @public (undocumented)
export function selectPlaceholderTag(aConfig?: EditHubInfoService): string;

// @public (undocumented)
export function selectThrottleLoading(aConfig?: EditHubInfoService): number;

// @public
export const VERSION: {
    version: {
        major: string;
        minor: string;
        patch: string;
    };
    build: Date;
};

// @public
export const WCH_CONTEXT_DEBUG_PLACEHOLDERS: Required<import("react").Context<boolean>>;

// @public
export const WCH_CONTEXT_DEFAULT_PLACEHOLDER_TEXT: Required<import("react").Context<import("@acoustic-content-sdk/utils").ObservableOrT<string | import("@acoustic-content-sdk/api").LocalizedText>>>;

// @public
export const WCH_CONTEXT_EDIT_HOST_WINDOW: Required<import("react").Context<WindowType>>;

// @public
export const WCH_CONTEXT_INLINE_EDIT_PROVIDER: Required<import("react").Context<Observable<WchInlineEditProviderV2>>>;

// @public
export const WCH_CONTEXT_INLINE_EDIT_SELECTION_PROVIDER: Required<import("react").Context<InlineEditSelectionProvider>>;

// @public (undocumented)
export const WCH_CONTEXT_INLINE_EDIT_SERVICE: Required<import("react").Context<WchInlineEditServiceV2>>;

// @public (undocumented)
export const WCH_CONTEXT_INLINE_EDIT_URL: Required<import("react").Context<StaticHubInfoUrlProvider>>;

// @public (undocumented)
export const WCH_CONTEXT_PLACEHOLDER_PROVIDER: Required<import("react").Context<WchPlaceholderProvider>>;

// @public
export const WCH_CONTEXT_WCH_CONFIG: Required<import("react").Context<Observable<WchConfig>>>;

// @public
export type WchDefaultPlaceholder = ObservableOrT<string | LocalizedText>;

// @public (undocumented)
export interface WchPlaceholder {
    accessor$: Observable<string>;
    data$: Observable<any>;
    formattedText$: Observable<LocalizedText>;
    placeholder$: Observable<AuthoringPlaceholder>;
    placeholderText$: Observable<LocalizedText>;
    plainText$: Observable<LocalizedText>;
    showPlaceholder$: Observable<boolean>;
    typeId$: Observable<string>;
}

// @public (undocumented)
export interface WchPlaceholderProvider {
    // (undocumented)
    getPlaceholder: (aAccessor: AccessorType, aProvider: RenderingContextProviderV2) => WchPlaceholder;
}


```