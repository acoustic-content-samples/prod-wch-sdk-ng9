import {
  createIdentifier,
  PayloadAction
} from '@acoustic-content-sdk/redux-store';
import { createAction } from 'redux-actions';
import { UnaryFunction } from 'rxjs';

import { BOOTSTRAP_FEATURE } from './bootstrap.id';

export const ACTION_BOOTSTRAP = createIdentifier(
  BOOTSTRAP_FEATURE,
  'ACTION_BOOTSTRAP'
);
export type BootstrapPayload = string[];
export type BootstrapAction = PayloadAction<BootstrapPayload>;

export const bootstrapAction: UnaryFunction<
  BootstrapPayload,
  BootstrapAction
> = createAction(ACTION_BOOTSTRAP);
