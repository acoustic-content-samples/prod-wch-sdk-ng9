import { AuthoringContentItem } from "@acoustic-content-sdk/api";
import { pluckProperty } from "@acoustic-content-sdk/utils";
import { selectByDeliveryId } from "@acoustic-content-sdk/redux-utils";
import { UnaryFunction } from "rxjs";

import { AuthoringContentTemplateState } from "./auth.content.templates.state";

export const selectAuthContentTemplate: UnaryFunction<
  string,
  UnaryFunction<AuthoringContentTemplateState, AuthoringContentItem>
> = id => selectByDeliveryId(id);

/**
 * Extract the delivery ID of the draft
 *
 * @param item - the item
 * @returns the delivery version of the ID
 */
export const keyByTypeId: UnaryFunction<
  AuthoringContentItem,
  string
> = pluckProperty("typeId");
