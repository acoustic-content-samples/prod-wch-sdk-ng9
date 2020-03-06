import { DeliveryContentItem } from '@acoustic-content-sdk/api';
import { jsonParse } from '@acoustic-content-sdk/utils';
import { readFileSync } from 'fs';
import { JSDOM } from 'jsdom';
import { join } from 'path';

import { ASSET_DIR } from './../utils/assets';
import { colorToHSL } from './hsl';
import { createStylesFromTheme } from './theme.generator';

describe('driver', () => {
  // root
  const root = join(ASSET_DIR, 'theme');

  it('should be able to decode using a canvas', () => {
    const { window } = new JSDOM();
    const { document } = window;

    const canvas = document.createElement('canvas');
    canvas.width = 3;
    canvas.height = 3;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = 'blue';
    ctx.fillRect(0, 0, 3, 3);
    console.log(ctx.getImageData(1, 1, 1, 1));

    ctx.fillStyle = 'red';
    ctx.fillRect(0, 0, 1, 1);
    console.log(ctx.getImageData(0, 0, 1, 1));
  });

  it('should generate the styles', () => {
    // use the browser to transform names
    const { window } = new JSDOM();
    const { document } = window;
    // file
    const fileName = join(root, 'sample.theme.json');
    // read
    const content = jsonParse<DeliveryContentItem>(
      readFileSync(fileName, 'utf-8')
    );
    // transformer
    const transform = colorToHSL(document);
    // transform
    const transformed = createStylesFromTheme(content, transform);

    console.log('Content', transformed);
  });
});
