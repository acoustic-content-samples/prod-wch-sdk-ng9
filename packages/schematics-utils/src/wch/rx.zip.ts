/** Copyright IBM Corp. 2018 */
import { Tree } from '@angular-devkit/schematics';
import { isNotNil, opShareLast, rxPipe } from '@acoustic-content-sdk/utils';
import { join, normalize } from 'path';
import { concat, Observable, Observer } from 'rxjs';
import { ignoreElements, map, mergeMap } from 'rxjs/operators';
import { Writable } from 'stream';
import { Entry, open, ZipFile } from 'yauzl';

import { rxDeleteFile, rxTmpFile } from './rx.file';
import { rxDownload } from './rx.request';

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

class StreamOnBuffer extends Writable {
  buffers: Buffer[] = [];

  _write(chunk: any, encoding: string, callback: (err?: Error) => void) {
    this.buffers.push(chunk);
    callback();
  }

  _final(callback: Function) {
    callback();
    this.emit('close');
  }
}

export interface ZipEntry {
  fileName: string;
  data: Buffer;
}

/**
 * Extracts a single entry into the tree
 */
function _extractEntry(
  aEntry: ZipEntry,
  aTree: Tree,
  aDstDir: string,
  aSkip: number
): string {
  // skip the prefix
  const path = _skipPrefix(aEntry.fileName, aSkip);
  if (isNotNil(path)) {
    // create filename
    const fileName = normalize(join(aDstDir, path));
    // copy into the tree
    aTree.create(fileName, aEntry.data);
    // returns the target name
    return fileName;
  }
  // returns the path
  return path;
}

/**
 * Opens a ZIP file and communicates the entries
 *
 * @param aZipFile - the zip file
 * @returns stream of entries in that file
 */
function _rxOpenZip(aZipFile: string): Observable<ZipEntry> {
  return Observable.create((aObserver: Observer<ZipEntry>) => {
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
              // consume file
              zipFile.openReadStream(entry, (err, entryStream) => {
                // handle error
                if (err) {
                  aObserver.error(err);
                } else {
                  // consume the stream
                  const stream = entryStream.pipe(new StreamOnBuffer());
                  // handlers
                  stream.once('error', err => aObserver.error(err));
                  stream.once('close', () => {
                    // communicate
                    aObserver.next({
                      fileName,
                      data: Buffer.concat(stream.buffers)
                    });
                    // read next file
                    zipFile.readEntry();
                  });
                }
              });
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
  aTree: Tree,
  aSrcUrl: string,
  aDstDir: string,
  aSkip: number = 0
): Observable<string> {
  // download file
  const onZipFile = rxPipe(
    rxTmpFile,
    mergeMap(tmp => rxDownload(aSrcUrl, tmp)),
    opShareLast
  );
  // unzip into the tree
  const onExtract = rxPipe(
    onZipFile,
    mergeMap(tmp => _rxOpenZip(tmp)),
    map(entry => _extractEntry(entry, aTree, aDstDir, aSkip))
  );
  // make sure to delete the file at the end
  const onDelete = rxPipe(onZipFile, mergeMap(rxDeleteFile), ignoreElements());
  // execute
  return concat(onExtract, onDelete);
}
