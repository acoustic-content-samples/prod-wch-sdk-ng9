import { AbstractSitesTextComponent } from './abstract.sites.text.component';
import { Observable } from 'rxjs';
import { rxSelectProperty, pluckPath, rxPipe } from '@acoustic-content-sdk/utils';
import { KEY_METADATA, KEY_ACCESSOR, KEY_ID } from '@acoustic-content-sdk/api';
import { rxSelect } from '@acoustic-content-sdk/redux-store';

/** Useful imports */
// import { map, takeUntil, distinctUntilChanged } from 'rxjs/operators';

const selectAccessor = pluckPath<string>([KEY_METADATA, KEY_ACCESSOR]);
const selectId = pluckPath<string>([KEY_METADATA, KEY_ID]);

/*
 * @name Sites Text
 * @id 373c81a5-d86b-4740-8f11-62fcbccfca08
 */
export abstract class TypeSitesTextComponent extends AbstractSitesTextComponent {
  // base accessor string
  readonly accessor$: Observable<string>;
  readonly id$: Observable<string>;

  /*
   * TODO add custom fields here. These fields should be those
   * common to all layouts.
   */

  protected constructor() {
    super();
    // access the accessor
    this.accessor$ = rxPipe(this.renderingContext$, rxSelect(selectAccessor));
    this.id$ = rxPipe(this.renderingContext$, rxSelect(selectId));
  }
}
