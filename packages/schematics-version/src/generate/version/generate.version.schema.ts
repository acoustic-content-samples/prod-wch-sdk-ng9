export interface GenerateVersionSchema {
  /**
   * The version information, falls back to the `npm_package_version` environment variable or to the value in `package.json`
   */
  version?: string;
  /**
   * The project name, falls back to the default project
   */
  project?: string;
}
