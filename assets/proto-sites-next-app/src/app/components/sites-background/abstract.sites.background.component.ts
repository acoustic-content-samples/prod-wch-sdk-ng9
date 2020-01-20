/**
 * Do not modify this file, it is auto-generated.
 */
/* tslint:disable:max-line-length */
import { SitesBackgroundRenderingContext } from './sites.background.rendering.context';
import { AbstractRenderingComponent } from '@acoustic-content-sdk/ng-utils';
import { Observable } from 'rxjs';

/*
 * @name Sites Background
 * @id 0a92059b-de6b-476d-b291-1638a435d0af
 * @description Use for all backgrounds.
 */
export abstract class AbstractSitesBackgroundComponent extends AbstractRenderingComponent {

    /**
     * Strongly typed stream of the rendering contexts
     */
    readonly renderingContext$: Observable<SitesBackgroundRenderingContext>;

    protected constructor() {
        super();
    }
}
