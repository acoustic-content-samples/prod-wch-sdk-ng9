import { UrlConfig } from '@acoustic-content-sdk/api';
import { selectUrlConfigFeature } from '@acoustic-content-sdk/redux-feature-url-config';
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
export function createUrlConfig(
  aStore: Store<ReduxRootState>
): Observable<UrlConfig> {
  // simply atach to the store
  return rxPipe(rxStore(aStore), rxSelect(selectUrlConfigFeature));
}
