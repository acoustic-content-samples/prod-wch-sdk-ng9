/**
 * Do not modify this file, it is auto-generated.
 */
/* tslint:disable:max-line-length */
import { HtmlEmailRenderingContext } from './html.email.rendering.context';
import { AbstractRenderingComponent } from '@acoustic-content-sdk/ng-utils';
import { Observable } from 'rxjs';

/*
 * @name HTML Email
 * @id 7686ae07-df09-4c11-9305-1894b4f93a9f
 */
export abstract class AbstractHtmlEmailComponent extends AbstractRenderingComponent {

    /**
     * Strongly typed stream of the rendering contexts
     */
    readonly renderingContext$: Observable<HtmlEmailRenderingContext>;

    protected constructor() {
        super();
    }
}
