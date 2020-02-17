export interface CreatePackageFromArtifactsSchema {
  /**
   * optinally the license, defaults to MIT
   */
  license?: string;
  /**
   * a comma separated list of tags
   */
  tag?: string;
  /**
   * optionally the explicit list of files to include
   */
  files?: string[];
  /**
   * location of the data directory, defaults to 'data'
   */
  data?: string;
}
