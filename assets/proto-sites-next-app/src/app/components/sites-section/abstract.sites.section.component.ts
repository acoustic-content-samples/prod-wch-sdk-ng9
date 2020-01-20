/**
 * Do not modify this file, it is auto-generated.
 */
/* tslint:disable:max-line-length */
import { SitesSectionRenderingContext } from './sites.section.rendering.context';
import { AbstractRenderingComponent } from '@acoustic-content-sdk/ng-utils';
import { Observable } from 'rxjs';

/*
 * @name Sites Section
 * @id a4516d24-744d-4650-8477-24aa36145e66
 */
export abstract class AbstractSitesSectionComponent extends AbstractRenderingComponent {

    /**
     * Strongly typed stream of the rendering contexts
     */
    readonly renderingContext$: Observable<SitesSectionRenderingContext>;

    protected constructor() {
        super();
    }
}
