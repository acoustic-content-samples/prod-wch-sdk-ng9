/**
 * Do not modify this file, it is auto-generated.
 */
/* tslint:disable:max-line-length */
import { SitesImageAndTextRenderingContext } from './sites.image.and.text.rendering.context';
import { AbstractRenderingComponent } from '@acoustic-content-sdk/ng-utils';
import { Observable } from 'rxjs';

/*
 * @name Sites Image And Text
 * @id bee26b87-bbcf-454b-9dc6-7a909ab13fd1
 */
export abstract class AbstractSitesImageAndTextComponent extends AbstractRenderingComponent {

    /**
     * Strongly typed stream of the rendering contexts
     */
    readonly renderingContext$: Observable<SitesImageAndTextRenderingContext>;

    protected constructor() {
        super();
    }
}
