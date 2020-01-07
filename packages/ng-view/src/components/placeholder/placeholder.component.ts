import { AccessorType } from '@acoustic-content-sdk/edit-api';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'wch-placeholder [wchEditable]',
  templateUrl: './wch.placeholder.html',
  styleUrls: ['./wch.placeholder.scss']
})
export class WchPlaceholderComponent {
  /**
   * Main input value for the directive. It denotes the element that is being edited.
   */
  @Input()
  wchEditable: AccessorType;
}
