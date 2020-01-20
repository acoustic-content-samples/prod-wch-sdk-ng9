/**
 * Do not modify this file, it is auto-generated.
 */
/* tslint:disable:max-line-length */
import { ImageRenderingContext } from './image.rendering.context';
import { AbstractRenderingComponent } from '@acoustic-content-sdk/ng-utils';
import { Observable } from 'rxjs';

/*
 * @name Image
 * @id b7b05524-87ed-4509-b6fb-972f2cbf26d5
 */
export abstract class AbstractImageComponent extends AbstractRenderingComponent {

    /**
     * Strongly typed stream of the rendering contexts
     */
    readonly renderingContext$: Observable<ImageRenderingContext>;

    protected constructor() {
        super();
    }
}
