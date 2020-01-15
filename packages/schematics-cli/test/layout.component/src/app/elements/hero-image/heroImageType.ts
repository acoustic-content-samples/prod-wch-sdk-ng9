/**
 * Do not modify this file, it is auto-generated.
 */
import { GroupElement, Image, Link, SingleImageElement, SingleLinkElement, SingleTextElement } from '@acoustic-content-sdk/api';
import { isMultiGroupElement as _isMultiGroupElement, isNil as _isNil, isSingleGroupElement as _isSingleGroupElement, isSingleImageElement as _isSingleImageElement, isSingleLinkElement as _isSingleLinkElement, isSingleTextElement as _isSingleTextElement } from '@acoustic-content-sdk/utils';

export const TYPE_ID = 'aca5ee5c-a89b-4cf8-aa62-e43a77674663';
export const TYPE_NAME = 'Hero image';
export const KEY_IMAGE = 'image';
export const KEY_TEXT = 'text';
export const KEY_LINK = 'link';

/*
 * @name Hero image
 * @id aca5ee5c-a89b-4cf8-aa62-e43a77674663
 */
export interface HeroImage {

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

    /**
     * {
     *   "elementType": "text",
     *   "fieldLabel": "Text",
     *   "key": "text",
     *   "label": "Headline text"
     * }
    */
    [KEY_TEXT]?: SingleTextElement;

    /**
     * {
     *   "elementType": "link",
     *   "fieldLabel": "Link",
     *   "key": "link",
     *   "label": "Call to action link"
     * }
    */
    [KEY_LINK]?: SingleLinkElement;
}

export interface HeroImageElement extends GroupElement {
    /**
    * Pin the type reference to the well known ID
    */
    typeRef: {
        id: 'aca5ee5c-a89b-4cf8-aa62-e43a77674663'
    };
}

export interface SingleHeroImageElement extends HeroImageElement {
    value: HeroImage;
}

export interface MultiHeroImageElement extends HeroImageElement {
    values: HeroImage[];
}

/**
 * Tests if the value is of type HeroImageElement
 *
 * @param aValue - the value to test
 * @returns true if the value is of type HeroImageElement else false
*/
export function isHeroImage(aValue: any): aValue is HeroImage {
    return !!aValue
        && (!aValue[KEY_IMAGE] || _isSingleImageElement(aValue[KEY_IMAGE], true))
        && (!aValue[KEY_TEXT] || _isSingleTextElement(aValue[KEY_TEXT], true))
        && (!aValue[KEY_LINK] || _isSingleLinkElement(aValue[KEY_LINK], true))
        ;
}

/**
 * Tests if the value is of type SingleHeroImageElement
 *
 * @param aValue - the value to test
 * @returns true if the value if of type SingleHeroImageElement else false
*/
export function isSingleHeroImageElement(aValue: any, bOptional?: boolean): aValue is SingleHeroImageElement {
    return _isSingleGroupElement(aValue, bOptional) && ((bOptional && _isNil(aValue.value)) || isHeroImage(aValue.value));
}

/**
 * Tests if the value is of type MultiHeroImageElement
 *
 * @param aValue - the value to test
 * @returns true if the value if of type MultiHeroImageElement else false
*/
export function isMultiHeroImageElement(aValue: any, bOptional?: boolean): aValue is MultiHeroImageElement {
    return _isMultiGroupElement(aValue, bOptional) && ((bOptional && _isNil(aValue.values)) || aValue.values.every(isHeroImage));
}

/*
 * @name Hero image
 * @id aca5ee5c-a89b-4cf8-aa62-e43a77674663
 */
export interface HeroImageType {

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
    [KEY_IMAGE]?: Image;

    /**
     * {
     *   "elementType": "text",
     *   "fieldLabel": "Text",
     *   "key": "text",
     *   "label": "Headline text"
     * }
    */
    [KEY_TEXT]?: string;

    /**
     * {
     *   "elementType": "link",
     *   "fieldLabel": "Link",
     *   "key": "link",
     *   "label": "Call to action link"
     * }
    */
    [KEY_LINK]?: Link;
}
