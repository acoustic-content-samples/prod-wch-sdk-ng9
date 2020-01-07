import { join, Path } from '@angular-devkit/core';
import {
  AuthoringLayout,
  AuthoringLayoutMapping,
  AuthoringLayoutMappingLayout,
  AuthoringLayoutMappingMapping,
  AuthoringType
} from '@acoustic-content-sdk/api';
import {
  arrayPush,
  assertArray,
  getPath,
  isNil,
  isNotEmpty,
  isNotNil
} from '@acoustic-content-sdk/utils';

import { camelCase, kebabCase } from '@acoustic-content-sdk/tooling';
import { addRevisionId } from './revision';
import { selectId } from './selectors';

const TYPE_SUFFIX = 'Type';

export const LAYOUT_MAPPINGS_FOLDER = 'layout-mappings';

export const LAYOUT_MAPPING_SUFFIX = 'LayoutMapping';

export function isValidLayoutMapping(
  aMapping: AuthoringLayoutMapping
): boolean {
  return (
    isNotNil(aMapping) &&
    isNotEmpty(aMapping.mappings) &&
    isNotNil(getPath(aMapping.mappings[0], ['defaultLayout', 'id']))
  );
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
  aType: AuthoringType
): AuthoringLayoutMapping {
  // construct the layout mapping name
  const mappingName = getLayoutMappingNameFromTypeName(aType.name);
  // get the ID from the name
  const mappingId = kebabCase(mappingName);
  // construct the file
  const mapping = addRevisionId<AuthoringLayoutMapping>({
    id: mappingId,
    name: mappingName,
    classification: 'layout-mapping',
    type: {
      id: selectId(aType),
      name: aType.name
    },
    mappings: []
  });
  // k
  return mapping;
}

export function getLayoutMappingPath(
  aRootDir: Path,
  aMapping: AuthoringLayoutMapping
): Path {
  // the filename
  const mappingFileName = `${kebabCase(aMapping.name)}.json`;
  // construct the root path and add
  return join(aRootDir, LAYOUT_MAPPINGS_FOLDER, mappingFileName);
}

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
