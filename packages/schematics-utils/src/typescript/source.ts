import {
  FileEntry,
  SchematicsException,
  Tree
} from '@angular-devkit/schematics';
import { createSourceFile, ScriptTarget, SourceFile } from 'typescript';

export function getSourceFile(host: Tree, path: string): SourceFile {
  const buffer = host.read(path);
  if (!buffer) {
    throw new SchematicsException(`Could not find ${path}.`);
  }
  const content = buffer.toString();
  return createSourceFile(path, content, ScriptTarget.Latest, true);
}

export function getSourceFileFromFileEntry(aEntry: FileEntry): SourceFile {
  const content = aEntry.content.toString();
  return createSourceFile(aEntry.path, content, ScriptTarget.Latest, true);
}
