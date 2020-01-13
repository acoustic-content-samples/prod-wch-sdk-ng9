import { join, normalize } from 'path';
import { readFileSync } from 'fs';
import { jsonParse } from '../json/json.utils';
import {
  AuthoringContentItem,
  DeliveryContentItem,
  ContentItemWithLayout,
  KEY_METADATA,
  KEY_ACCESSOR
} from '@acoustic-content-sdk/api';
import { createDeliveryContentItem } from '../rendering/convert';
import { wchDeliveryContentByAccessor } from './delivery.content';
import { pluckPath } from '../path/path';

const selectAccessor = pluckPath<string>([KEY_METADATA, KEY_ACCESSOR]);

describe('delivery.content', () => {
  const root = normalize(join(__dirname, '..', '..', '..', '..', 'data'));

  function readContent(aName: string): ContentItemWithLayout {
    return jsonParse<ContentItemWithLayout>(
      readFileSync(join(root, 'content', aName), 'utf-8')
    );
  }

  function assertExtractedGroupValue(
    aAccessor: string,
    aValue: DeliveryContentItem
  ) {
    // get the value
    const extracted = wchDeliveryContentByAccessor(aValue, aAccessor);
    expect(extracted).toBeDefined();
    // check the accessor
    const acc = selectAccessor(extracted);
    expect(acc).toEqual(aAccessor);
  }

  it('should extract some primitive data', () => {
    // load some data
    const content: ContentItemWithLayout = readContent(
      'c0b6c620-de3a-4e26-bc77-ec8a08df073a_cmd.json'
    );
    // convert to delivery format
    const deliveryContent: DeliveryContentItem = createDeliveryContentItem(
      content
    );
    const extracted = wchDeliveryContentByAccessor(
      deliveryContent,
      'elements.rows.values[1].cells.values[1].content.values[0].text.value.padding.value.top.value'
    );
    expect(extracted).toEqual(50);
  });

  it('should extract some group data', () => {
    // load some data
    const content: ContentItemWithLayout = readContent(
      'c0b6c620-de3a-4e26-bc77-ec8a08df073a_cmd.json'
    );
    // convert to delivery format
    const deliveryContent: DeliveryContentItem = createDeliveryContentItem(
      content
    );

    assertExtractedGroupValue(
      'elements.rows.values[1].cells.values[1].content.values[0].text.value',
      deliveryContent
    );

    assertExtractedGroupValue(
      'elements.contentAreaBackgroundColor.value',
      deliveryContent
    );
  });
});
