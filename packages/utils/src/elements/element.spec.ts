import {
  Asset,
  MultiImageElement,
  MultiTextElement,
  SingleGroupElement,
  SingleImageElement,
  SingleTextElement
} from '@acoustic-content-sdk/api';
import {
  isMultiImageElement,
  isMultiTextElement,
  isSingleGroupElement,
  isSingleImageElement,
  isSingleTextElement
} from './element';

describe('element', () => {
  const testAsset: Asset = {
    id: 'id',
    resourceUri: 'resourceUri',
    fileSize: 123,
    fileName: 'fileName',
    mediaType: 'mediaType',
    width: 1234,
    height: 4567
  };

  it('should test if an image is empty', () => {
    const test1: SingleImageElement = {
      elementType: 'image'
    };

    expect(isSingleImageElement(test1)).toBeFalsy();
    expect(isMultiImageElement(test1)).toBeFalsy();
  });

  it('should test if an image exists', () => {
    const test1: SingleImageElement = {
      elementType: 'image',
      url: 'abc',
      asset: testAsset,
      altText: 'altText'
    };

    const test2: MultiImageElement = {
      elementType: 'image',
      values: [
        {
          url: 'abc',
          asset: testAsset,
          altText: 'altText'
        },
        {
          url: 'abc',
          asset: testAsset,
          altText: 'altText'
        }
      ]
    };

    expect(isSingleImageElement(test1)).toBeTruthy();
    expect(isSingleImageElement(test2)).toBeFalsy();

    expect(isMultiImageElement(test2)).toBeTruthy();
    expect(isMultiImageElement(test1)).toBeFalsy();
  });

  it('should check for single nested group type', () => {
    // single group element
    const singleGroup: SingleGroupElement = {
      elementType: 'group',
      typeRef: {
        id: 'someType'
      },
      value: {
        groupLabel: {
          elementType: 'group',
          typeRef: {
            id: 'someType'
          },
          value: {
            textLabel: {
              elementType: 'text',
              value: 'someValue'
            },
            numberLabel: {
              elementType: 'number',
              value: 0
            },
            togglelabel: {
              elementType: 'toggle',
              value: true
            }
          }
        },
        numberLabel: {
          elementType: 'number',
          value: 0
        },
        togglelabel: {
          elementType: 'toggle',
          value: true
        }
      }
    };

    // validate
    expect(isSingleGroupElement(singleGroup)).toBeTruthy();
  });

  it('should check for single group type', () => {
    // single group element
    const singleGroup: SingleGroupElement = {
      elementType: 'group',
      typeRef: {
        id: 'someType'
      },
      value: {
        textLabel: {
          elementType: 'text',
          value: 'someValue'
        },
        numberLabel: {
          elementType: 'number',
          value: 0
        },
        togglelabel: {
          elementType: 'toggle',
          value: true
        }
      }
    };

    // validate
    expect(isSingleGroupElement(singleGroup)).toBeTruthy();
  });

  it('should check for text type', () => {
    const singleText: SingleTextElement = {
      elementType: 'text',
      value: 'someText'
    };

    const multiText: MultiTextElement = {
      elementType: 'text',
      values: ['someText', 'someText']
    };

    expect(isSingleTextElement(singleText)).toBeTruthy();
    expect(isMultiTextElement(singleText)).toBeFalsy();
    expect(isSingleTextElement(multiText)).toBeFalsy();
    expect(isMultiTextElement(multiText)).toBeTruthy();
  });
});
