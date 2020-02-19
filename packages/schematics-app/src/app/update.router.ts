import {
  addImportToModule,
  byType,
  Change,
  changeSourceFile,
  findProjectName,
  getAppModulePath,
  getSourceNodes,
  getWorkspace,
  InsertChange,
  insertImport,
  rxTransformTextFile
} from '@acoustic-content-sdk/schematics-utils';
import { pluckPath, rxPipe } from '@acoustic-content-sdk/utils';
import { normalize, Path, resolve } from '@angular-devkit/core';
import { Rule, Tree } from '@angular-devkit/schematics';
import { of } from 'rxjs';
import { endWith, ignoreElements, map } from 'rxjs/operators';
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
import { KEY_MAIN } from './update.angular.json';

const MATCH_ALL_ROUTE = `{
  path: '**',
  component: PageComponent
}`;

const DEFAULT_ROUTE = `{
  path: '',
  pathMatch: 'full',
  canActivate: [WchSelectFirstRootPageGuard],
  component: PageComponent,
}`;

const DEFAULT_ROUTING_MODULE = `
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageComponent, WchSelectFirstRootPageGuard } from '@acoustic-content-sdk/ng';

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
  return (node: Node): boolean =>
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

const selectBuildOptions = (aName: string) =>
  pluckPath<Record<string, any>>([
    'projects',
    aName,
    'architect',
    'build',
    'options'
  ]);

export function updateAppRoutingModule(options: Schema): Rule {
  return (host: Tree) => {
    // get the project name
    const projectName = findProjectName(host, options);
    // filename
    const angularJson = getWorkspace(host);
    // extract the options
    const opts = selectBuildOptions(projectName)(angularJson);
    // select the main file
    const main = opts[KEY_MAIN];
    const appModule = normalize(getAppModulePath(host, main));
    // expect the routing module to be next to the app module
    const modulePath = resolve(appModule, '../app-routing.module.ts' as Path);

    // make sure we have a routing module
    const rxRoutingModule = rxTransformTextFile(
      modulePath,
      (aSource: string | undefined) =>
        of(!!aSource ? aSource : DEFAULT_ROUTING_MODULE),
      host
    );

    const rxChangedRouter = rxPipe(
      rxRoutingModule,
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
            insertImport(
              source,
              path,
              'PageComponent',
              '@acoustic-content-sdk/ng'
            )
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
              'WchSelectFirstRootPageGuard',
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

    return rxPipe(rxChangedRouter, ignoreElements(), endWith(host));
  };
}
