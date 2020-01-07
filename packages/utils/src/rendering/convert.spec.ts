import { KEY_METADATA } from '@acoustic-content-sdk/api';
import { readFileSync } from 'fs';
import { join, normalize } from 'path';

import { jsonParse, jsonStringify } from './../json/json.utils';
import { createDeliveryContentItem } from './convert';

describe('convert.spec', () => {
  const root = normalize(join(__dirname, '..', '..', '..', '..', 'data'));

  function readContent(aName: string): any {
    return jsonParse(readFileSync(join(root, 'delivery', aName), 'utf-8'));
  }

  function readSimple(aName: string): any {
    return jsonParse(readFileSync(join(root, 'simple', aName), 'utf-8'));
  }

  it('should convert image and text', () => {
    // read sample
    const sample = readContent('22629384-fbc1-41aa-8bf1-af1ffb61d51a.json');
    // convert
    const result = createDeliveryContentItem(sample);
    expect(result).toBeTruthy();
    expect(result.textGroup[KEY_METADATA]).toBeTruthy();
  });

  it('should work with null items', () => {
    const result = createDeliveryContentItem(null);
    expect(result).toBeFalsy();
  });

  it('should convert an Oslo item', () => {
    // read sample
    const sample = readContent('828291b8-0b7f-45ac-b49c-5fd4b9084f00.json');
    // convert
    const result = createDeliveryContentItem(sample);

    console.log('result', jsonStringify(result));
  });

  it('should convert a group item', () => {
    // read sample
    const sample = readContent('515929e8-5670-4eeb-abf1-203fbd3939ba.json');
    // convert
    const result = createDeliveryContentItem(sample);

    console.log('result', jsonStringify(result));
  });

  it('should convert a simple item', () => {
    // read sample
    const sample = readContent('53c4419c-e491-4563-8258-b7e4b81b5b81.json');
    // convert
    const result = createDeliveryContentItem(sample);

    console.log('result', jsonStringify(result));
  });
});
