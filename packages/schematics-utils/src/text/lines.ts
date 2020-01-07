export function serializeLines(aSource?: string[]): string | undefined {
  return aSource ? aSource.join('\n') : undefined;
}

export function parseLines(aSource?: string): string[] {
  return aSource ? aSource.split('\n') : [];
}

export function insertLines(
  aSource: string[] | undefined,
  aInsert: string[]
): string[] {
  if (aSource) {
    // build the set
    const existing = new Set<string>(aSource);

    return [...aSource, ...aInsert.filter(line => !existing.has(line))];
  } else {
    // just insert into the empty file
    return [...aInsert];
  }
}
