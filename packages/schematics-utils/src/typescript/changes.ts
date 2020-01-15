import { Tree, UpdateRecorder } from '@angular-devkit/schematics';
import { SourceFile } from 'typescript';

import {
  addImportToModule,
  Change,
  InsertChange,
  RemoveChange,
  ReplaceChange
} from './../utility';
import { getSourceFile } from './source';

export function insertChanges(aChanges: Change[], aRecorder: UpdateRecorder) {
  aChanges.forEach((change: Change) => {
    // delete
    if (change instanceof InsertChange) {
      aRecorder.insertLeft(change.pos, change.toAdd);
    } else if (change instanceof RemoveChange) {
    } else if (change instanceof ReplaceChange) {
      // remove old chunk
      const anyChange = change as any;
      aRecorder.remove(anyChange.pos, anyChange.oldText.length);
      aRecorder.insertLeft(anyChange.pos, anyChange.newText);
    }
  });
}

export function changeSourceFile(
  aFile: string,
  aOp: (aFile: string, aContent: SourceFile) => Change[],
  aHost: Tree
) {
  // make sure at least an empty file exists
  if (!aHost.exists(aFile)) {
    aHost.create(aFile, '');
  }

  // update
  const recorder = aHost.beginUpdate(aFile);
  insertChanges(aOp(aFile, getSourceFile(aHost, aFile)), recorder);

  aHost.commitUpdate(recorder);
}

/**
 * Changes the identified module by adding a couple of imports
 *
 * @param aFile - the filename
 * @param aModules - the modules to be added
 * @param aHost - the tree
 */
export function addImportsToModule(
  aFile: string,
  aModules: { [identifier: string]: string },
  aHost: Tree
) {
  // iterate
  Object.keys(aModules).forEach(name =>
    changeSourceFile(
      aFile,
      (file, content) => addImportToModule(content, file, name, aModules[name]),
      aHost
    )
  );
}
