/**
 * Do not modify this file, it is auto-generated.
 */
/* tslint:disable:max-line-length */
import { TextAlignmentOptionsRenderingContext } from './text.alignment.options.rendering.context';
import { AbstractRenderingComponent } from '@acoustic-content-sdk/ng-utils';
import { Observable } from 'rxjs';

/*
 * @name Text Alignment options
 * @id 63f1d1c5-fa92-48da-a7a2-a2b700f4b097
 */
export abstract class AbstractTextAlignmentOptionsComponent extends AbstractRenderingComponent {

    /**
     * Strongly typed stream of the rendering contexts
     */
    readonly renderingContext$: Observable<TextAlignmentOptionsRenderingContext>;

    protected constructor() {
        super();
    }
}
