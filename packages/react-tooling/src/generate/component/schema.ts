export interface GenerateComponentSchema {
  /**
   * Name of the schema
   */
  name: string;
  /**
   * Add support for carbon
   */
  carbon?: boolean;
  /**
   * Add support for a redux store
   */
  store?: boolean;
  /**
   * Add support for dependency injection
   */
  di?: boolean;
}
