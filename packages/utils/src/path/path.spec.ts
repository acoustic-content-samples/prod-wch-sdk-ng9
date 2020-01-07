import { getPath, parsePath, pluckPath } from './path';

describe('path', () => {
  const test = {
    elements: {
      text: {
        value: 'abc'
      }
    }
  };

  it('should pluck a boolean property', () => {
    const data1 = { value: false };
    const data2 = {};

    const path = ['value'];

    expect(getPath(data1, path, true)).toBeFalsy();
    expect(getPath(data2, path, true)).toBeTruthy();
  });

  it('should parse Kais path', () => {
    const sampleContent = {
      elements: {
        rows: {
          values: [
            {
              cells: {
                values: [
                  {
                    content: {
                      values: ['EXPECTED']
                    }
                  }
                ]
              }
            }
          ]
        }
      }
    };

    const path = 'elements.rows.values[0].cells.values[0].content.values[0]';
    const parsed = parsePath(path);

    const value = getPath(sampleContent, parsed);
    expect(value).toEqual('EXPECTED');
  });

  it('should test some paths', () => {
    expect(parsePath('name')).toEqual(['name']);
    expect(parsePath('name[1][2]')).toEqual(['name', '1', '2']);
    expect(parsePath('name[1][2].value.test[4]')).toEqual([
      'name',
      '1',
      '2',
      'value',
      'test',
      '4'
    ]);
    expect(
      parsePath('elements.rows.values["0"].cells.values[\'1\'].content.value')
    ).toEqual([
      'elements',
      'rows',
      'values',
      '0',
      'cells',
      'values',
      '1',
      'content',
      'value'
    ]);
  });

  it('should parse a complex path', () => {
    const path = parsePath(
      'elements.rows.values[0].cells.values[1].content.value'
    );
    expect(path).toEqual([
      'elements',
      'rows',
      'values',
      '0',
      'cells',
      'values',
      '1',
      'content',
      'value'
    ]);
  });

  it('should access a non existing path with fallback', () => {
    const res = getPath(test, parsePath('elements.text.value1'), 'fallback');
    expect(res).toBe('fallback');

    expect(parsePath('elements.text.value1')).toEqual([
      'elements',
      'text',
      'value1'
    ]);
  });

  it('should access a non existing path', () => {
    const res = getPath(test, parsePath('elements.text.value1'));
    expect(res).not.toBeDefined();
  });

  it('should access an existing path', () => {
    const res = getPath(test, parsePath('elements.text.value'));
    expect(res).toBe('abc');

    expect(parsePath('elements.text.value')).toEqual([
      'elements',
      'text',
      'value'
    ]);
  });

  it('should access an element', () => {
    const acc = pluckPath(parsePath('elements.text.value'));
    expect(acc(test)).toBe('abc');
  });

  it('should parse a path', () => {
    const pathStrg = 'elements.text.value';

    expect(parsePath(pathStrg)).toEqual(['elements', 'text', 'value']);
  });
});
