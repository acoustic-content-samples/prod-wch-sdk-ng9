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
import { get, post } from 'request-promise-native';

const ensureTrailingSlash = (aUrl: string): string =>
  aUrl.endsWith('/') ? aUrl : aUrl + '/';

export interface BasicRestClient {
  /**
   * Performs a GET operation
   */
  get: <T>(aRelPath: string, aQuery?: any) => Promise<T>;
}

/**
 * Defines the undefined credentials
 */
const NO_CREDENTIALS: Credentials = { username: null, password: null };

export interface PublicRestClient extends BasicRestClient {
  login: (aCredentials?: Credentials) => Promise<BasicRestClient>;
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

export function createClient(aApiUrl: string): PublicRestClient {
  // normalize
  const baseUrl = ensureTrailingSlash(aApiUrl);

  // login method
  const login = (
    aCredentials: Credentials = NO_CREDENTIALS
  ): Promise<BasicRestClient> =>
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
      .then((resp) => (Array.isArray(resp) ? client : Promise.reject(resp)));

  // protected get
  const protectedGet = (aRelPath: string, qs?: any) =>
    get(`${baseUrl}${aRelPath}`, { qs, jar: true, json: true });

  // public get
  const publicGet = (aRelPath: string, qs?: any) =>
    get(`${baseUrl}${aRelPath}`, { qs, json: true });

  const client: BasicRestClient = { get: protectedGet };

  return { login, get: publicGet };
}
