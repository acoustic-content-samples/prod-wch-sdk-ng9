import {
  KEY_BASICAUTH_LOGIN_PASSWORD,
  KEY_BASICAUTH_LOGIN_USERNAME,
  REL_PATH_BASICAUTH_LOGIN
} from '@acoustic-content-sdk/api';
import {
  Credentials,
  isValidWchToolsOptions,
  wchGetCredentials,
  WchToolsOptions
} from '@acoustic-content-sdk/cli-credentials';
import { ParsedUrlQueryInput } from 'querystring';
import { get, post } from 'request-promise-native';

const ensureTrailingSlash = (aUrl: string): string =>
  aUrl.endsWith('/') ? aUrl : aUrl + '/';

export interface BasicRestClient {
  /**
   * Performs a GET operation for JSON
   *
   * @param aRelPath - path relative to the api URL. This path should NOT start with a slash
   * @param aQuery - optionally an object for the query string
   *
   * @returns the JSON object of the response
   */
  get: <T>(aRelPath: string, aQuery?: ParsedUrlQueryInput) => Promise<T>;
}

/**
 * Defines the undefined credentials
 */
const NO_CREDENTIALS: Credentials = { username: null, password: null };

export interface PublicRestClient extends BasicRestClient {
  /**
   * Login against acoustic content.
   *
   * @param aCredentials - optionally the credentials. If missing locate the credentials using the credential management approach
   * @returns a REST client that makes authenticated requests
   */
  login: (aCredentials?: Credentials) => Promise<ProtectedRestClient>;
}

export interface ProtectedRestClient extends BasicRestClient {
  /**
   * Execute a logout
   */
  logout: () => Promise<PublicRestClient>;
}

/**
 * Validates the options and potentially tries to decode the username and password
 *
 * @param aOptions - options to decode
 * @returns the decoded options
 */
const getWchToolsOptions = (
  aOptions: WchToolsOptions
): Promise<WchToolsOptions> =>
  isValidWchToolsOptions(aOptions).then((bResult) =>
    bResult
      ? aOptions
      : wchGetCredentials(aOptions.baseUrl).then((cred) => ({
          ...aOptions,
          ...cred
        }))
  );

/**
 * Constructs a REST client that allows to login against acoustic content
 * and that allows to send requests
 *
 * @param aApiUrl - the API URL
 *
 * @returns a REST client
 */
export function createClient(aApiUrl: string): PublicRestClient {
  // normalize
  const baseUrl = ensureTrailingSlash(aApiUrl);

  // login method
  const login = (
    aCredentials: Credentials = NO_CREDENTIALS
  ): Promise<ProtectedRestClient> =>
    getWchToolsOptions({ baseUrl, ...aCredentials })
      .then(({ username, password }) =>
        post(`${baseUrl}${REL_PATH_BASICAUTH_LOGIN}`, {
          qs: {
            'accept-privacy-notice': true
          },
          form: {
            [KEY_BASICAUTH_LOGIN_USERNAME]: username,
            [KEY_BASICAUTH_LOGIN_PASSWORD]: password
          },
          json: true,
          jar: true
        })
      )
      .then((resp) =>
        Array.isArray(resp) ? protectedClient : Promise.reject(resp)
      );

  // logout
  const logout = () => Promise.resolve(publicClient);

  // protected get
  const protectedGet = (aRelPath: string, qs?: any) =>
    get(`${baseUrl}${aRelPath}`, { qs, jar: true, json: true });

  // public get
  const publicGet = (aRelPath: string, qs?: any) =>
    get(`${baseUrl}${aRelPath}`, { qs, json: true });

  const publicClient: PublicRestClient = { login, get: publicGet };
  const protectedClient: ProtectedRestClient = { logout, get: protectedGet };

  return publicClient;
}
