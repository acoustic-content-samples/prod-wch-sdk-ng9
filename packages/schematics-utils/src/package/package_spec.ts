import { updateMinVersion } from './package';

describe('package', () => {
  it('should update an incompatible version', () => {
    const pkg = {
      dependencies: {
        test: '^1.0.0'
      }
    };

    const res = updateMinVersion('test', '2.1.0', pkg);

    expect(res.dependencies['test']).toEqual('^2.1.0');
  });

  it('should respect a compatible version', () => {
    const pkg = {
      dependencies: {
        test: '^1.0.0'
      }
    };

    const res = updateMinVersion('test', '1.1.0', pkg);

    expect(res.dependencies['test']).toEqual('^1.0.0');
  });

  it('should update a missing version', () => {
    const pkg = {
      dependencies: {}
    };

    const res = updateMinVersion('test', '1.0.0', pkg);

    expect(res.dependencies['test']).toEqual('^1.0.0');
  });
});
