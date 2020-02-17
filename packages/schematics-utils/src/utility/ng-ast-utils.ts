/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { normalize } from '@angular-devkit/core';
import { SchematicsException, Tree } from '@angular-devkit/schematics';
import { dirname } from 'path';

import { findNode, getSourceNodes } from '../utility/ast-utils';
import {
  Node,
  CallExpression,
  createSourceFile,
  ScriptTarget,
  SyntaxKind,
  ImportDeclaration,
  StringLiteral
} from 'typescript';

export function findBootstrapModuleCall(
  host: Tree,
  mainPath: string
): CallExpression | null {
  const mainBuffer = host.read(mainPath);
  if (!mainBuffer) {
    throw new SchematicsException(`Main file (${mainPath}) not found`);
  }
  const mainText = mainBuffer.toString('utf-8');
  const source = createSourceFile(
    mainPath,
    mainText,
    ScriptTarget.Latest,
    true
  );

  const allNodes = getSourceNodes(source);

  let bootstrapCall: CallExpression | null = null;

  for (const node of allNodes) {
    let bootstrapCallNode: Node | null = null;
    bootstrapCallNode = findNode(
      node,
      SyntaxKind.Identifier,
      'bootstrapModule'
    );

    // Walk up the parent until CallExpression is found.
    while (
      bootstrapCallNode &&
      bootstrapCallNode.parent &&
      bootstrapCallNode.parent.kind !== SyntaxKind.CallExpression
    ) {
      bootstrapCallNode = bootstrapCallNode.parent;
    }

    if (
      bootstrapCallNode !== null &&
      bootstrapCallNode.parent !== undefined &&
      bootstrapCallNode.parent.kind === SyntaxKind.CallExpression
    ) {
      bootstrapCall = bootstrapCallNode.parent as CallExpression;
      break;
    }
  }

  return bootstrapCall;
}

export function findBootstrapModulePath(host: Tree, mainPath: string): string {
  const bootstrapCall = findBootstrapModuleCall(host, mainPath);
  if (!bootstrapCall) {
    throw new SchematicsException('Bootstrap call not found');
  }

  const bootstrapModule = bootstrapCall.arguments[0];

  const mainBuffer = host.read(mainPath);
  if (!mainBuffer) {
    throw new SchematicsException(
      `Client app main file (${mainPath}) not found`
    );
  }
  const mainText = mainBuffer.toString('utf-8');
  const source = createSourceFile(
    mainPath,
    mainText,
    ScriptTarget.Latest,
    true
  );
  const allNodes = getSourceNodes(source);
  const bootstrapModuleRelativePath = allNodes
    .filter((node) => node.kind === SyntaxKind.ImportDeclaration)
    .filter((imp) => {
      return findNode(imp, SyntaxKind.Identifier, bootstrapModule.getText());
    })
    .map((imp: ImportDeclaration) => {
      const modulePathStringLiteral = imp.moduleSpecifier as StringLiteral;

      return modulePathStringLiteral.text;
    })[0];

  return bootstrapModuleRelativePath;
}

export function getAppModulePath(host: Tree, mainPath: string): string {
  const moduleRelativePath = findBootstrapModulePath(host, mainPath);
  const mainDir = dirname(mainPath);
  const modulePath = normalize(`/${mainDir}/${moduleRelativePath}.ts`);

  return modulePath;
}
