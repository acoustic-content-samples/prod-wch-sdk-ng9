import { ensureDirPath } from './url.utils';

describe('url.utils', () => {
  it('should fix directory names', () => {
    expect(ensureDirPath('')).toEqual('');
    expect(ensureDirPath('/')).toEqual('/');
    expect(ensureDirPath('/home')).toEqual('/home');
    expect(ensureDirPath('home')).toEqual('/home');
    expect(ensureDirPath('/home/')).toEqual('/home');
    expect(ensureDirPath('home/')).toEqual('/home');
  });
});
