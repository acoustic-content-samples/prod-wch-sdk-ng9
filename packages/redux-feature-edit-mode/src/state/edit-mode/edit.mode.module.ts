import { createReduxFeatureModule } from '@acoustic-content-sdk/redux-store';

import { EditModeFeatureState } from './edit.mode.feature';
import { EDIT_MODE_FEATURE } from './edit.mode.id';
import { editModeReducer, EditModeState } from './edit.mode.state';

export const editModeFeature = createReduxFeatureModule<
  EditModeState,
  EditModeFeatureState
>(EDIT_MODE_FEATURE, editModeReducer);
