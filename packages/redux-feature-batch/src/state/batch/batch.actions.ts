import { PayloadAction } from "@acoustic-content-sdk/redux-store";
import { createAction } from "redux-actions";
import { UnaryFunction } from "rxjs";

export const ACTION_GUARANTEE_AUTH_CONTENT_BATCH =
  "ACTION_GUARANTEE_AUTH_CONTENT_BATCH";
export type GuaranteeAuthoringContentBatchAction = PayloadAction<
  string | string[]
>;

/**
 * Makes sure to preload items as fast as possible
 */
export const guaranteeAuthoringContentBatchAction: UnaryFunction<
  string | string[],
  GuaranteeAuthoringContentBatchAction
> = createAction(ACTION_GUARANTEE_AUTH_CONTENT_BATCH);
