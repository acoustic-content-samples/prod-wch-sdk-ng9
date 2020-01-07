import { WindowType } from '@acoustic-content-sdk/component-api';

import { createReactContext } from '../../utils/context';

/* Create a new injection token for injecting the window into a component. */
export const WCH_CONTEXT_WINDOW = createReactContext<WindowType>(
  'WCH_CONTEXT_WINDOW'
);
