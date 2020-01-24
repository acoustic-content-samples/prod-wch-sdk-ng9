/* Copyright IBM Corp. 2018 */
import { mkdirp } from 'fs-extra';
import { createWriteStream } from 'graceful-fs';
import { join, normalize, resolve } from 'path';
import { concat, Observable, Observer } from 'rxjs';
import { ignoreElements, mergeMap, shareReplay } from 'rxjs/operators';
import { Entry, open, ZipFile } from 'yauzl';
import { rxDeleteFile } from './rx.delete';
import { rxDownloadFile } from './rx.download';
import { rxTmpFile } from './rx.tmp';

function _skipPrefix(aName: string, aCount: number): string | null {
  // current name
  let idx = 0;
  for (let i = 0; i < aCount; ++i) {
    // find the next separator
    const nextIdx = aName.indexOf('/', idx);
    if (nextIdx >= idx) {
      idx = nextIdx + 1;
    } else {
      return null;
    }
  }
  // split
  return aName.substring(idx);
}

/**
 * Extracts a single entry into the tree
 */
function _dstName(aSrcName: string, aDstDir: string, aSkip: number): string {
  // skip the prefix
  const path = _skipPrefix(aSrcName, aSkip);
  return path ? normalize(join(aDstDir, path)) : path;
}

/**
 * Opens a ZIP file and communicates the entries
 *
 * @param aZipFile - the zip file
 * @returns stream of entries in that file
 */
function _rxOpenZip(
  aZipFile: string,
  aDstDir: string,
  aSkip: number = 0
): Observable<string> {
  // callback
  return Observable.create((aObserver: Observer<string>) => {
    // open the zip file
    open(
      aZipFile,
      { lazyEntries: true },
      (error?: Error, zipFile?: ZipFile) => {
        // handle
        if (error) {
          aObserver.error(error);
        }
        if (zipFile) {
          // attach handlers
          zipFile.once('error', err => aObserver.error(err));
          // work on the entries
          zipFile.on('entry', (entry: Entry) => {
            // skip directories
            const fileName = entry.fileName;
            if (fileName.endsWith('/')) {
              // read next file
              zipFile.readEntry();
            } else {
              // check if we should read or skip
              const dstFileName = _dstName(entry.fileName, aDstDir, aSkip);
              if (dstFileName) {
                // find the parent directory and create it
                const dstDirName = resolve(dstFileName, '..');
                // make the directory
                mkdirp(dstDirName, errMkdir => {
                  // handle error
                  if (errMkdir) {
                    aObserver.error(errMkdir);
                  } else {
                    // consume file
                    zipFile.openReadStream(entry, (err, entryStream) => {
                      // handle error
                      if (err) {
                        aObserver.error(err);
                      } else {
                        // consume the stream
                        const stream = entryStream.pipe(
                          createWriteStream(dstFileName)
                        );
                        // handlers
                        stream.once('error', err => aObserver.error(err));
                        stream.once('close', () => {
                          // communicate
                          aObserver.next(dstFileName);
                          // read next file
                          zipFile.readEntry();
                        });
                      }
                    });
                  }
                });
              } else {
                // read next file
                zipFile.readEntry();
              }
            }
          });
          zipFile.once('close', () => aObserver.complete());
          // read the first entry
          zipFile.readEntry();
        } else {
          // nothing to work on
          aObserver.complete();
        }
      }
    );
  });
}

/**
 * Export the function to extract a zip file
 */
export const rxReadZip = _rxOpenZip;

export function rxUnzipFromUrl(
  aSrcUrl: string,
  aDstDir: string,
  aSkip: number = 0
): Observable<string> {
  // download file
  const onZipFile = rxTmpFile.pipe(
    mergeMap(tmp => rxDownloadFile(aSrcUrl, tmp)),
    shareReplay()
  );
  // unzip into the tree
  const onExtract = onZipFile.pipe(
    mergeMap(tmp => _rxOpenZip(tmp, aDstDir, aSkip))
  );
  // make sure to delete the file at the end
  const onDelete = onZipFile.pipe(
    mergeMap(rxDeleteFile),
    ignoreElements()
  );
  // execute
  return concat(onExtract, onDelete);
}
