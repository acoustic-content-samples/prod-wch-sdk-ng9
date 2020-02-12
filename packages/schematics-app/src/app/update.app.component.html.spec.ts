import {
  MergeStrategy,
  SchematicContext,
  HostTree
} from '@angular-devkit/schematics';
import { Tree } from '@angular-devkit/schematics';
import {
  Builders,
  ProjectType,
  WorkspaceProject
} from '@acoustic-content-sdk/schematics-utils';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { Schema } from './schema';
import { updateAppComponentHtml } from './update.app.component.html';

describe('update app component', () => {
  const HTML_PATH = '/src/app/app.component.html';

  const ROUTER_OUTLET = /<router-outlet><\/router-outlet>/;

  const CLI_DOC = /CLI Documentation/;

  const DEFAULT_TEMPLATE = `
    <!--The content below is only a placeholder and can be replaced.-->
    <div style="text-align:center">
      <h1>
        Welcome to {{ title }}!
      </h1>
      <img width="300" alt="Angular Logo" src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNTAgMjUwIj4KICAgIDxwYXRoIGZpbGw9IiNERDAwMzEiIGQ9Ik0xMjUgMzBMMzEuOSA2My4ybDE0LjIgMTIzLjFMMTI1IDIzMGw3OC45LTQzLjcgMTQuMi0xMjMuMXoiIC8+CiAgICA8cGF0aCBmaWxsPSIjQzMwMDJGIiBkPSJNMTI1IDMwdjIyLjItLjFWMjMwbDc4LjktNDMuNyAxNC4yLTEyMy4xTDEyNSAzMHoiIC8+CiAgICA8cGF0aCAgZmlsbD0iI0ZGRkZGRiIgZD0iTTEyNSA1Mi4xTDY2LjggMTgyLjZoMjEuN2wxMS43LTI5LjJoNDkuNGwxMS43IDI5LjJIMTgzTDEyNSA1Mi4xem0xNyA4My4zaC0zNGwxNy00MC45IDE3IDQwLjl6IiAvPgogIDwvc3ZnPg==">
    </div>
    <h2>Here are some links to help you start: </h2>
    <ul>
      <li>
        <h2><a target="_blank" rel="noopener" href="https://angular.io/tutorial">Tour of Heroes</a></h2>
      </li>
      <li>
        <h2><a target="_blank" rel="noopener" href="https://github.com/angular/angular-cli/wiki">CLI Documentation</a></h2>
      </li>
      <li>
        <h2><a target="_blank" rel="noopener" href="https://blog.angular.io/">Angular blog</a></h2>
      </li>
    </ul>

    <router-outlet></router-outlet>
`;

  const context: SchematicContext = ({
    engine: null,
    debug: false,
    strategy: MergeStrategy.Default
  } as {}) as SchematicContext;

  function _testTemplate(aTemplate: string) {
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
      editable: true
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

    tree.create(HTML_PATH, aTemplate);

    const rxResult = updateAppComponentHtml(options, project)(
      tree,
      context
    ) as Observable<Tree>;

    return rxResult
      .pipe(
        tap((tree) => {
          const buf = tree.read(HTML_PATH);
          expect(!!buf).toBeTruthy();

          const text = buf!.toString();

          expect(ROUTER_OUTLET.test(text)).toBeTruthy();
          expect(CLI_DOC.test(text)).toBeFalsy();
        })
      )
      .toPromise();
  }

  it('should work with the default template', () => {
    _testTemplate(DEFAULT_TEMPLATE);
  });
});
