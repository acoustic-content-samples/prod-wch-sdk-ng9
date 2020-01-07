export interface LayoutBaseSchema {
  /**
   * The path to the data directory
   */
  data: string;

  /**
   * Tags for the new layouts
   */
  tags?: string[];

  /**
   * Layout type
   */
  templateType?: string;
}
