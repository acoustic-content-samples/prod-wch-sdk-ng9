import { ChangeDetectionStrategy, Component } from '@angular/core';

/** Copyright IBM Corp. 2017 */
@Component({
  selector: 'wch-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.css'],
  preserveWhitespaces: false,
  /**
   * We use 'OnPush' since all changes are transported via
   * observables.
   */
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DefaultComponent {}
