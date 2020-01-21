import {
  AuthoringLayoutItem,
  AuthoringLayoutMapping,
  AuthoringLayoutMappingLayout,
  AuthoringLayoutMappingMapping,
  AuthoringType,
  CLASSIFICATION_LAYOUT_MAPPING
} from '@acoustic-content-sdk/api';
import {
  arrayPush,
  assertArray,
  isNil,
  isNotEmpty,
  isNotNil,
  pluckPath
} from '@acoustic-content-sdk/utils';
import { camelCase, classCase, kebabCase } from './names';
import { selectId } from './selectors';
import { TYPE_SUFFIX } from './types';
import { WCHTOOLS_FOLDER_LAYOUT_MAPPING } from './wchtools';

/**
 * @deprecated
 */
export const LAYOUT_MAPPINGS_FOLDER = WCHTOOLS_FOLDER_LAYOUT_MAPPING;

export const LAYOUT_MAPPING_SUFFIX = classCase(CLASSIFICATION_LAYOUT_MAPPING);

export const selectDefaultLayoutMappingId = pluckPath<string>([
  'mappings',
  '0',
  'defaultLayout',
  'id'
]);

export function isValidLayoutMapping(
  aMapping: AuthoringLayoutMapping
): boolean {
  return isNotNil(selectDefaultLayoutMappingId(aMapping));
}

export function getLayoutMappingNameFromTypeName(aTypeName: string): string {
  // construct layout name from type name
  let typeName = camelCase(aTypeName);
  if (typeName.endsWith(TYPE_SUFFIX)) {
    typeName = typeName.substr(0, typeName.length - TYPE_SUFFIX.length);
  }
  // augment
  return typeName + LAYOUT_MAPPING_SUFFIX;
}

export function createLayoutMappingForType(
  aType: AuthoringType,
  aTags?: string[]
): AuthoringLayoutMapping {
  // construct the layout mapping name
  const name = getLayoutMappingNameFromTypeName(aType.name);
  // get the ID from the name
  const id = kebabCase(name);
  const path = `/${id}.json`;
  const tags = aTags || [];
  // construct the file
  return {
    id,
    name,
    path,
    tags,
    classification: CLASSIFICATION_LAYOUT_MAPPING,
    type: {
      id: selectId(aType),
      name: aType.name
    },
    mappings: []
  };
}

export function getLayoutMappingPath(
  aRootDir: string,
  aMapping: AuthoringLayoutMapping
): string {
  // the filename
  const mappingFileName = `${kebabCase(aMapping.name)}.json`;
  // construct the root path and add
  return `${aRootDir}/${LAYOUT_MAPPINGS_FOLDER}/${mappingFileName}`;
}

export function addLayoutToMapping(
  aLayoutMapping: AuthoringLayoutMapping,
  aLayout: AuthoringLayoutItem
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
