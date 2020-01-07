import { kebabCase } from './kebab.case';

describe('kebab case', () => {
  it('should kebab case a camel case name', () => {
    const value = 'textComponentLayout';

    const kebab = kebabCase(value);

    expect(kebab).toEqual('text-component-layout');
  });

  it('should kebab case a space based name', () => {
    const value = 'Text Component Layout';

    const kebab = kebabCase(value);

    expect(kebab).toEqual('text-component-layout');
  });
});
