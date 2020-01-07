import { Node } from 'typescript';

export function sortByPosition(aLeft: Node, aRight: Node): number {
  const posLeft = aLeft.pos,
    posRight = aRight.pos;
  return posLeft < posRight ? -1 : posLeft > posRight ? +1 : 0;
}
