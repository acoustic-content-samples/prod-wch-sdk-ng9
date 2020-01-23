import { assertObject } from '@acoustic-content-sdk/utils';

export interface ImportedClasses {
  [key: string]: string;
}

export interface Imports {
  [from: string]: ImportedClasses;
}

export function registerImport(
  aClass: string,
  aFrom: string,
  aImports: Imports
) {
  // create the hook
  const imp: ImportedClasses = assertObject(aFrom, aImports);
  // add
  imp[aClass] = aClass;
}
