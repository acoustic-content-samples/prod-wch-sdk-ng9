/**
 * @jest-environment jsdom
 */
import { forEach } from '@acoustic-content-sdk/utils';
import * as HTML_TAGS from 'html-tag-names';

import { STYLE_KEYS, STYLE_MAP } from './jsx';
import { getReactElementName } from './render';

describe('react.render', () => {
  it('should have a consistent name mapping', () => {
    forEach(STYLE_KEYS, (key) => expect(STYLE_MAP[key]).toBeDefined());
  });

  it('should validate all known html element names', () => {
    HTML_TAGS.map((tag) => document.createElement(tag)).forEach((el) =>
      expect(getReactElementName(el)).toBeTruthy()
    );
  });
});
