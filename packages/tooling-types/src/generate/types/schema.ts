export interface GenerateTypesSchema {
  /**
   * The path to the data directory
   */
  data: string;
  /**
   * Regular expression of type names or IDs to include
   */
  include?: string[];

  /**
   * Regular expression of type names or IDs to exclude
   */
  exclude?: string[];
}
