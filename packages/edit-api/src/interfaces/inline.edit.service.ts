/* Copyright IBM Corp. 2018 */
import { RenderingContext } from '@acoustic-content-sdk/api';
import { Observable } from 'rxjs';

import { EventTargetLike } from './../provider/inline.edit.provider';

/**
 * The accessor string, a property path relative to the root of a
 * content item that points to the element value to be edited. A value of `null` denotes
 * the root level element.
 */
export type AccessorType = string | null;

/**
 * Implementation of the edit service used by the wchEditable directive.
 */
export interface WchInlineEditService {
  /**
   * Registers a particular DOM element as editable
   *
   * @param nativeElement - the DOM element to be edited
   * @param accessor - string identifying the member in the content item record to be edited. The value of 'null' means the the
   * content item itself will be edited.
   * @param onRenderingContext - the rendering context associated with the edit operation. The same DOM element might represent multiple
   * contexts over time
   *
   * @returns  the observable representing the registration result. The observable exposes an event producer
   * that a client can attach to to receive edit events. The registration will only take place when subscribing to the
   * observable and it will end when unsubscribing.
   */
  registerComponent(
    nativeElement: any,
    accessor: AccessorType,
    onRenderingContext: Observable<RenderingContext>
  ): Observable<EventTargetLike>;

  /**
   * Attaches to an event issued by the edit library
   *
   * @param aName - name of the event
   *
   * @returns a stream of events
   */
  fromEvent<T>(aName: string): Observable<T>;
}
