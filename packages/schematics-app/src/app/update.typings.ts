import {
  byName,
  Change,
  changeSourceFile,
  getSourceNodes,
  InsertChange,
  ProjectType,
  WorkspaceProject
} from '@acoustic-content-sdk/schematics-utils';
import { isNil } from '@acoustic-content-sdk/utils';
import { logging, Path } from '@angular-devkit/core';
import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import { ModuleDeclaration, SourceFile, SyntaxKind } from 'typescript';

import { sortByPosition } from '../utilities/finders';
import { Schema } from './schema';

export const WCHTOOLS_OPTIONS_NAME = "'*/.wchtoolsoptions.json'";
export const SITE_NAME = "'*/site.json'";

export const TYPINGS_PATH: Path = '/src/typings.d.ts' as Path;

export const WCHTOOLS_OPTIONS_MODULE = `
  declare module ${WCHTOOLS_OPTIONS_NAME} {
    const value: any;
    export default value;
  }`;

export const SITE_MODULE = `
  declare module ${SITE_NAME} {
    const value: any;
    export default value;
  }`;

export function addToTypings(
  aSource: SourceFile,
  aPath: string,
  aLogger: logging.LoggerApi
): Change[] {
  // list of changes
  const changes: Change[] = [];

  // locate the environment declaration
  const declarations = getSourceNodes(aSource)
    .filter((node) => node.kind === SyntaxKind.ModuleDeclaration)
    .map((node) => node as ModuleDeclaration)
    .sort(sortByPosition);

  // add the tools module
  if (isNil(declarations.find(byName(WCHTOOLS_OPTIONS_NAME)))) {
    // update that
    changes.push(new InsertChange(aPath, aSource.end, WCHTOOLS_OPTIONS_MODULE));
  }

  // add the sites module
  if (isNil(declarations.find(byName(SITE_NAME)))) {
    // update that
    changes.push(new InsertChange(aPath, aSource.end, SITE_MODULE));
  }

  // returns the changes
  return changes;
}

export function updateTypings(
  options: Schema,
  project: WorkspaceProject<ProjectType>
): Rule {
  return (host: Tree, context: SchematicContext) => {
    // create empty proxy if required
    if (!host.exists(TYPINGS_PATH)) {
      host.create(TYPINGS_PATH, '');
    }

    // modify the typings file
    changeSourceFile(
      TYPINGS_PATH,
      (aPath: string, aContent: SourceFile) =>
        addToTypings(aContent, aPath, context.logger),
      host
    );

    // returns the host
    return host;
  };
}
