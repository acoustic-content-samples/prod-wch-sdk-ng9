/**
 * Do not modify this file, it is auto-generated.
 */
/* tslint:disable:max-line-length */
import { HtmlRenderingContext } from './html.rendering.context';
import { AbstractRenderingComponent } from '@acoustic-content-sdk/ng-utils';
import { Observable } from 'rxjs';

/*
 * @name HTML
 * @id aa358e28-2e60-416a-97d7-d1a6dd5e165b
 */
export abstract class AbstractHtmlComponent extends AbstractRenderingComponent {

    /**
     * Strongly typed stream of the rendering contexts
     */
    readonly renderingContext$: Observable<HtmlRenderingContext>;

    protected constructor() {
        super();
    }
}
