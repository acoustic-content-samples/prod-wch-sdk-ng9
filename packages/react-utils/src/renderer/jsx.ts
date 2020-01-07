import { objectAssign, reduceArray } from '@acoustic-content-sdk/utils';

// from https://reactjs.org/docs/dom-elements.html

const HTML_ATTRIBUTES: Record<string, string> = {
  'accept-charset': 'acceptCharset',
  'http-equiv': 'httpEquiv',
  accesskey: 'accessKey',
  allowfullscreen: 'allowFullScreen',
  autocomplete: 'autoComplete',
  autofocus: 'autoFocus',
  autoplay: 'autoPlay',
  cellpadding: 'cellPadding',
  cellspacing: 'cellSpacing',
  charset: 'charSet',
  class: 'className',
  colspan: 'colSpan',
  contenteditable: 'contentEditable',
  contextmenu: 'contextMenu',
  controlslist: 'controlsList',
  crossorigin: 'crossOrigin',
  datetime: 'dateTime',
  enctype: 'encType',
  formaction: 'formAction',
  formenctype: 'formEncType',
  formmethod: 'formMethod',
  formnovalidate: 'formNoValidate',
  formtarget: 'formTarget',
  frameborder: 'frameBorder',
  hreflang: 'hrefLang',
  htmlfor: 'htmlFor',
  inputmode: 'inputMode',
  keyparams: 'keyParams',
  keytype: 'keyType',
  marginheight: 'marginHeight',
  marginwidth: 'marginWidth',
  maxlength: 'maxLength',
  mediagroup: 'mediaGroup',
  minlength: 'minLength',
  novalidate: 'noValidate',
  radiogroup: 'radioGroup',
  readonly: 'readOnly',
  rowspan: 'rowSpan',
  spellcheck: 'spellCheck',
  srcdoc: 'srcDoc',
  srclang: 'srcLang',
  srcset: 'srcSet',
  tabindex: 'tabIndex',
  usemap: 'useMap'
};

export const SVG_ATTRIBUTES: Record<string, string> = {
  'accent-height': 'accentHeight',
  'alignment-baseline': 'alignmentBaseline',
  'arabic-form': 'arabicForm',
  'baseline-shift': 'baselineShift',
  'cap-height': 'capHeight',
  'clip-path': 'clipPath',
  'clip-rule': 'clipRule',
  'color-interpolation': 'colorInterpolation',
  'color-interpolation-filters': 'colorInterpolationFilters',
  'color-profile': 'colorProfile',
  'color-rendering': 'colorRendering',
  'dominant-baseline': 'dominantBaseline',
  'enable-background': 'enableBackground',
  'fill-opacity': 'fillOpacity',
  'fill-rule': 'fillRule',
  'flood-color': 'floodColor',
  'flood-opacity': 'floodOpacity',
  'font-family': 'fontFamily',
  'font-size': 'fontSize',
  'font-size-adjust': 'fontSizeAdjust',
  'font-stretch': 'fontStretch',
  'font-style': 'fontStyle',
  'font-variant': 'fontVariant',
  'font-weight': 'fontWeight',
  'glyph-name': 'glyphName',
  'glyph-orientation-horizontal': 'glyphOrientationHorizontal',
  'glyph-orientation-vertical': 'glyphOrientationVertical',
  'horiz-adv-x': 'horizAdvX',
  'horiz-origin-x': 'horizOriginX',
  'image-rendering': 'imageRendering',
  'letter-spacing': 'letterSpacing',
  'lighting-color': 'lightingColor',
  'marker-end': 'markerEnd',
  'marker-mid': 'markerMid',
  'marker-start': 'markerStart',
  'overline-position': 'overlinePosition',
  'overline-thickness': 'overlineThickness',
  'panose-1': 'panose1',
  'paint-order': 'paintOrder',
  'pointer-events': 'pointerEvents',
  'rendering-intent': 'renderingIntent',
  'shape-rendering': 'shapeRendering',
  'stop-color': 'stopColor',
  'stop-opacity': 'stopOpacity',
  'strikethrough-position': 'strikethroughPosition',
  'strikethrough-thickness': 'strikethroughThickness',
  'stroke-dasharray': 'strokeDasharray',
  'stroke-dashoffset': 'strokeDashoffset',
  'stroke-linecap': 'strokeLinecap',
  'stroke-linejoin': 'strokeLinejoin',
  'stroke-miterlimit': 'strokeMiterlimit',
  'stroke-opacity': 'strokeOpacity',
  'stroke-width': 'strokeWidth',
  'text-anchor': 'textAnchor',
  'text-decoration': 'textDecoration',
  'text-rendering': 'textRendering',
  'underline-position': 'underlinePosition',
  'underline-thickness': 'underlineThickness',
  'unicode-bidi': 'unicodeBidi',
  'unicode-range': 'unicodeRange',
  'units-per-em': 'unitsPerEm',
  'v-alphabetic': 'vAlphabetic',
  'v-hanging': 'vHanging',
  'v-ideographic': 'vIdeographic',
  'v-mathematical': 'vMathematical',
  'vert-adv-y': 'vertAdvY',
  'vert-origin-x': 'vertOriginX',
  'vert-origin-y': 'vertOriginY',
  'word-spacing': 'wordSpacing',
  'writing-mode': 'writingMode',
  'x-height': 'xHeight',
  'xlink:actuate': 'xlinkActuate',
  'xlink:arcrole': 'xlinkArcrole',
  'xlink:href': 'xlinkHref',
  'xlink:role': 'xlinkRole',
  'xlink:show': 'xlinkShow',
  'xlink:title': 'xlinkTitle',
  'xlink:type': 'xlinkType',
  'xml:base': 'xmlBase',
  'xml:lang': 'xmlLang',
  'xml:space': 'xmlSpace'
};

export const ALL_ATTRIBUTES = { ...HTML_ATTRIBUTES, ...SVG_ATTRIBUTES };

const badVendoredStyleNamePattern = /^(?:webkit|moz|o)[A-Z]/;

const upperCaseFirst = (aValue: string) =>
  `${aValue[0].toUpperCase()}${aValue.substr(1)}`;

/**
 * Maps the original CSS style keys to their react pendants
 *
 * @param aDst - target map
 * @param aKey - the key
 *
 * @returns target map
 */
const reduceStyleKey = (aDst: Record<string, string>, aKey: string) =>
  objectAssign(
    aKey,
    badVendoredStyleNamePattern.test(aKey) ? upperCaseFirst(aKey) : aKey,
    aDst
  );

/**
 * List of CSS style keys. Make sure to NOT include shorthand key names due to
 * a problem in the reconciliation process of react
 */
export const STYLE_KEYS = [
  'alignContent',
  'alignItems',
  'alignSelf',
  'alignmentBaseline',
  'animationDelay',
  'animationDirection',
  'animationDuration',
  'animationFillMode',
  'animationIterationCount',
  'animationName',
  'animationPlayState',
  'animationTimingFunction',
  'backfaceVisibility',
  'backgroundAttachment',
  'backgroundClip',
  'backgroundColor',
  'backgroundImage',
  'backgroundOrigin',
  'backgroundPositionX',
  'backgroundPositionY',
  'backgroundRepeat',
  'backgroundSize',
  'baselineShift',
  'borderBlockEndColor',
  'borderBlockEndStyle',
  'borderBlockEndWidth',
  'borderBlockStartColor',
  'borderBlockStartStyle',
  'borderBlockStartWidth',
  'borderBottomColor',
  'borderBottomLeftRadius',
  'borderBottomRightRadius',
  'borderBottomStyle',
  'borderBottomWidth',
  'borderCollapse',
  'borderImageOutset',
  'borderImageRepeat',
  'borderImageSlice',
  'borderImageSource',
  'borderImageWidth',
  'borderInlineEndColor',
  'borderInlineEndStyle',
  'borderInlineEndWidth',
  'borderInlineStartColor',
  'borderInlineStartStyle',
  'borderInlineStartWidth',
  'borderLeftColor',
  'borderLeftStyle',
  'borderLeftWidth',
  'borderRightColor',
  'borderRightStyle',
  'borderRightWidth',
  'borderSpacing',
  'borderTopColor',
  'borderTopLeftRadius',
  'borderTopRightRadius',
  'borderTopStyle',
  'borderTopWidth',
  'bottom',
  'boxShadow',
  'boxSizing',
  'breakAfter',
  'breakBefore',
  'breakInside',
  'captionSide',
  'clear',
  'clip',
  'clipPath',
  'clipRule',
  'color',
  'colorInterpolationFilters',
  'columnCount',
  'columnFill',
  'columnGap',
  'columnRuleColor',
  'columnRuleStyle',
  'columnRuleWidth',
  'columnSpan',
  'columnWidth',
  'content',
  'counterIncrement',
  'counterReset',
  'cursor',
  'direction',
  'display',
  'dominantBaseline',
  'emptyCells',
  'enableBackground',
  'fill',
  'fillOpacity',
  'fillRule',
  'filter',
  'flexBasis',
  'flexDirection',
  'flexGrow',
  'flexShrink',
  'flexWrap',
  'floodColor',
  'floodOpacity',
  'fontFamily',
  'fontFeatureSettings',
  'fontKerning',
  'fontLanguageOverride',
  'fontSize',
  'fontSizeAdjust',
  'fontStretch',
  'fontStyle',
  'fontVariant',
  'fontVariantAlternates',
  'fontVariantCaps',
  'fontVariantEastAsian',
  'fontVariantLigatures',
  'fontVariantNumeric',
  'fontVariantPosition',
  'fontWeight',
  'glyphOrientationHorizontal',
  'glyphOrientationVertical',
  'gridAutoColumns',
  'gridAutoFlow',
  'gridAutoRows',
  'gridColumnEnd',
  'gridColumnStart',
  'gridRowEnd',
  'gridRowStart',
  'gridTemplateAreas',
  'gridTemplateColumns',
  'gridTemplateRows',
  'height',
  'imeMode',
  'justifyContent',
  'justifyItems',
  'justifySelf',
  'kerning',
  'layoutGrid',
  'layoutGridChar',
  'layoutGridLine',
  'layoutGridMode',
  'layoutGridType',
  'left',
  'letterSpacing',
  'lightingColor',
  'lineBreak',
  'lineHeight',
  'listStyleImage',
  'listStylePosition',
  'listStyleType',
  'marginBottom',
  'marginLeft',
  'marginRight',
  'marginTop',
  'markerEnd',
  'markerMid',
  'markerStart',
  'maskClip',
  'maskComposite',
  'maskImage',
  'maskMode',
  'maskOrigin',
  'maskPositionX',
  'maskPositionY',
  'maskRepeat',
  'maskSize',
  'maxHeight',
  'maxWidth',
  'minHeight',
  'minWidth',
  'msContentZoomChaining',
  'msContentZoomLimit',
  'msContentZoomLimitMax',
  'msContentZoomLimitMin',
  'msContentZoomSnap',
  'msContentZoomSnapPoints',
  'msContentZoomSnapType',
  'msContentZooming',
  'msFlowFrom',
  'msFlowInto',
  'msFontFeatureSettings',
  'msGridColumn',
  'msGridColumnAlign',
  'msGridColumnSpan',
  'msGridColumns',
  'msGridRow',
  'msGridRowAlign',
  'msGridRowSpan',
  'msGridRows',
  'msHighContrastAdjust',
  'msHyphenateLimitChars',
  'msHyphenateLimitLines',
  'msHyphenateLimitZone',
  'msHyphens',
  'msImeAlign',
  'msOverflowStyle',
  'msScrollChaining',
  'msScrollLimit',
  'msScrollLimitXMax',
  'msScrollLimitXMin',
  'msScrollLimitYMax',
  'msScrollLimitYMin',
  'msScrollRails',
  'msScrollSnapPointsX',
  'msScrollSnapPointsY',
  'msScrollSnapType',
  'msScrollSnapX',
  'msScrollSnapY',
  'msScrollTranslation',
  'msTextCombineHorizontal',
  'msTextSizeAdjust',
  'msTouchAction',
  'msTouchSelect',
  'msUserSelect',
  'msWrapFlow',
  'msWrapMargin',
  'msWrapThrough',
  'objectFit',
  'objectPosition',
  'opacity',
  'order',
  'orphans',
  'outlineColor',
  'outlineOffset',
  'outlineStyle',
  'outlineWidth',
  'overflowWrap',
  'overflowX',
  'overflowY',
  'paddingBottom',
  'paddingLeft',
  'paddingRight',
  'paddingTop',
  'pageBreakAfter',
  'pageBreakBefore',
  'pageBreakInside',
  'penAction',
  'perspective',
  'perspectiveOrigin',
  'pointerEvents',
  'position',
  'quotes',
  'resize',
  'right',
  'rotate',
  'rowGap',
  'rubyAlign',
  'rubyOverhang',
  'rubyPosition',
  'scale',
  'scrollBehavior',
  'stopColor',
  'stopOpacity',
  'stroke',
  'strokeDasharray',
  'strokeDashoffset',
  'strokeLinecap',
  'strokeLinejoin',
  'strokeMiterlimit',
  'strokeOpacity',
  'strokeWidth',
  'tableLayout',
  'textAlign',
  'textAlignLast',
  'textAnchor',
  'textCombineUpright',
  'textDecorationColor',
  'textDecorationLine',
  'textDecorationStyle',
  'textEmphasisColor',
  'textEmphasisStyle',
  'textIndent',
  'textJustify',
  'textKashida',
  'textKashidaSpace',
  'textOverflow',
  'textShadow',
  'textTransform',
  'textUnderlinePosition',
  'top',
  'touchAction',
  'transform',
  'transformOrigin',
  'transformStyle',
  'transitionDelay',
  'transitionDuration',
  'transitionProperty',
  'transitionTimingFunction',
  'translate',
  'unicodeBidi',
  'userSelect',
  'verticalAlign',
  'visibility',
  'webkitAlignContent',
  'webkitAlignItems',
  'webkitAlignSelf',
  'webkitAnimation',
  'webkitAnimationDelay',
  'webkitAnimationDirection',
  'webkitAnimationDuration',
  'webkitAnimationFillMode',
  'webkitAnimationIterationCount',
  'webkitAnimationName',
  'webkitAnimationPlayState',
  'webkitAnimationTimingFunction',
  'webkitAppearance',
  'webkitBackfaceVisibility',
  'webkitBackgroundClip',
  'webkitBackgroundOrigin',
  'webkitBackgroundSize',
  'webkitBorderBottomLeftRadius',
  'webkitBorderBottomRightRadius',
  'webkitBorderImage',
  'webkitBorderRadius',
  'webkitBorderTopLeftRadius',
  'webkitBorderTopRightRadius',
  'webkitBoxAlign',
  'webkitBoxDirection',
  'webkitBoxFlex',
  'webkitBoxOrdinalGroup',
  'webkitBoxOrient',
  'webkitBoxPack',
  'webkitBoxShadow',
  'webkitBoxSizing',
  'webkitColumnBreakAfter',
  'webkitColumnBreakBefore',
  'webkitColumnBreakInside',
  'webkitColumnCount',
  'webkitColumnGap',
  'webkitColumnRule',
  'webkitColumnRuleColor',
  'webkitColumnRuleStyle',
  'webkitColumnRuleWidth',
  'webkitColumnSpan',
  'webkitColumnWidth',
  'webkitColumns',
  'webkitFilter',
  'webkitFlex',
  'webkitFlexBasis',
  'webkitFlexDirection',
  'webkitFlexFlow',
  'webkitFlexGrow',
  'webkitFlexShrink',
  'webkitFlexWrap',
  'webkitJustifyContent',
  'webkitMask',
  'webkitMaskBoxImage',
  'webkitMaskBoxImageOutset',
  'webkitMaskBoxImageRepeat',
  'webkitMaskBoxImageSlice',
  'webkitMaskBoxImageSource',
  'webkitMaskBoxImageWidth',
  'webkitMaskClip',
  'webkitMaskComposite',
  'webkitMaskImage',
  'webkitMaskOrigin',
  'webkitMaskPosition',
  'webkitMaskRepeat',
  'webkitMaskSize',
  'webkitOrder',
  'webkitPerspective',
  'webkitPerspectiveOrigin',
  'webkitTapHighlightColor',
  'webkitTextFillColor',
  'webkitTextSizeAdjust',
  'webkitTextStroke',
  'webkitTextStrokeColor',
  'webkitTextStrokeWidth',
  'webkitTransform',
  'webkitTransformOrigin',
  'webkitTransformStyle',
  'webkitTransition',
  'webkitTransitionDelay',
  'webkitTransitionDuration',
  'webkitTransitionProperty',
  'webkitTransitionTimingFunction',
  'webkitUserModify',
  'webkitUserSelect',
  'webkitWritingMode',
  'whiteSpace',
  'widows',
  'width',
  'wordBreak',
  'wordSpacing',
  'writingMode',
  'zIndex',
  'zoom'
];

/**
 * Mapping from style key to actual react value of that key
 */
export const STYLE_MAP: Record<string, string> = reduceArray(
  STYLE_KEYS,
  reduceStyleKey,
  {}
);
