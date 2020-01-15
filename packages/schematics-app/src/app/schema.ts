export interface Schema {
  // the API URL
  url: string;
  // true if editable
  editable: boolean;
  /**
   * The name of the project.
   */
  project?: string;
  /**
   * ": "The target to apply service worker to.
   */
  target: string;
}
