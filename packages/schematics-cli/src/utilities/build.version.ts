import { findPackageJson } from '@acoustic-content-sdk/schematics-utils';
import { Observable } from 'rxjs';
import { pluck } from 'rxjs/operators';

export function findBuildVersion(): Observable<string> {
  // find the package
  return findPackageJson(__dirname).pipe(pluck<any, string>('version'));
}
