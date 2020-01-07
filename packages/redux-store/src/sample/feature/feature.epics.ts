import { opFilterNever, rxPipe } from '@acoustic-content-sdk/utils';
import { Epic, ofType } from 'redux-observable';

import { ADD_SAMPLE_ACTION } from './feature.actions';

export const sampleEpic: Epic = (actions$) =>
  rxPipe(actions$, ofType(ADD_SAMPLE_ACTION), opFilterNever);
