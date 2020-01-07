import { getProperty } from './pluck';

describe('pluck', () => {
  it('should pluck null', () => {
    const data: any = {
      a: null,
      c: 0,
      d: false
    };

    expect(getProperty(data, 'a')).toBeDefined();
    expect(getProperty(data, 'b')).toBeUndefined();
    expect(getProperty(data, 'c')).toBeDefined();
    expect(getProperty(data, 'd')).toBeDefined();
  });
});
