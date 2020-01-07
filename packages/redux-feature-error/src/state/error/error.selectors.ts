import { isNotNil, pluckProperty } from '@acoustic-content-sdk/utils';
import { UnaryFunction } from 'rxjs';

import { ErrorState } from './error.state';

// selectors for the fields
export const selectError: UnaryFunction<ErrorState, any> = pluckProperty<
  ErrorState,
  'error'
>('error');
export const selectErrorHistory: UnaryFunction<
  ErrorState,
  any[]
> = pluckProperty<ErrorState, 'errors'>('errors');

export const hasError: UnaryFunction<ErrorState, boolean> = (state) =>
  isNotNil(selectError(state));
