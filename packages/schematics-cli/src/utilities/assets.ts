import { rxLocateDir, rxReadTextFile } from '@acoustic-content-sdk/schematics-utils';
import { jsonParse, rxPipe } from '@acoustic-content-sdk/utils';
import { join, normalize } from 'path';
import { MonoTypeOperatorFunction, Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

export function rxJoin(...aDirs: string[]): MonoTypeOperatorFunction<string> {
  return (base$) =>
    rxPipe(base$, map((base) => normalize(join(base, ...aDirs))));
}

function isPkg(aPkg: any): boolean {
  return aPkg.name === '@acoustic-content-sdk/schematics';
}

function isPkgDir(aDir: string): Observable<boolean> {
  return rxPipe(
    rxReadTextFile(join(aDir, 'package.json')),
    map(jsonParse),
    map(isPkg),
    catchError(() => of(false))
  );
}

/**
 * The package directory
 *
 * This should be the ONLY occurrence of '__dirname' in the project
 */
export const PKG_DIR$ = rxLocateDir(__dirname, isPkgDir);

export const ASSETS_DIR$ = rxPipe(PKG_DIR$, map((dir) => join(dir, 'assets')));
