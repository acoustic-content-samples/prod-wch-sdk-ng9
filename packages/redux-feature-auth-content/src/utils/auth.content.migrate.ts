import { AuthoringContentItem } from '@acoustic-content-sdk/api';
import { mapArray } from '@acoustic-content-sdk/utils';

const migrateContentItem = (
  contentItem: AuthoringContentItem
): AuthoringContentItem => {
  // migrate content to contents
  if (
    contentItem.kind &&
    contentItem.kind.indexOf('email') > -1 &&
    contentItem.elements.rows &&
    contentItem.elements.rows.values
  ) {
    // Iterate the rows
    const rows = contentItem.elements.rows.values;
    for (const row of rows) {
      if (row.cells && row.cells.values) {
        // Iterate the cells
        for (const cell of row.cells.values) {
          // if cell contents exists, change it to cell.content and delete it
          if (cell.contents) {
            cell.content = cell.contents;
            delete cell.contents;
          }

          // Check if the legacy single cell value is set
          if (cell.content && cell.content.value) {
            // change it to use values
            cell.content.values = [cell.content.value];
            delete cell.content.value;
          }
        } // end for (let cellIndex = 0; cellIndex < cells.length; cellIndex++)
      }
    } // end for (let rowIndex = 0; rowIndex < rows.length; rowIndex++)
  }

  return contentItem;
};

const migrateContentItems = (
  contentItems: AuthoringContentItem[]
): AuthoringContentItem[] => {
  return mapArray(contentItems, migrateContentItem);
};

export { migrateContentItem, migrateContentItems };
