/**
 * Do not modify this file, it is auto-generated.
 */
/* tslint:disable:max-line-length */
import { SitesLinkBarRenderingContext } from './sites.link.bar.rendering.context';
import { AbstractRenderingComponent } from '@acoustic-content-sdk/ng-utils';
import { Observable } from 'rxjs';

/*
 * @name Sites Link Bar
 * @id d0f831c3-1b0a-41ba-8a6b-10f2eca3789a
 */
export abstract class AbstractSitesLinkBarComponent extends AbstractRenderingComponent {

    /**
     * Strongly typed stream of the rendering contexts
     */
    readonly renderingContext$: Observable<SitesLinkBarRenderingContext>;

    protected constructor() {
        super();
    }
}
