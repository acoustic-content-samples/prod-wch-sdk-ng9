import { AuthoringContentItem } from '@acoustic-content-sdk/api';
import { jsonParse } from '@acoustic-content-sdk/utils';
import { readFileSync } from 'fs';
import { join } from 'path';

import { ASSET_BASE } from '../utils/assets';
import { serializeDiff } from './diff';
import { createUpdater } from './update';

describe('diff', () => {
  const ASSETS = join(ASSET_BASE, 'diff');

  it('should diff a non trivial array', () => {
    // simple array
    const src = { elements: [{ value: 'a' }, 'b', 'c'] };
    const up = createUpdater(src);

    up.set('elements[0].value', 'a1');

    console.log(up.get());

    console.log(serializeDiff(src, up.get()));
  });

  it('should diff an array', () => {
    // simple array
    const src = { elements: ['a', 'b', 'c'] };
    const up = createUpdater(src);

    up.add('elements[1]', 'd');
    up.add('elements[4]', 'e');
    up.set('elements[3]', 'f');

    console.log(serializeDiff(src, up.get()));
  });

  it('should show diffs', () => {
    // original document
    const filename = join(
      ASSETS,
      'data',
      'content',
      '8c7076b7-ee92-4fed-a7c7-5a01361d58d7_cmd.json'
    );
    const src = jsonParse<AuthoringContentItem>(
      readFileSync(filename, 'utf-8')
    );

    const up = createUpdater(src);

    let newValue = up.set('elements.content.value', 'new value');
    newValue = up.set('links.retire', { href: 'http://www.example.com' });

    console.log(serializeDiff(src, newValue));
  });
});
