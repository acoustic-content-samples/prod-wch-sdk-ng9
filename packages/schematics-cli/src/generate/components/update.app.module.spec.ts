import { join } from 'path';
import { TEST_DIR } from '../../test/assets';
import { rxReadTextFile } from '@acoustic-content-sdk/schematics-utils';
import { rxPipe, opShareLast } from '@acoustic-content-sdk/utils';
import { addModulesToAppModule } from './update.app.module';
import { tap, map } from 'rxjs/operators';
import { combineLatest } from 'rxjs';

describe('update.app.module.spec', () => {
  function expectModule(aSrc: string) {
    expect(aSrc.includes(`import { MODULES } from './modules';`)).toBeTruthy();
    expect(aSrc.includes(`...MODULES`)).toBeTruthy();
  }

  it('should insert a missing module', () => {
    const testPath = join(TEST_DIR, 'project', 'src', 'app', 'app.module.ts');

    const file$ = rxReadTextFile(testPath);
    // update
    const update$ = rxPipe(
      file$,
      map((file) => addModulesToAppModule(testPath, file)),
      tap(expectModule)
    );

    return update$.toPromise();
  });

  it('should not insert a missing module twice', () => {
    const testPath = join(TEST_DIR, 'project', 'src', 'app', 'app.module.ts');

    const file$ = rxReadTextFile(testPath);
    // update
    const update$ = rxPipe(
      file$,
      map((file) => addModulesToAppModule(testPath, file)),
      tap(expectModule),
      opShareLast
    );
    // next update
    const next$ = rxPipe(
      update$,
      map((file) => addModulesToAppModule(testPath, file)),
      tap(expectModule),
      opShareLast
    );

    const done$ = rxPipe(
      combineLatest(update$, next$),
      tap(([update, next]) => expect(update).toEqual(next))
    );

    return done$.toPromise();
  });
});
