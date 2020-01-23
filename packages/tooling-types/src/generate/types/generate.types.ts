import { LoggerService } from '@acoustic-content-sdk/api';
import {
  createCompiler,
  TemplateType
} from '@acoustic-content-sdk/hbs-tooling';
import {
  createTypePredicate,
  ReadDirectory,
  ReadTextFile
} from '@acoustic-content-sdk/tooling';
import { UnaryFunction } from 'rxjs';

import { createHandlebars } from '../utils/templates';
import { generate } from '../utils/types';
import { GenerateTypesSchema } from './schema';

export function generateTypes(options: GenerateTypesSchema) {
  // data directory
  const { data } = options;

  const isValidType = createTypePredicate(options);

  // compiler used to process the code templates
  const compiler: UnaryFunction<string, TemplateType> = createCompiler(
    createHandlebars()
  );

  return (
    aReadDir: ReadDirectory,
    aReadText: ReadTextFile,
    logSvc?: LoggerService
  ) => generate(data, isValidType, aReadDir, aReadText, compiler, logSvc);
}
