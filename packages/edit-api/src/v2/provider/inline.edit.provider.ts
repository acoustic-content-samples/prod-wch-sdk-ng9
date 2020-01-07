/* Copyright IBM Corp. 2018 */
import { RenderingContextV2 } from '@acoustic-content-sdk/api';
import { Observable } from 'rxjs';

import { AccessorType } from '../../interfaces/inline.edit.service';
import { WchInlineEditRegistrationResult } from '../../provider/inline.edit.provider';

export type WchInlineEditRegistrationV2 = (
  nativeElement: any,
  accessor: AccessorType,
  renderingContext$: Observable<RenderingContextV2>
) => WchInlineEditRegistrationResult;

export interface WchInlineEditProviderV2 {
  register: WchInlineEditRegistrationV2;
}
