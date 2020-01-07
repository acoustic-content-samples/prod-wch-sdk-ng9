import { execFile } from 'child_process';
import { RSA_PKCS1_PADDING } from 'constants';
import {
  privateDecrypt,
  publicEncrypt,
  RsaPrivateKey,
  RsaPublicKey
} from 'crypto';
import { readFile, stat, writeFile } from 'fs';
import { isFunction, isString } from 'lodash';
import { homedir, platform } from 'os';
import { join, normalize } from 'path';
import { env } from 'process';
import { parseKey } from 'sshpk';
import { parse } from 'url';
import { promisify } from 'util';

import {
  assertHasTrailingSlash,
  assertIsValidUserName,
  assertNotNull
} from './assert';
import { debugLog, noopLog } from './logger';
import { Credentials, Logger, Options, WchToolsOptions } from './types';
import { ensureTrailingSlash, removeTrailingSlash } from './url.utils';
import { isValidCredentials } from './validation';

const mkdirp = require('mkdirp');

const readFileAsync = promisify(readFile);
const writeFileAsync = promisify(writeFile);
const mkdirpAsync = promisify(mkdirp);
const statAsync = promisify(stat);
const execFileAsync = promisify(execFile);

const UTF8 = 'utf8';
const CRED_FOLDER = join(homedir(), '.acoustic-content-sdk-cli');
const CRED_FILE = '.credentials';

declare type StoredCredentials = Record<string, Credentials>;

declare type LoadCredentialCallback = (
  aUrl: string,
  aOptions: Context
) => Promise<Credentials>;

declare type StoreCredentialCallback = (
  aWchToolsOptions: WchToolsOptions,
  aOptions: Options
) => Promise<Credentials>;

const DEFAULT_OPTIONS: Options = {
  debug: false
};

interface Context extends Options {
  debug: boolean;
  logger: Logger;
  credman$?: Promise<string>;
}

/**
 * Logging helper for promises
 *
 * @param aLogger -   logger to log to
 * @param aParams -   static params
 * @returns logging callback
 */
function log$<T>(aLogger: Logger, ...aParams: any[]): (aValue: T) => T {
  return (aValue: T) => {
    aLogger(...aParams, aValue);
    return aValue;
  };
}

function _resolveOptions(aOptions?: Options): Context {
  // resolve the options
  const opts: Options = aOptions
    ? { ...DEFAULT_OPTIONS, ...aOptions }
    : { ...DEFAULT_OPTIONS };
  // make the fields mandatory
  return {
    debug: !!opts.debug,
    logger: opts.logger || opts.debug ? debugLog : noopLog
  };
}

function logCred$<T>(aLogger: Logger, ...aParams: any[]): (aValue: T) => T {
  // the logging callback
  return (aCredentials: T) => {
    // log the credentials
    if (aCredentials) {
      const logCred: any = Object.assign({}, aCredentials);
      const pwd = logCred.password;
      if (isString(pwd) && pwd.length > 0) {
        logCred.password = '***';
      }
      // log
      aLogger(...aParams, JSON.stringify(logCred));
    } else {
      // log the undefined object
      aLogger(...aParams, aCredentials);
    }
    // ok
    return aCredentials;
  };
}

const PADDING_MODE = RSA_PKCS1_PADDING;

function _loadPrivateKey(): Promise<RsaPrivateKey> {
  // filename
  const name = join(homedir(), '.ssh', 'id_rsa');
  return readFileAsync(name, UTF8).then((key) => ({
    key,
    padding: PADDING_MODE
  }));
}

function _loadPublicKey(): Promise<RsaPublicKey> {
  // filename
  const name = join(homedir(), '.ssh', 'id_rsa.pub');
  return readFileAsync(name, UTF8)
    .then((key) => parseKey(key, 'auto').toString('pkcs1'))
    .then((key) => ({ key, padding: PADDING_MODE }));
}

const ENCRYPTED_ENCODING = 'base64';
const DECTYPTED_ENCODING = UTF8;

function _encryptPassword(aPassword: string, aKey: RsaPublicKey): string {
  // encrypt
  return publicEncrypt(
    aKey,
    Buffer.from(aPassword, DECTYPTED_ENCODING)
  ).toString(ENCRYPTED_ENCODING);
}

function _decryptPassword(aHash: string, aKey: RsaPrivateKey): string {
  return privateDecrypt(aKey, Buffer.from(aHash, ENCRYPTED_ENCODING)).toString(
    DECTYPTED_ENCODING
  );
}

function _setCredentials(
  aWchToolsOptions: WchToolsOptions,
  aKey: RsaPublicKey,
  aData: StoredCredentials
): StoredCredentials {
  // validate the URL
  assertHasTrailingSlash(aWchToolsOptions.baseUrl);
  // credentials
  const cred: Credentials = {
    username: aWchToolsOptions.username,
    password: _encryptPassword(aWchToolsOptions.password, aKey)
  };
  // store
  aData[aWchToolsOptions.baseUrl] = cred;
  // ok
  return aData;
}

function _emptyCredentials(): Credentials {
  return {
    username: '',
    password: ''
  };
}

function _createCredentials(aUserName: string, aPassword: string): Credentials {
  return {
    username: aUserName,
    password: aPassword
  };
}

const ENV_USERNAME = 'ibm_wch_sdk_cli_username';
const ENV_PASSWORD = 'ibm_wch_sdk_cli_password';
const ENV_API_URL = 'ibm_wch_sdk_cli_url';

function _getCredentialsFromEnvironment(aOptions: Context): Credentials {
  // log
  const logger = aOptions.logger;
  // access the credentials from the environment
  const username = env[ENV_USERNAME] || '';
  const password = env[ENV_PASSWORD] || '';
  // construct
  const res: Credentials = { username, password };
  // log this
  logCred$(logger, 'getCredentialsFromEnvironment')(res);
  // ok
  return res;
}

/**
 * Merge different credentials layers
 *
 * @param aBase -         base layer
 * @param aOverride -     override layer
 *
 * @returns the merged credentials
 */
function _mergeCredentials(
  aBase: Credentials,
  aOverride?: Credentials
): Credentials {
  // target
  if (!aOverride) {
    return aBase;
  }
  // clone
  const cred = { ...aBase };
  // override
  if (!!aOverride.username) {
    cred.username = aOverride.username;
  }
  if (!!aOverride.password) {
    cred.password = aOverride.password;
  }
  // ok
  return cred;
}

/**
 * Loads the stored credentials
 *
 * @returns the credentials
 */
function _loadStoredCredentials(aOptions: Options): Promise<StoredCredentials> {
  // log
  const logger = aOptions.logger;
  // credential file name
  const filename = join(CRED_FOLDER, CRED_FILE);
  // log this
  logger('loadStoredCredentials', filename);
  // current credentials
  const currentCred$: Promise<StoredCredentials> = readFileAsync(filename, UTF8)
    .then((data) => JSON.parse(data) as StoredCredentials)
    .catch(() => ({}))
    .then(log$<StoredCredentials>(logger, 'loadStoredCredentials'));
  // ok
  return currentCred$;
}

/**
 * Persists the credentials to the target location
 *
 * @param aCred -     the credentials
 * @param aOptions -  the options
 *
 * @returns promise with the persisted filename
 */
function _writeStoredCredentials(
  aCred: StoredCredentials,
  aOptions: Options
): Promise<string> {
  // log
  const logger = aOptions.logger;
  // log this
  logger('writeStoredCredentials', aCred);
  // target folder and file
  const folder = CRED_FOLDER;
  const filename = join(folder, CRED_FILE);
  // create the directory
  const folder$ = mkdirpAsync(folder);
  // write
  return folder$
    .then(() => writeFileAsync(filename, JSON.stringify(aCred), UTF8))
    .then(() => filename)
    .then(log$<string>(logger, 'writeStoredCredentials'));
}

/**
 * Loads credentials from the disk
 *
 * @param aApiBase -  the API URL
 * @param aOptions -  debugging options
 *
 * @returns the credentials
 */
function _loadCredentials(
  aApiBase: string,
  aOptions: Context
): Promise<Credentials> {
  // log
  const logger = aOptions.logger;
  // validate the URL
  assertHasTrailingSlash(aApiBase);
  // read the credential
  const key$ = _loadPrivateKey();
  // load the credentials file
  const cred$: Promise<Credentials> = _loadStoredCredentials(aOptions)
    // extract the credential record
    .then((data) => data[aApiBase]);
  // combine to decrypt
  return (
    Promise.all([key$, cred$])
      // decrypt the password
      .then(([key, cred]) =>
        cred
          ? {
              ...cred,
              password: _decryptPassword(cred.password, key)
            }
          : cred
      )
      // safeguard
      .catch((err) => {
        // log this
        logger('loadCredentials', err);
        // fallback to empty credentials
        return _emptyCredentials();
      })
      // log the loading process
      .then(logCred$<Credentials>(logger, 'loadCredentials'))
  );
}

function _storeWindowsCredentials(
  aWchToolsOptions: WchToolsOptions,
  aOptions?: Context
): Promise<Credentials> {
  // log
  const logger = aOptions.logger;
  // validate the URL
  assertHasTrailingSlash(aWchToolsOptions.baseUrl);
  assertIsValidUserName(aWchToolsOptions.username);
  // locate the path
  const path$ = _getCredMan(aOptions);
  // construct the observable
  const exec$ = path$.then((cmd) =>
    execFileAsync(cmd, [
      aWchToolsOptions.baseUrl,
      aWchToolsOptions.username,
      aWchToolsOptions.password
    ])
  );
  // produce the result
  return exec$
    .then((res) => res.stdout)
    .then((data) => JSON.parse(data) as Credentials)
    .then(logCred$<Credentials>(logger, 'storeWindowsCredentials'));
}

/**
 * Returns the proper fallback depending on the platform
 *
 * @returns the callback
 */
function _getStoreCredentialCallback(): StoreCredentialCallback {
  // handle the platform
  switch (platform()) {
    case 'win32':
      return _storeWindowsCredentials;
    case 'darwin':
      return _storeMacCredentials;
    default:
      return null;
  }
}

function _storeCredentials(
  aWchToolsOptions: WchToolsOptions,
  aOptions?: Options
): Promise<string> {
  // read the credential
  const key$ = _loadPublicKey();
  // current credentials
  const currentCred$: Promise<StoredCredentials> = _loadStoredCredentials(
    aOptions
  );
  // update the credentials
  const updatedCred$ = Promise.all([key$, currentCred$]).then(([key, cred]) =>
    _setCredentials(aWchToolsOptions, key, cred)
  );
  // write
  return updatedCred$.then((data) => _writeStoredCredentials(data, aOptions));
}

const SYSTEM_FILE = '%system';

function _writeCredentials(
  aWchToolsOptions: WchToolsOptions,
  aOptions?: Options
): Promise<string> {
  // resolve the options
  const opts = _resolveOptions(aOptions);
  // fix the base URL
  const wchToolsOptions: WchToolsOptions = {
    ...aWchToolsOptions,
    baseUrl: ensureTrailingSlash(aWchToolsOptions.baseUrl || env[ENV_API_URL])
  };
  // logger
  const logger = opts.logger;
  // the result
  let file$: Promise<string>;
  // get the callback
  const cb = _getStoreCredentialCallback();
  // check if we have a specific callback
  if (isFunction(cb)) {
    // check the callback first
    file$ = cb(wchToolsOptions, opts).then(
      (cred) =>
        isValidCredentials(cred)
          ? SYSTEM_FILE
          : _storeCredentials(wchToolsOptions, opts),
      (err) => _storeCredentials(wchToolsOptions, opts)
    );
  } else {
    // just store
    file$ = _storeCredentials(wchToolsOptions, opts);
  }
  // add logging
  return file$.then(log$<string>(logger, 'writeCredentials'));
}

function _removeCredentials(
  aApiUrl: string,
  aOptions?: Options
): Promise<string> {
  // resolve the options
  const opts = _resolveOptions(aOptions);
  // url fallback
  const apiUrl = aApiUrl || env[ENV_API_URL];
  // current credentials
  const currentCred$: Promise<StoredCredentials> = _loadStoredCredentials(opts);
  // update the credentials
  const updatedCred$ = currentCred$.then((data) => {
    // remove the URL entry
    delete data[apiUrl];
    return data;
  });
  // write
  return updatedCred$.then((data) => _writeStoredCredentials(data, opts));
}

/**
 * Tests if a file exists and returns the filename or undefined if it does not exist
 *
 * @param aPath -   path to the file
 * @returns path or undefined
 */
function _execExists(aPath: string): Promise<string> {
  return statAsync(aPath)
    .then((stats) => (stats.isFile() ? aPath : undefined))
    .catch(() => undefined);
}

const CREDMAN_PATH = ['assets', 'credman', process.arch, 'WchCredMan.exe'];
const SECURITY_PATH = '/usr/bin/security';

function _getMacCredentials(
  aApiUrl: string,
  aOptions: Context
): Promise<Credentials> {
  // method
  const LOG_METHOD = 'getMacCredentials';
  // log
  const logger = aOptions.logger;
  // try to load mac credentials
  logger(LOG_METHOD, aApiUrl);
  // split the URL
  const urlSplit = parse(aApiUrl);
  // codes
  const protocolCode = urlSplit.protocol === 'https:' ? 'htps' : 'http';
  const server = urlSplit.hostname;
  const path = urlSplit.pathname;
  const port = urlSplit.port;
  // build the command
  const args = ['find-internet-password', '-g', '-r', protocolCode];
  if (isString(server) && server.length > 0) {
    args.push('-s', server);
  }
  if (isString(path) && path.length > 0) {
    args.push('-p', path);
  }
  if (isString(port) && port.length > 0) {
    args.push('-P', port);
  }
  // log this
  logger(LOG_METHOD, SECURITY_PATH, ...args);
  // executable
  const res$ = execFileAsync(SECURITY_PATH, args);
  const stdout$ = res$.then((res) => res.stdout);
  const stderr$ = res$.then((res) => res.stderr);
  // parse the password
  const pwd$ = stderr$.then((password) => {
    // test for the last line
    if (/password/.test(password)) {
      // When keychain escapes a char into octal it also includes a hex
      // encoded version.
      //
      // e.g. password 'passWith\' becomes:
      // password: 0x70617373576974685C  "passWith\134"
      //
      // And if the password does not contain ASCII it leaves out the quoted
      // version altogether:
      //
      // e.g. password '∆˚ˆ©ƒ®∂çµ˚¬˙ƒ®†¥' becomes:
      // password: 0xE28886CB9ACB86C2A9C692C2AEE28882C3A7C2B5CB9AC2ACCB99C692C2AEE280A0C2A5
      if (/0x([0-9a-fA-F]+)/.test(password)) {
        const hexPassword = password.match(/0x([0-9a-fA-F]+)/)[1];
        return Buffer.from(hexPassword, 'hex').toString();
      }
      // Otherwise the password will be in quotes:
      // password: "passWithoutSlash"
      else {
        return password.match(/"(.*)\"/)[1];
      }
    } else {
      // no password
      return '';
    }
  });
  // username
  const username$ = stdout$.then(
    (out) => /\"acct\"<blob>\s*=\s*\"([^\"]+)\"/gm.exec(out)[1]
  );
  // convert
  return Promise.all([username$, pwd$])
    .then(([username, password]) => _createCredentials(username, password))
    .then(logCred$<Credentials>(logger, LOG_METHOD));
}

/**
 * Persists the credentials in the Mac Credential store
 *
 * @param aWchToolsOptions -  credentials and API URL
 * @param aOptions -  options
 *
 * @returns the credentials
 */
function _storeMacCredentials(
  aWchToolsOptions: WchToolsOptions,
  aOptions: Options
): Promise<Credentials> {
  // log
  const logger = aOptions.logger;
  // validate the URL
  assertHasTrailingSlash(aWchToolsOptions.baseUrl);
  assertIsValidUserName(aWchToolsOptions.username);
  // split the URL
  const urlSplit = parse(aWchToolsOptions.baseUrl);
  // codes
  const protocolCode = urlSplit.protocol === 'https:' ? 'htps' : 'http';
  const server = urlSplit.hostname;
  const path = urlSplit.pathname;
  const port = urlSplit.port;
  // build the command
  const args = [
    'add-internet-password',
    '-a',
    aWchToolsOptions.username,
    '-r',
    protocolCode,
    '-A',
    '-U'
  ];
  if (isString(server) && server.length > 0) {
    args.push('-s', server);
  }
  if (isString(path) && path.length > 0) {
    args.push('-p', path);
  }
  if (isString(port) && port.length > 0) {
    args.push('-P', port);
  }
  // log this
  logger('storeMacCredentials', SECURITY_PATH, ...args);
  // add password
  args.push('-w', aWchToolsOptions.password);
  // executable
  const res$ = execFileAsync(SECURITY_PATH, args);
  // map back to credentials
  return res$
    .then(() =>
      _createCredentials(aWchToolsOptions.username, aWchToolsOptions.password)
    )
    .then(logCred$<Credentials>(logger, 'getMacCredentials'));
}

/**
 * Returns the Mac Credentials. Tests for a URL with trailing slash, first, the
 * for the URL without a trailing slash
 *
 * @param aApiUrl -   the API URL with or without slash
 * @param aOptions -  the options
 */
function _getCredentialsWithFallback(
  aApiUrl: string,
  aCallback: LoadCredentialCallback,
  aOptions: Context
): Promise<Credentials> {
  // test for trailing and non-trailing slash
  const apiUrlSlash = ensureTrailingSlash(aApiUrl);
  const apiUrlNoSlash = removeTrailingSlash(aApiUrl);
  // test both versions
  return aCallback(apiUrlSlash, aOptions).then(
    (cred) =>
      isValidCredentials(cred) ? cred : aCallback(apiUrlNoSlash, aOptions),
    (err) => aCallback(apiUrlNoSlash, aOptions)
  );
}

/**
 * Finds the path to the credman utility
 *
 * @param aOptions -  the debug options
 * @returns the desired path
 */
function _getCredMan(aOptions: Context): Promise<string> {
  // quick check
  if (aOptions.credman$) {
    return aOptions.credman$;
  }
  // log
  const logger = aOptions.logger;
  // find the executable
  const pathTest$ = _execExists(
    normalize(join(__dirname, '..', ...CREDMAN_PATH))
  );
  const pathLib$ = _execExists(
    normalize(join(__dirname, '..', '..', ...CREDMAN_PATH))
  );
  // locate the path
  const path$ = Promise.all([pathTest$, pathLib$])
    .then(([pathTest, pathLib]) => pathTest || pathLib)
    .then(log$<string>(logger, 'getCredMan'));
  // ok
  return (aOptions.credman$ = path$);
}

function _getWindowsCredentials(
  aApiUrl: string,
  aOptions: Context
): Promise<Credentials> {
  // method
  const LOG_METHOD = 'getWindowsCredentials';
  // log
  const logger = aOptions.logger;
  // try to load windows credentials
  logger(LOG_METHOD, aApiUrl);
  // locate the path
  const path$ = _getCredMan(aOptions);
  // construct the observable
  const exec$ = path$.then((cmd) => execFileAsync(cmd, [aApiUrl]));
  // produce the result
  return exec$
    .then((res) => res.stdout)
    .then((data) => JSON.parse(data) as Credentials)
    .then(logCred$<Credentials>(logger, LOG_METHOD));
}

function _getMacCredentialsWithFallback(
  aApiUrl: string,
  aOptions: Context
): Promise<Credentials> {
  // dispatch
  return _getCredentialsWithFallback(aApiUrl, _getMacCredentials, aOptions);
}

function _getWindowsCredentialsWithFallback(
  aApiUrl: string,
  aOptions: Context
): Promise<Credentials> {
  // dispatch
  return _getCredentialsWithFallback(aApiUrl, _getWindowsCredentials, aOptions);
}

/**
 * Returns the proper fallback depending on the platform
 *
 * @returns the callback
 */
function _getLoadCredentialCallback(): LoadCredentialCallback {
  // handle the platform
  switch (platform()) {
    case 'win32':
      return _getWindowsCredentialsWithFallback;
    case 'darwin':
      return _getMacCredentialsWithFallback;
    default:
      return null;
  }
}

function _getStoredCredentials(
  aApiUrl: string,
  aOptions: Context
): Promise<Credentials> {
  // the key
  const key = ensureTrailingSlash(aApiUrl);
  // log
  const logger = aOptions.logger;
  logger('getStoredCredentials', key);
  // the result
  let cred$: Promise<Credentials>;
  // callback
  const cb = _getLoadCredentialCallback();
  // normalize the URL
  if (isFunction(cb)) {
    // load the credentials module
    cred$ = cb(key, aOptions)
      .then((cred) =>
        isValidCredentials(cred) ? cred : _loadCredentials(key, aOptions)
      )
      .catch(() => _loadCredentials(key, aOptions));
  } else {
    // linux like fallback
    cred$ = _loadCredentials(key, aOptions);
  }
  // add logging
  return cred$.then(logCred$<Credentials>(logger, 'getStoredCredentials'));
}

/**
 * Reads the credentials for the given API URL
 *
 * @param aApiUrl - the API URL
 * @param aOptions - options for debugging and logging
 *
 * @returns a promise of the loaded credentials
 */
export function wchGetCredentials(
  aApiUrl: string,
  aOptions?: Options
): Promise<Credentials> {
  // resolve the options
  const opts = _resolveOptions(aOptions);
  // url fallback
  const apiUrl = aApiUrl || env[ENV_API_URL];
  assertNotNull(apiUrl, 'apiUrl');
  // return
  return _getStoredCredentials(apiUrl, opts)
    .then((cred) =>
      _mergeCredentials(_getCredentialsFromEnvironment(opts), cred)
    )
    .catch((err) => _getCredentialsFromEnvironment(opts));
}

export {
  _loadPrivateKey as wchLoadPrivateKey,
  _loadPublicKey as wchLoadPublicKey,
  _decryptPassword as wchDecryptPassword,
  _encryptPassword as wchEncryptPassword,
  _writeCredentials as wchStoreCredentials,
  _removeCredentials as wchRemoveCredentials
};
