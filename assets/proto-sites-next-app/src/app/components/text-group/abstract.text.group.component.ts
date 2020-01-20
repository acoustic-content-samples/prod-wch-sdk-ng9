/**
 * Do not modify this file, it is auto-generated.
 */
/* tslint:disable:max-line-length */
import { TextGroupRenderingContext } from './text.group.rendering.context';
import { AbstractRenderingComponent } from '@acoustic-content-sdk/ng-utils';
import { Observable } from 'rxjs';

/*
 * @name Text Group
 * @id f71e2d31-6536-4016-9f89-c6848d0f4b55
 */
export abstract class AbstractTextGroupComponent extends AbstractRenderingComponent {

    /**
     * Strongly typed stream of the rendering contexts
     */
    readonly renderingContext$: Observable<TextGroupRenderingContext>;

    protected constructor() {
        super();
    }
}
