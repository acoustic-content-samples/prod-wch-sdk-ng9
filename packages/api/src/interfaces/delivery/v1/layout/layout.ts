/* Copyright IBM Corp. 2018 */

/**
 * Representation of a layout descriptor in the delivery artifacts
 */
export interface Layout {
  /**
   * ID of the layout
   */
  id: string;
  /**
   * Name of the layout
   */
  name: string;
  /**
   * The template type, either 'handlebars' or 'angular'
   */
  templateType: string;
  /**
   * The template description, will be a selector for angular and a filename for handlebars
   */
  template: string;
}

/**
 * Ordering of the layouts per layout mode
 */
export type Layouts = Record<string, Layout>;
