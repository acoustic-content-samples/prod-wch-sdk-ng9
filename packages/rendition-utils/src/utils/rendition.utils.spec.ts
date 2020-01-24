/** Copyright IBM Corp. 2017 */
import { Image } from '@acoustic-content-sdk/api';

import { getSourceSet } from './rendition.utils';

describe('rendition.utils', () => {
  it('should produce a source set', () => {
    // construct some simple image
    const img: Image = {
      renditions: {
        default: {
          renditionId: '1',
          source: '',
          url: '/default',
          width: 800,
          height: 600
        },
        r1: {
          renditionId: '1',
          source: '',
          url: '/r1',
          width: 640,
          height: 480
        },
        r2: {
          renditionId: '1',
          source: '',
          url: '/r2',
          width: 320,
          height: 200
        },
        r3: {
          renditionId: '1',
          source: '',
          url: '/r3',
          width: 640,
          height: 400
        }
      }
    };

    console.log(getSourceSet(img, 'http://localhost'));
  });
});
