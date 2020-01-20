/**
 * Do not modify this file, it is auto-generated.
 */
/* tslint:disable:max-line-length */
import { SitesSpacerRenderingContext } from './sites.spacer.rendering.context';
import { AbstractRenderingComponent } from '@acoustic-content-sdk/ng-utils';
import { Observable } from 'rxjs';

/*
 * @name Sites Spacer
 * @id b2a9542d-b432-48b3-8322-2464765f323b
 */
export abstract class AbstractSitesSpacerComponent extends AbstractRenderingComponent {

    /**
     * Strongly typed stream of the rendering contexts
     */
    readonly renderingContext$: Observable<SitesSpacerRenderingContext>;

    protected constructor() {
        super();
    }
}
