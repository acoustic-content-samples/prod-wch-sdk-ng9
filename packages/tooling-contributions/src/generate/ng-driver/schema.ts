export interface CreateNgDriverArtifactsSchema {
  /**
   * The name of the project.
   */
  project?: string;
  /**
   * The name of the configuration to use
   */
  configuration?: string;
  /**
   * mode
   */
  mode?: string;
  /**
   * a comma separated list of tags
   */
  tag?: string;
}
