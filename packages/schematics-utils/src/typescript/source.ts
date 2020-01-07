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
  const source = createSourceFile(path, content, ScriptTarget.Latest, true);

  return source;
}

export function getSourceFileFromFileEntry(aEntry: FileEntry): SourceFile {
  const content = aEntry.content.toString();
  const source = createSourceFile(
    aEntry.path,
    content,
    ScriptTarget.Latest,
    true
  );

  return source;
}
