/**
 * Do not modify this file, it is auto-generated.
 */
/* tslint:disable:max-line-length */
import { SitesTextRenderingContext } from './sites.text.rendering.context';
import { AbstractRenderingComponent } from '@acoustic-content-sdk/ng-utils';
import { Observable } from 'rxjs';

/*
 * @name Sites Text
 * @id 373c81a5-d86b-4740-8f11-62fcbccfca08
 */
export abstract class AbstractSitesTextComponent extends AbstractRenderingComponent {

    /**
     * Strongly typed stream of the rendering contexts
     */
    readonly renderingContext$: Observable<SitesTextRenderingContext>;

    protected constructor() {
        super();
    }
}
