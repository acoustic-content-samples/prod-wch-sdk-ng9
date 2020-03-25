import { join } from 'path';
import { ASSET_ROOT } from './../test/assets';

describe('fontface', () => {
  const ROOT = join(ASSET_ROOT, 'fonts');

  it('should generate a fontface definition', () => {
    console.log(ROOT);
  });
});
