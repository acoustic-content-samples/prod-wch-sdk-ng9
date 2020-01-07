import { ReactNode } from "react";

export interface InlineEditPortal {
  id: string;
  elementKey: Element;
  node: ReactNode;
}

// state that identifies which element is being edited, undefined if none
export interface InlineEditState {
  /**
   * The item that is currently being edited
   */
  editing?: string;
  /**
   * ID of the currently selected cell in the editor
   */
  selectedCell?: string;
  /**
   * ID of the currently selected item
   */
  selectedItem?: string;

  /**
   * ID of the selected link or an index. If this is an index then it
   * is relative to the nth anchor link in the children of the selected cell.
   */
  selectedLink?: string | number;

  /**
   * Inject some UI
   */
  portals?: InlineEditPortal[];

  /**
   * A string representing the group name corresponding to the element that the user clicked
   * For example: If the user clicks on an image in an image and text block or promotion block this will be set to "image".
   * If the user clicks on an image in the image group block then this will be set to "image#0" where 0 represents
   * the image number in the image group.
   */
  clickedElement?: string;
}
