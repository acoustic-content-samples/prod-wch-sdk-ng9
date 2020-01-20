/**
 * Do not modify this file, it is auto-generated.
 */
/* tslint:disable:max-line-length */
import { ImageGroupRenderingContext } from './image.group.rendering.context';
import { AbstractRenderingComponent } from '@acoustic-content-sdk/ng-utils';
import { Observable } from 'rxjs';

/*
 * @name Image group
 * @id 7952a5b2-57d0-4a1b-a008-d37c7d7f5261
 */
export abstract class AbstractImageGroupComponent extends AbstractRenderingComponent {

    /**
     * Strongly typed stream of the rendering contexts
     */
    readonly renderingContext$: Observable<ImageGroupRenderingContext>;

    protected constructor() {
        super();
    }
}
