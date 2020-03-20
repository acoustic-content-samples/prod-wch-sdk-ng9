import { AuthStatus } from '@acoustic-content-sdk/api';
import { of } from 'rxjs';

/**
 * Constant for the page service
 */
export const ACOUSTIC_AUTH_STATUS: AuthStatus = { authenticated$: of(false) };
