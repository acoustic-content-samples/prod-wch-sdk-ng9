import {
  MergeStrategy,
  SchematicContext,
  Tree,
  VirtualTree
} from '@angular-devkit/schematics';

import { rxUnzipFromUrl } from './rx.zip';
import { tap } from 'rxjs/operators';
import { rxPipe } from '@acoustic-content-sdk/utils';

describe('rx.zip', () => {
  it('should unzip a file', () => {
    // sample file
    const url =
      'https://github.com/ibm-wch/wch-site-application/archive/master.zip';
    // download and unzip
    const tree = new VirtualTree();

    const onResult = rxPipe(
      rxUnzipFromUrl(tree, url, 'data', 1),
      tap(file => console.log('Carsten', file))
    );

    return onResult.toPromise();
  });
});
