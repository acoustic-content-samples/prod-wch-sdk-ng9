/**
 * Do not modify this file, it is auto-generated.
 */
/* tslint:disable:max-line-length */
import { ButtonRenderingContext } from './button.rendering.context';
import { AbstractRenderingComponent } from '@acoustic-content-sdk/ng-utils';
import { Observable } from 'rxjs';

/*
 * @name Button
 * @id b201f69e-29ff-4f3e-9a72-6c6be6c7d754
 */
export abstract class AbstractButtonComponent extends AbstractRenderingComponent {

    /**
     * Strongly typed stream of the rendering contexts
     */
    readonly renderingContext$: Observable<ButtonRenderingContext>;

    protected constructor() {
        super();
    }
}
