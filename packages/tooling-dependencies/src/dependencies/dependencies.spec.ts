import { PACKAGES } from '../utils/assets';
import { join } from 'path';
import { detectDependencies, findPeerDependencies } from './dependencies';

describe('dependencies', () => {
  it('should find dependencies', () => {
    // root
    const ROOT = join(PACKAGES, 'cli', 'dist');
    // read the direct dependencies
    const deps$ = detectDependencies(ROOT)
      .then(findPeerDependencies)
      .then((deps) => console.log(deps));

    return deps$;
  });
});
