import { WindowType } from '@acoustic-content-sdk/component-api';

import { createReactContext } from '../../utils/context';

/** Create a new injection token for injecting the window into a component. */
export const ACOUSTIC_CONTEXT_WINDOW = createReactContext<WindowType>(
  'ACOUSTIC_CONTEXT_WINDOW'
);
