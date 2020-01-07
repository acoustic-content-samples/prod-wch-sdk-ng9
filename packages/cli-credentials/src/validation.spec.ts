import { wchGetCredentials } from './credentials';
import { isValidApiUrl, isValidUrl, isValidWchToolsOptions } from './validation';

describe('validation', () => {
  it('should validate a API URL with credentials', () => {
    const url =
      'https://my13.digitalexperience.ibm.com/api/d1b9fd9b-402a-4cd0-9d60-c2d8e18db4d0';

    // get the credentials
    const cred$ = wchGetCredentials(url);

    const res$ = cred$.then(cred =>
      isValidWchToolsOptions({ baseUrl: url, ...cred })
    );

    return res$.then(bRes => expect(bRes).toBeTruthy());
  });

  it('should validate a API URL', () => {
    const res$ = isValidApiUrl(
      'https://www.digitalexperience.ibm.com/api/86c74340-7871-4a9e-8775-aa86cea62ed4'
    );

    return res$.then(bRes => expect(bRes).toBeTruthy());
  });

  it('should validate a URL', () => {
    const res = isValidUrl(
      'https://www.digitalexperience.ibm.com/api/86c74340-7871-4a9e-8775-aa86cea62ed4'
    );

    expect(res).toBeTruthy();
  });
});
