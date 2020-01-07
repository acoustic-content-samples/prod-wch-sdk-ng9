import { Category } from '@acoustic-content-sdk/api';
import { getCategoryLeaf } from './categories';

describe('categories', () => {
  it('should work on non existing categoy', () => {
    expect(getCategoryLeaf(null, undefined, 'fb')).toBe('fb');
  });

  it('should work on empty categoy', () => {
    const cat: Category = {
      categoryIds: [],
      categories: [],
      categoryPaths: []
    };

    expect(getCategoryLeaf(cat, undefined, 'fb')).toBe('fb');
  });

  it('should pick the last', () => {
    const cat: Category = {
      categoryIds: ['id1', 'id2'],
      categories: ['/root/leaf1', '/root/leaf2'],
      categoryPaths: [['root', 'leaf1'], ['root', 'leaf2']]
    };

    expect(getCategoryLeaf(cat, 0, 'fb')).toBe('leaf1');
    expect(getCategoryLeaf(cat, 1, 'fb')).toBe('leaf2');
    expect(getCategoryLeaf(cat, 2, 'fb')).toBe('fb');
  });
});
