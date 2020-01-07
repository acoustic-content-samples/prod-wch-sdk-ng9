import {
  AuthoringLayoutItem,
  AuthoringType,
  CLASSIFICATION_LAYOUT
} from '@acoustic-content-sdk/api';
import {
  LAYOUT_TYPE_ANGULAR,
  LAYOUT_TYPE_HANDLEBARS,
  pluckPath,
  pluckProperty
} from '@acoustic-content-sdk/utils';

import { LayoutBaseSchema } from '../generate/utils/schema';
import { camelCase, kebabCase } from './names';
import { TYPE_SUFFIX } from './types';

export const LAYOUTS_FOLDER = 'layouts';

export const LAYOUT_SUFFIX = 'Layout';

export function getLayoutNameFromTypeName(aTypeName: string): string {
  // construct layout name from type name
  let typeName = camelCase(aTypeName);
  if (typeName.endsWith(TYPE_SUFFIX)) {
    typeName = typeName.substr(0, typeName.length - TYPE_SUFFIX.length);
  }
  // augment
  return typeName + LAYOUT_SUFFIX;
}

export const selectThumbnailPath = pluckPath<string>(['thumbnail', 'path']);

export const selectUrlTemplate = pluckProperty<AuthoringLayoutItem, 'urlTemplate'>(
  'urlTemplate'
);

export function createLayoutForType(
  aType: AuthoringType,
  aSchema: LayoutBaseSchema,
  aLayoutName?: string
): AuthoringLayoutItem {
  // construct the layout name
  const name = aLayoutName
    ? camelCase(aLayoutName)
    : getLayoutNameFromTypeName(aType.name);
  // get the properties
  const id = kebabCase(name);
  const layoutSelector = id;
  const path = `/${id}.json`;
  const thumbPath = `/dxauth/thumbnails/${LAYOUTS_FOLDER}/${id}.jpg`;
  const templateType = aSchema.templateType || LAYOUT_TYPE_ANGULAR;
  const urlTemplate = `{templateLocation}/${id}/{id}.html`;
  const template =
    aSchema.templateType === LAYOUT_TYPE_HANDLEBARS
      ? `/dxauth/templates/${id}.hbs`
      : layoutSelector;
  const tags = aSchema.tags || [];
  // construct the file
  return {
    id,
    path,
    name,
    tags,
    classification: CLASSIFICATION_LAYOUT,
    thumbnail: {
      path: thumbPath
    },
    prerender: false,
    template,
    templateType,
    urlTemplate
  } as any;
}
