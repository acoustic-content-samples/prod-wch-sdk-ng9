import { readFile, writeFile } from 'fs-extra';
import { Observable, Observer } from 'rxjs';
import { map } from 'rxjs/operators';

const CRLF = /\r\n/g;

const CHARSET = 'utf-8';

function _stringify(aData: any): string {
  return JSON.stringify(aData, undefined, 2);
}

/**
 * Replaces carriage return and line feeds with line feeds
 *
 * @param aValue - the string to replace
 * @returns the normalized string
 */
function _normalizeNewline(aValue: string): string {
  return aValue.replace(CRLF, '\n').trim();
}

function _readBinaryFile(aPath: string): Observable<Buffer> {
  return Observable.create((observer: Observer<Buffer>) => {
    readFile(aPath, (errRead, data) => {
      if (errRead) {
        observer.error(errRead);
      } else {
        observer.next(data);
        observer.complete();
      }
    });
  });
}

function _readTextFile(aPath: string): Observable<string> {
  return Observable.create((observer: Observer<string>) => {
    readFile(aPath, CHARSET, (errRead, data) => {
      if (errRead) {
        observer.error(errRead);
      } else {
        observer.next(data);
        observer.complete();
      }
    });
  });
}

export function rxReadBinaryFile(aPath: string): Observable<Buffer> {
  return Observable.create((observer: Observer<Buffer>) => {
    readFile(aPath, (errRead, data) => {
      if (errRead) {
        observer.error(errRead);
      } else {
        observer.next(data);
        observer.complete();
      }
    });
  });
}

const _readJsonFile = (aPath: string) =>
  _readTextFile(aPath).pipe(map((data) => JSON.parse(data)));

function _writeTextFile(aPath: string, aData: string): Observable<string> {
  return Observable.create((observer: Observer<string>) =>
    _writeTextFileWithObserver(aPath, aData, observer)
  );
}

export function rxWriteBinaryFile(
  aPath: string,
  aData: Buffer
): Observable<string> {
  return Observable.create((observer: Observer<string>) =>
    _writeBinaryFileWithObserver(aPath, aData, observer)
  );
}

const _writeJsonFile = (aPath: string, aData: any) =>
  _writeTextFile(aPath, _stringify(aData));

function _writeBinaryFile(aPath: string, aData: Buffer): Observable<string> {
  return Observable.create((observer: Observer<string>) =>
    _writeBinaryFileWithObserver(aPath, aData, observer)
  );
}

const FILES: { [key: string]: string } = {};

function _writeTextFileWithObserver(
  aPath: string,
  aData: string,
  aObserver: Observer<string>
) {
  // validate that we do not write a file in parallel
  if (FILES[aPath]) {
    aObserver.error(`Trying to write ${aPath} in parallel.`);
  } else {
    // register the file
    FILES[aPath] = aData;
    // execute the operation
    writeFile(aPath, aData, CHARSET, (errWrite) => {
      // done
      delete FILES[aPath];
      // next
      if (errWrite) {
        aObserver.error(errWrite);
      } else {
        aObserver.next(aPath);
        aObserver.complete();
      }
    });
  }
}

function _stringDiffers(aLeft: string, aRight: string): boolean {
  return aLeft !== aRight;
}

function _bufferDiffers(aLeft: Buffer, aRight: Buffer): boolean {
  return !aLeft.equals(aRight);
}

function _writeBinaryFileWithObserver(
  aPath: string,
  aData: Buffer,
  aObserver: Observer<string>
) {
  writeFile(aPath, aData, (errWrite) => {
    if (errWrite) {
      aObserver.error(errWrite);
    } else {
      aObserver.next(aPath);
      aObserver.complete();
    }
  });
}

function _writeTextFileSafe(
  aPath: string,
  aData: string,
  bOverride: boolean
): Observable<string> {
  // normalize the lines
  const normData = _normalizeNewline(aData);

  return Observable.create((observer: Observer<string>) => {
    // first read the file
    readFile(aPath, CHARSET, (errRead, readData) => {
      // if the file does not exist, just write
      if (errRead) {
        // write the file
        _writeTextFileWithObserver(aPath, normData, observer);
      } else {
        /**
         * We have a file, check if we override
         */
        if (bOverride) {
          // only override if the data does not match
          const normRead = _normalizeNewline(readData);
          if (_stringDiffers(normData, normRead)) {
            // content differs, write the file
            _writeTextFileWithObserver(aPath, normData, observer);
          } else {
            // nothing to produce, files are identical
            observer.complete();
          }
        } else {
          // produce a gen file
          const genPath = aPath + '.$gen';
          // check if the generated file differs
          readFile(genPath, CHARSET, (errGen, genData) => {
            // gen file does not exist
            if (errGen) {
              // write the generated file
              _writeTextFileWithObserver(genPath, normData, observer);
            } else {
              // only override if the data does not match
              const normRead = _normalizeNewline(genData);
              if (_stringDiffers(normData, normRead)) {
                // content differs, write the file
                _writeTextFileWithObserver(genPath, normData, observer);
              } else {
                // nothing to produce
                observer.complete();
              }
            }
          });
        }
      }
    });
  });
}

function _writeBinaryFileSafe(
  aPath: string,
  aData: Buffer,
  bOverride: boolean
): Observable<string> {
  return Observable.create((observer: Observer<string>) => {
    // first read the file
    readFile(aPath, (errRead, readData) => {
      // if the file does not exist, just write
      if (errRead) {
        // write the file
        _writeBinaryFileWithObserver(aPath, aData, observer);
      } else {
        /**
         * We have a file, check if we override
         */
        if (bOverride) {
          // only override if the data does not match
          if (_bufferDiffers(aData, readData)) {
            // content differs, write the file
            _writeBinaryFileWithObserver(aPath, aData, observer);
          } else {
            // nothing to produce, files are identical
            observer.complete();
          }
        } else {
          // produce a gen file
          const genPath = aPath + '.$gen';
          // check if the generated file differs
          readFile(genPath, (errGen, genData) => {
            // gen file does not exist
            if (errGen) {
              // write the generated file
              _writeBinaryFileWithObserver(genPath, aData, observer);
            } else {
              // only override if the data does not match
              if (_bufferDiffers(aData, genData)) {
                // content differs, write the file
                _writeBinaryFileWithObserver(genPath, aData, observer);
              } else {
                // nothing to produce
                observer.complete();
              }
            }
          });
        }
      }
    });
  });
}

function _writeJsonFileSafe(
  aPath: string,
  aData: any,
  bOverride: boolean
): Observable<string> {
  // write the canonicalized file
  return _writeTextFileSafe(aPath, _stringify(aData), bOverride);
}

export {
  _writeJsonFileSafe as rxWriteJsonFileSafe,
  _writeTextFileSafe as rxWriteTextFileSafe,
  _writeBinaryFileSafe as rxWriteBinaryFileSafe,
  _readTextFile as rxReadTextFile,
  _writeTextFile as rxWriteTextFile,
  _readJsonFile as rxReadJsonFile,
  _writeJsonFile as rxWriteJsonFile
};
