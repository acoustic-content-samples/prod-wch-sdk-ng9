import { WchConfig } from '@acoustic-content-sdk/edit-api';
import { selectWchConfigFeature } from '@acoustic-content-sdk/redux-feature-wch-config';
import {
  ReduxRootState,
  rxSelect,
  rxStore
} from '@acoustic-content-sdk/redux-store';
import { rxPipe } from '@acoustic-content-sdk/utils';
import { Store } from 'redux';
import { Observable } from 'rxjs';

/**
 * Decodes the URL config from the redux store
 *
 * @param aStore - the redux store
 * @returns the URL config from the store
 */
export function createWchConfig(
  aStore: Store<ReduxRootState>
): Observable<WchConfig> {
  // simply atach to the store
  return rxPipe(rxStore(aStore), rxSelect(selectWchConfigFeature));
}
