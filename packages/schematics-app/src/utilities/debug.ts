import { SyntaxKind, Node } from 'typescript';

export function nodeToDebug(aNode?: Node): any {
  return aNode ? { kind: SyntaxKind[aNode.kind], text: aNode.getText() } : null;
}
