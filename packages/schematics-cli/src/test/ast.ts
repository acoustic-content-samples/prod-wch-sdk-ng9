import { HostTree } from '@angular-devkit/schematics';
import { Change, InsertChange } from '@acoustic-content-sdk/schematics-utils';

import { getFileContent } from './get-file-content';

export function applyChanges(
  path: string,
  content: string,
  changes: Change[]
): string {
  const tree = new HostTree();
  tree.create(path, content);
  const exportRecorder = tree.beginUpdate(path);
  for (const change of changes) {
    if (change instanceof InsertChange) {
      exportRecorder.insertLeft(change.pos, change.toAdd);
    }
  }
  tree.commitUpdate(exportRecorder);

  return getFileContent(tree, path);
}
