import { rxPipe } from '@acoustic-content-sdk/rx-utils';
import { Observable } from 'rxjs';
import { pluck } from 'rxjs/operators';

import { rxReadPackageJson } from './package';

/**
 * Locates the version of this build
 *
 * @returns the build version of this file
 */
export function rxFindBuildVersion(): Observable<string> {
  // find the package
  return rxPipe(rxReadPackageJson(__dirname), pluck<any, string>('version'));
}
