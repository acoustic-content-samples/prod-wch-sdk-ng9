import {
  findProjectName,
  getAppModulePath,
  getSourceFile,
  getWorkspace,
  rxTransformHtmlFragment
} from '@acoustic-content-sdk/schematics-utils';
import {
  arrayPush,
  isEqual,
  isNotNil,
  pluckPath,
  rxPipe
} from '@acoustic-content-sdk/utils';
import { Rule, Tree } from '@angular-devkit/schematics';
import { Observable, of } from 'rxjs';
import { endWith, ignoreElements } from 'rxjs/operators';

import {
  findBootstrapComponent,
  findBootstrapImport,
  findComponent,
  findNgModule,
  findTemplate,
  isComponentDecorator,
  isNgModuleDecorator
} from '../utilities/ast.utils';
import { resolveRelativePath } from '../utilities/path';
import { Schema } from './schema';
import { KEY_MAIN } from './update.angular.json';

const selectOptions = (aName: string) =>
  pluckPath<Record<string, any>>([
    'projects',
    aName,
    'architect',
    'build',
    'options'
  ]);

const COMMENT_TEXT =
  '* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *';

const isApplicableComment = (aNode: Node) =>
  aNode.textContent.indexOf(COMMENT_TEXT) >= 0;

function transformTemplate(
  aDoc: DocumentFragment
): Observable<DocumentFragment> {
  // comment
  const filter: NodeFilter = {
    acceptNode: (aNode: Node) => 0x01
  };
  // target nodes
  const comments: Node[] = [];
  const it = aDoc.ownerDocument.createNodeIterator(aDoc, 0x80, filter);
  let current = it.nextNode();
  while (isNotNil(current)) {
    arrayPush(current, comments);
    current = it.nextNode();
  }
  // find the first comment node
  const first = comments.find(isApplicableComment);
  comments.reverse();
  const last = comments.find(isApplicableComment);
  // check we we found something
  if (isNotNil(first) && isNotNil(last)) {
    // parents
    const firstParent = first.parentNode;
    const lastParent = last.parentNode;
    if (isEqual(firstParent, lastParent)) {
      // locate
      current = last;
      while (!isEqual(first, current)) {
        const prev = current.previousSibling;
        current.parentNode.removeChild(current);
        current = prev;
      }
      // remove
      current.parentNode.removeChild(current);
    }
  }

  return of(aDoc);
}

export function updateAppComponentHtml(options: Schema): Rule {
  return (host: Tree) => {
    // find the app component
    // get the project name
    const projectName = findProjectName(host, options);
    // filename
    const angularJson = getWorkspace(host);
    // extract the options
    const opts = selectOptions(projectName)(angularJson);
    // select the main file
    const main = opts[KEY_MAIN];
    const appModule = getAppModulePath(host, main);
    // parse the app module
    const appSource = getSourceFile(host, appModule);
    // locate the main app component
    const appClass = findNgModule(appSource);
    // locate the bootstrap component
    const bootstrapComponent = findBootstrapComponent(
      appClass.decorators.find(isNgModuleDecorator)
    );
    // locate the bootstrap component
    const imp = findBootstrapImport(bootstrapComponent, appSource);
    const cmpFile = `${resolveRelativePath(appSource.fileName, imp)}.ts`;
    // parse the component
    const cmpSource = getSourceFile(host, cmpFile);
    // locate the component class
    const cmpClass = findComponent(cmpSource);
    // locate the template
    const template = findTemplate(
      cmpClass.decorators.find(isComponentDecorator)
    );
    // finally the path
    const templateFile = resolveRelativePath(cmpSource.fileName, template);
    // transform the file
    const template$ = rxTransformHtmlFragment(
      templateFile,
      transformTemplate,
      host
    );
    // done
    return rxPipe(template$, ignoreElements(), endWith(host));
  };
}
