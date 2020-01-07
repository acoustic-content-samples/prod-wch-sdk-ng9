import {
  AuthoringLayout,
  AuthoringLayoutMapping,
  AuthoringLayoutMappingLayout,
  AuthoringLayoutMappingMapping
} from '@acoustic-content-sdk/api';
import { arrayPush, assertArray, isNil, isNotEmpty } from '@acoustic-content-sdk/utils';

/**
 * Adds a layout to a layout mapping entry, inplace
 *
 * @param aLayoutMapping - the layout mapping entry
 * @param aLayout - the layout
 *
 * @returns the mapping
 */
export function addLayoutToMapping(
  aLayoutMapping: AuthoringLayoutMapping,
  aLayout: AuthoringLayout
): AuthoringLayoutMapping {
  // access the mappings structure
  const mappings: AuthoringLayoutMappingMapping[] = assertArray(
    'mappings',
    aLayoutMapping
  );
  // add the default
  const defaultLayout: AuthoringLayoutMappingLayout = {
    id: aLayout.id,
    name: aLayout.name
  };
  if (isNotEmpty(mappings)) {
    // default
    const defaultMapping: AuthoringLayoutMappingMapping = mappings[0];
    // work on the existing entry
    if (isNil(defaultMapping.defaultLayout)) {
      defaultMapping.defaultLayout = defaultLayout;
    }
    // insert
    const layouts: AuthoringLayoutMappingLayout[] = assertArray(
      'layouts',
      defaultMapping
    );
    // check if we find the layout
    const idx = layouts.findIndex(
      (l: AuthoringLayoutMappingLayout) => l.id === defaultLayout.id
    );
    if (idx < 0) {
      // append at the end
      arrayPush(defaultLayout, layouts);
    }
  } else {
    // insert a new entry
    arrayPush({ defaultLayout, layouts: [defaultLayout] }, mappings);
  }
  // returns the mapping
  return aLayoutMapping;
}
