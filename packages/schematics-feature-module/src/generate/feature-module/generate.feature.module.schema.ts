export interface GenerateFeatureModuleSchema {
  /**
   * Name of the module, may be a comma separated list
   */
  module: string;
  /**
   * The project name, falls back to the default project
   */
  project?: string;
}
