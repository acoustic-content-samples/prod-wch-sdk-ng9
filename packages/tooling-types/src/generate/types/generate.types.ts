import { LoggerService } from '@acoustic-content-sdk/api';

import { ReadDirectory } from '@acoustic-content-sdk/tooling';
import { createTypePredicate } from '@acoustic-content-sdk/tooling';
import { generate } from '../utils/types';
import { GenerateTypesSchema } from './schema';

export function generateTypes(options: GenerateTypesSchema) {
  // data directory
  const { data } = options;

  const isValidType = createTypePredicate(options);

  return (aReadDir: ReadDirectory, logSvc?: LoggerService) =>
    generate(data, isValidType, aReadDir, logSvc);
}
