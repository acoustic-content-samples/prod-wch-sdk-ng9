import {
  KEY_BASICAUTH_LOGIN_PASSWORD,
  KEY_BASICAUTH_LOGIN_USERNAME,
  REL_PATH_BASICAUTH_LOGIN
} from '@acoustic-content-sdk/api';
import { Agent as HttpAgent, request as httpRequest } from 'http';
import { Agent as HttpsAgent, request as httpsRequest } from 'https';
import { ParsedUrlQueryInput, stringify } from 'querystring';
import { parse } from 'url';

type HttpRequestType = typeof httpRequest;
type HttpsRequestType = typeof httpsRequest;

type RequestType = HttpRequestType | HttpsRequestType;

const REQUEST_BY_PROTOCOL = { 'http:': httpRequest, 'https:': httpsRequest };

const ensureTrailingSlash = (aUrl: string): string =>
  aUrl.endsWith('/') ? aUrl : aUrl + '/';

export interface BasicRestClient {
  /**
   * Performs a GET operation
   */
  get: <T>(aRelPath: string) => Promise<T>;
}

export interface PublicRestClient extends BasicRestClient {
  login: (aUserName: string, aPassword: string) => Promise<BasicRestClient>;
}

export function createClient(aApiUrl: string): PublicRestClient {
  // normalize
  const apiUrl = ensureTrailingSlash(aApiUrl);
  // agents
  const AGENTS = { 'http:': new HttpAgent(), 'https:': new HttpsAgent() };
  // cookies
  let cookies: string;

  function sendGetRequest<T>(aUrl: string, aCookies?: string): Promise<T> {
    // parse
    const { hostname, path, port, protocol } = parse(aUrl);
    // the request object
    const sender: RequestType = REQUEST_BY_PROTOCOL[protocol];
    const agent = AGENTS[protocol];
    // send
    return new Promise((resolve, reject) => {
      // data array
      const data: Buffer[] = [];
      // send the request
      const req = sender(
        {
          hostname,
          path,
          port,
          method: 'GET',
          headers: {
            cookie: aCookies
          },
          agent
        },
        (res) => {
          // handle
          res.on('data', (chunk) => data.push(chunk));
          res.on('end', () =>
            resolve(JSON.parse(Buffer.concat(data).toString()))
          );
        }
      );
      // error
      req.on('error', (err) => reject(err));
      req.end();
    });
  }

  /**
   * Send form encoded data and expect a
   *
   * @param aUrl  - the URL
   * @param aForm - the form
   *
   * @returns a promise
   */
  function sendFormEncodedPost<T>(
    aUrl: string,
    aForm: ParsedUrlQueryInput
  ): Promise<T> {
    // payload
    const body = Buffer.from(stringify(aForm));
    // parse
    const { hostname, path, port, protocol } = parse(aUrl);
    // the request object
    const sender: RequestType = REQUEST_BY_PROTOCOL[protocol];
    const agent = AGENTS[protocol];
    // send
    return new Promise((resolve, reject) => {
      // data array
      const data: Buffer[] = [];
      // send the request
      const req = sender(
        {
          hostname,
          path,
          port,
          method: 'POST',
          headers: {
            'content-type': 'application/x-www-form-urlencoded',
            'content-length': body.length
          },
          agent
        },
        (res) => {
          // log the headers
          const setCookies = res.headers['set-cookie'];
          if (Array.isArray(setCookies)) {
            // parse
            cookies = setCookies.join(';');
          }
          // handle
          res.on('data', (chunk) => data.push(chunk));
          res.on('end', () =>
            resolve(JSON.parse(Buffer.concat(data).toString()))
          );
        }
      );
      // error
      req.on('error', (err) => reject(err));
      // send the content
      req.write(body);
      req.end();
    });
  }

  // login method
  const login = (
    aUserName: string,
    aPassword: string
  ): Promise<BasicRestClient> =>
    sendFormEncodedPost(
      `${apiUrl}${REL_PATH_BASICAUTH_LOGIN}?accept-privacy-notice=true`,
      {
        [KEY_BASICAUTH_LOGIN_USERNAME]: aUserName,
        [KEY_BASICAUTH_LOGIN_PASSWORD]: aPassword
      }
    ).then((res) => (Array.isArray(res) ? client : Promise.reject(res)));

  // get the request
  const protectedGet = <T>(aPath: string): Promise<T> =>
    sendGetRequest(`${apiUrl}${aPath}`, cookies);
  const publicGet = <T>(aPath: string): Promise<T> =>
    sendGetRequest(`${apiUrl}${aPath}`);

  const client: BasicRestClient = { get: protectedGet };

  return { login, get: publicGet };
}
