/**
 * Do not modify this file, it is auto-generated.
 */
/* tslint:disable:max-line-length */
import { BackgroundImageRenderingContext } from './background.image.rendering.context';
import { AbstractRenderingComponent } from '@acoustic-content-sdk/ng-utils';
import { Observable } from 'rxjs';

/*
 * @name Background Image
 * @id 0c6b2078-02dd-4c5d-858f-99d6d88114b5
 */
export abstract class AbstractBackgroundImageComponent extends AbstractRenderingComponent {

    /**
     * Strongly typed stream of the rendering contexts
     */
    readonly renderingContext$: Observable<BackgroundImageRenderingContext>;

    protected constructor() {
        super();
    }
}
