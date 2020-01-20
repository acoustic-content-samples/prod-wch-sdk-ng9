/**
 * Do not modify this file, it is auto-generated.
 */
/* tslint:disable:max-line-length */
import { SitesAlignmentRenderingContext } from './sites.alignment.rendering.context';
import { AbstractRenderingComponent } from '@acoustic-content-sdk/ng-utils';
import { Observable } from 'rxjs';

/*
 * @name Sites Alignment
 * @id d0cf6fd8-e061-4bd6-8f62-fd3ea795b4e5
 */
export abstract class AbstractSitesAlignmentComponent extends AbstractRenderingComponent {

    /**
     * Strongly typed stream of the rendering contexts
     */
    readonly renderingContext$: Observable<SitesAlignmentRenderingContext>;

    protected constructor() {
        super();
    }
}
