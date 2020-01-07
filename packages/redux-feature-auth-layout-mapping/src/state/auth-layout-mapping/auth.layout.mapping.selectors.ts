import { AuthoringLayoutMapping } from '@acoustic-content-sdk/api';
import { isEqual, isNotNil, reduceForIn } from '@acoustic-content-sdk/utils';
import { UnaryFunction } from 'rxjs';

import { AuthoringLayoutMappingState } from './auth.layout.mapping.state';

export const selectAuthoringLayoutMappingByTypeId: UnaryFunction<
  string,
  UnaryFunction<AuthoringLayoutMappingState, AuthoringLayoutMapping>
> = (typeId: string) => (state: AuthoringLayoutMappingState) =>
  reduceForIn(
    state,
    (res: AuthoringLayoutMapping, value: AuthoringLayoutMapping) =>
      isNotNil(res) ? res : isEqual(value.type.id, typeId) ? value : res,
    undefined
  );
