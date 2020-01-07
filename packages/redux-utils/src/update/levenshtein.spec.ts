import { levenshteinMatrix } from './levenshtein';
import { ASSET_BASE } from '../utils/assets';
import { join } from 'path';
import { jsonParse, deepEquals } from '@acoustic-content-sdk/utils';
import { readFileSync } from 'fs';

describe('levenshtein', () => {
  const ASSETS = join(ASSET_BASE, 'levenshtein');

  it('should compute the standard matrix', () => {
    const src = 'levenshtein';
    const dst = 'meilenstein';

    // original document
    const filename = join(ASSETS, 'default.json');

    const mat = levenshteinMatrix(src, dst);
    const ref = jsonParse<number[][]>(readFileSync(filename, 'utf-8'));

    expect(deepEquals(mat, ref)).toBeTruthy();
  });
});
