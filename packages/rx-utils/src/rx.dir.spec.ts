import { join } from 'path';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { rxLocateDir } from './rx.dir';
import { rxStats } from './rx.walk';

describe('rx.dir', () => {
  it('should locate the package json', () => {
    // handler that finds the package
    function rxFindPackage(aDir: string): Observable<boolean> {
      // name
      const pkg = join(aDir, 'package.json');
      return rxStats(pkg).pipe(
        map(s => s.isFile()),
        catchError(err => of(false))
      );
    }

    const pkgDir$ = rxLocateDir(__dirname, rxFindPackage).pipe(
      tap(dir => expect(dir).toBeDefined())
    );

    return pkgDir$.toPromise();
  });
});
