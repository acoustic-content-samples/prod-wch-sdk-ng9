/* Copyright IBM Corp. 2018 */
import { RenderingContextV2 } from '@acoustic-content-sdk/api';
import { Observable } from 'rxjs';

import { AccessorType } from '../../interfaces/inline.edit.service';
import { EventTargetLike } from '../../provider/inline.edit.provider';

/**
 * Implementation of the edit service used by the wchEditable directive.
 */
export interface WchInlineEditServiceV2 {
  /**
   * Registers a particular DOM element as editable
   *
   * @param nativeElement the DOM element to be edited
   * @param accessor string identifying the member in the content item record to be edited. The value of 'null' means the the
   * content item itself will be edited.
   * @param renderingContext$  the rendering context associated with the edit operation. The same DOM element might represent multiple
   * contexts over time
   *
   * @return  the observable representing the registration result. The observable exposes an event producer
   * that a client can attach to to receive edit events. The registration will only take place when subscribing to the
   * observable and it will end when unsubscribing.
   */
  registerComponent(
    nativeElement: any,
    accessor: AccessorType,
    renderingContext$: Observable<RenderingContextV2>
  ): Observable<EventTargetLike>;

  /**
   * Attaches to an event issued by the edit library
   *
   *
   * @param aName name of the event
   */
  fromEvent<T>(aName: string): Observable<T>;
}
