import { GeneratorOrT, Generator, fromGeneratorOrT } from './generator';

describe('generator', () => {
  it('should support an undefined generator ', () => {
    const g: GeneratorOrT<string> = () => undefined;

    expect(fromGeneratorOrT(g)).toBeUndefined();
  });

  it('should support a null generator ', () => {
    const g: GeneratorOrT<string> = () => null;

    expect(fromGeneratorOrT(g)).toBeNull();
  });

  it('should support a double function GeneratorOrT ', () => {
    const g: GeneratorOrT<string> = () => () => 'value';

    expect(fromGeneratorOrT(g)).toBe('value');
  });

  it('should support a function GeneratorOrT ', () => {
    const g: GeneratorOrT<string> = () => 'value';

    expect(fromGeneratorOrT(g)).toBe('value');
  });

  it('should support a simple GeneratorOrT ', () => {
    const g: GeneratorOrT<string> = 'value';

    expect(fromGeneratorOrT(g)).toBe('value');
  });
});
