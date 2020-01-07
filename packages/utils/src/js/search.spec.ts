import { cmpNumbers } from '../compare/compare';
import { binarySearch } from './search';

describe('search', () => {
  it('should work for any kind of search', () => {
    for (let i = 0; i < 100; ++i) {
      const count = Math.floor(Math.random() * 2000) + 1;
      const numbers = [];
      for (let j = 0; j < count; j++) {
        numbers.push(Math.random());
      }
      numbers.sort(cmpNumbers);

      for (let k = 0; k < 1000; ++k) {
        const x = Math.random();
        const idx = binarySearch(numbers, x, cmpNumbers);

        if (idx === 0) {
          expect(numbers[idx]).toBe(x);
        } else {
          const ins = -idx - 1;
          if (ins > 0) {
            expect(cmpNumbers(numbers[ins - 1], x)).toBeLessThan(0);
          }
          if (ins < count) {
            expect(cmpNumbers(numbers[ins], x)).toBeGreaterThan(0);
          }
        }
      }
    }
  });

  it('should work for a non-existing item', () => {
    const numbers = [1, 4, 8, 10, 3].sort(cmpNumbers);
    const idx = binarySearch(numbers, 5, cmpNumbers);
    expect(idx).toBeLessThan(0);

    const ins = -idx - 1;
    expect(cmpNumbers(numbers[ins - 1], 5)).toBeLessThan(0);
    expect(cmpNumbers(numbers[ins], 5)).toBeGreaterThan(0);
  });

  it('should work for the boundary cases', () => {
    for (let i = 0; i < 100; ++i) {
      const count = Math.floor(Math.random() * 1000) + 1;
      const numbers = [];
      for (let j = 0; j < count; j++) {
        numbers.push(Math.random());
      }
      numbers.sort(cmpNumbers);

      const idx0 = binarySearch(numbers, numbers[0], cmpNumbers);
      expect(idx0).toBe(0);

      const idx1 = binarySearch(numbers, numbers[count - 1], cmpNumbers);
      expect(idx1).toBe(count - 1);
    }
  });

  it('should locate numbers in any kind of aray', () => {
    for (let i = 0; i < 100; ++i) {
      const count = Math.floor(Math.random() * 1000) + 1;
      const numbers = [];
      for (let j = 0; j < count; j++) {
        numbers.push(Math.random());
      }
      const x = numbers[0];
      numbers.sort(cmpNumbers);

      const idx = binarySearch(numbers, x, cmpNumbers);
      expect(idx).toBeGreaterThanOrEqual(0);
      expect(numbers[idx]).toBe(x);
    }
  });

  it('should find a number in a sorted array', () => {
    const numbers = [1, 4, 8, 10, 3].sort(cmpNumbers);
    const idx = binarySearch(numbers, 4, cmpNumbers);
    expect(idx).toBeGreaterThanOrEqual(0);
    expect(numbers[idx]).toBe(4);
  });
});
