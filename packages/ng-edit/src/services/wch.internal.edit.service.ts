import {
  EVENT_EDIT_END,
  EVENT_EDIT_START,
  EVENT_INLINE_EDIT_START,
  WchEditableEvent,
  WchInlineEditEvent
} from '@acoustic-content-sdk/edit-api';
import {
  Consumer,
  createConsumerOnSubject,
  opDistinctUntilChanged,
  rxPipe,
  shareLast
} from '@acoustic-content-sdk/utils';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { map, scan, startWith } from 'rxjs/operators';

const DEFAULT_EDITING = false;
const DEFAULT_INLINE_EDIT = false;

/**
 * Service that manages the inline edit state
 */
@Injectable({ providedIn: 'root' })
export class WchInternalEditService {
  /** the subject that manages the edit operations on an element */
  readonly editableConsumer: Consumer<WchEditableEvent>;

  /** the subject that manages the inline edit operations */
  readonly inlineEditConsumer: Consumer<WchInlineEditEvent>;

  /** observable keeping track whether an inline edit operation is happening */
  readonly editing$: Observable<boolean>;

  /** observable keeping track whether inline edit is active */
  readonly inlineEdit$: Observable<boolean>;

  constructor() {
    // the subject that holds the current editing state, updated by a reducer
    const editable = new Subject<WchEditableEvent>();
    const inlineEdit = new Subject<WchInlineEditEvent>();

    // derive
    const editable$ = rxPipe(
      editable,
      scan<WchEditableEvent, number>((count, event) => {
        // handle the global state
        switch (event.type) {
          case EVENT_EDIT_START:
            return count + 1;
          case EVENT_EDIT_END:
            return count - 1;
          default:
            return count;
        }
      }, 0),
      map(Boolean),
      startWith(DEFAULT_EDITING),
      opDistinctUntilChanged,
      shareLast()
    );

    const inlineEdit$ = rxPipe(
      inlineEdit,
      map((event) => event && event.type === EVENT_INLINE_EDIT_START),
      startWith(DEFAULT_INLINE_EDIT),
      opDistinctUntilChanged,
      shareLast()
    );

    // attach
    this.editableConsumer = createConsumerOnSubject(editable);
    this.inlineEditConsumer = createConsumerOnSubject(inlineEdit);
    this.editing$ = editable$;
    this.inlineEdit$ = inlineEdit$;
  }
}
