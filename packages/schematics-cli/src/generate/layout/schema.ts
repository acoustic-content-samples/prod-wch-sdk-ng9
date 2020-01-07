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
   * Name of the layout
   */
  name?: string;

  /**
   * Name of the type to create the layout for
   */
  type: string;
}
