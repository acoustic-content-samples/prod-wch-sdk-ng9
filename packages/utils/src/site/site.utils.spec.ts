import { RenderingContext } from '@acoustic-content-sdk/api';
import { pageFromRenderingContext } from './site.utils';

describe('site.utils', () => {
  const simple: RenderingContext = require('./simple-rc.json');

  it('should decode the page from a simple context', () => {
    const page = pageFromRenderingContext(simple);

    expect(page.id).toBe('id2');
  });
});
