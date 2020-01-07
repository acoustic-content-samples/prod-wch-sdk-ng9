import { WindowType } from '@acoustic-content-sdk/component-api';
import {
  createInjectableReactProvider,
  WCH_CONTEXT_WINDOW
} from '@acoustic-content-sdk/react-api';
import { lazyGenerator } from '@acoustic-content-sdk/utils';

const getWindow = (): WindowType =>
  typeof window !== 'undefined' ? window : new Object();

const createWindow = lazyGenerator(getWindow);

/**
 * Provides the `WCH_CONTEXT_WINDOW` token for browser based applications.
 */
export const WCH_PROVIDER_BROWSER_WINDOW = createInjectableReactProvider(
  createWindow,
  WCH_CONTEXT_WINDOW
);
