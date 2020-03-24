import { AuthoringContentItem } from '@acoustic-content-sdk/api';
import { selectByDeliveryId } from '@acoustic-content-sdk/redux-utils';
import { UnaryFunction } from 'rxjs';

import { AuthoringContentState } from './auth.content.state';

export const selectAuthoringContentItem: UnaryFunction<
  string,
  UnaryFunction<AuthoringContentState, AuthoringContentItem>
> = (id) => selectByDeliveryId(id);
