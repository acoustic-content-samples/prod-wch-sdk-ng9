export interface Schema {
  /**
   * The path to the data directory
   */
  data?: string;

  /**
   * The path to create the component.
   */

  path?: string;
  /**
   * The name of the project.
   */
  project?: string;

  /**
   * Regular expression of type names or IDs to include
   */
  include?: string[];

  /**
   * Regular expression of type names or IDs to exclude
   */
  exclude?: string[];
}
