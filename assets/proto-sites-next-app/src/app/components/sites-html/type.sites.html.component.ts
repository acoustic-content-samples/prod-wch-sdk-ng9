import { AbstractSitesHtmlComponent } from './abstract.sites.html.component';
import { Observable } from 'rxjs';
import { rxPipe, pluckPath } from '@acoustic-content-sdk/utils';
import { rxSelect } from '@acoustic-content-sdk/redux-store';
import { KEY_METADATA, KEY_ACCESSOR } from '@acoustic-content-sdk/api';

/** Useful imports */
// import { map, takeUntil, distinctUntilChanged } from 'rxjs/operators';

const selectAccessor = pluckPath<string>([KEY_METADATA, KEY_ACCESSOR]);

/*
 * @name Sites HTML
 * @id 85bdc88c-5b4c-4002-a665-37ba5bf95cb6
 */
export abstract class TypeSitesHtmlComponent extends AbstractSitesHtmlComponent {
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
