import { AuthoringAsset } from '@acoustic-content-sdk/api';
import { selectByDeliveryId } from '@acoustic-content-sdk/redux-utils';
import { UnaryFunction } from 'rxjs';

import { AuthoringAssetState } from './auth.asset.state';

/**
 * Selector for assets. Validates that the ID is a delivery ID (not a draft ID) and selects
 * based on that ID from the state
 *
 * @param id - the asset ID
 * @returns a selector for a delivery ID based on some state
 */
export const selectAuthoringAsset: UnaryFunction<
  string,
  UnaryFunction<AuthoringAssetState, AuthoringAsset>
> = id => selectByDeliveryId(id);
