import { Localized, LocalizedContext, LocalizedText } from '@acoustic-content-sdk/api';
import { Comparator } from '../compare/compare';
import { compose, propertyFromObject } from '../js/js.core';
import {
  cmpByLocalizedContext,
  localizedText,
  pluckLocale,
  pluckText
} from './localized';

describe('localized', () => {
  it('should zip arguments', () => {
    const loc: LocalizedText = localizedText('value', 'en');

    expect(pluckText(loc)).toBe('value');
    expect(pluckLocale(loc)).toBe('en');
  });

  it('should extract a locale', () => {
    const locContext: LocalizedContext = {
      de: 0.5,
      en: 0.9,
      'en-US': 1.0
    };

    const extractor = compose(
      pluckLocale,
      propertyFromObject(locContext, 0)
    );

    expect(extractor(['', 'en'])).toBe(locContext['en']);
    expect(extractor(['', 'de'])).toBe(locContext['de']);
    expect(extractor(['', 'en-US'])).toBe(locContext['en-US']);
    expect(extractor(['', 'fr'])).toBe(0);
  });

  it('should compare by locales', () => {
    const locContext: LocalizedContext = {
      de: 0.5,
      en: 0.9,
      'en-US': 1.0
    };

    const localized: Localized = [
      ['Deutsch', 'de'],
      ['Francais', 'fr'],
      ['English', 'en'],
      ['US English', 'en-US']
    ];

    // compare
    const cmp: Comparator<LocalizedText> = cmpByLocalizedContext(locContext);

    // order
    const ordered = [...localized].sort(cmp);

    expect(ordered.map(pluckLocale)).toEqual(['en-US', 'en', 'de', 'fr']);
  });
});
