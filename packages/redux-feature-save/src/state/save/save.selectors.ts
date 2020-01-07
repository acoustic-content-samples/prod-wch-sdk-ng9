import { SavingState } from './save.state';

/**
 * Checks if a save operation is in progress
 *
 * @param aState - the current saving state
 * @returns true if we have pending operations
 */
export const isSaving = (aState: SavingState): boolean => aState > 0;
