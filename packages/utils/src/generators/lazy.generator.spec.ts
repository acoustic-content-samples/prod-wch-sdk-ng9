import { Generator } from './generator';
import { lazyGenerator } from './lazy.generator';

describe('lazy.generator', () => {

    it('should compute lazily', () => {

        let count = 0;

        const gen: Generator<number> = () => count++;

        expect(gen()).toBe(0);
        expect(gen()).toBe(1);

        // create the lazy wrapper
        const lazyGen = lazyGenerator(gen);
        expect(lazyGen()).toBe(2);
        expect(lazyGen()).toBe(2);
    });
});