/**
 * Do not modify this file, it is auto-generated.
 */
import { AlignmentOptionsType, SingleAlignmentOptionsElement, isSingleAlignmentOptionsElement as _isSingleAlignmentOptionsElement } from './../alignment-options/alignmentOptionsType';
import { BoundaryOptionsType, SingleBoundaryOptionsElement, isSingleBoundaryOptionsElement as _isSingleBoundaryOptionsElement } from './../boundary-options/boundaryOptionsType';
import { ColorsType, SingleColorsElement, isSingleColorsElement as _isSingleColorsElement } from './../colors/colorsType';
import { CommonSettingsType, SingleCommonSettingsElement, isSingleCommonSettingsElement as _isSingleCommonSettingsElement } from './../common-settings/commonSettingsType';
import { MultiSocialIconElement, SocialIconType, isMultiSocialIconElement as _isMultiSocialIconElement } from './../social-icon/socialIconType';
import { GroupElement } from '@acoustic-content-sdk/api';
import { isMultiGroupElement as _isMultiGroupElement, isNil as _isNil, isSingleGroupElement as _isSingleGroupElement } from '@acoustic-content-sdk/utils';

export const TYPE_ID = '8bb7f03c-23a2-46c5-bd15-fbf4d1e8bd4f';
export const TYPE_NAME = 'Social follow';
export const KEY_ALIGN = 'align';
export const KEY_SPACING = 'spacing';
export const KEY_PADDING = 'padding';
export const KEY_BACKGROUND_COLOR = 'backgroundColor';
export const KEY_SOCIAL_ICONS = 'socialIcons';
export const KEY_COMMON_SETTINGS = 'commonSettings';

/*
 * @name Social follow
 * @id 8bb7f03c-23a2-46c5-bd15-fbf4d1e8bd4f
 */
export interface SocialFollow {

    /**
     * @example
     * ```json
     * {
     *   "elementType": "group",
     *   "key": "align",
     *   "label": "Align",
     *   "role": [
     *     "configuration"
     *   ],
     *   "typeRef": {
     *     "name": "Alignment options",
     *     "id": "0915841f-cf93-4e3c-8ece-f22b0c41a9e6"
     *   }
     * }
     * ```
     */
    [KEY_ALIGN]?: SingleAlignmentOptionsElement;

    /**
     * @example
     * ```json
     * {
     *   "elementType": "group",
     *   "key": "spacing",
     *   "label": "Spacing",
     *   "role": [
     *     "configuration"
     *   ],
     *   "typeRef": {
     *     "name": "Boundary options",
     *     "id": "9c5e08f5-e54d-42c4-b855-c73eb0908022"
     *   }
     * }
     * ```
     */
    [KEY_SPACING]?: SingleBoundaryOptionsElement;

    /**
     * @example
     * ```json
     * {
     *   "elementType": "group",
     *   "key": "padding",
     *   "label": "Padding",
     *   "role": [
     *     "configuration"
     *   ],
     *   "typeRef": {
     *     "name": "Boundary options",
     *     "id": "9c5e08f5-e54d-42c4-b855-c73eb0908022"
     *   }
     * }
     * ```
     */
    [KEY_PADDING]?: SingleBoundaryOptionsElement;

    /**
     * @example
     * ```json
     * {
     *   "elementType": "group",
     *   "key": "backgroundColor",
     *   "label": "Background color",
     *   "role": [
     *     "configuration"
     *   ],
     *   "typeRef": {
     *     "name": "Colors",
     *     "id": "1321a547-287a-477b-a7ec-d191e2cdb70a"
     *   }
     * }
     * ```
     */
    [KEY_BACKGROUND_COLOR]?: SingleColorsElement;

    /**
     * @example
     * ```json
     * {
     *   "allowMultipleValues": true,
     *   "elementType": "group",
     *   "fieldLabel": "Custom Element",
     *   "key": "socialIcons",
     *   "label": "Social icons",
     *   "minimumValues": 0,
     *   "typeRef": {
     *     "name": "Social icon",
     *     "id": "d5f01209-aa97-4118-81e2-fa26932e63af"
     *   }
     * }
     * ```
     */
    [KEY_SOCIAL_ICONS]?: MultiSocialIconElement;

    /**
     * @example
     * ```json
     * {
     *   "elementType": "group",
     *   "key": "commonSettings",
     *   "label": "Common Settings",
     *   "role": [
     *     "configuration"
     *   ],
     *   "typeRef": {
     *     "name": "Common settings",
     *     "id": "eeff476e-0559-444f-97d1-486a10a86b80"
     *   }
     * }
     * ```
     */
    [KEY_COMMON_SETTINGS]?: SingleCommonSettingsElement;
}

export interface SocialFollowElement extends GroupElement {
    /**
     * Pin the type reference to the well known ID
     */
    typeRef: {
        id: '8bb7f03c-23a2-46c5-bd15-fbf4d1e8bd4f'
    };
}

export interface SingleSocialFollowElement extends SocialFollowElement {
    value: SocialFollow;
}

export interface MultiSocialFollowElement extends SocialFollowElement {
    values: SocialFollow[];
}

/**
 * Tests if the value is of type SocialFollowElement
 *
 * @param aValue the value to test
 * @returns true if the value is of type SocialFollowElement else false
 */
export function isSocialFollow(aValue: any): aValue is SocialFollow {
    return !!aValue
        && (!aValue[KEY_ALIGN] || _isSingleAlignmentOptionsElement(aValue[KEY_ALIGN], true))
        && (!aValue[KEY_SPACING] || _isSingleBoundaryOptionsElement(aValue[KEY_SPACING], true))
        && (!aValue[KEY_PADDING] || _isSingleBoundaryOptionsElement(aValue[KEY_PADDING], true))
        && (!aValue[KEY_BACKGROUND_COLOR] || _isSingleColorsElement(aValue[KEY_BACKGROUND_COLOR], true))
        && (!aValue[KEY_SOCIAL_ICONS] || _isMultiSocialIconElement(aValue[KEY_SOCIAL_ICONS], true))
        && (!aValue[KEY_COMMON_SETTINGS] || _isSingleCommonSettingsElement(aValue[KEY_COMMON_SETTINGS], true))
        ;
}

/**
 * Tests if the value is of type SingleSocialFollowElement
 *
 * @param aValue the value to test
 * @returns true if the value if of type SingleSocialFollowElement else false
 */
export function isSingleSocialFollowElement(aValue: any, bOptional?: boolean): aValue is SingleSocialFollowElement {
    return _isSingleGroupElement(aValue, bOptional) && ((bOptional && _isNil(aValue.value)) || isSocialFollow(aValue.value));
}

/**
 * Tests if the value is of type MultiSocialFollowElement
 *
 * @param aValue the value to test
 * @returns true if the value if of type MultiSocialFollowElement else false
 */
export function isMultiSocialFollowElement(aValue: any, bOptional?: boolean): aValue is MultiSocialFollowElement {
    return _isMultiGroupElement(aValue, bOptional) && ((bOptional && _isNil(aValue.values)) || aValue.values.every(isSocialFollow));
}

/*
 * @name Social follow
 * @id 8bb7f03c-23a2-46c5-bd15-fbf4d1e8bd4f
 */
export interface SocialFollowType {

    /**
     * @example
     * ```json
     * {
     *   "elementType": "group",
     *   "key": "align",
     *   "label": "Align",
     *   "role": [
     *     "configuration"
     *   ],
     *   "typeRef": {
     *     "name": "Alignment options",
     *     "id": "0915841f-cf93-4e3c-8ece-f22b0c41a9e6"
     *   }
     * }
     * ```
     */
    [KEY_ALIGN]?: AlignmentOptionsType;

    /**
     * @example
     * ```json
     * {
     *   "elementType": "group",
     *   "key": "spacing",
     *   "label": "Spacing",
     *   "role": [
     *     "configuration"
     *   ],
     *   "typeRef": {
     *     "name": "Boundary options",
     *     "id": "9c5e08f5-e54d-42c4-b855-c73eb0908022"
     *   }
     * }
     * ```
     */
    [KEY_SPACING]?: BoundaryOptionsType;

    /**
     * @example
     * ```json
     * {
     *   "elementType": "group",
     *   "key": "padding",
     *   "label": "Padding",
     *   "role": [
     *     "configuration"
     *   ],
     *   "typeRef": {
     *     "name": "Boundary options",
     *     "id": "9c5e08f5-e54d-42c4-b855-c73eb0908022"
     *   }
     * }
     * ```
     */
    [KEY_PADDING]?: BoundaryOptionsType;

    /**
     * @example
     * ```json
     * {
     *   "elementType": "group",
     *   "key": "backgroundColor",
     *   "label": "Background color",
     *   "role": [
     *     "configuration"
     *   ],
     *   "typeRef": {
     *     "name": "Colors",
     *     "id": "1321a547-287a-477b-a7ec-d191e2cdb70a"
     *   }
     * }
     * ```
     */
    [KEY_BACKGROUND_COLOR]?: ColorsType;

    /**
     * @example
     * ```json
     * {
     *   "allowMultipleValues": true,
     *   "elementType": "group",
     *   "fieldLabel": "Custom Element",
     *   "key": "socialIcons",
     *   "label": "Social icons",
     *   "minimumValues": 0,
     *   "typeRef": {
     *     "name": "Social icon",
     *     "id": "d5f01209-aa97-4118-81e2-fa26932e63af"
     *   }
     * }
     * ```
     */
    [KEY_SOCIAL_ICONS]?: SocialIconType;

    /**
     * @example
     * ```json
     * {
     *   "elementType": "group",
     *   "key": "commonSettings",
     *   "label": "Common Settings",
     *   "role": [
     *     "configuration"
     *   ],
     *   "typeRef": {
     *     "name": "Common settings",
     *     "id": "eeff476e-0559-444f-97d1-486a10a86b80"
     *   }
     * }
     * ```
     */
    [KEY_COMMON_SETTINGS]?: CommonSettingsType;
}
