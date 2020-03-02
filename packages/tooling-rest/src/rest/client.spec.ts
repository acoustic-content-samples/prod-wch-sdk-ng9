import { createClient } from './client';
import { ContentItemWithLayout } from '@acoustic-content-sdk/api';
import { authoringContent } from './content';
import { site } from './sites';

describe('client', () => {
  it('should login', () => {
    const { login } = createClient(
      'https://my13.digitalexperience.ibm.com/api/0cc53116-22cd-43d2-a419-fcf0a16289cb'
    );
    // login
    return login()
      .then((c) => {
        // content
        const getSite = site(c);
        const getContent = authoringContent(c);
        // current site
        const siteId$ = getSite().then(({ id }) => id);
        return siteId$.then(getContent);
      })
      .then(console.log);
  });
});
