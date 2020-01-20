/**
 * Do not modify this file, it is auto-generated.
 */
/* tslint:disable:max-line-length */
import { SitesCellRenderingContext } from './sites.cell.rendering.context';
import { AbstractRenderingComponent } from '@acoustic-content-sdk/ng-utils';
import { Observable } from 'rxjs';

/*
 * @name Sites Cell
 * @id d1e4dd37-8ac5-43a9-9145-1f194053b27c
 */
export abstract class AbstractSitesCellComponent extends AbstractRenderingComponent {

    /**
     * Strongly typed stream of the rendering contexts
     */
    readonly renderingContext$: Observable<SitesCellRenderingContext>;

    protected constructor() {
        super();
    }
}
