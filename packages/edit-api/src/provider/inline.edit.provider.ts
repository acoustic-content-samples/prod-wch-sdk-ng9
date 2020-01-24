/* Copyright IBM Corp. 2018 */
import { RenderingContext } from '@acoustic-content-sdk/api';
import { fromEvent, Observable } from 'rxjs';

import { AccessorType } from './../interfaces/inline.edit.service';
import { Disposable } from './disposable';

export type EventTargetLike = Parameters<typeof fromEvent>[0];

export type WchInlineEditRegistrationResult =
  | EventTargetLike
  | EventTargetLike & Disposable;

export type WchInlineEditRegistration = (
  nativeElement: any,
  accessor: AccessorType,
  onRenderingContext: Observable<RenderingContext>
) => WchInlineEditRegistrationResult;

export interface WchInlineEditProvider {
  register: WchInlineEditRegistration;
}
