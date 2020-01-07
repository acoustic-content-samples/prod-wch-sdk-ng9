import { Observable } from 'rxjs';

/**
 * Exposes the authentication status
 */
export interface AuthStatus {
  /**
   * Exposes the flag that tells if the system
   * is authenticated. This is e.g. used to decide to use the `delivery` or `mydelivery` routes.
   */
  authenticated$: Observable<boolean>;
}
