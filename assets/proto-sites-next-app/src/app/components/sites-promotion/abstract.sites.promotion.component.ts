/**
 * Do not modify this file, it is auto-generated.
 */
/* tslint:disable:max-line-length */
import { SitesPromotionRenderingContext } from './sites.promotion.rendering.context';
import { AbstractRenderingComponent } from '@acoustic-content-sdk/ng-utils';
import { Observable } from 'rxjs';

/*
 * @name Sites Promotion
 * @id 0b1c47a9-eb31-49ec-8fd7-89ca21a36b36
 */
export abstract class AbstractSitesPromotionComponent extends AbstractRenderingComponent {

    /**
     * Strongly typed stream of the rendering contexts
     */
    readonly renderingContext$: Observable<SitesPromotionRenderingContext>;

    protected constructor() {
        super();
    }
}
