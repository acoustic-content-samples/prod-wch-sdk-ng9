import {
  Builders,
  getSourceFile,
  getSourceNodes,
  isImported,
  ProjectType,
  WorkspaceProject
} from '@acoustic-content-sdk/schematics-utils';
import { Path } from '@angular-devkit/core';
import {
  HostTree,
  MergeStrategy,
  SchematicContext,
  Tree
} from '@angular-devkit/schematics';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ObjectLiteralExpression, SourceFile } from 'typescript';
import { Schema } from './schema';
import {
  findRouteArrays,
  findRouteByPath,
  updateAppRoutingModule
} from './update.router';

describe('update router', () => {
  const DEFAULT_MAIN = `
import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
    enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
    .catch(err => console.log(err));
`;

  const DEFAULT_ROUTER = `
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [];

@NgModule({
    imports: [RouterModule.forRoot(routes), RouterModule.forRoot(routes, { useHash: false })],
    exports: [RouterModule]
})
export class AppRoutingModule { }
`;

  const FULL_ROUTER = `
  import { NgModule } from '@angular/core';
  import { Routes, RouterModule } from '@angular/router';
  import { DEFAULT_ROUTES } from '@acoustic-content-sdk/ng';

  const routes: Routes = [{
		path: '',
		pathMatch: 'full',
		canActivate: [SelectFirstRootPageGuard],
		component: PageComponent,
	},{ path: '**', component: PageComponent }];

  @NgModule({
      imports: [RouterModule.forRoot(routes), RouterModule.forRoot(routes, { useHash: false })],
      exports: [RouterModule]
  })
  export class AppRoutingModule { }`;

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

  const context: SchematicContext = ({
    engine: null,
    debug: false,
    strategy: MergeStrategy.Default
  } as {}) as SchematicContext;

  const ROUTING_MODULE_PATH = '/src/app/app-routing.module.ts' as Path;

  function _verifyRouter(aSource: SourceFile) {
    // console.log('_verifyRouter', aSource.getText());

    // verify the imports
    expect(
      isImported(aSource, 'PageComponent', '@acoustic-content-sdk/ng')
    ).toBeTruthy();
    expect(
      isImported(
        aSource,
        'SelectFirstRootPageGuard',
        '@acoustic-content-sdk/ng'
      )
    ).toBeTruthy();

    // list the nodes
    const nodes = getSourceNodes(aSource);

    // map the routes to their array value
    const routeArrays = findRouteArrays(nodes);

    // verify each route
    routeArrays.forEach((routes) => {
      // the elements
      const elements = routes.elements;
      // find the default route
      const defaultRoute = elements.find(
        findRouteByPath('')
      ) as ObjectLiteralExpression;
      expect(defaultRoute).toBeTruthy();

      // find the matchAll route
      const matchAllRoute = elements.find(
        findRouteByPath('**')
      ) as ObjectLiteralExpression;
      expect(matchAllRoute).toBeTruthy();
    });
  }

  function _testRouter(aInitialValue: string) {
    const tree = new HostTree();

    tree.create('/src/main.ts', DEFAULT_MAIN);
    tree.create(ROUTING_MODULE_PATH, aInitialValue);

    const rxTree = updateAppRoutingModule(options, project)(
      tree,
      context
    ) as Observable<Tree>;

    return rxTree
      .pipe(
        map((tree) => {
          // read
          _verifyRouter(getSourceFile(tree, ROUTING_MODULE_PATH));
        })
      )
      .toPromise();
  }

  it('should add to the default router', () => {
    return _testRouter(DEFAULT_ROUTER);
  });

  it('should add to the initialized router', () => {
    return _testRouter(FULL_ROUTER);
  });
});
