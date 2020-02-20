import {
  findProjectName,
  getWorkspace,
  rxTransformHtmlFile
} from '@acoustic-content-sdk/schematics-utils';
import { forEach, isNil, pluckPath, rxPipe } from '@acoustic-content-sdk/utils';
import { Rule, Tree } from '@angular-devkit/schematics';
import { Observable, of } from 'rxjs';
import { endWith, ignoreElements } from 'rxjs/operators';

import { AddBootstrapSchema } from './schema';

const selectIndexFile = (aName: string) =>
  pluckPath<string>([
    'projects',
    aName,
    'architect',
    'build',
    'options',
    'index'
  ]);

/**
 * See {@link https://getbootstrap.com/docs/4.4/getting-started/introduction/|Bootstrap doc}
 */
const BOOSTRAP_CSS = `<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">`;
const BOOTSTRAP_SCRIPT = `
<script src="https://code.jquery.com/jquery-3.4.1.slim.min.js" integrity="sha384-J6qa4849blE2+poT4WnyKhv5vZF5SrPo0iEjwBvKU7imGFAV0wwj1yYfoRSJoZ+n" crossorigin="anonymous"></script>
<script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js" integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo" crossorigin="anonymous"></script>
<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js" integrity="sha384-wfSDF2E50Y2D1uUdj0O3uMBJnjuUD4Ih7YwaYd1iqfktj0Uod8GCExl3Og8ifwB6" crossorigin="anonymous"></script>
`;

/**
 * Transforms the document by adding bootstrap
 *
 * @param aFragment - the fragment to modify
 * @returns the modified document
 */
function transformIndex(aFragment: Document): Observable<Document> {
  // do not create a file
  if (isNil(aFragment)) {
    return of(aFragment);
  }
  // find the head and body sections
  const head = aFragment.querySelector('head');
  const body = aFragment.querySelector('body');
  // some helper magic
  const tmp = aFragment.createElement('template');
  const content = tmp.content;
  // add link
  tmp.innerHTML = BOOSTRAP_CSS;
  const links = content.querySelectorAll('link');
  forEach(links, (link) => head.appendChild(link));
  // scripts
  tmp.innerHTML = BOOTSTRAP_SCRIPT;
  const scripts = content.querySelectorAll('script');
  forEach(scripts, (script) => body.appendChild(script));
  // returns the new fragment
  return of(aFragment);
}

/**
 * Adds SDK support to an existing Angular application
 *
 * @param options - the schematics object used to describe the applicatiojn
 *
 * @returns the schematics rule that executes the transform
 */
export function addBootstrap(options: AddBootstrapSchema): Rule {
  return (host: Tree) => {
    // get the project name
    const projectName = findProjectName(host, options);
    // filename
    const angularJson = getWorkspace(host);
    // the index file
    const indexFile = selectIndexFile(projectName)(angularJson);
    // transform
    return rxPipe(
      rxTransformHtmlFile(indexFile, transformIndex, host),
      ignoreElements(),
      endWith(host)
    );
  };
}
