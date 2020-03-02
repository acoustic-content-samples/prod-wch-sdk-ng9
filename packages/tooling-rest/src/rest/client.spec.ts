import { createClient } from './client';

describe('client', () => {
  it('should login', () => {
    const { login } = createClient(
      'https://my13.digitalexperience.ibm.com/api/0cc53116-22cd-43d2-a419-fcf0a16289cb'
    );
    // login
    return (
      login()
        //      .then((c) => c.get('mydelivery/v2/sites/@current'))
        .then(console.log)
    );
  });
});
