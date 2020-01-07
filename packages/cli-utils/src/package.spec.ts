import { rxPipe } from '@acoustic-content-sdk/rx-utils';
import { pluck, tap } from 'rxjs/operators';

import {
  PACKAGE_INSTALL,
  packageInstaller,
  rxReadPackageJson
} from './package';

describe('package', () => {
  it('should find the package json', () => {
    const pkg$ = rxReadPackageJson(__filename);
    const name$ = rxPipe(pkg$, pluck('name'));

    return rxPipe(
      name$,
      tap((name) => expect(name).toEqual('@acoustic-content-sdk/cli-utils'))
    ).toPromise();
  });

  it.skip('should install a dependency', () => {
    const inst = packageInstaller(
      'C:\\d\\ContentHub\\proto-bb-hackathon-feb-2019\\src\\app'
    );

    const res$ = inst(PACKAGE_INSTALL.DEV_DEPENDENCIES, '@acoustic-content-sdk/theme');

    return res$.toPromise();
  }, 200000);
});
