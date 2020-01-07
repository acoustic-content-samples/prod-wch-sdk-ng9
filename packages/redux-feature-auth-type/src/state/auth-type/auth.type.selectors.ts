import { AuthoringType } from '@acoustic-content-sdk/api';
import { selectByDeliveryId } from '@acoustic-content-sdk/redux-utils';
import { UnaryFunction } from 'rxjs';

import { AuthoringTypeState } from './auth.type.state';

export const selectAuthType: UnaryFunction<
  string,
  UnaryFunction<AuthoringTypeState, AuthoringType>
> = id => selectByDeliveryId(id);
