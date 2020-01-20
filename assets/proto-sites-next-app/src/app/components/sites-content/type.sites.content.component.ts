import { AbstractSitesContentComponent } from './abstract.sites.content.component';
import { pluckPath, rxPipe } from '@acoustic-content-sdk/utils';
import { KEY_METADATA, KEY_ACCESSOR } from '@acoustic-content-sdk/api';
import { Observable } from 'rxjs';
import { rxSelect } from '@acoustic-content-sdk/redux-store';

/** Useful imports */
// import { map, takeUntil, distinctUntilChanged } from 'rxjs/operators';

const selectAccessor = pluckPath<string>([KEY_METADATA, KEY_ACCESSOR]);

/*
 * @name Sites Content
 * @id 21a8b4fd-0236-4187-bfea-7a94283e7b80
 */
export abstract class TypeSitesContentComponent extends AbstractSitesContentComponent {
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
