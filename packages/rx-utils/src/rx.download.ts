/* Copyright IBM Corp. 2018 */
import { createWriteStream } from 'graceful-fs';
import { getRandom } from 'random-useragent';
import { get, OptionsWithUrl } from 'request';
import { Observable, Observer } from 'rxjs';

function _rxGetJson(aSrcUrl: string): Observable<string> {
  // the options
  const options: OptionsWithUrl = {
    url: aSrcUrl,
    headers: {
      'User-Agent': getRandom(),
      Accept: 'application/json'
    },
    json: true
  };
  // handle
  return Observable.create((aObserver: Observer<string>) => {
    // read
    const request = get(options, (reqError, resp, data) => {
      if (reqError) {
        aObserver.error(reqError);
      } else {
        aObserver.next(data);
        aObserver.complete();
      }
    });
    // cancel
    return () => request.abort();
  });
}

function _rxDownloadFile(
  aSrcUrl: string,
  aDstFile: string
): Observable<string> {
  // the options
  const options = {
    url: aSrcUrl,
    headers: {
      'User-Agent': getRandom()
    }
  };
  // handle
  return Observable.create((aObserver: Observer<string>) => {
    // read
    get(options)
      .on('error', (reqError: any) => aObserver.error(reqError))
      .pipe(createWriteStream(aDstFile))
      .on('error', (unzipError: any) => aObserver.error(unzipError))
      .on('close', () => {
        aObserver.next(aDstFile);
        aObserver.complete();
      });
  });
}

export { _rxDownloadFile as rxDownloadFile, _rxGetJson as rxGetJson };
