import { AuthoringType, LoggerService } from '@acoustic-content-sdk/api';
import { Predicate } from '@acoustic-content-sdk/utils';
import { createLayoutMappingForType } from '../../utils/layout.mappings';

import { ReadDirectory } from '../../dir/dir';
import { createLayoutForType } from '../../utils/layouts';
import { canHaveLayout } from '../../utils/types';
import { generate } from '../utils/layout';
import { Schema } from './schema';

function createTypePredicate(aType: string): Predicate<AuthoringType> {
  // check for ID or name
  return (type) => type.id === aType || type.name === aType;
}

export function generateLayout(options: Schema) {
  // data directory
  const { data } = options;

  // validation
  const isValidType = createTypePredicate(options.type);
  const filterType = (aType: AuthoringType) =>
    canHaveLayout(aType) && isValidType(aType);

  function createLayout(aType: AuthoringType) {
    return createLayoutForType(aType, options, options.name);
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
