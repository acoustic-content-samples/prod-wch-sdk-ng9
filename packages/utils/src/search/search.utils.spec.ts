/** Copyright IBM Corp. 2017 */
import { luceneEscapeTerm, luceneEscapeKeyValue } from './search.utils';
import { parse } from 'lucene';

describe('search.utils', () => {
  it('should escape key and value', () => {
    const escaped = luceneEscapeKeyValue('paths', '/shop/Bath');
    expect(escaped).toEqual('paths:("/shop/Bath")');
  });

  it('should escape special characters', () => {
    // test query
    const query = '(1+1):2';

    const escaped = luceneEscapeTerm(query);
    expect(escaped).toEqual('\\(1\\+1\\)\\:2');
  });
});
