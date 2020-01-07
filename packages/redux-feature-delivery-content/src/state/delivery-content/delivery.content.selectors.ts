import { ContentItemWithLayout } from "@acoustic-content-sdk/api";
import { selectByDeliveryId } from "@acoustic-content-sdk/redux-utils";
import { UnaryFunction } from "rxjs";

import { DeliveryContentState } from "./delivery.content.state";

export const selectDeliveryContentItem: UnaryFunction<
  string,
  UnaryFunction<DeliveryContentState, ContentItemWithLayout>
> = id => selectByDeliveryId(id);
