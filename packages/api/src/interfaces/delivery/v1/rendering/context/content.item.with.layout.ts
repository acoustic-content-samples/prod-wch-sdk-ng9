/** Copyright IBM Corp. 2018 */
import { AuthoringSelectedLayout } from '../../../../authoring/v1/layout/layout';
import { ContentItem } from './../../content/content.item';
import { Layouts } from './../../layout/layout';

export interface ContentItemWithLayout extends ContentItem {
  /**
   * The ID of the content item.
   */
  readonly id: string;

  /**
   * The layouts for the content item, ordered by mode. The 'default' mode
   * always exists and denotes the default layout.
   */
  readonly layouts: Layouts;

  /**
   * Optionally the explicitly assigned layouts
   */
  readonly selectedLayouts?: AuthoringSelectedLayout[];
}
