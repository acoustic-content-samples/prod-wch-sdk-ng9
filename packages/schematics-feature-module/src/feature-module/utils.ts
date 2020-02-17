import { findPackageJson } from '@acoustic-content-sdk/schematics-utils';
import { pluckPath, rxPipe } from '@acoustic-content-sdk/utils';
import { SchematicContext } from '@angular-devkit/schematics';
import { parse } from 'path';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

const selectSchema = pluckPath<string>(['schematic', 'description', 'schema']);
const selectPackageName = pluckPath<string>(['name']);

/**
 * Locates the package name
 *
 * @param context - the schematic context
 * @returns the name of the package running the schematic
 */
export function findPackageName(context: SchematicContext): Observable<string> {
  // find the schema
  const schema = selectSchema(context);
  const { dir } = parse(schema);
  // locate the package
  return rxPipe(findPackageJson(dir), map(selectPackageName));
}

/**
 * Locates the package name
 *
 * @param context - the schematic context
 * @returns the path of the package file
 */
export function readPackageJson(context: SchematicContext): Observable<any> {
  // find the schema
  const schema = selectSchema(context);
  const { dir } = parse(schema);
  // locate the package
  return findPackageJson(dir);
}
