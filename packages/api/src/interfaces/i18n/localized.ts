/**
 * Helper type to identify a locale in the interfaces
 */
export type Locale = string;

/**
 * Text with attached locale
 */
export type LocalizedText = [string, Locale];

/**
 * Object supporting localizations
 */
export type Localized = LocalizedText[];

/**
 * Localization context that describes the relevance of a locale, this is typically derived
 * from the accept language header
 */
export type LocalizedContext = Record<Locale, number>;
