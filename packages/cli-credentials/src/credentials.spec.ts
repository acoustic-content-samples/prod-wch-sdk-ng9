import { v4 } from 'uuid';
import {
  wchDecryptPassword,
  wchEncryptPassword,
  wchGetCredentials,
  wchLoadPrivateKey,
  wchLoadPublicKey,
  wchRemoveCredentials,
  wchStoreCredentials
} from './credentials';
import { Options, WchToolsOptions } from './types';
import { ensureTrailingSlash, removeTrailingSlash } from './url.utils';
import { isValidCredentials } from './validation';
import Promise from 'bluebird';

describe('credentials', () => {
  const opts: Options = {
    debug: true
  };

  const TEST_URL = 'http://www.example.org/api/';
  const TEST_USER = 'apikey';

  fit('should fallback for API URLs without a trailing slash', () => {
    // read
    const read$ = wchGetCredentials('http://www.example.org/api3', {
      debug: true
    });

    return read$.then(console.log);
  });

  it('should be able to store credentials without slash', () => {
    const url = removeTrailingSlash(TEST_URL);

    const tools: WchToolsOptions = {
      baseUrl: TEST_URL,
      username: TEST_USER,
      password: v4()
    };

    const stored$ = wchStoreCredentials(tools, opts);
    // read back
    const read$ = stored$.then(() => wchGetCredentials(url, opts));
    // validate
    const validated$ = read$.then(
      (cred) =>
        cred.username === tools.username && cred.password === tools.password
    );
    // remove
    const removed$ = validated$.then(() => wchRemoveCredentials(url));

    return Promise.resolve(validated$)
      .then((res) => expect(res).toBeTruthy())
      .finally(() => removed$);
  });

  it('should be able to store credentials with slash', () => {
    const url = ensureTrailingSlash(TEST_URL);

    const tools: WchToolsOptions = {
      baseUrl: TEST_URL,
      username: TEST_USER,
      password: v4()
    };

    const stored$ = wchStoreCredentials(tools, opts);
    // read back
    const read$ = stored$.then(() => wchGetCredentials(url, opts));
    // validate
    const validated$ = read$.then(
      (cred) =>
        cred.username === tools.username && cred.password === tools.password
    );
    // remove
    const removed$ = validated$.then(() => wchRemoveCredentials(url));

    return Promise.resolve(validated$)
      .then((res) => expect(res).toBeTruthy())
      .finally(() => removed$);
  });

  it('should be able to access the windows store', () => {
    const url =
      'https://my11.digitalexperience.ibm.com/api/86c74340-7871-4a9e-8775-aa86cea62ed4';
    const loaded$ = wchGetCredentials(url, opts);
    // validate
    const test$ = loaded$.then((c) =>
      expect(isValidCredentials(c)).toBeTruthy()
    );
    // ok
    return test$;
  });

  it('should be able to store a credential', () => {
    // the API URL
    const url =
      'http://localhost:3000/api/b3bb4fde-4893-4739-a1c3-4ca3dfe44e5b';
    // make sure it does not exist
    const removed$ = wchRemoveCredentials(url, opts);
    // store it
    const cred: WchToolsOptions = {
      baseUrl: url,
      username: 'carsten.leue@de.ibm.com',
      password: 'password'
    };
    const stored$ = removed$.then(() => wchStoreCredentials(cred, opts));
    // load it back
    const loaded$ = stored$.then(() => wchGetCredentials(url, opts));
    // validate
    const test$ = loaded$.then((c) => {
      expect(c.username).toBe(cred.username);
      expect(c.password).toBe(cred.password);
    });
    // ok
    return test$;
  });

  it('should encrypt and decrypt', () => {
    const pubKey$ = wchLoadPublicKey();
    const privKey$ = wchLoadPrivateKey();

    const test$ = Promise.all([pubKey$, privKey$]).then(([pubKey, privKey]) => {
      const pwd = 'This is my password';

      const hash = wchEncryptPassword(pwd, pubKey);

      const decrypted = wchDecryptPassword(hash, privKey);

      expect(decrypted).toEqual(pwd);
    });

    return test$;
  });
});
