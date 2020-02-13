import { getOrganization } from './version';
import { MODULE } from './../version';

describe('version', () => {
  it('extract the organization from a module identifier', () => {
    const org = getOrganization(MODULE);
    expect(MODULE.startsWith(`@${org}/`)).toBeTruthy();

    expect(getOrganization('lodash')).toBeUndefined();
  });
});
