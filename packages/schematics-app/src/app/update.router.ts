import { Path, resolve } from '@angular-devkit/core';
import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import {
  addImportToModule,
  byType,
  Change,
  changeSourceFile,
  getAppModulePath,
  getSourceNodes,
  InsertChange,
  insertImport,
  ProjectType,
  rxTransformTextFile,
  WorkspaceProject
} from '@acoustic-content-sdk/schematics-utils';
import { of } from 'rxjs';
import { map, mapTo } from 'rxjs/operators';
import {
  ArrayLiteralExpression,
  Node,
  ObjectLiteralExpression,
  SourceFile,
  StringLiteral,
  SyntaxKind,
  VariableDeclaration
} from 'typescript';

import { Schema } from './schema';

const MATCH_ALL_ROUTE = `{
  path: '**',
  component: PageComponent
}`;

const DEFAULT_ROUTE = `{
  path: '',
  pathMatch: 'full',
  canActivate: [SelectFirstRootPageGuard],
  component: PageComponent,
}`;

const DEFAULT_ROUTING_MODULE = `
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageComponent, SelectFirstRootPageGuard } from '@acoustic-content-sdk/ng';

const routes: Routes = [
  ${DEFAULT_ROUTE},
  ${MATCH_ALL_ROUTE}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: false })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
`;

const COMMA = ',';

export function findRouteByPath(aPath: string) {
  return (node: Node): boolean => {
    const bResult =
      node.kind === SyntaxKind.ObjectLiteralExpression &&
      !!(node as ObjectLiteralExpression).properties.find(
        (prop) =>
          !!prop.name &&
          prop.name.getText() === 'path' &&
          prop.kind === SyntaxKind.PropertyAssignment &&
          !!prop.initializer &&
          prop.initializer.kind === SyntaxKind.StringLiteral &&
          (prop.initializer as StringLiteral).text === aPath
      );

    return bResult;
  };
}

function _insertDefaultRoutes(
  aPath: string,
  aArray: ArrayLiteralExpression
): Change[] {
  // check if we already have the default route
  const exp = aArray.elements;

  let bNeedsComma = exp.length > 0 && !exp.hasTrailingComma;

  let pos = exp.end;

  const changes: Change[] = [];

  // insert the default route
  if (!exp.find(findRouteByPath(''))) {
    // check if we need a comma
    if (bNeedsComma) {
      changes.push(new InsertChange(aPath, pos, COMMA));
    }
    bNeedsComma = true;
    // append
    changes.push(new InsertChange(aPath, pos, DEFAULT_ROUTE));
  }

  // insert the match all route
  if (!exp.find(findRouteByPath('**'))) {
    // check if we need a comma
    if (bNeedsComma) {
      changes.push(new InsertChange(aPath, pos, COMMA));
    }
    bNeedsComma = true;
    // append
    changes.push(new InsertChange(aPath, pos, MATCH_ALL_ROUTE));
  }

  return changes;
}

export function findRouteArrays(aNodes: Node[]): ArrayLiteralExpression[] {
  // find the variable declaration for routes
  const routes = aNodes
    .filter(byType(SyntaxKind.VariableDeclaration))
    .map((node) => node as VariableDeclaration)
    .filter((node) => node.type && node.type.getText() === 'Routes');

  // map the routes to their array value
  const routeArrays = routes
    .map((node) => node.initializer)
    .filter((node) => node && node.kind === SyntaxKind.ArrayLiteralExpression)
    .map((node) => node as ArrayLiteralExpression);

  return routeArrays;
}

function _updateRoutes(aPath: string, aSource: SourceFile): Change[] {
  // list the nodes
  const nodes = getSourceNodes(aSource);

  // map the routes to their array value
  const routeArrays = findRouteArrays(nodes);

  // insert defaults
  return routeArrays
    .map((route) => _insertDefaultRoutes(aPath, route))
    .reduce((res, changes) => res.concat(changes), []);
}

export function updateAppRoutingModule(
  options: Schema,
  project: WorkspaceProject<ProjectType>
): Rule {
  return (host: Tree, context: SchematicContext) => {
    // sanity check on the type
    if (project.projectType === ProjectType.Application) {
      // we can safely cast
      const appProject = project as WorkspaceProject<ProjectType.Application>;

      const mainPath = appProject.architect!.build!.options.main;
      const appModulePath = getAppModulePath(host, mainPath) as Path;

      // expect the routing module to be next to the app module
      const modulePath = resolve(
        appModulePath,
        '../app-routing.module.ts' as Path
      );

      // make sure we have a routing module
      const rxRoutingModule = rxTransformTextFile(
        modulePath,
        (aSource: string | undefined) =>
          of(!!aSource ? aSource : DEFAULT_ROUTING_MODULE),
        host
      );

      const rxChangedRouter = rxRoutingModule.pipe(
        map((aPath) => {
          // add router
          changeSourceFile(
            aPath,
            (path, source) =>
              addImportToModule(
                source,
                path,
                'RouterModule.forRoot(routes, { useHash: false })',
                '@angular/router'
              ),
            host
          );

          // add page component
          changeSourceFile(
            aPath,
            (path, source) => [
              insertImport(source, path, 'PageComponent', '@acoustic-content-sdk/ng')
            ],
            host
          );

          // add guard component
          changeSourceFile(
            aPath,
            (path, source) => [
              insertImport(
                source,
                path,
                'SelectFirstRootPageGuard',
                '@acoustic-content-sdk/ng'
              )
            ],
            host
          );

          // update the routes
          changeSourceFile(
            aPath,
            (path, source) => _updateRoutes(path, source),
            host
          );
        })
      );

      return rxChangedRouter.pipe(mapTo(host));
    }
    // default
    return host;
  };
}
