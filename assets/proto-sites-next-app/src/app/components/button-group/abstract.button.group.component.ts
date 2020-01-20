/**
 * Do not modify this file, it is auto-generated.
 */
/* tslint:disable:max-line-length */
import { ButtonGroupRenderingContext } from './button.group.rendering.context';
import { AbstractRenderingComponent } from '@acoustic-content-sdk/ng-utils';
import { Observable } from 'rxjs';

/*
 * @name Button Group
 * @id 2d9f0c5e-8a89-4b8c-abfc-7d2de4f623dd
 */
export abstract class AbstractButtonGroupComponent extends AbstractRenderingComponent {

    /**
     * Strongly typed stream of the rendering contexts
     */
    readonly renderingContext$: Observable<ButtonGroupRenderingContext>;

    protected constructor() {
        super();
    }
}
