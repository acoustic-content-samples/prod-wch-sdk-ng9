import {
  clearInlineEditSelectedCellAction,
  setInlineEditSelectedCellAction
} from '@acoustic-content-sdk/redux-feature-inline-edit';
import { ReduxRootStore, rxDispatch } from '@acoustic-content-sdk/redux-store';
import { Consumer, isNotEmpty } from '@acoustic-content-sdk/utils';

/**
 * Creates a consumer that dispatches the selected cell
 *
 * @param aStore - store to dispatch to
 *
 * @returns the consumer
 */
export function createInlineEditSelectedCellConsumer(
  aStore: ReduxRootStore
): Consumer<string> {
  // dispatch
  const dispatch = rxDispatch(aStore);
  // handle the selection
  return (aSelection: string) => {
    // construct the action
    const action = isNotEmpty(aSelection)
      ? setInlineEditSelectedCellAction(aSelection)
      : clearInlineEditSelectedCellAction();
    // dispatch
    dispatch(action);
  };
}
