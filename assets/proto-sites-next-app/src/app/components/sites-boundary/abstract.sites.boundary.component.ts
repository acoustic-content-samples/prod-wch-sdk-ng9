/**
 * Do not modify this file, it is auto-generated.
 */
/* tslint:disable:max-line-length */
import { SitesBoundaryRenderingContext } from './sites.boundary.rendering.context';
import { AbstractRenderingComponent } from '@acoustic-content-sdk/ng-utils';
import { Observable } from 'rxjs';

/*
 * @name Sites Boundary
 * @id d403f72d-5383-423c-ba33-5cedd61c9224
 */
export abstract class AbstractSitesBoundaryComponent extends AbstractRenderingComponent {

    /**
     * Strongly typed stream of the rendering contexts
     */
    readonly renderingContext$: Observable<SitesBoundaryRenderingContext>;

    protected constructor() {
        super();
    }
}
