import { rxPipe } from '@acoustic-content-sdk/utils';
import { mergeMap } from 'rxjs/operators';

import { rxDeleteFile, rxTmpFile } from './rx.file';
import { rxDownload, createXHR } from './rx.request';

describe('rx.request', () => {
  it('should create an XHR', () => {
    const xhr = createXHR();
    expect(xhr).toBeDefined();
  });

  it('should create a temp file', () => {
    const url = 'https://www.ibm.com/favicon.ico';

    const onDownloaded = rxPipe(
      rxTmpFile,
      mergeMap((file) => rxDownload(url, file)),
      mergeMap(rxDeleteFile)
    );

    return onDownloaded.toPromise();
  });
});
