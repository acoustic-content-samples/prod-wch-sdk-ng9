import { cmpNumbers } from '@acoustic-content-sdk/utils';
import { TextRange } from 'typescript';

export interface Replacement {
  pos: number;
  end: number;
  text: string;
}

export type Replacements = Replacement[];

export function replace(pos: number, end: number, text: string): Replacement {
  return { pos, end, text };
}

export function insertAtEnd(aRange: TextRange, aText: string): Replacement {
  return replace(aRange.end, aRange.end, aText);
}

export function insertAtBeginning(
  aRange: TextRange,
  aText: string
): Replacement {
  return replace(aRange.pos, aRange.pos, aText);
}

function cmpByPosition(aLeft: Replacement, aRight: Replacement): number {
  return cmpNumbers(aRight.pos, aLeft.pos);
}

export function applyReplacements(
  aSrc: string,
  aReplacements: Replacements
): string {
  // sort
  const repl = [...aReplacements].sort(cmpByPosition);
  // apply
  return repl.reduce((aStrg: string, aRepl: Replacement) => {
    // split
    const left = aStrg.substring(0, aRepl.pos);
    const right = aStrg.substring(aRepl.end);
    // new value
    return left + aRepl.text + right;
  }, aSrc);
}
