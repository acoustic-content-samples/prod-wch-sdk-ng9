/**
 * Do not modify this file, it is auto-generated.
 */
/* tslint:disable:max-line-length */
import { SitesImageRenderingContext } from './sites.image.rendering.context';
import { AbstractRenderingComponent } from '@acoustic-content-sdk/ng-utils';
import { Observable } from 'rxjs';

/*
 * @name Sites Image
 * @id c8295d37-7235-495e-8d40-f3b8bafe4099
 */
export abstract class AbstractSitesImageComponent extends AbstractRenderingComponent {

    /**
     * Strongly typed stream of the rendering contexts
     */
    readonly renderingContext$: Observable<SitesImageRenderingContext>;

    protected constructor() {
        super();
    }
}
