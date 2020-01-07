import { Directive, Input } from '@angular/core';
import { AccessorType } from '@acoustic-content-sdk/edit-api';

@Directive({
  selector: '[wchEditable]',
  exportAs: 'wchEditable'
})
export class WchEditableDirective {
  /**
   * Main input value for the directive. It denotes the element that is being edited.
   */
  @Input()
  wchEditable: AccessorType;
}
