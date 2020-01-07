import { AuthoringType, LoggerService } from '@acoustic-content-sdk/api';

import { ReadDirectory } from '../../dir/dir';
import { createLayoutMappingForType } from '../../utils/layout.mappings';
import { createLayoutForType } from '../../utils/layouts';
import { canHaveLayout, createTypePredicate } from '../../utils/types';
import { generate } from '../utils/layout';
import { Schema } from './schema';

export function generateLayouts(options: Schema) {
  // data directory
  const { data } = options;

  // validation
  const isValidType = createTypePredicate(options);
  const filterType = (aType: AuthoringType) =>
    canHaveLayout(aType) && isValidType(aType);

  function createLayout(aType: AuthoringType) {
    return createLayoutForType(aType, options);
  }

  function createLayoutMapping(aType: AuthoringType) {
    return createLayoutMappingForType(aType, options.tags);
  }

  return (aReadDir: ReadDirectory, logSvc?: LoggerService) =>
    generate(
      data,
      filterType,
      createLayout,
      createLayoutMapping,
      aReadDir,
      logSvc
    );
}
