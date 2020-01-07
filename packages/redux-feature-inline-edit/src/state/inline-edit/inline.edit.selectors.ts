import { isEqual, pluckProperty } from "@acoustic-content-sdk/utils";
import { UnaryFunction } from "rxjs";

import { InlineEditState } from "./inline.edit.state";

/**
 * Selects the element being edited
 *
 * @param aElement - the element to test for
 * @returns selector against that image
 */
export const selectInlineEditing: UnaryFunction<
  InlineEditState,
  string
> = pluckProperty("editing");

/**
 * Selects the cell being edited
 *
 * @param aElement - the element to test for
 * @returns selector against that image
 */
export const selectInlineEditSelectedCell: UnaryFunction<
  InlineEditState,
  string
> = pluckProperty("selectedCell");

/**
 * Selects the link being selected
 *
 * @param aElement - the element to test for
 * @returns selector against that image
 */
export const selectInlineEditSelectedLink: UnaryFunction<
  InlineEditState,
  string | number
> = pluckProperty("selectedLink");

/**
 * Selects the item being edited
 *
 * @param aElement - the element to test for
 * @returns selector against that image
 */
export const selectInlineEditSelectedItem: UnaryFunction<
  InlineEditState,
  string
> = pluckProperty("selectedItem");

/**
 * Selector to test if a particular element is being edited
 *
 * @param aElement - the element to test for
 * @returns selector against that image
 */
export const selectIsInlineEditing: UnaryFunction<
  string,
  UnaryFunction<InlineEditState, boolean>
> = (aElement: string) => (aState: InlineEditState) =>
  isEqual(aElement, aState.editing);

/**
 * Selects the exact element that was clicked on inside item being edited
 *
 * @param aElement - the element to test for
 * @returns selector against that image
 */
export const selectInlineEditClickedElement: UnaryFunction<
  InlineEditState,
  string
> = pluckProperty("clickedElement");

/**
 * @deprecated use selectInlineEditSelectedCell instead
 */
export const selectInlineEditSelection = selectInlineEditSelectedCell;
