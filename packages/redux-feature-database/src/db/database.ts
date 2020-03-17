import { User } from '@acoustic-content-sdk/api';
import {
  hashString,
  hashToIdentifier,
  longHash
} from '@acoustic-content-sdk/utils';
import { Observable } from 'rxjs';

import { MODULE } from '../version';

// some ID that identifies our app
const IDENTIFIER = MODULE;

export interface DataBase {
  read<T>(aId: string): Observable<T>;
  write(aId: string, aData: any): PromiseLike<string>;
}

/**
 * Returns a scope identifier for the API Url for a particular user
 *
 * @param aApiUrl - the API URL
 * @param aUser - the user object
 *
 * @returns a scope identifier
 */
export function getDataBaseScope(aApiUrl: string, aUser: User): string {
  // internal hash
  return hashToIdentifier(
    hashString(
      hashString(hashString(longHash(), IDENTIFIER), aApiUrl),
      aUser.id
    )
  );
}
