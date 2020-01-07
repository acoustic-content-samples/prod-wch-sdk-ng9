import { LayoutBaseSchema } from '../utils/schema';

export interface Schema {
  /**
   * The path to the data directory
   */
  data: string;
  /**
   * Regular expression of item names or IDs to include
   */
  include?: string[];

  /**
   * Regular expression of item names or IDs to exclude
   */
  exclude?: string[];
}
