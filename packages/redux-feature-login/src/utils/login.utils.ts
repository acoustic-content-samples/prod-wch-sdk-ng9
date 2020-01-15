import {
  KEY_BASICAUTH_LOGIN_PASSWORD,
  KEY_BASICAUTH_LOGIN_USERNAME,
  REGEXP_ANONYMOUS_USER_ID,
  REL_PATH_BASICAUTH_LOGIN,
  REL_PATH_CURRENT_USER,
  User
} from '@acoustic-content-sdk/api';
import { rxSelect } from '@acoustic-content-sdk/redux-store';
import { FetchText } from '@acoustic-content-sdk/rest-api';
import {
  FALSE$,
  isString,
  jsonParse,
  rxPipe
} from '@acoustic-content-sdk/utils';
import { identity, Observable, OperatorFunction } from 'rxjs';
import { ajax, AjaxRequest } from 'rxjs/ajax';
import { catchError, filter, first, map, mapTo, take } from 'rxjs/operators';
import {
  LoggedInFeatureState,
  selectLoggedInFeature
} from './../state/login/login.feature';

// tests if a user is authenticated
const isAuthenticated = (aUser: User) =>
  aUser && isString(aUser.id) && !REGEXP_ANONYMOUS_USER_ID.test(aUser.id);

/**
 * Tests if the user is logged in
 *
 * @param aFetch - the fetch callback
 * @returns observable with the status
 */
export function rxIsLoggedIn(aFetch: FetchText): Observable<boolean> {
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

export interface NextLoginReduxState extends LoggedInFeatureState {}

/**
 * Returns an operator that emits once when a user logged in
 *
 * @param aStore$ - the store
 * @returns  the single emission after the user logged in
 */
export const nextLogin: OperatorFunction<NextLoginReduxState, boolean> = (
  aStore$: Observable<NextLoginReduxState>
): Observable<boolean> =>
  rxPipe(aStore$, rxSelect(selectLoggedInFeature), filter(identity), take(1));

const ajaxRequest = (req: AjaxRequest) =>
  rxPipe(
    ajax({ ...req, responseType: 'text', withCredentials: true }),
    map((resp) => resp.response as string)
  );

function rxFormPost(aUri: string, aData: any): Observable<string> {
  // setup the request
  return ajaxRequest({
    method: 'POST',
    url: aUri,
    body: aData
  });
}

export function login(
  aApiUrl: string,
  aUserName: string,
  aPassword: string
): Observable<string> {
  // test if we can login
  const loginUrl = `${aApiUrl}${REL_PATH_BASICAUTH_LOGIN}`;
  const body = {
    [KEY_BASICAUTH_LOGIN_USERNAME]: aUserName,
    [KEY_BASICAUTH_LOGIN_PASSWORD]: aPassword
  };
  // execute
  return rxFormPost(loginUrl, body).pipe(
    map((data) => JSON.parse(data)),
    mapTo(aApiUrl)
  );
}
