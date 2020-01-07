import { createReactContext } from '@acoustic-content-sdk/react-api';
import { ReduxRootStore } from '@acoustic-content-sdk/redux-store';

/**
 * Injection token for the redux store
 */
export const WCH_CONTEXT_REDUX_STORE = createReactContext<ReduxRootStore>(
  'WCH_CONTEXT_REDUX_STORE'
);
