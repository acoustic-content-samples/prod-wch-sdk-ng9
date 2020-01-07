import {
  BuilderContext,
  BuilderOutput,
  createBuilder
} from '@angular-devkit/architect';
import { executeBrowserBuilder } from '@angular-devkit/build-angular';
import { json } from '@angular-devkit/core';
import { Observable } from 'rxjs';

import { CustomWCHBuildSchema } from './schema';

export function buildCustomWCHBrowser(
  options: CustomWCHBuildSchema,
  context: BuilderContext
): Observable<BuilderOutput> {
  return undefined;
}

export const wchBuilder = createBuilder<json.JsonObject & CustomWCHBuildSchema>(
  buildCustomWCHBrowser
);
