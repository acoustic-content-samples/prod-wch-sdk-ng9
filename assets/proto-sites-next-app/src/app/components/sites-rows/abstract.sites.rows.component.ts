/**
 * Do not modify this file, it is auto-generated.
 */
/* tslint:disable:max-line-length */
import { SitesRowsRenderingContext } from './sites.rows.rendering.context';
import { AbstractRenderingComponent } from '@acoustic-content-sdk/ng-utils';
import { Observable } from 'rxjs';

/*
 * @name Sites Rows
 * @id 9ca02297-a564-40c9-aedc-add9c30f3d7b
 */
export abstract class AbstractSitesRowsComponent extends AbstractRenderingComponent {

    /**
     * Strongly typed stream of the rendering contexts
     */
    readonly renderingContext$: Observable<SitesRowsRenderingContext>;

    protected constructor() {
        super();
    }
}
