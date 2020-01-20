/**
 * Do not modify this file, it is auto-generated.
 */
/* tslint:disable:max-line-length */
import { AlignmentOptionsType, isAlignmentOptionsType as DPBDaeeWs } from './../alignment-options/alignment.options.type';
import { BoundaryOptionsType, isBoundaryOptionsType as TCuxwvy6m } from './../boundary-options/boundary.options.type';
import { ColorsType, isColorsType as hI47CO1Lk } from './../colors/colors.type';
import { CommonSettingsType, isCommonSettingsType as r9NZl8FXg } from './../common-settings/common.settings.type';
import { SocialLinkType, isSocialLinkType as zvcijgR2l } from './../social-link/social.link.type';
import { DeliveryGroupElementMetadata } from '@acoustic-content-sdk/api';
import { EqualsPredicate, isNotNil as t3YhiD3Bk, isNumber as hSMeY2NBd, isOptional as _krhmaXp, isOptionalArrayOf as h$bi1SMZa, isString as Dp8dLCd6c, partialLeft, pluckProperty, rxSelectProperty } from '@acoustic-content-sdk/utils';
import { OperatorFunction, UnaryFunction } from 'rxjs';

export const TYPE_ID = '8bb7f03c-23a2-46c5-bd15-fbf4d1e8bd4f';
export const TYPE_NAME = 'Social follow';
export const KEY_ICON_SET = 'iconSet';
export const KEY_SOCIAL_LINKS = 'socialLinks';
export const KEY_SIZE = 'size';
export const KEY_BACKGROUND_COLOR = 'backgroundColor';
export const KEY_ALIGN = 'align';
export const KEY_SPACING = 'spacing';
export const KEY_PADDING = 'padding';
export const KEY_COMMON_SETTINGS = 'commonSettings';

/*
 * @name Social follow
 * @id 8bb7f03c-23a2-46c5-bd15-fbf4d1e8bd4f
 */
export interface SocialFollowType {
    /**
     * Metadata reference
     */
    $metadata: DeliveryGroupElementMetadata;

    /**
     * @example
     * ```json
     * {
     *   "elementType": "text",
     *   "key": "iconSet",
     *   "label": "Icon Set"
     * }
     * ```
     */
    [KEY_ICON_SET]?: string;

    /**
     * @example
     * ```json
     * {
     *   "allowMultipleValues": true,
     *   "elementType": "group",
     *   "key": "socialLinks",
     *   "label": "Social Links",
     *   "typeRef": {
     *     "id": "9f1d4f26-b587-4abe-a83c-38df755a6b37"
     *   }
     * }
     * ```
     */
    [KEY_SOCIAL_LINKS]?: SocialLinkType[];

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
     *   "elementType": "group",
     *   "key": "backgroundColor",
     *   "label": "Background color",
     *   "typeRef": {
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
     *   "elementType": "group",
     *   "key": "align",
     *   "label": "Alignment",
     *   "typeRef": {
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
     *   "elementType": "number",
     *   "fieldType": "integer",
     *   "key": "spacing",
     *   "label": "Spacing between icons​"
     * }
     * ```
     */
    [KEY_SPACING]?: number;

    /**
     * @example
     * ```json
     * {
     *   "elementType": "group",
     *   "key": "padding",
     *   "label": "Padding",
     *   "typeRef": {
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
     *   "key": "commonSettings",
     *   "label": "Common Settings",
     *   "typeRef": {
     *     "id": "eeff476e-0559-444f-97d1-486a10a86b80"
     *   }
     * }
     * ```
     */
    [KEY_COMMON_SETTINGS]?: CommonSettingsType;
}

/**
 * Tests if the value is of type SocialFollowElement
 *
 * @param aValue - the value to test
 * @returns true if the value is of type SocialFollowElement else false
 */
export function isSocialFollowType(aValue: any): aValue is SocialFollowType {
    return t3YhiD3Bk(aValue)
        && _krhmaXp(aValue[KEY_ICON_SET], Dp8dLCd6c)
        && h$bi1SMZa(aValue[KEY_SOCIAL_LINKS], zvcijgR2l)
        && _krhmaXp(aValue[KEY_SIZE], hSMeY2NBd)
        && _krhmaXp(aValue[KEY_BACKGROUND_COLOR], hI47CO1Lk)
        && _krhmaXp(aValue[KEY_ALIGN], DPBDaeeWs)
        && _krhmaXp(aValue[KEY_SPACING], hSMeY2NBd)
        && _krhmaXp(aValue[KEY_PADDING], TCuxwvy6m)
        && _krhmaXp(aValue[KEY_COMMON_SETTINGS], r9NZl8FXg)
    ;
}

/**
 * Selects the "iconSet" property from SocialFollowType.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectIconSet: (aDefault?: string) => UnaryFunction<SocialFollowType, string> = partialLeft(pluckProperty, KEY_ICON_SET);

/**
 * Selects the "iconSet" property from SocialFollowType as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectIconSet: (aDefault?: string, aCmp?: EqualsPredicate<string>) => OperatorFunction<SocialFollowType, string> = partialLeft(rxSelectProperty, KEY_ICON_SET);

/**
 * Selects the "socialLinks" property from SocialFollowType.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectSocialLinks: (aDefault?: SocialLinkType[]) => UnaryFunction<SocialFollowType, SocialLinkType[]> = partialLeft(pluckProperty, KEY_SOCIAL_LINKS);

/**
 * Selects the "socialLinks" property from SocialFollowType as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectSocialLinks: (aDefault?: SocialLinkType[], aCmp?: EqualsPredicate<SocialLinkType[]>) => OperatorFunction<SocialFollowType, SocialLinkType[]> = partialLeft(rxSelectProperty, KEY_SOCIAL_LINKS);

/**
 * Selects the "size" property from SocialFollowType.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectSize: (aDefault?: number) => UnaryFunction<SocialFollowType, number> = partialLeft(pluckProperty, KEY_SIZE);

/**
 * Selects the "size" property from SocialFollowType as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectSize: (aDefault?: number, aCmp?: EqualsPredicate<number>) => OperatorFunction<SocialFollowType, number> = partialLeft(rxSelectProperty, KEY_SIZE);

/**
 * Selects the "backgroundColor" property from SocialFollowType.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectBackgroundColor: (aDefault?: ColorsType) => UnaryFunction<SocialFollowType, ColorsType> = partialLeft(pluckProperty, KEY_BACKGROUND_COLOR);

/**
 * Selects the "backgroundColor" property from SocialFollowType as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectBackgroundColor: (aDefault?: ColorsType, aCmp?: EqualsPredicate<ColorsType>) => OperatorFunction<SocialFollowType, ColorsType> = partialLeft(rxSelectProperty, KEY_BACKGROUND_COLOR);

/**
 * Selects the "align" property from SocialFollowType.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectAlign: (aDefault?: AlignmentOptionsType) => UnaryFunction<SocialFollowType, AlignmentOptionsType> = partialLeft(pluckProperty, KEY_ALIGN);

/**
 * Selects the "align" property from SocialFollowType as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectAlign: (aDefault?: AlignmentOptionsType, aCmp?: EqualsPredicate<AlignmentOptionsType>) => OperatorFunction<SocialFollowType, AlignmentOptionsType> = partialLeft(rxSelectProperty, KEY_ALIGN);

/**
 * Selects the "spacing" property from SocialFollowType.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectSpacing: (aDefault?: number) => UnaryFunction<SocialFollowType, number> = partialLeft(pluckProperty, KEY_SPACING);

/**
 * Selects the "spacing" property from SocialFollowType as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectSpacing: (aDefault?: number, aCmp?: EqualsPredicate<number>) => OperatorFunction<SocialFollowType, number> = partialLeft(rxSelectProperty, KEY_SPACING);

/**
 * Selects the "padding" property from SocialFollowType.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectPadding: (aDefault?: BoundaryOptionsType) => UnaryFunction<SocialFollowType, BoundaryOptionsType> = partialLeft(pluckProperty, KEY_PADDING);

/**
 * Selects the "padding" property from SocialFollowType as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectPadding: (aDefault?: BoundaryOptionsType, aCmp?: EqualsPredicate<BoundaryOptionsType>) => OperatorFunction<SocialFollowType, BoundaryOptionsType> = partialLeft(rxSelectProperty, KEY_PADDING);

/**
 * Selects the "commonSettings" property from SocialFollowType.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectCommonSettings: (aDefault?: CommonSettingsType) => UnaryFunction<SocialFollowType, CommonSettingsType> = partialLeft(pluckProperty, KEY_COMMON_SETTINGS);

/**
 * Selects the "commonSettings" property from SocialFollowType as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectCommonSettings: (aDefault?: CommonSettingsType, aCmp?: EqualsPredicate<CommonSettingsType>) => OperatorFunction<SocialFollowType, CommonSettingsType> = partialLeft(rxSelectProperty, KEY_COMMON_SETTINGS);
