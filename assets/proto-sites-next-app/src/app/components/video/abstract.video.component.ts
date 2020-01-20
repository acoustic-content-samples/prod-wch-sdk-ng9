/**
 * Do not modify this file, it is auto-generated.
 */
/* tslint:disable:max-line-length */
import { VideoRenderingContext } from './video.rendering.context';
import { AbstractRenderingComponent } from '@acoustic-content-sdk/ng-utils';
import { Observable } from 'rxjs';

/*
 * @name Video
 * @id 7f81225a-8827-43d1-9d52-5f83eb6ee54f
 */
export abstract class AbstractVideoComponent extends AbstractRenderingComponent {

    /**
     * Strongly typed stream of the rendering contexts
     */
    readonly renderingContext$: Observable<VideoRenderingContext>;

    protected constructor() {
        super();
    }
}
