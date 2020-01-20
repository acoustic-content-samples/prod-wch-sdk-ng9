/**
 * Do not modify this file, it is auto-generated.
 */
import { GroupElement, Image, Link, SingleImageElement, SingleLinkElement, SingleNumberElement } from '@acoustic-content-sdk/api';
import { isMultiGroupElement as _isMultiGroupElement, isNil as _isNil, isSingleGroupElement as _isSingleGroupElement, isSingleImageElement as _isSingleImageElement, isSingleLinkElement as _isSingleLinkElement, isSingleNumberElement as _isSingleNumberElement } from '@acoustic-content-sdk/utils';

export const TYPE_ID = 'd5f01209-aa97-4118-81e2-fa26932e63af';
export const TYPE_NAME = 'Social icon';
export const KEY_ICON = 'icon';
export const KEY_SIZE = 'size';
export const KEY_LINKURL = 'linkurl';

/*
 * @name Social icon
 * @id d5f01209-aa97-4118-81e2-fa26932e63af
 */
export interface SocialIcon {

    /**
     * @example
     * ```json
     * {
     *   "elementType": "image",
     *   "key": "icon",
     *   "label": "Icon"
     * }
     * ```
     */
    [KEY_ICON]?: SingleImageElement;

    /**
     * @example
     * ```json
     * {
     *   "elementType": "number",
     *   "fieldType": "integer",
     *   "key": "size",
     *   "label": "Size"
     * }
     * ```
     */
    [KEY_SIZE]?: SingleNumberElement;

    /**
     * @example
     * ```json
     * {
     *   "elementType": "link",
     *   "key": "linkurl",
     *   "label": "LinkURL"
     * }
     * ```
     */
    [KEY_LINKURL]?: SingleLinkElement;
}

export interface SocialIconElement extends GroupElement {
    /**
     * Pin the type reference to the well known ID
     */
    typeRef: {
        id: 'd5f01209-aa97-4118-81e2-fa26932e63af'
    };
}

export interface SingleSocialIconElement extends SocialIconElement {
    value: SocialIcon;
}

export interface MultiSocialIconElement extends SocialIconElement {
    values: SocialIcon[];
}

/**
 * Tests if the value is of type SocialIconElement
 *
 * @param aValue the value to test
 * @returns true if the value is of type SocialIconElement else false
 */
export function isSocialIcon(aValue: any): aValue is SocialIcon {
    return !!aValue
        && (!aValue[KEY_ICON] || _isSingleImageElement(aValue[KEY_ICON], true))
        && (!aValue[KEY_SIZE] || _isSingleNumberElement(aValue[KEY_SIZE], true))
        && (!aValue[KEY_LINKURL] || _isSingleLinkElement(aValue[KEY_LINKURL], true))
        ;
}

/**
 * Tests if the value is of type SingleSocialIconElement
 *
 * @param aValue the value to test
 * @returns true if the value if of type SingleSocialIconElement else false
 */
export function isSingleSocialIconElement(aValue: any, bOptional?: boolean): aValue is SingleSocialIconElement {
    return _isSingleGroupElement(aValue, bOptional) && ((bOptional && _isNil(aValue.value)) || isSocialIcon(aValue.value));
}

/**
 * Tests if the value is of type MultiSocialIconElement
 *
 * @param aValue the value to test
 * @returns true if the value if of type MultiSocialIconElement else false
 */
export function isMultiSocialIconElement(aValue: any, bOptional?: boolean): aValue is MultiSocialIconElement {
    return _isMultiGroupElement(aValue, bOptional) && ((bOptional && _isNil(aValue.values)) || aValue.values.every(isSocialIcon));
}

/*
 * @name Social icon
 * @id d5f01209-aa97-4118-81e2-fa26932e63af
 */
export interface SocialIconType {

    /**
     * @example
     * ```json
     * {
     *   "elementType": "image",
     *   "key": "icon",
     *   "label": "Icon"
     * }
     * ```
     */
    [KEY_ICON]?: Image;

    /**
     * @example
     * ```json
     * {
     *   "elementType": "number",
     *   "fieldType": "integer",
     *   "key": "size",
     *   "label": "Size"
     * }
     * ```
     */
    [KEY_SIZE]?: number;

    /**
     * @example
     * ```json
     * {
     *   "elementType": "link",
     *   "key": "linkurl",
     *   "label": "LinkURL"
     * }
     * ```
     */
    [KEY_LINKURL]?: Link;
}
