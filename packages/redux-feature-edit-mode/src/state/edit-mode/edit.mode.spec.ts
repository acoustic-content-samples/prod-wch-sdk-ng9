import {
  createReduxRootStore,
  rxSelect,
  rxStore
} from '@acoustic-content-sdk/redux-store';
import { rxPipe } from '@acoustic-content-sdk/utils';
import { filter, first } from 'rxjs/operators';

import { editModeAction } from './edit.mode.actions';
import { selectEditModeFeature } from './edit.mode.feature';
import { editModeFeature } from './edit.mode.module';

const TEST_NAME = 'edit.mode.state';
describe(TEST_NAME, () => {
  it('the edit mode reducer should work', () => {
    // construct our store
    const store = createReduxRootStore({});
    store.addFeatureModule(editModeFeature);

    store.dispatch(editModeAction(false));

    // handle this
    return rxPipe(
      rxStore(store),
      rxSelect(selectEditModeFeature),
      filter(state => !state),
      first()
    ).toPromise();
  });
});
