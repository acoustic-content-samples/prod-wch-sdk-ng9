import { LayoutBaseSchema } from '../utils/schema';

export interface Schema extends LayoutBaseSchema {
  /**
   * Regular expression of type names or IDs to include
   */
  include?: string[];

  /**
   * Regular expression of type names or IDs to exclude
   */
  exclude?: string[];
}
