/* Copyright IBM Corp. 2018 */
import { RenderingContext } from '@acoustic-content-sdk/api';
import { fromEvent, Observable } from 'rxjs';

import { AccessorType } from './../interfaces/inline.edit.service';
import { Disposable } from './disposable';

export type EventTargetLike = Parameters<typeof fromEvent>[0];

/**
 * Result of an inline edit registration. This is at least an event emitter but
 * may optionally also expose the `Disposable` interface to allow deregistration
 */
export type WchInlineEditRegistrationResult =
  | EventTargetLike
  | (EventTargetLike & Disposable);

/**
 * @deprecated use {@link WchInlineEditRegistrationV2} instead
 */
export type WchInlineEditRegistration = (
  nativeElement: any,
  accessor: AccessorType,
  onRenderingContext: Observable<RenderingContext>
) => WchInlineEditRegistrationResult;

/**
 * @deprecated use {@link WchInlineEditProviderV2} instead
 */
export interface WchInlineEditProvider {
  register: WchInlineEditRegistration;
}
