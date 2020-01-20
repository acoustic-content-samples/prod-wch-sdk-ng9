/**
 * Do not modify this file, it is auto-generated.
 */
/* tslint:disable:max-line-length */
import { SitesButtonType, isSitesButtonType as P4s6zvq7I } from './../sites-button/sites.button.type';
import { SitesDividerType, isSitesDividerType as fYrLDB83k } from './../sites-divider/sites.divider.type';
import { SitesHtmlType, isSitesHtmlType as Rskh0ElAz } from './../sites-html/sites.html.type';
import { SitesImageAndTextType, isSitesImageAndTextType as t00dwXn_n } from './../sites-image-and-text/sites.image.and.text.type';
import { SitesImageType, isSitesImageType as P$OxV1wsJ } from './../sites-image/sites.image.type';
import { SitesLinkBarType, isSitesLinkBarType as DHTVh63Mm } from './../sites-link-bar/sites.link.bar.type';
import { SitesPromotionType, isSitesPromotionType as vBGNlBoms } from './../sites-promotion/sites.promotion.type';
import { SitesSocialFollowType, isSitesSocialFollowType as b8Rm_yWFD } from './../sites-social-follow/sites.social.follow.type';
import { SitesSpacerType, isSitesSpacerType as tM5cLlQfI } from './../sites-spacer/sites.spacer.type';
import { SitesTextType, isSitesTextType as jYIip5Djt } from './../sites-text/sites.text.type';
import { SitesVideoType, isSitesVideoType as Fkzb3nUjC } from './../sites-video/sites.video.type';
import { DeliveryGroupElementMetadata, DeliveryReferenceElement } from '@acoustic-content-sdk/api';
import { EqualsPredicate, isDeliveryReferenceElement as lkhkbPVHe, isNotNil as TdFcxLjhv, isOptional as R8L_djGws, isString as rCUctNoUC, partialLeft, pluckProperty, rxSelectProperty } from '@acoustic-content-sdk/utils';
import { OperatorFunction, UnaryFunction } from 'rxjs';

export const TYPE_ID = '21a8b4fd-0236-4187-bfea-7a94283e7b80';
export const TYPE_NAME = 'Sites Content';
export const KEY_BUTTON = 'button';
export const KEY_DIVIDER = 'divider';
export const KEY_HTML = 'html';
export const KEY_IMAGE = 'image';
export const KEY_IMAGE_AND_TEXT = 'imageAndText';
export const KEY_PROMOTION = 'promotion';
export const KEY_SOCIAL_FOLLOW = 'socialFollow';
export const KEY_SPACER = 'spacer';
export const KEY_TEXT = 'text';
export const KEY_LINK_BAR = 'linkBar';
export const KEY_VIDEO = 'video';
export const KEY_REFERENCE = 'reference';
export const KEY_SELECTED = 'selected';

/*
 * @name Sites Content
 * @id 21a8b4fd-0236-4187-bfea-7a94283e7b80
 */
export interface SitesContentType {
    /**
     * Metadata reference
     */
    $metadata: DeliveryGroupElementMetadata;

    /**
     * @example
     * ```json
     * {
     *   "elementType": "group",
     *   "key": "button",
     *   "label": "Button",
     *   "typeRef": {
     *     "id": "dee92057-69e3-489b-b13b-15f9b28770a1"
     *   }
     * }
     * ```
     */
    [KEY_BUTTON]?: SitesButtonType;

    /**
     * @example
     * ```json
     * {
     *   "elementType": "group",
     *   "key": "divider",
     *   "label": "Divider",
     *   "typeRef": {
     *     "id": "d550249a-83b2-4e46-96d1-519732fa5787"
     *   }
     * }
     * ```
     */
    [KEY_DIVIDER]?: SitesDividerType;

    /**
     * @example
     * ```json
     * {
     *   "elementType": "group",
     *   "key": "html",
     *   "label": "HTML",
     *   "typeRef": {
     *     "id": "85bdc88c-5b4c-4002-a665-37ba5bf95cb6"
     *   }
     * }
     * ```
     */
    [KEY_HTML]?: SitesHtmlType;

    /**
     * @example
     * ```json
     * {
     *   "elementType": "group",
     *   "key": "image",
     *   "label": "Image",
     *   "typeRef": {
     *     "id": "c8295d37-7235-495e-8d40-f3b8bafe4099"
     *   }
     * }
     * ```
     */
    [KEY_IMAGE]?: SitesImageType;

    /**
     * @example
     * ```json
     * {
     *   "elementType": "group",
     *   "key": "imageAndText",
     *   "label": "Image And Text",
     *   "typeRef": {
     *     "id": "bee26b87-bbcf-454b-9dc6-7a909ab13fd1"
     *   }
     * }
     * ```
     */
    [KEY_IMAGE_AND_TEXT]?: SitesImageAndTextType;

    /**
     * @example
     * ```json
     * {
     *   "elementType": "group",
     *   "key": "promotion",
     *   "label": "Promotion",
     *   "typeRef": {
     *     "id": "0b1c47a9-eb31-49ec-8fd7-89ca21a36b36"
     *   }
     * }
     * ```
     */
    [KEY_PROMOTION]?: SitesPromotionType;

    /**
     * @example
     * ```json
     * {
     *   "elementType": "group",
     *   "key": "socialFollow",
     *   "label": "Social Follow",
     *   "typeRef": {
     *     "id": "669768ce-44c7-4de3-83c1-a72d871e8df2"
     *   }
     * }
     * ```
     */
    [KEY_SOCIAL_FOLLOW]?: SitesSocialFollowType;

    /**
     * @example
     * ```json
     * {
     *   "elementType": "group",
     *   "key": "spacer",
     *   "label": "Spacer",
     *   "typeRef": {
     *     "id": "b2a9542d-b432-48b3-8322-2464765f323b"
     *   }
     * }
     * ```
     */
    [KEY_SPACER]?: SitesSpacerType;

    /**
     * @example
     * ```json
     * {
     *   "elementType": "group",
     *   "key": "text",
     *   "label": "Text",
     *   "typeRef": {
     *     "id": "373c81a5-d86b-4740-8f11-62fcbccfca08"
     *   }
     * }
     * ```
     */
    [KEY_TEXT]?: SitesTextType;

    /**
     * @example
     * ```json
     * {
     *   "elementType": "group",
     *   "key": "linkBar",
     *   "label": "Link Bar",
     *   "typeRef": {
     *     "id": "d0f831c3-1b0a-41ba-8a6b-10f2eca3789a"
     *   }
     * }
     * ```
     */
    [KEY_LINK_BAR]?: SitesLinkBarType;

    /**
     * @example
     * ```json
     * {
     *   "elementType": "group",
     *   "key": "video",
     *   "label": "Video",
     *   "typeRef": {
     *     "id": "a84f2c97-33bb-45fa-8156-25141df73055"
     *   }
     * }
     * ```
     */
    [KEY_VIDEO]?: SitesVideoType;

    /**
     * @example
     * ```json
     * {
     *   "elementType": "reference",
     *   "key": "reference",
     *   "label": "reference"
     * }
     * ```
     */
    [KEY_REFERENCE]?: DeliveryReferenceElement;

    /**
     * @example
     * ```json
     * {
     *   "elementType": "optionselection",
     *   "key": "selected",
     *   "label": "selected",
     *   "options": [
     *     {
     *       "label": "Button",
     *       "selection": "button"
     *     },
     *     {
     *       "label": "Divider",
     *       "selection": "divider"
     *     },
     *     {
     *       "label": "HTML",
     *       "selection": "html"
     *     },
     *     {
     *       "label": "Image",
     *       "selection": "image"
     *     },
     *     {
     *       "label": "Image and Text",
     *       "selection": "imageAndText"
     *     },
     *     {
     *       "label": "Image Group",
     *       "selection": "imageGroup"
     *     },
     *     {
     *       "label": "Promotion",
     *       "selection": "promotion"
     *     },
     *     {
     *       "label": "Social Follow",
     *       "selection": "socialFollow"
     *     },
     *     {
     *       "label": "Spacer",
     *       "selection": "spacer"
     *     },
     *     {
     *       "label": "Text",
     *       "selection": "text"
     *     },
     *     {
     *       "label": "Link bar",
     *       "selection": "linkBar"
     *     },
     *     {
     *       "label": "Video",
     *       "selection": "video"
     *     },
     *     {
     *       "label": "Reference",
     *       "selection": "reference"
     *     }
     *   ],
     *   "required": true
     * }
     * ```
     */
    [KEY_SELECTED]: string;
}

/**
 * Tests if the value is of type SitesContentElement
 *
 * @param aValue - the value to test
 * @returns true if the value is of type SitesContentElement else false
 */
export function isSitesContentType(aValue: any): aValue is SitesContentType {
    return TdFcxLjhv(aValue)
        && R8L_djGws(aValue[KEY_BUTTON], P4s6zvq7I)
        && R8L_djGws(aValue[KEY_DIVIDER], fYrLDB83k)
        && R8L_djGws(aValue[KEY_HTML], Rskh0ElAz)
        && R8L_djGws(aValue[KEY_IMAGE], P$OxV1wsJ)
        && R8L_djGws(aValue[KEY_IMAGE_AND_TEXT], t00dwXn_n)
        && R8L_djGws(aValue[KEY_PROMOTION], vBGNlBoms)
        && R8L_djGws(aValue[KEY_SOCIAL_FOLLOW], b8Rm_yWFD)
        && R8L_djGws(aValue[KEY_SPACER], tM5cLlQfI)
        && R8L_djGws(aValue[KEY_TEXT], jYIip5Djt)
        && R8L_djGws(aValue[KEY_LINK_BAR], DHTVh63Mm)
        && R8L_djGws(aValue[KEY_VIDEO], Fkzb3nUjC)
        && R8L_djGws(aValue[KEY_REFERENCE], lkhkbPVHe)
        && rCUctNoUC(aValue[KEY_SELECTED])
    ;
}

/**
 * Selects the "button" property from SitesContentType.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectButton: (aDefault?: SitesButtonType) => UnaryFunction<SitesContentType, SitesButtonType> = partialLeft(pluckProperty, KEY_BUTTON);

/**
 * Selects the "button" property from SitesContentType as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectButton: (aDefault?: SitesButtonType, aCmp?: EqualsPredicate<SitesButtonType>) => OperatorFunction<SitesContentType, SitesButtonType> = partialLeft(rxSelectProperty, KEY_BUTTON);

/**
 * Selects the "divider" property from SitesContentType.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectDivider: (aDefault?: SitesDividerType) => UnaryFunction<SitesContentType, SitesDividerType> = partialLeft(pluckProperty, KEY_DIVIDER);

/**
 * Selects the "divider" property from SitesContentType as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectDivider: (aDefault?: SitesDividerType, aCmp?: EqualsPredicate<SitesDividerType>) => OperatorFunction<SitesContentType, SitesDividerType> = partialLeft(rxSelectProperty, KEY_DIVIDER);

/**
 * Selects the "html" property from SitesContentType.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectHtml: (aDefault?: SitesHtmlType) => UnaryFunction<SitesContentType, SitesHtmlType> = partialLeft(pluckProperty, KEY_HTML);

/**
 * Selects the "html" property from SitesContentType as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectHtml: (aDefault?: SitesHtmlType, aCmp?: EqualsPredicate<SitesHtmlType>) => OperatorFunction<SitesContentType, SitesHtmlType> = partialLeft(rxSelectProperty, KEY_HTML);

/**
 * Selects the "image" property from SitesContentType.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectImage: (aDefault?: SitesImageType) => UnaryFunction<SitesContentType, SitesImageType> = partialLeft(pluckProperty, KEY_IMAGE);

/**
 * Selects the "image" property from SitesContentType as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectImage: (aDefault?: SitesImageType, aCmp?: EqualsPredicate<SitesImageType>) => OperatorFunction<SitesContentType, SitesImageType> = partialLeft(rxSelectProperty, KEY_IMAGE);

/**
 * Selects the "imageAndText" property from SitesContentType.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectImageAndText: (aDefault?: SitesImageAndTextType) => UnaryFunction<SitesContentType, SitesImageAndTextType> = partialLeft(pluckProperty, KEY_IMAGE_AND_TEXT);

/**
 * Selects the "imageAndText" property from SitesContentType as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectImageAndText: (aDefault?: SitesImageAndTextType, aCmp?: EqualsPredicate<SitesImageAndTextType>) => OperatorFunction<SitesContentType, SitesImageAndTextType> = partialLeft(rxSelectProperty, KEY_IMAGE_AND_TEXT);

/**
 * Selects the "promotion" property from SitesContentType.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectPromotion: (aDefault?: SitesPromotionType) => UnaryFunction<SitesContentType, SitesPromotionType> = partialLeft(pluckProperty, KEY_PROMOTION);

/**
 * Selects the "promotion" property from SitesContentType as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectPromotion: (aDefault?: SitesPromotionType, aCmp?: EqualsPredicate<SitesPromotionType>) => OperatorFunction<SitesContentType, SitesPromotionType> = partialLeft(rxSelectProperty, KEY_PROMOTION);

/**
 * Selects the "socialFollow" property from SitesContentType.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectSocialFollow: (aDefault?: SitesSocialFollowType) => UnaryFunction<SitesContentType, SitesSocialFollowType> = partialLeft(pluckProperty, KEY_SOCIAL_FOLLOW);

/**
 * Selects the "socialFollow" property from SitesContentType as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectSocialFollow: (aDefault?: SitesSocialFollowType, aCmp?: EqualsPredicate<SitesSocialFollowType>) => OperatorFunction<SitesContentType, SitesSocialFollowType> = partialLeft(rxSelectProperty, KEY_SOCIAL_FOLLOW);

/**
 * Selects the "spacer" property from SitesContentType.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectSpacer: (aDefault?: SitesSpacerType) => UnaryFunction<SitesContentType, SitesSpacerType> = partialLeft(pluckProperty, KEY_SPACER);

/**
 * Selects the "spacer" property from SitesContentType as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectSpacer: (aDefault?: SitesSpacerType, aCmp?: EqualsPredicate<SitesSpacerType>) => OperatorFunction<SitesContentType, SitesSpacerType> = partialLeft(rxSelectProperty, KEY_SPACER);

/**
 * Selects the "text" property from SitesContentType.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectText: (aDefault?: SitesTextType) => UnaryFunction<SitesContentType, SitesTextType> = partialLeft(pluckProperty, KEY_TEXT);

/**
 * Selects the "text" property from SitesContentType as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectText: (aDefault?: SitesTextType, aCmp?: EqualsPredicate<SitesTextType>) => OperatorFunction<SitesContentType, SitesTextType> = partialLeft(rxSelectProperty, KEY_TEXT);

/**
 * Selects the "linkBar" property from SitesContentType.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectLinkBar: (aDefault?: SitesLinkBarType) => UnaryFunction<SitesContentType, SitesLinkBarType> = partialLeft(pluckProperty, KEY_LINK_BAR);

/**
 * Selects the "linkBar" property from SitesContentType as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectLinkBar: (aDefault?: SitesLinkBarType, aCmp?: EqualsPredicate<SitesLinkBarType>) => OperatorFunction<SitesContentType, SitesLinkBarType> = partialLeft(rxSelectProperty, KEY_LINK_BAR);

/**
 * Selects the "video" property from SitesContentType.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectVideo: (aDefault?: SitesVideoType) => UnaryFunction<SitesContentType, SitesVideoType> = partialLeft(pluckProperty, KEY_VIDEO);

/**
 * Selects the "video" property from SitesContentType as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectVideo: (aDefault?: SitesVideoType, aCmp?: EqualsPredicate<SitesVideoType>) => OperatorFunction<SitesContentType, SitesVideoType> = partialLeft(rxSelectProperty, KEY_VIDEO);

/**
 * Selects the "reference" property from SitesContentType.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectReference: (aDefault?: DeliveryReferenceElement) => UnaryFunction<SitesContentType, DeliveryReferenceElement> = partialLeft(pluckProperty, KEY_REFERENCE);

/**
 * Selects the "reference" property from SitesContentType as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectReference: (aDefault?: DeliveryReferenceElement, aCmp?: EqualsPredicate<DeliveryReferenceElement>) => OperatorFunction<SitesContentType, DeliveryReferenceElement> = partialLeft(rxSelectProperty, KEY_REFERENCE);

/**
 * Selects the "selected" property from SitesContentType.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectSelected: (aDefault?: string) => UnaryFunction<SitesContentType, string> = partialLeft(pluckProperty, KEY_SELECTED);

/**
 * Selects the "selected" property from SitesContentType as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectSelected: (aDefault?: string, aCmp?: EqualsPredicate<string>) => OperatorFunction<SitesContentType, string> = partialLeft(rxSelectProperty, KEY_SELECTED);
