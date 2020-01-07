import {
  KEY_BASICAUTH_LOGIN_PASSWORD,
  KEY_BASICAUTH_LOGIN_USERNAME,
  REL_PATH_BASICAUTH_LOGIN,
  REL_PATH_CURRENT_USER
} from '@acoustic-content-sdk/api';
import { validate as validateEmail } from 'email-validator';
import { isArray, isString } from 'lodash';
import { isWebUri } from 'valid-url';

import { Credentials, WchToolsOptions } from './types';
import { ensureTrailingSlash } from './url.utils';

const rp = require('request-promise-native');

// const rp = require('request-promise-native');

/**
 * Checks if a username is valid, i.e. either an email or the term 'apikey'
 *
 * @param aValue -  the value to test
 * @returns true if the name is valid, else false
 */
export function isValidUserName(aValue: any): aValue is string {
  return isString(aValue) && (!!validateEmail(aValue) || aValue === 'apikey');
}

/**
 * Checks if a password is valid
 *
 * @param aValue -  the value to test
 * @returns true if the password is valid, else false
 */
export function isValidPassword(aValue: any): aValue is string {
  return isString(aValue) && aValue.length > 0;
}

/**
 * Checks if the url is syntactically a valid URL
 *
 * @param aValue -  the value
 * @returns true if the value is a valid URL, else false
 */
export function isValidUrl(aValue: any): aValue is string {
  return isString(aValue) && !!isWebUri(aValue);
}

/**
 * Returns the current user as a json object
 *
 * @param aApiUrl
 */
function _getCurrentUser(aApiUrl: string): Promise<any> {
  // the URL
  const currentUserUrl = `${aApiUrl}${REL_PATH_CURRENT_USER}`;
  // make a get request
  return Promise.resolve(rp(currentUserUrl, { json: true }));
}

export function isValidEmail(aValue: any): aValue is string {
  return isString(aValue) && !!validateEmail(aValue);
}

/**
 * Validates the correctness of a user
 *
 * @param aFeed -   the feed
 */
function _isValidateUser(aFeed: any): boolean {
  // test the feed result
  return (
    aFeed &&
    isString(aFeed.externalId) &&
    aFeed.externalId.length > 0 &&
    isValidEmail(aFeed.email)
  );
}

/**
 * Checks if the URL is a valid WCH API URL by making a test call
 *
 * @param aUrl -  the URL to test
 *
 * @returns true if the URL is valid, else false
 */
export function isValidApiUrl(aValue: any): Promise<boolean> {
  // simple check, first
  if (!isValidUrl(aValue)) {
    return Promise.resolve(false);
  }
  // check if the URL is valid
  const normUrl = ensureTrailingSlash(aValue);
  // validate
  return _getCurrentUser(normUrl).then(_isValidateUser, () => false);
}

/**
 * Tests if the credentials are valid, this is the case if the object exists, the username is valid
 * and if the password exists and is not empty
 *
 * @param aCred - the credentials object
 * @param aOptions -  debugging options
 *
 * @returns true if the credentials are valid, else false
 */
export function isValidCredentials(aCred: any): aCred is Credentials {
  // check
  return !!(
    aCred &&
    isValidUserName(aCred.username) &&
    isValidPassword(aCred.password)
  );
}

/**
 * Validates the credentials by trying to login
 *
 * @param aCredentials -  the credentials
 * @returns true if the credentials were correct, else false
 */
export function isValidWchToolsOptions(
  aCredentials: WchToolsOptions
): Promise<boolean> {
  // check the credentials object
  if (!isValidCredentials(aCredentials) || !isValidUrl(aCredentials.baseUrl)) {
    return Promise.resolve(false);
  }
  // validat the URL
  const normUrl = ensureTrailingSlash(aCredentials.baseUrl);
  // test if we can login
  const loginUrl = `${normUrl}${REL_PATH_BASICAUTH_LOGIN}`;
  const body = {
    [KEY_BASICAUTH_LOGIN_USERNAME]: aCredentials.username,
    [KEY_BASICAUTH_LOGIN_PASSWORD]: aCredentials.password
  };
  // form POST to do the login
  return rp({ method: 'POST', uri: loginUrl, form: body, json: true }).then(
    isArray
  );
}
