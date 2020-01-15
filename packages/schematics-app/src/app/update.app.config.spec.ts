import { Path, resolve } from '@angular-devkit/core';
import {
  MergeStrategy,
  SchematicContext,
  HostTree
} from '@angular-devkit/schematics';
import { Tree } from '@angular-devkit/schematics/src/tree/interface';
import {
  Builders,
  byType,
  getSourceFile,
  getSourceNodes,
  ProjectType,
  WorkspaceProject
} from '@acoustic-content-sdk/schematics-utils';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ImportDeclaration, SyntaxKind } from 'typescript';

import { Schema } from './schema';
import { updateAppConfig } from './update.app.config';

describe('update app config', () => {
  const context: SchematicContext = ({
    engine: null,
    debug: false,
    strategy: MergeStrategy.Default
  } as {}) as SchematicContext;

  it('should add an empty app config', () => {
    const tree = new HostTree();
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

    const options: Schema = {
      url: 'xxx',
      editable: true,
      target: ''
    };

    tree.create(
      '/src/main.ts',
      `import { enableProdMode } from '@angular/core';
    import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

    import { AppModule } from './app/app.module';
    import { environment } from './environments/environment';

    if (environment.production) {
      enableProdMode();
    }

    platformBrowserDynamic().bootstrapModule(AppModule)
      .catch(err => console.log(err));
    `
    );

    const rxResult = updateAppConfig(options, project)(
      tree,
      context
    ) as Observable<Tree>;

    return rxResult
      .pipe(
        tap((tree) => {
          const buf = tree.read('/src/app/app.config.ts');
          expect(!!buf).toBeTruthy();

          // see if we referenced the options file correctly
          const src = getSourceFile(tree, '/src/app/app.config.ts');
          const nodes = getSourceNodes(src);

          const imports = nodes
            .filter(byType(SyntaxKind.ImportDeclaration))
            .map((node) => node as ImportDeclaration)
            .map((node) => node.moduleSpecifier.getText())
            .filter((data) => data.indexOf('.wchtoolsoptions.json') > 0)
            .map((data) => data.replace(/\'([^\']*)\'/, '$1'))
            .map((rel) => resolve('/src/app' as Path, rel as Path));

          // validate that the file exists
          imports.forEach((data) => expect(tree.exists(data)));
        })
      )
      .toPromise();
  });
});
