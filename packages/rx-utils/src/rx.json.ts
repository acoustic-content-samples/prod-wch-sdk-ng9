/* Copyright IBM Corp. 2017 */
import { createError } from '@acoustic-content-sdk/utils';
import { readFile, writeFile } from 'graceful-fs';
import { getType } from 'mime';
import { Observable, Observer } from 'rxjs';

import { FileDescriptor } from './rx.walk';

export interface JsonFile<T> {
  desc: FileDescriptor;
  data: T;
}

function _readJSON<T>(aDesc: FileDescriptor): Observable<JsonFile<T>> {
  return Observable.create((observer: Observer<JsonFile<T>>) => {
    // read the file
    readFile(aDesc.absPath, 'utf-8', (err, data) => {
      if (err) {
        observer.error(err);
      } else {
        try {
          observer.next({ desc: aDesc, data: JSON.parse(data) });
          observer.complete();
        } catch (error) {
          observer.error(
            createError(`Unable to parse JSON file [${aDesc.absPath}].`, error)
          );
        }
      }
    });
  });
}

function _writeJSON<T>(aDesc: JsonFile<T>): Observable<FileDescriptor> {
  return Observable.create((observer: Observer<FileDescriptor>) => {
    try {
      // read the file
      writeFile(
        aDesc.desc.absPath,
        JSON.stringify(aDesc.data, undefined, 2),
        (err) => {
          if (err) {
            observer.error(err);
          } else {
            observer.next(aDesc.desc);
            observer.complete();
          }
        }
      );
    } catch (error) {
      observer.error(
        createError(`Unable to write JSON file [${aDesc.desc.absPath}].`, error)
      );
    }
  });
}

function _isJSON(aDesc: FileDescriptor): boolean {
  return getType(aDesc.absPath) === 'application/json';
}

export {
  _readJSON as rxReadJSON,
  _writeJSON as rxWriteJSON,
  _isJSON as isJSON
};
