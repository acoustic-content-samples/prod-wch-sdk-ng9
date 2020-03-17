import { LoggerService, User } from '@acoustic-content-sdk/api';
import { EMPTY, Observable } from 'rxjs';

import { DataBase } from './database';

export function openNoopDataBase(
  aApiUrl: string,
  aUser: User,
  aLoggerService: LoggerService
): DataBase {
  function read<T>(): Observable<T> {
    return EMPTY;
  }

  function write(aId: string): PromiseLike<string> {
    return Promise.resolve(aId);
  }

  return { read, write };
}
