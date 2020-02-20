/* Copyright IBM Corp. 2017 */
import { LoggerService } from '@acoustic-content-sdk/api';
import { InlineEditSelectionProvider } from '@acoustic-content-sdk/edit-api';
import { createInjectableReactProvider, WCH_CONTEXT_LOGGER_SERVICE } from '@acoustic-content-sdk/react-api';
import { WCH_CONTEXT_INLINE_EDIT_SELECTION_PROVIDER } from '@acoustic-content-sdk/react-edit-api';
import { WCH_CONTEXT_REDUX_STORE } from '@acoustic-content-sdk/react-redux-api';
import { ReduxRootStore } from '@acoustic-content-sdk/redux-store';
import { NOOP_LOGGER_SERVICE } from '@acoustic-content-sdk/utils';

import { InlineEditSelectionProviderService } from '../inline-edit/inline.edit.selection.provider';

const createInlineEditSelectionProvider = (
  [aStore]: [ReduxRootStore],
  [aLogSvc = NOOP_LOGGER_SERVICE]: [LoggerService?]
): InlineEditSelectionProvider =>
  new InlineEditSelectionProviderService(aStore, aLogSvc);

/**
 * Declares the provider
 */
export const WCH_PROVIDER_REDUX_INLINE_EDIT_SELECTION_PROVIDER = createInjectableReactProvider(
  createInlineEditSelectionProvider,
  WCH_CONTEXT_INLINE_EDIT_SELECTION_PROVIDER,
  [WCH_CONTEXT_REDUX_STORE],
  [WCH_CONTEXT_LOGGER_SERVICE]
);
