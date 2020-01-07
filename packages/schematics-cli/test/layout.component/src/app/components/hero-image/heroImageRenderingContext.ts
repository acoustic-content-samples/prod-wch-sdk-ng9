/**
 * Do not modify this file, it is auto-generated.
 */
import { OperatorFunction } from 'rxjs';
import { map } from 'rxjs/operators';

import { HeroImage, KEY_IMAGE, KEY_LINK, KEY_TEXT, isHeroImage } from './../../elements/hero-image/heroImageType';
import { RenderingContext, SingleImageElement, SingleLinkElement } from '@acoustic-content-sdk/api';
import { pluckPath } from '@acoustic-content-sdk/utils';
import { UnaryFunction } from 'rxjs';

/*
 * @name Hero image
 * @id aca5ee5c-a89b-4cf8-aa62-e43a77674663
 */
export interface HeroImageRenderingContext extends RenderingContext {

    /*
     * The ID of the content type this item belongs to.
     */
    typeId: 'aca5ee5c-a89b-4cf8-aa62-e43a77674663';

    /*
     * this is the link to the content type document this content is based on.
     */
    type: 'Hero image';

    /*
     * The classification defines the document type. For content items, all documents are classified as \"content\".
     */
    classification: 'content';

    /*
     * Defined by the type and capture in the schema given by the type,
     *  in a real content, this property will be filled with more information.
     */
    elements: HeroImage;

    image: {
    /**
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
    [KEY_IMAGE]?: SingleImageElement;
    };

    text: {
    /**
     * {
     *   "elementType": "text",
     *   "fieldLabel": "Text",
     *   "key": "text",
     *   "label": "Headline text"
     * }
    */
    [KEY_TEXT]?: string;
    };

    link: {
    /**
     * {
     *   "elementType": "link",
     *   "fieldLabel": "Link",
     *   "key": "link",
     *   "label": "Call to action link"
     * }
    */
    [KEY_LINK]?: SingleLinkElement;
    };

}

/** Validates that the context is indeed of the desired type
 *
 * @param aContext instance of the {@link RenderingContext} to check
 * @returns true if the context is a {@link HeroImageRenderingContext } else false
 */
export function isHeroImageRenderingContext(aContext: RenderingContext): aContext is HeroImageRenderingContext {
    return !!aContext && isHeroImage(aContext.elements);
}

/** Provides a type assertion that can be used to validate and convert a generic {@link RenderingContext}
 * info a {@link HeroImageRenderingContext }
 *
 * @param aContext instance of the rendering context to check
 * @returns the {@link HeroImageRenderingContext } version of the {@link RenderingContext} or an exception
 *
 * @example this.onRenderingContext.pipe(map(assertHeroImageRenderingContext));
 */
export function assertHeroImageRenderingContext(aContext: RenderingContext): HeroImageRenderingContext {
    // test if the context is as expected
    if (isHeroImageRenderingContext(aContext)) {
        return aContext;
    }
    // type failure
    throw new TypeError('HeroImageRenderingContext');
}

/** Operator to convert a {@link RenderingContext} into a {@link HeroImageRenderingContext } using a pipe.
 *
 * @example this.onRenderingContext.pipe(opHeroImageRenderingContext);
 */
export const opHeroImageRenderingContext: OperatorFunction<RenderingContext, HeroImageRenderingContext> = map<RenderingContext, HeroImageRenderingContext>(assertHeroImageRenderingContext);

/**
 * Selects the image from the HeroImageRenderingContext.
 *
 * @param ctx the HeroImageRenderingContext
 * @returns the selected value or undefined
 *
 * @example this.onRenderingContext.pipe(opHeroImageRenderingContext, map(selectImage));
*/
export const selectImage: UnaryFunction<HeroImageRenderingContext, SingleImageElement> = pluckPath<SingleImageElement>(['image', KEY_IMAGE]);

/**
 * Selects the text from the HeroImageRenderingContext.
 *
 * @param ctx the HeroImageRenderingContext
 * @returns the selected value or undefined
 *
 * @example this.onRenderingContext.pipe(opHeroImageRenderingContext, map(selectText));
*/
export const selectText: UnaryFunction<HeroImageRenderingContext, string> = pluckPath<string>(['text', KEY_TEXT]);

/**
 * Selects the link from the HeroImageRenderingContext.
 *
 * @param ctx the HeroImageRenderingContext
 * @returns the selected value or undefined
 *
 * @example this.onRenderingContext.pipe(opHeroImageRenderingContext, map(selectLink));
*/
export const selectLink: UnaryFunction<HeroImageRenderingContext, SingleLinkElement> = pluckPath<SingleLinkElement>(['link', KEY_LINK]);

