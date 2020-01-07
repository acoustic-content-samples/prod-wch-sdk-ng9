import { Reducer } from 'redux';
import { handleActions } from 'redux-actions';

import { selectPayload } from '../../store/actions';
import { ADD_SAMPLE_ACTION, AddSampleAction } from './feature.actions';
import { SampleFeatureState } from './feature.state';

const DEFAULT_STATE: SampleFeatureState = 'default';

export const sampleReducer: Reducer<SampleFeatureState> = handleActions(
  {
    [ADD_SAMPLE_ACTION]: (state: SampleFeatureState, action: AddSampleAction) =>
      selectPayload(action)
  },
  DEFAULT_STATE
);
