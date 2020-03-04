/**
 * Definition of the input parameters for the schematic
 */
export interface AddFeatureModuleToApplicationSchema {
  /**
   * Name of the module, may be a comma separated list. Module identifiers have the following syntax: `[path#]name[.forRoot()]`. If `path` is
   * missing it falls back to the import path given by this schema (or its default).
   */
  module: string;
  /**
   * The project name, falls back to the default project
   */
  project?: string;
  /**
   * Optionally the import path of the module. If missing defaults to the project running the initial schematic.
   */
  importPath?: string;
}
