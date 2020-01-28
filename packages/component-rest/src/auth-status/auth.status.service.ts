import {
  AuthStatus,
  LoggerService,
  REGEXP_ANONYMOUS_USER_ID,
  REL_PATH_CURRENT_USER,
  User
} from '@acoustic-content-sdk/api';
import { FetchText } from '@acoustic-content-sdk/rest-api';
import {
  FALSE$,
  isString,
  jsonParse,
  NOOP_LOGGER_SERVICE,
  opShareLast,
  rxNext,
  rxPipe
} from '@acoustic-content-sdk/utils';
import { MonoTypeOperatorFunction, Observable } from 'rxjs';
import { catchError, first, map } from 'rxjs/operators';

const LOGGER = 'AbstractAuthStatusService';

// tests if a user is authenticated
const isAuthenticated = (aUser: User) =>
  aUser && isString(aUser.id) && !REGEXP_ANONYMOUS_USER_ID.test(aUser.id);

/**
 * Tests if the user is logged in
 *
 * @param aFetch - the fetch callback
 * @returns observable with the status
 */
function rxIsLoggedIn(aFetch: FetchText): Observable<boolean> {
  // access the current user API
  const currentUser$ = rxPipe(
    aFetch(REL_PATH_CURRENT_USER),
    map<string, User>(jsonParse),
    first()
  );
  // test if this is the anonymous user
  return rxPipe(
    currentUser$,
    map(isAuthenticated),
    catchError((error) => FALSE$)
  );
}

/**
 * Checks for the authentication status based on a REST request
 */
export class AbstractAuthStatusService implements AuthStatus {
  // API
  authenticated$: Observable<boolean>;

  /**
   * Initialization of the service.
   *
   * @param aFetchText - the callback to make a request
   * @param aLogSvc - the logger service
   */
  protected constructor(aFetchText: FetchText, aLogSvc?: LoggerService) {
    // logger
    const logSvc = aLogSvc || NOOP_LOGGER_SERVICE;
    // construct a logger
    const logger = logSvc.get(LOGGER);
    // next logger
    const log: <T>(...v: any[]) => MonoTypeOperatorFunction<T> = rxNext(logger);
    // check if we are logged in
    this.authenticated$ = rxPipe(
      rxIsLoggedIn(aFetchText),
      log('authenticated'),
      opShareLast
    );
  }
}
