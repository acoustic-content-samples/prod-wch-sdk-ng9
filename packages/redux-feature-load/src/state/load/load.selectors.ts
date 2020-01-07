import { UnaryFunction } from 'rxjs';

import { LoadingState } from './load.state';

/**
 * Detects if a particular ID is loading
 *
 * @param aId - the ID to check
 * @returns a selector on  the loading state
 */
export const selectIsLoading = (
  aId: string
): UnaryFunction<LoadingState, boolean> => (state) => state.has(aId);

/**
 * Returns how many items are currently loading
 *
 * @returns selector for the loading count
 */
export const selectCountLoading: UnaryFunction<LoadingState, number> = (
  state
) => state.size;
