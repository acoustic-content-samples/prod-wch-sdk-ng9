import { LayoutBaseSchema } from '../utils/schema';

export interface Schema extends LayoutBaseSchema {
  /**
   * Name of the layout
   */
  name?: string;

  /**
   * Name of the type to create the layout for
   */
  type: string;
}
