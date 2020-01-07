import { opFilterNever, rxPipe } from '@acoustic-content-sdk/utils';
import { combineEpics, Epic, ofType } from 'redux-observable';
import { mapTo } from 'rxjs/operators';

import { ofInitFeature } from '../../impl/feature.module.impl';
import { ADD_SAMPLE_ACTION, addSampleAction } from './feature.actions';
import { INIT_FEATURE } from './feature.id';

const addEpic: Epic = (actions$) =>
  rxPipe(actions$, ofType(ADD_SAMPLE_ACTION), opFilterNever);

const initEpic: Epic = (actions$) =>
  rxPipe(actions$, ofInitFeature(INIT_FEATURE), mapTo(addSampleAction('init')));

export const sampleEpic: Epic = combineEpics(addEpic, initEpic);
