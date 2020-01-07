import { createWriteStream, PathLike } from 'fs';
import { get } from 'request';
import { Observable } from 'rxjs';
import { ajax, AjaxRequest } from 'rxjs/ajax';
import { map } from 'rxjs/operators';
import { createFromCallback } from './rx.node';

/* Copyright IBM Corp. 2017 */
export const createXHR = () => {
  const XMLHttpRequest = require('xhr2');
  return new XMLHttpRequest();
};

export const ajaxRequest = (req: AjaxRequest) =>
  ajax({ ...req, responseType: 'text', createXHR }).pipe(
    map((resp) => resp.response as string)
  );

export function rxGet(aUri: string): Observable<string> {
  // setup the request
  return ajaxRequest({
    url: aUri
  });
}

export function rxGetJson(aUri: string): Observable<any> {
  return rxGet(aUri).pipe(map((data) => JSON.parse(data)));
}

export function rxFormPost(aUri: string, aData: any): Observable<string> {
  // setup the request
  return ajaxRequest({
    method: 'POST',
    url: aUri,
    body: aData
  });
}

export function rxDownload<T extends PathLike>(
  aUri: string,
  aDstFile: T
): Observable<T> {
  // observable wrapper
  return createFromCallback<T>((cb) => {
    // load into a file
    const stream = get(aUri).pipe(createWriteStream(aDstFile));
    // error handling
    stream.once('error', cb);
    stream.once('close', () => cb(null, aDstFile));
  });
}
