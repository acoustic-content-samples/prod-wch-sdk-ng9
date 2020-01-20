/**
 * Do not modify this file, it is auto-generated.
 */
/* tslint:disable:max-line-length */
import { SitesContentRenderingContext } from './sites.content.rendering.context';
import { AbstractRenderingComponent } from '@acoustic-content-sdk/ng-utils';
import { Observable } from 'rxjs';

/*
 * @name Sites Content
 * @id 21a8b4fd-0236-4187-bfea-7a94283e7b80
 */
export abstract class AbstractSitesContentComponent extends AbstractRenderingComponent {

    /**
     * Strongly typed stream of the rendering contexts
     */
    readonly renderingContext$: Observable<SitesContentRenderingContext>;

    protected constructor() {
        super();
    }
}
