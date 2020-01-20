/**
 * Do not modify this file, it is auto-generated.
 */
/* tslint:disable:max-line-length */
import { TextRenderingContext } from './text.rendering.context';
import { AbstractRenderingComponent } from '@acoustic-content-sdk/ng-utils';
import { Observable } from 'rxjs';

/*
 * @name Text
 * @id 09ed64f3-23d9-48bb-871d-e00430751ea6
 */
export abstract class AbstractTextComponent extends AbstractRenderingComponent {

    /**
     * Strongly typed stream of the rendering contexts
     */
    readonly renderingContext$: Observable<TextRenderingContext>;

    protected constructor() {
        super();
    }
}
