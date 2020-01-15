import { logging } from '@angular-devkit/core';
import {
  MergeStrategy,
  SchematicContext,
  HostTree
} from '@angular-devkit/schematics';
import {
  byName,
  getSourceNodes,
  WorkspaceProject,
  ProjectType,
  Builders
} from '@acoustic-content-sdk/schematics-utils';
import {
  createSourceFile,
  ModuleDeclaration,
  ScriptTarget,
  SourceFile,
  SyntaxKind
} from 'typescript';

import { applyChanges } from '../test';
import {
  addToTypings,
  SITE_NAME,
  WCHTOOLS_OPTIONS_NAME,
  updateTypings
} from './update.typings';
import { Schema } from './schema';
import { Observable } from 'rxjs';
import { Tree } from '@angular-devkit/schematics/src/tree/interface';
import { map } from 'rxjs/operators';

function getTsSource(path: string, content: string): SourceFile {
  return createSourceFile(path, content, ScriptTarget.Latest, true);
}

const EXISTING_FILE = `
/* SystemJS module definition */

declare module '*/.wchtoolsoptions.json' {
  const value: any;
  export default value;
}

declare module '*/site.json' {
  const value: any;
  export default value;
}
`;

const PARTIAL_FILE = `
/* SystemJS module definition */

declare module someOtherModule {
  const value: any;
  export default value;
}

declare module '*/site.json' {
  const value: any;
  export default value;
}
`;

describe('update.typings', () => {
  const path = '/src/typings.d.ts';

  const context: SchematicContext = ({
    engine: null,
    debug: false,
    strategy: MergeStrategy.Default
  } as {}) as SchematicContext;

  function _verifySource(aSource: string) {
    const source = getTsSource(path, aSource);
    expect(source).toBeDefined();

    // locate the environment declaration
    const declarations = getSourceNodes(source)
      .filter((node) => node.kind === SyntaxKind.ModuleDeclaration)
      .map((node) => node as ModuleDeclaration);

    expect(declarations.find(byName(WCHTOOLS_OPTIONS_NAME))).toBeTruthy();
    expect(declarations.find(byName(SITE_NAME))).toBeTruthy();
  }

  const project: WorkspaceProject = {
    root: '',
    prefix: 'app',
    projectType: ProjectType.Application,
    architect: {
      build: {
        builder: Builders.Browser,
        options: {
          main: 'src/main.ts',
          tsConfig: '',
          polyfills: ''
        }
      }
    }
  };

  it('should work on a tree', () => {
    const tree = new HostTree();

    const options: Schema = {
      editable: true,
      url: 'abc',
      target: ''
    };

    updateTypings(options, project)(tree, context);

    // validate the file
    expect(tree.exists(path)).toBeTruthy();

    _verifySource(tree.read(path)!.toString());
  });

  it('should work on an partial file', () => {
    // parse the file
    const source = getTsSource(path, PARTIAL_FILE);
    expect(source).toBeDefined();

    const logger = new logging.Logger('test').asApi();

    const changes = addToTypings(source, path, logger);

    const result = applyChanges(path, PARTIAL_FILE, changes);

    _verifySource(result);
  });

  it('should work on an empty file', () => {
    // parse the file
    const srcContent = '// this is an empty file';
    const source = getTsSource(path, srcContent);
    expect(source).toBeDefined();

    const logger = new logging.Logger('test').asApi();

    const changes = addToTypings(source, path, logger);

    const result = applyChanges(path, srcContent, changes);

    _verifySource(result);
  });

  it('should work on an existing typings file', () => {
    // parse the file
    const source = getTsSource(path, EXISTING_FILE);
    expect(source).toBeDefined();

    const logger = new logging.Logger('test').asApi();

    const changes = addToTypings(source, path, logger);
    expect(changes).toBeTruthy();
    expect(changes.length).toBe(0);

    _verifySource(EXISTING_FILE);
  });
});
