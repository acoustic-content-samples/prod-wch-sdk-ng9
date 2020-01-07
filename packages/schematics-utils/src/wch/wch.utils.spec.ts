import { validateCredentials } from './wch.utils';
import { Credentials, wchGetCredentials } from '@acoustic-content-sdk/cli-credentials';
import { map } from '../../node_modules/rxjs/operators';

describe('wch.utils', () => {
  it('should validate credentials', () => {
    const cred: Credentials = {
      username: 'carsten.leue+deploy@gmail.com',
      password: 'XXX'
    };

    return validateCredentials(
      'https://my11.digitalexperience.ibm.com/api/86c74340-7871-4a9e-8775-aa86cea62ed4/',
      cred
    )
      .pipe(
        map((res) => {
          console.log('Carsten', res);
        })
      )
      .toPromise();
  });
});
