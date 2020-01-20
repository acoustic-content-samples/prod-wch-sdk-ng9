/**
 * Do not modify this file, it is auto-generated.
 */
/* tslint:disable:max-line-length */
import { SitesVideoRenderingContext } from './sites.video.rendering.context';
import { AbstractRenderingComponent } from '@acoustic-content-sdk/ng-utils';
import { Observable } from 'rxjs';

/*
 * @name Sites Video
 * @id a84f2c97-33bb-45fa-8156-25141df73055
 */
export abstract class AbstractSitesVideoComponent extends AbstractRenderingComponent {

    /**
     * Strongly typed stream of the rendering contexts
     */
    readonly renderingContext$: Observable<SitesVideoRenderingContext>;

    protected constructor() {
        super();
    }
}
