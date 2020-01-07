import { readFileSync } from 'fs';
import { ASSET_BASE } from '../utils/assets';
import { join } from 'path';
import { jsonParse } from '@acoustic-content-sdk/utils';
import { AuthoringContentItem } from '@acoustic-content-sdk/api';
import { createUpdater } from './update';
import { invarianceChecker } from './invariance';

describe('invariance', () => {
  const ASSETS = join(ASSET_BASE, 'invariance');

  it('should check for invariance', () => {});

  // original document
  const filename = join(
    ASSETS,
    'data',
    'content',
    '8c7076b7-ee92-4fed-a7c7-5a01361d58d7_cmd.json'
  );
  const src = jsonParse<AuthoringContentItem>(readFileSync(filename, 'utf-8'));

  // invariance check
  const inv = invarianceChecker(src);

  const up = createUpdater(src);

  up.set('elements.content.value', 'new value');

  const inv1 = invarianceChecker(up.get());

  up.set('links.retire', { href: 'http://www.example.com' });

  // expect that the element was invariant
  expect(inv()).toBeTruthy();
  expect(inv1()).toBeFalsy();
});
