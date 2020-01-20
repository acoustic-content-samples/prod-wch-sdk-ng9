/**
 * Do not modify this file, it is auto-generated.
 */
/* tslint:disable:max-line-length */
import { CustomImageGroupRenderingContext } from './custom.image.group.rendering.context';
import { AbstractRenderingComponent } from '@acoustic-content-sdk/ng-utils';
import { Observable } from 'rxjs';

/*
 * @name Custom ImageGroup
 * @id 39bd65fc-2733-4c8a-a700-3075f127fb2d
 */
export abstract class AbstractCustomImageGroupComponent extends AbstractRenderingComponent {

    /**
     * Strongly typed stream of the rendering contexts
     */
    readonly renderingContext$: Observable<CustomImageGroupRenderingContext>;

    protected constructor() {
        super();
    }
}
