/**
 * Do not modify this file, it is auto-generated.
 */
/* tslint:disable:max-line-length */
import { ImageAndTextRenderingContext } from './image.and.text.rendering.context';
import { AbstractRenderingComponent } from '@acoustic-content-sdk/ng-utils';
import { Observable } from 'rxjs';

/*
 * @name Image and text
 * @id 4e70d4a0-0112-43c5-887b-dde336ebe678
 */
export abstract class AbstractImageAndTextComponent extends AbstractRenderingComponent {

    /**
     * Strongly typed stream of the rendering contexts
     */
    readonly renderingContext$: Observable<ImageAndTextRenderingContext>;

    protected constructor() {
        super();
    }
}
