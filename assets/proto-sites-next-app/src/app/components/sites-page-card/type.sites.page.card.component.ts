import { AbstractSitesPageCardComponent } from './abstract.sites.page.card.component';
import { Observable } from 'rxjs';
import { pluckPath, rxPipe } from '@acoustic-content-sdk/utils';
import { KEY_METADATA, KEY_ACCESSOR, KEY_ID } from '@acoustic-content-sdk/api';
import { rxSelect } from '@acoustic-content-sdk/redux-store';

/** Useful imports */
// import { map, takeUntil, distinctUntilChanged } from 'rxjs/operators';

const selectAccessor = pluckPath<string>([KEY_METADATA, KEY_ACCESSOR]);
const selectId = pluckPath<string>([KEY_METADATA, KEY_ID]);

/*
 * @name Sites Page Card
 * @id 8eb34ed3-fbdf-439e-aaeb-00060cdeb63a
 */
export abstract class TypeSitesPageCardComponent extends AbstractSitesPageCardComponent {

    readonly accessor$: Observable<string>;
    readonly id$: Observable<string>;
    /*
     * TODO add custom fields here. These fields should be those
     * common to all layouts.
     */

    protected constructor() {
        super();
        this.accessor$ = rxPipe(this.renderingContext$, rxSelect(selectAccessor));
        this.id$ = rxPipe(this.renderingContext$, rxSelect(selectId));
        }

}
