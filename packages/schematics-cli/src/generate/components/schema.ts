export interface Schema {
  /**
   * Flat naming or not
   */
  flat?: boolean;

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

  layoutHtmlTemplate?: string;

  webComponents?: boolean;

  editable?: boolean;

  force?: boolean;

  /**
   * Regular expression of type names or IDs to include
   */
  include?: string[];

  /**
   * Regular expression of type names or IDs to exclude
   */
  exclude?: string[];

  /**
   * The file extension or preprocessor to use for style files.
   */
  style?: string;
}
