import { opDistinctUntilChanged, rxPipe } from '@acoustic-content-sdk/utils';
import { merge } from 'rxjs';
import { count, mergeMap, tap } from 'rxjs/operators';

import { rxDeleteFile, rxTmpFile } from './rx.file';

describe('rx.file', () => {
  it('should create a temp file', () => {
    // temp file
    const onTmpFile = rxTmpFile;

    // make sure that each invocation creates a new file
    const onFiles = rxPipe(
      merge(onTmpFile, onTmpFile),
      opDistinctUntilChanged,
      mergeMap(rxDeleteFile),
      count(),
      tap(num => expect(num).toBe(2))
    );

    return onFiles.toPromise();
  });
});
