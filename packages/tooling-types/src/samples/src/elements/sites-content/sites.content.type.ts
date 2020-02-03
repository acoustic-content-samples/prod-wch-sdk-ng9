/**
 * Do not modify this file, it is auto-generated.
 */
/* tslint:disable:max-line-length */
import { SitesButtonType, isSitesButtonType as VbPJde0zw } from './../sites-button/sites.button.type';
import { SitesDividerType, isSitesDividerType as fCvo8hsZA } from './../sites-divider/sites.divider.type';
import { SitesHbTextType, isSitesHbTextType as lG99sEjul } from './../sites-hb-text/sites.hb.text.type';
import { SitesHtmlType, isSitesHtmlType as fCq2SLCbi } from './../sites-html/sites.html.type';
import { SitesImageAndTextType, isSitesImageAndTextType as fXuisfbYn } from './../sites-image-and-text/sites.image.and.text.type';
import { SitesImageType, isSitesImageType as PP1F5FBYi } from './../sites-image/sites.image.type';
import { SitesLinkBarType, isSitesLinkBarType as zeqFMvId_ } from './../sites-link-bar/sites.link.bar.type';
import { SitesPageCardType, isSitesPageCardType as BCFMo20vj } from './../sites-page-card/sites.page.card.type';
import { SitesPromotionType, isSitesPromotionType as nEFwIKgQI } from './../sites-promotion/sites.promotion.type';
import { SitesSocialFollowType, isSitesSocialFollowType as pISdo1_4v } from './../sites-social-follow/sites.social.follow.type';
import { SitesSpacerType, isSitesSpacerType as _BXenWHPz } from './../sites-spacer/sites.spacer.type';
import { SitesTextType, isSitesTextType as tElHRQANH } from './../sites-text/sites.text.type';
import { SitesVideoType, isSitesVideoType as pwKm6RiVG } from './../sites-video/sites.video.type';
import { DeliveryGroupElementMetadata, DeliveryReferenceElement } from '@acoustic-content-sdk/api';
import { EqualsPredicate, isDeliveryReferenceElement as b9QXnvMbg, isNotNil as xs$RwNUhH, isOptional as VnbVJaXFB, isString as xsUSy24Ob, partialLeft, pluckProperty, rxSelectProperty } from '@acoustic-content-sdk/utils';
import { OperatorFunction, UnaryFunction } from 'rxjs';

/**
 * Identifier of the content type for {@link SitesContentType}.
 */
export const TYPE_ID_SITES_CONTENT = '21a8b4fd-0236-4187-bfea-7a94283e7b80';
/**
 * Name of the content type for {@link SitesContentType}.
 */
export const TYPE_NAME_SITES_CONTENT = 'Sites Content';
/**
 * Key name of the `button` property of {@link SitesContentType}
 */
export const KEY_SITES_CONTENT_BUTTON = 'button';
/**
 * Key name of the `divider` property of {@link SitesContentType}
 */
export const KEY_SITES_CONTENT_DIVIDER = 'divider';
/**
 * Key name of the `html` property of {@link SitesContentType}
 */
export const KEY_SITES_CONTENT_HTML = 'html';
/**
 * Key name of the `image` property of {@link SitesContentType}
 */
export const KEY_SITES_CONTENT_IMAGE = 'image';
/**
 * Key name of the `imageAndText` property of {@link SitesContentType}
 */
export const KEY_SITES_CONTENT_IMAGE_AND_TEXT = 'imageAndText';
/**
 * Key name of the `promotion` property of {@link SitesContentType}
 */
export const KEY_SITES_CONTENT_PROMOTION = 'promotion';
/**
 * Key name of the `socialFollow` property of {@link SitesContentType}
 */
export const KEY_SITES_CONTENT_SOCIAL_FOLLOW = 'socialFollow';
/**
 * Key name of the `spacer` property of {@link SitesContentType}
 */
export const KEY_SITES_CONTENT_SPACER = 'spacer';
/**
 * Key name of the `text` property of {@link SitesContentType}
 */
export const KEY_SITES_CONTENT_TEXT = 'text';
/**
 * Key name of the `hbText` property of {@link SitesContentType}
 */
export const KEY_SITES_CONTENT_HB_TEXT = 'hbText';
/**
 * Key name of the `linkBar` property of {@link SitesContentType}
 */
export const KEY_SITES_CONTENT_LINK_BAR = 'linkBar';
/**
 * Key name of the `video` property of {@link SitesContentType}
 */
export const KEY_SITES_CONTENT_VIDEO = 'video';
/**
 * Key name of the `pageCard` property of {@link SitesContentType}
 */
export const KEY_SITES_CONTENT_PAGE_CARD = 'pageCard';
/**
 * Key name of the `reference` property of {@link SitesContentType}
 */
export const KEY_SITES_CONTENT_REFERENCE = 'reference';
/**
 * Key name of the `selected` property of {@link SitesContentType}
 */
export const KEY_SITES_CONTENT_SELECTED = 'selected';
/**
 * Key name of the `key` property of {@link SitesContentType}
 */
export const KEY_SITES_CONTENT_KEY = 'key';

/**
 * Delivery version of the Sites Content content type.
 *
 * See {@link TYPE_ID_SITES_CONTENT} and {@link TYPE_NAME_SITES_CONTENT}
 * @remarks
 * This element represent a content block of variable type. The possible types are represented by corresponding elements each. The element named "selected" identifies the actual block content item of the corresponding type. To support an additional block content type, you need to add a corresponding element of that type and a corresponding option value in the "selected" element definition.
 */
export interface SitesContentType {
  /**
   * Metadata reference
   */
   $metadata: DeliveryGroupElementMetadata;

  /**
   * The element holding the block content if the block is of type "Sites Button"
   * @remarks
   * See {@link KEY_SITES_CONTENT_BUTTON}
   *
   * @example
   * Original type definition in the content type:
   * ```json
   * {
   *   "elementType": "group",
   *   "helpText": "The element holding the block content if the block is of type \"Sites Button\"",
   *   "key": "button",
   *   "label": "Button",
   *   "typeRef": {
   *     "name": "Sites Button",
   *     "id": "dee92057-69e3-489b-b13b-15f9b28770a1"
   *   }
   * }
   * ```
   */
  [KEY_SITES_CONTENT_BUTTON]?: SitesButtonType;

  /**
   * The element holding the block content if the block is of type "Sites Devider"
   * @remarks
   * See {@link KEY_SITES_CONTENT_DIVIDER}
   *
   * @example
   * Original type definition in the content type:
   * ```json
   * {
   *   "elementType": "group",
   *   "helpText": "The element holding the block content if the block is of type \"Sites Devider\"",
   *   "key": "divider",
   *   "label": "Divider",
   *   "typeRef": {
   *     "name": "Sites Divider",
   *     "id": "d550249a-83b2-4e46-96d1-519732fa5787"
   *   }
   * }
   * ```
   */
  [KEY_SITES_CONTENT_DIVIDER]?: SitesDividerType;

  /**
   * The element holding the block content if the block is of type "Sites HTML"
   * @remarks
   * See {@link KEY_SITES_CONTENT_HTML}
   *
   * @example
   * Original type definition in the content type:
   * ```json
   * {
   *   "elementType": "group",
   *   "helpText": "The element holding the block content if the block is of type \"Sites HTML\"",
   *   "key": "html",
   *   "label": "HTML",
   *   "typeRef": {
   *     "name": "Sites HTML",
   *     "id": "85bdc88c-5b4c-4002-a665-37ba5bf95cb6"
   *   }
   * }
   * ```
   */
  [KEY_SITES_CONTENT_HTML]?: SitesHtmlType;

  /**
   * The element holding the block content if the block is of type "Sites Sites"
   * @remarks
   * See {@link KEY_SITES_CONTENT_IMAGE}
   *
   * @example
   * Original type definition in the content type:
   * ```json
   * {
   *   "elementType": "group",
   *   "helpText": "The element holding the block content if the block is of type \"Sites Sites\"",
   *   "key": "image",
   *   "label": "Image",
   *   "typeRef": {
   *     "name": "Sites Image",
   *     "id": "c8295d37-7235-495e-8d40-f3b8bafe4099"
   *   }
   * }
   * ```
   */
  [KEY_SITES_CONTENT_IMAGE]?: SitesImageType;

  /**
   * The element holding the block content if the block is of type "Sites Image And Text"
   * @remarks
   * See {@link KEY_SITES_CONTENT_IMAGE_AND_TEXT}
   *
   * @example
   * Original type definition in the content type:
   * ```json
   * {
   *   "elementType": "group",
   *   "helpText": "The element holding the block content if the block is of type \"Sites Image And Text\"",
   *   "key": "imageAndText",
   *   "label": "Image And Text",
   *   "typeRef": {
   *     "name": "Sites Image And Text",
   *     "id": "bee26b87-bbcf-454b-9dc6-7a909ab13fd1"
   *   }
   * }
   * ```
   */
  [KEY_SITES_CONTENT_IMAGE_AND_TEXT]?: SitesImageAndTextType;

  /**
   * The element holding the block content if the block is of type "Sites Promotion"
   * @remarks
   * See {@link KEY_SITES_CONTENT_PROMOTION}
   *
   * @example
   * Original type definition in the content type:
   * ```json
   * {
   *   "elementType": "group",
   *   "helpText": "The element holding the block content if the block is of type \"Sites Promotion\"",
   *   "key": "promotion",
   *   "label": "Promotion",
   *   "typeRef": {
   *     "name": "Sites Promotion",
   *     "id": "0b1c47a9-eb31-49ec-8fd7-89ca21a36b36"
   *   }
   * }
   * ```
   */
  [KEY_SITES_CONTENT_PROMOTION]?: SitesPromotionType;

  /**
   * The element holding the block content if the block is of type "Sites Social Follow"
   * @remarks
   * See {@link KEY_SITES_CONTENT_SOCIAL_FOLLOW}
   *
   * @example
   * Original type definition in the content type:
   * ```json
   * {
   *   "elementType": "group",
   *   "helpText": "The element holding the block content if the block is of type \"Sites Social Follow\"",
   *   "key": "socialFollow",
   *   "label": "Social Follow",
   *   "typeRef": {
   *     "name": "Sites Social Follow",
   *     "id": "669768ce-44c7-4de3-83c1-a72d871e8df2"
   *   }
   * }
   * ```
   */
  [KEY_SITES_CONTENT_SOCIAL_FOLLOW]?: SitesSocialFollowType;

  /**
   * The element holding the block content if the block is of type "Sites Spacer"
   * @remarks
   * See {@link KEY_SITES_CONTENT_SPACER}
   *
   * @example
   * Original type definition in the content type:
   * ```json
   * {
   *   "elementType": "group",
   *   "helpText": "The element holding the block content if the block is of type \"Sites Spacer\"",
   *   "key": "spacer",
   *   "label": "Spacer",
   *   "typeRef": {
   *     "name": "Sites Spacer",
   *     "id": "b2a9542d-b432-48b3-8322-2464765f323b"
   *   }
   * }
   * ```
   */
  [KEY_SITES_CONTENT_SPACER]?: SitesSpacerType;

  /**
   * The element holding the block content if the block is of type "Sites Text"
   * @remarks
   * See {@link KEY_SITES_CONTENT_TEXT}
   *
   * @example
   * Original type definition in the content type:
   * ```json
   * {
   *   "elementType": "group",
   *   "helpText": "The element holding the block content if the block is of type \"Sites Text\"",
   *   "key": "text",
   *   "label": "Text",
   *   "typeRef": {
   *     "name": "Sites Text",
   *     "id": "373c81a5-d86b-4740-8f11-62fcbccfca08"
   *   }
   * }
   * ```
   */
  [KEY_SITES_CONTENT_TEXT]?: SitesTextType;

  /**
   * The element holding the block content if the block is of type "Sites HB Text"
   * @remarks
   * See {@link KEY_SITES_CONTENT_HB_TEXT}
   *
   * @example
   * Original type definition in the content type:
   * ```json
   * {
   *   "elementType": "group",
   *   "helpText": "The element holding the block content if the block is of type \"Sites HB Text\"",
   *   "key": "hbText",
   *   "label": "HB Text",
   *   "typeRef": {
   *     "name": "Sites HB Text",
   *     "id": "ac299073-48a2-446d-987d-d893257abdb3"
   *   }
   * }
   * ```
   */
  [KEY_SITES_CONTENT_HB_TEXT]?: SitesHbTextType;

  /**
   * The element holding the block content if the block is of type "Sites Link Bar"
   * @remarks
   * See {@link KEY_SITES_CONTENT_LINK_BAR}
   *
   * @example
   * Original type definition in the content type:
   * ```json
   * {
   *   "elementType": "group",
   *   "helpText": "The element holding the block content if the block is of type \"Sites Link Bar\"",
   *   "key": "linkBar",
   *   "label": "Link Bar",
   *   "typeRef": {
   *     "name": "Sites Link Bar",
   *     "id": "d0f831c3-1b0a-41ba-8a6b-10f2eca3789a"
   *   }
   * }
   * ```
   */
  [KEY_SITES_CONTENT_LINK_BAR]?: SitesLinkBarType;

  /**
   * The element holding the block content if the block is of type "Sites Video"
   * @remarks
   * See {@link KEY_SITES_CONTENT_VIDEO}
   *
   * @example
   * Original type definition in the content type:
   * ```json
   * {
   *   "elementType": "group",
   *   "helpText": "The element holding the block content if the block is of type \"Sites Video\"",
   *   "key": "video",
   *   "label": "Video",
   *   "typeRef": {
   *     "name": "Sites Video",
   *     "id": "a84f2c97-33bb-45fa-8156-25141df73055"
   *   }
   * }
   * ```
   */
  [KEY_SITES_CONTENT_VIDEO]?: SitesVideoType;

  /**
   * The element holding the block content if the block is of type "Page Card"
   * @remarks
   * See {@link KEY_SITES_CONTENT_PAGE_CARD}
   *
   * @example
   * Original type definition in the content type:
   * ```json
   * {
   *   "elementType": "group",
   *   "helpText": "The element holding the block content if the block is of type \"Page Card\"",
   *   "key": "pageCard",
   *   "label": "Page Card",
   *   "typeRef": {
   *     "id": "8eb34ed3-fbdf-439e-aaeb-00060cdeb63a"
   *   }
   * }
   * ```
   */
  [KEY_SITES_CONTENT_PAGE_CARD]?: SitesPageCardType;

  /**
   * The element holding the block content if the block is a shared block
   * @remarks
   * See {@link KEY_SITES_CONTENT_REFERENCE}
   *
   * @example
   * Original type definition in the content type:
   * ```json
   * {
   *   "elementType": "reference",
   *   "helpText": "The element holding the block content if the block is a shared block",
   *   "key": "reference",
   *   "label": "reference"
   * }
   * ```
   */
  [KEY_SITES_CONTENT_REFERENCE]?: DeliveryReferenceElement;

  /**
   * This element identifies the element that holds actual block content for this item.
   * @remarks
   * See {@link KEY_SITES_CONTENT_SELECTED}
   *
   * @example
   * Original type definition in the content type:
   * ```json
   * {
   *   "elementType": "optionselection",
   *   "helpText": "This element identifies the element that holds actual block content for this item.",
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
   *       "label": "Page Card",
   *       "selection": "pageCard"
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
  [KEY_SITES_CONTENT_SELECTED]: string;

  /**
   * This element is used to uniquely identify this element in the current content item
   * @remarks
   * See {@link KEY_SITES_CONTENT_KEY}
   *
   * @example
   * Original type definition in the content type:
   * ```json
   * {
   *   "elementType": "text",
   *   "helpText": "This element is used to uniquely identify this element in the current content item",
   *   "key": "key",
   *   "label": "Key"
   * }
   * ```
   */
  [KEY_SITES_CONTENT_KEY]?: string;
}

/**
 * Tests if the value is of type {@link SitesContentType}
 *
 * @param aValue - the value to test
 * @returns true if the value is of type {@link SitesContentType} else false
 */
export function isSitesContentType(aValue: any): aValue is SitesContentType {
  return xs$RwNUhH(aValue)
    && VnbVJaXFB(aValue[KEY_SITES_CONTENT_BUTTON], VbPJde0zw)
    && VnbVJaXFB(aValue[KEY_SITES_CONTENT_DIVIDER], fCvo8hsZA)
    && VnbVJaXFB(aValue[KEY_SITES_CONTENT_HTML], fCq2SLCbi)
    && VnbVJaXFB(aValue[KEY_SITES_CONTENT_IMAGE], PP1F5FBYi)
    && VnbVJaXFB(aValue[KEY_SITES_CONTENT_IMAGE_AND_TEXT], fXuisfbYn)
    && VnbVJaXFB(aValue[KEY_SITES_CONTENT_PROMOTION], nEFwIKgQI)
    && VnbVJaXFB(aValue[KEY_SITES_CONTENT_SOCIAL_FOLLOW], pISdo1_4v)
    && VnbVJaXFB(aValue[KEY_SITES_CONTENT_SPACER], _BXenWHPz)
    && VnbVJaXFB(aValue[KEY_SITES_CONTENT_TEXT], tElHRQANH)
    && VnbVJaXFB(aValue[KEY_SITES_CONTENT_HB_TEXT], lG99sEjul)
    && VnbVJaXFB(aValue[KEY_SITES_CONTENT_LINK_BAR], zeqFMvId_)
    && VnbVJaXFB(aValue[KEY_SITES_CONTENT_VIDEO], pwKm6RiVG)
    && VnbVJaXFB(aValue[KEY_SITES_CONTENT_PAGE_CARD], BCFMo20vj)
    && VnbVJaXFB(aValue[KEY_SITES_CONTENT_REFERENCE], b9QXnvMbg)
    && xsUSy24Ob(aValue[KEY_SITES_CONTENT_SELECTED])
    && VnbVJaXFB(aValue[KEY_SITES_CONTENT_KEY], xsUSy24Ob)
    ;
}

/**
 * Selects the {@link KEY_SITES_CONTENT_BUTTON} property from {@link SitesContentType}.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectSitesContentButton: (aDefault?: SitesButtonType) => UnaryFunction<SitesContentType,
  SitesButtonType> = partialLeft(pluckProperty, KEY_SITES_CONTENT_BUTTON);

/**
 * Selects the {@link KEY_SITES_CONTENT_BUTTON} property from {@link SitesContentType} as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectSitesContentButton: (aDefault?: SitesButtonType, aCmp?: EqualsPredicate<SitesButtonType>) =>
  OperatorFunction<SitesContentType, SitesButtonType> = partialLeft(rxSelectProperty, KEY_SITES_CONTENT_BUTTON);

/**
 * Selects the {@link KEY_SITES_CONTENT_DIVIDER} property from {@link SitesContentType}.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectSitesContentDivider: (aDefault?: SitesDividerType) => UnaryFunction<SitesContentType,
  SitesDividerType> = partialLeft(pluckProperty, KEY_SITES_CONTENT_DIVIDER);

/**
 * Selects the {@link KEY_SITES_CONTENT_DIVIDER} property from {@link SitesContentType} as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectSitesContentDivider: (aDefault?: SitesDividerType, aCmp?: EqualsPredicate<SitesDividerType>) =>
  OperatorFunction<SitesContentType, SitesDividerType> = partialLeft(rxSelectProperty, KEY_SITES_CONTENT_DIVIDER);

/**
 * Selects the {@link KEY_SITES_CONTENT_HTML} property from {@link SitesContentType}.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectSitesContentHtml: (aDefault?: SitesHtmlType) => UnaryFunction<SitesContentType,
  SitesHtmlType> = partialLeft(pluckProperty, KEY_SITES_CONTENT_HTML);

/**
 * Selects the {@link KEY_SITES_CONTENT_HTML} property from {@link SitesContentType} as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectSitesContentHtml: (aDefault?: SitesHtmlType, aCmp?: EqualsPredicate<SitesHtmlType>) =>
  OperatorFunction<SitesContentType, SitesHtmlType> = partialLeft(rxSelectProperty, KEY_SITES_CONTENT_HTML);

/**
 * Selects the {@link KEY_SITES_CONTENT_IMAGE} property from {@link SitesContentType}.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectSitesContentImage: (aDefault?: SitesImageType) => UnaryFunction<SitesContentType,
  SitesImageType> = partialLeft(pluckProperty, KEY_SITES_CONTENT_IMAGE);

/**
 * Selects the {@link KEY_SITES_CONTENT_IMAGE} property from {@link SitesContentType} as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectSitesContentImage: (aDefault?: SitesImageType, aCmp?: EqualsPredicate<SitesImageType>) =>
  OperatorFunction<SitesContentType, SitesImageType> = partialLeft(rxSelectProperty, KEY_SITES_CONTENT_IMAGE);

/**
 * Selects the {@link KEY_SITES_CONTENT_IMAGE_AND_TEXT} property from {@link SitesContentType}.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectSitesContentImageAndText: (aDefault?: SitesImageAndTextType) => UnaryFunction<SitesContentType,
  SitesImageAndTextType> = partialLeft(pluckProperty, KEY_SITES_CONTENT_IMAGE_AND_TEXT);

/**
 * Selects the {@link KEY_SITES_CONTENT_IMAGE_AND_TEXT} property from {@link SitesContentType} as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectSitesContentImageAndText: (aDefault?: SitesImageAndTextType, aCmp?: EqualsPredicate<SitesImageAndTextType>) =>
  OperatorFunction<SitesContentType, SitesImageAndTextType> = partialLeft(rxSelectProperty, KEY_SITES_CONTENT_IMAGE_AND_TEXT);

/**
 * Selects the {@link KEY_SITES_CONTENT_PROMOTION} property from {@link SitesContentType}.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectSitesContentPromotion: (aDefault?: SitesPromotionType) => UnaryFunction<SitesContentType,
  SitesPromotionType> = partialLeft(pluckProperty, KEY_SITES_CONTENT_PROMOTION);

/**
 * Selects the {@link KEY_SITES_CONTENT_PROMOTION} property from {@link SitesContentType} as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectSitesContentPromotion: (aDefault?: SitesPromotionType, aCmp?: EqualsPredicate<SitesPromotionType>) =>
  OperatorFunction<SitesContentType, SitesPromotionType> = partialLeft(rxSelectProperty, KEY_SITES_CONTENT_PROMOTION);

/**
 * Selects the {@link KEY_SITES_CONTENT_SOCIAL_FOLLOW} property from {@link SitesContentType}.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectSitesContentSocialFollow: (aDefault?: SitesSocialFollowType) => UnaryFunction<SitesContentType,
  SitesSocialFollowType> = partialLeft(pluckProperty, KEY_SITES_CONTENT_SOCIAL_FOLLOW);

/**
 * Selects the {@link KEY_SITES_CONTENT_SOCIAL_FOLLOW} property from {@link SitesContentType} as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectSitesContentSocialFollow: (aDefault?: SitesSocialFollowType, aCmp?: EqualsPredicate<SitesSocialFollowType>) =>
  OperatorFunction<SitesContentType, SitesSocialFollowType> = partialLeft(rxSelectProperty, KEY_SITES_CONTENT_SOCIAL_FOLLOW);

/**
 * Selects the {@link KEY_SITES_CONTENT_SPACER} property from {@link SitesContentType}.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectSitesContentSpacer: (aDefault?: SitesSpacerType) => UnaryFunction<SitesContentType,
  SitesSpacerType> = partialLeft(pluckProperty, KEY_SITES_CONTENT_SPACER);

/**
 * Selects the {@link KEY_SITES_CONTENT_SPACER} property from {@link SitesContentType} as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectSitesContentSpacer: (aDefault?: SitesSpacerType, aCmp?: EqualsPredicate<SitesSpacerType>) =>
  OperatorFunction<SitesContentType, SitesSpacerType> = partialLeft(rxSelectProperty, KEY_SITES_CONTENT_SPACER);

/**
 * Selects the {@link KEY_SITES_CONTENT_TEXT} property from {@link SitesContentType}.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectSitesContentText: (aDefault?: SitesTextType) => UnaryFunction<SitesContentType,
  SitesTextType> = partialLeft(pluckProperty, KEY_SITES_CONTENT_TEXT);

/**
 * Selects the {@link KEY_SITES_CONTENT_TEXT} property from {@link SitesContentType} as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectSitesContentText: (aDefault?: SitesTextType, aCmp?: EqualsPredicate<SitesTextType>) =>
  OperatorFunction<SitesContentType, SitesTextType> = partialLeft(rxSelectProperty, KEY_SITES_CONTENT_TEXT);

/**
 * Selects the {@link KEY_SITES_CONTENT_HB_TEXT} property from {@link SitesContentType}.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectSitesContentHbText: (aDefault?: SitesHbTextType) => UnaryFunction<SitesContentType,
  SitesHbTextType> = partialLeft(pluckProperty, KEY_SITES_CONTENT_HB_TEXT);

/**
 * Selects the {@link KEY_SITES_CONTENT_HB_TEXT} property from {@link SitesContentType} as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectSitesContentHbText: (aDefault?: SitesHbTextType, aCmp?: EqualsPredicate<SitesHbTextType>) =>
  OperatorFunction<SitesContentType, SitesHbTextType> = partialLeft(rxSelectProperty, KEY_SITES_CONTENT_HB_TEXT);

/**
 * Selects the {@link KEY_SITES_CONTENT_LINK_BAR} property from {@link SitesContentType}.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectSitesContentLinkBar: (aDefault?: SitesLinkBarType) => UnaryFunction<SitesContentType,
  SitesLinkBarType> = partialLeft(pluckProperty, KEY_SITES_CONTENT_LINK_BAR);

/**
 * Selects the {@link KEY_SITES_CONTENT_LINK_BAR} property from {@link SitesContentType} as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectSitesContentLinkBar: (aDefault?: SitesLinkBarType, aCmp?: EqualsPredicate<SitesLinkBarType>) =>
  OperatorFunction<SitesContentType, SitesLinkBarType> = partialLeft(rxSelectProperty, KEY_SITES_CONTENT_LINK_BAR);

/**
 * Selects the {@link KEY_SITES_CONTENT_VIDEO} property from {@link SitesContentType}.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectSitesContentVideo: (aDefault?: SitesVideoType) => UnaryFunction<SitesContentType,
  SitesVideoType> = partialLeft(pluckProperty, KEY_SITES_CONTENT_VIDEO);

/**
 * Selects the {@link KEY_SITES_CONTENT_VIDEO} property from {@link SitesContentType} as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectSitesContentVideo: (aDefault?: SitesVideoType, aCmp?: EqualsPredicate<SitesVideoType>) =>
  OperatorFunction<SitesContentType, SitesVideoType> = partialLeft(rxSelectProperty, KEY_SITES_CONTENT_VIDEO);

/**
 * Selects the {@link KEY_SITES_CONTENT_PAGE_CARD} property from {@link SitesContentType}.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectSitesContentPageCard: (aDefault?: SitesPageCardType) => UnaryFunction<SitesContentType,
  SitesPageCardType> = partialLeft(pluckProperty, KEY_SITES_CONTENT_PAGE_CARD);

/**
 * Selects the {@link KEY_SITES_CONTENT_PAGE_CARD} property from {@link SitesContentType} as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectSitesContentPageCard: (aDefault?: SitesPageCardType, aCmp?: EqualsPredicate<SitesPageCardType>) =>
  OperatorFunction<SitesContentType, SitesPageCardType> = partialLeft(rxSelectProperty, KEY_SITES_CONTENT_PAGE_CARD);

/**
 * Selects the {@link KEY_SITES_CONTENT_REFERENCE} property from {@link SitesContentType}.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectSitesContentReference: (aDefault?: DeliveryReferenceElement) => UnaryFunction<SitesContentType,
  DeliveryReferenceElement> = partialLeft(pluckProperty, KEY_SITES_CONTENT_REFERENCE);

/**
 * Selects the {@link KEY_SITES_CONTENT_REFERENCE} property from {@link SitesContentType} as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectSitesContentReference: (aDefault?: DeliveryReferenceElement, aCmp?: EqualsPredicate<DeliveryReferenceElement>) =>
  OperatorFunction<SitesContentType, DeliveryReferenceElement> = partialLeft(rxSelectProperty, KEY_SITES_CONTENT_REFERENCE);

/**
 * Selects the {@link KEY_SITES_CONTENT_SELECTED} property from {@link SitesContentType}.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectSitesContentSelected: (aDefault?: string) => UnaryFunction<SitesContentType,
  string> = partialLeft(pluckProperty, KEY_SITES_CONTENT_SELECTED);

/**
 * Selects the {@link KEY_SITES_CONTENT_SELECTED} property from {@link SitesContentType} as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectSitesContentSelected: (aDefault?: string, aCmp?: EqualsPredicate<string>) =>
  OperatorFunction<SitesContentType, string> = partialLeft(rxSelectProperty, KEY_SITES_CONTENT_SELECTED);

/**
 * Selects the {@link KEY_SITES_CONTENT_KEY} property from {@link SitesContentType}.
 *
 * @param aDefault - optional default
 *
 * @returns the selector function
 */
export const selectSitesContentKey: (aDefault?: string) => UnaryFunction<SitesContentType,
  string> = partialLeft(pluckProperty, KEY_SITES_CONTENT_KEY);

/**
 * Selects the {@link KEY_SITES_CONTENT_KEY} property from {@link SitesContentType} as an operator.
 *
 * @param aDefault - optional default
 * @param aCmp - optional comparator to compare the results
 *
 * @returns the selector operator
 */
export const rxSelectSitesContentKey: (aDefault?: string, aCmp?: EqualsPredicate<string>) =>
  OperatorFunction<SitesContentType, string> = partialLeft(rxSelectProperty, KEY_SITES_CONTENT_KEY);
