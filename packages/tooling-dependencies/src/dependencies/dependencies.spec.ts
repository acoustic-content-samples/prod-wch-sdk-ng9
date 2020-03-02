import { PACKAGES } from '../utils/assets';
import { join } from 'path';
import { detectDependencies, findPeerDependencies } from './dependencies';

describe('dependencies', () => {
  it('should find dependencies', () => {
    // root
    const ROOT = join(PACKAGES, 'schematics-app', 'dist');
    // read the direct dependencies
    const deps$ = detectDependencies(ROOT);
    const peer$ = deps$.then(findPeerDependencies);

    const all$ = Promise.all([deps$, peer$]).then(([deps, peer]) =>
      Array.from(new Set([...deps, ...peer])).sort()
    );

    const lib$ = all$.then((res) =>
      console.log(JSON.stringify(res, undefined, 2))
    );
    const dep$ = all$
      .then((res) => res.reduce((aDst, r) => ({ ...aDst, [r]: '*' }), {}))
      .then((res) => console.log(JSON.stringify(res, undefined, 2)));

    return Promise.all([lib$, all$]);
  });
});
