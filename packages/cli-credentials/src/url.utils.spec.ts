import { ensureTrailingSlash } from './url.utils';

describe('url.utils', () => {
  it('should ensure a trailing slash', () => {
    expect(ensureTrailingSlash('http://www.example.org/test')).toEqual(
      'http://www.example.org/test/'
    );
    expect(ensureTrailingSlash('http://www.example.org/test/')).toEqual(
      'http://www.example.org/test/'
    );
  });
});
