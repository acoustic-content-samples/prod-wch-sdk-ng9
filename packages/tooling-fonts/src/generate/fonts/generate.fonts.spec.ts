import { tmpdir } from 'os';
import { join } from 'path';
import { generateFonts } from './generate.fonts';
import { mkdir } from 'fs';

describe('fonts', () => {
  it('should generate font descriptors', () => {

    const tmp = join(tmpdir(), 'data');

    return generateFonts('roboto', tmp).toPromise();


  });
});
