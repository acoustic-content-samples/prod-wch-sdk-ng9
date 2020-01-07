/**
 * Do not modify this file, it is auto-generated.
 */
import {
    Observable
} from 'rxjs';
import { HeroImageRenderingContext, assertHeroImageRenderingContext, isHeroImageRenderingContext } from './heroImageRenderingContext';
import { Image, Link, RenderingContext } from '@acoustic-content-sdk/api';
import { AbstractRenderingComponent, RenderingContextBinding } from '@acoustic-content-sdk/ng';

/*
 * @name Hero image
 * @id aca5ee5c-a89b-4cf8-aa62-e43a77674663
 */
abstract class AbstractHeroImageComponent extends AbstractRenderingComponent {

    /**
    * Strongly typed stream of the rendering contexts
    */
    readonly onRenderingContext: Observable<RenderingContext>;

    /**
    * Strongly typed rendering context
    */
    renderingContext: RenderingContext;

    /*
     * {
     *   "acceptType": [
     *     "jpg",
     *     "jpeg",
     *     "png",
     *     "gif"
     *   ],
     *   "elementType": "image",
     *   "fieldLabel": "Image",
     *   "imageProfileId": "763cc433-46d8-4a1e-9155-878ae8cf4dbc",
     *   "key": "image",
     *   "label": "Background image"
     * }
     */
    @RenderingContextBinding('image.image')
    readonly onImage: Observable<Image>;

    /*
     * @see #onImage
     */
    @RenderingContextBinding()
    readonly image: Image;

    /*
     * {
     *   "elementType": "text",
     *   "fieldLabel": "Text",
     *   "key": "text",
     *   "label": "Headline text"
     * }
     */
    @RenderingContextBinding('text.text', '')
    readonly onText: Observable<string>;

    /*
     * @see #onText
     */
    @RenderingContextBinding()
    readonly text: string;

    /*
     * {
     *   "elementType": "link",
     *   "fieldLabel": "Link",
     *   "key": "link",
     *   "label": "Call to action link"
     * }
     */
    @RenderingContextBinding('link.link')
    readonly onLink: Observable<Link>;

    /*
     * @see #onLink
     */
    @RenderingContextBinding()
    readonly link: Link;

    protected constructor() {
        super();
    }
}

/**
* 18acd1c9-888e-4c44-bd2c-a38c5a62bf45
*/
export {
    HeroImageRenderingContext,
    isHeroImageRenderingContext,
    assertHeroImageRenderingContext,
    AbstractHeroImageComponent
};
