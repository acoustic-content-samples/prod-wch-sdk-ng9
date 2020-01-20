import { AbstractSitesCellComponent } from './abstract.sites.cell.component';
import { pluckPath, rxPipe } from '@acoustic-content-sdk/utils';
import { KEY_METADATA, KEY_ACCESSOR } from '@acoustic-content-sdk/api';
import { Observable } from 'rxjs';
import { rxSelect } from '@acoustic-content-sdk/redux-store';

/** Useful imports */
// import { map, takeUntil, distinctUntilChanged } from 'rxjs/operators';

const selectAccessor = pluckPath<string>([KEY_METADATA, KEY_ACCESSOR]);

/*
 * @name Sites Cell
 * @id d1e4dd37-8ac5-43a9-9145-1f194053b27c
 */
export abstract class TypeSitesCellComponent extends AbstractSitesCellComponent {
  readonly accessor$: Observable<string>;

    /*
     * TODO add custom fields here. These fields should be those
     * common to all layouts.
     */

    protected constructor() {
        super();
        this.accessor$ = rxPipe(this.renderingContext$, rxSelect(selectAccessor));
    }

}
