import {
  ELEMENT_TYPE,
  ELEMENT_TYPE_FORMATTED_TEXT,
  Logger,
  LoggerService
} from '@acoustic-content-sdk/api';
import { AccessorType } from '@acoustic-content-sdk/edit-api';
import {
  BiFunction,
  createCache,
  getProperty,
  hashRandomIdentifier,
  hashString,
  hashToIdentifier,
  isNotEmpty,
  isNotNil,
  isString,
  isUndefined,
  longHash,
  mapArray,
  NOOP_LOGGER_SERVICE,
  opDistinctUntilChanged,
  reduceArray,
  rxNext,
  rxPipe,
  UNDEFINED$
} from '@acoustic-content-sdk/utils';
import { createElement, ReactNode } from 'react';
import {
  combineLatest,
  MonoTypeOperatorFunction,
  Observable,
  of,
  queueScheduler,
  SchedulerLike,
  UnaryFunction
} from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { getAttribute, isElement, isHTMLElement } from './../utils/dom';
import { ALL_ATTRIBUTES, STYLE_KEYS, STYLE_MAP } from './jsx';

const WHITESPACE = /^[\s\r\n]*$/;
const UNDEFINED = undefined;

const DATA_CONTENT_ITEM_ID = 'data-content-item-id';
const DATA_WCH_EDITABLE = 'data-wch-editable';

declare type ReactAttr = Record<string, string | Record<string, string>>;

/**
 * Callback function to retrieve the element type from the content item given its ID and the accessor string
 */
export declare type ElementTypeCallback = BiFunction<
  string,
  AccessorType,
  Observable<ELEMENT_TYPE>
>;

interface RenderContext {
  // callback function to resolve a type by an accessor
  elementType: ElementTypeCallback;
  // our scheduler
  scheduler: SchedulerLike;
  // logger
  logger: Logger;
}

function isWhitespaceText(aValue: string): boolean {
  return WHITESPACE.test(aValue);
}

function createReactElement(
  aName: string,
  aProps: ReactAttr,
  aChildren?: ReactNode[]
): ReactNode {
  return isNotEmpty(aChildren)
    ? aChildren.length === 1
      ? createElement(aName, aProps, aChildren[0])
      : createElement(aName, aProps, ...aChildren)
    : createElement(aName, aProps);
}

/** Locate the template root element */
const getTemplateRoot = (aDoc: Document): HTMLTemplateElement =>
  aDoc.createElement('template');

// tags need to be upper case
const NO_WHITESPACE_CHILDREN = new Set<string>([
  'TR',
  'TBODY',
  'COLGROUP',
  'TABLE'
]);

function isTextNode(aNode: Node): aNode is Text {
  return aNode && aNode.nodeType === Node.TEXT_NODE;
}

function isCommentNode(aNode: Node): aNode is Comment {
  return aNode && aNode.nodeType === Node.COMMENT_NODE;
}

function mapAttributeName(aValue: string): string {
  return ALL_ATTRIBUTES[aValue] || aValue;
}

/**
 * Maps from a tag name to the react name. If the target is 'null' instead of undefined,
 * this means that the name is invalid
 */
const ALL_TAGS: Record<string, string> = {};

/**
 * Very basic validation of an HTML element name
 */
const VALID_TAG = /^[A-Z][A-Z0-9]*$/;

/**
 * Constructs and persists the mapping from the node name to the react element name
 *
 * @param aElement - the DOM element
 * @returns the react element name
 */
function createReactElementName(aElement: Element): string {
  // extract the name
  const { nodeName, localName } = aElement;
  // update
  return (ALL_TAGS[nodeName] = VALID_TAG.test(nodeName) ? localName : null);
}

/**
 * Returns the react element name from the node or null if the node is invalid
 *
 * @param aElement - the DOM element
 * @returns the react element name or null
 */
export function getReactElementName(aElement: Element): string {
  const name = ALL_TAGS[aElement.tagName];
  return isUndefined(name) ? createReactElementName(aElement) : name;
}

function addAttribute(
  aDst: Record<string, string>,
  aAttr: Attr
): Record<string, string> {
  const { name, value } = aAttr;
  aDst[mapAttributeName(name)] = value;
  return aDst;
}

/**
 * Executes the style transform
 *
 * @param aElement - the element
 * @returns the transform
 */
function computeAttrToReact(aElement: Element): Record<string, string> {
  return isHTMLElement(aElement) || isSVGElement(aElement)
    ? styleToReact(aElement.style)
    : undefined;
}

const KEY_STYLE = 'style';
const KEY_REF = 'ref';

/**
 * Caches the computation of react styles
 */
const STYLE_TO_REACT_CACHE = createCache<Record<string, string>>();

/**
 * Converts the HTML attributes to a node map
 *
 * @param aAttributes - the attributes
 * @returns the named node map
 */
function attrToReact(aElement: Element): ReactAttr {
  // performance fix for the empty element
  const { attributes } = aElement;
  if (isNotEmpty(attributes)) {
    // the props
    const props: ReactAttr = reduceArray(attributes, addAttribute, {});
    // remove toxic properties
    delete props[KEY_REF];
    // transcode the style property
    const style = props[KEY_STYLE];
    if (isString(style)) {
      // convert to react style
      const reactStyles = STYLE_TO_REACT_CACHE(style, (key) =>
        computeAttrToReact(aElement)
      );
      if (isNotNil(reactStyles)) {
        props[KEY_STYLE] = reactStyles;
      } else {
        // remove empty styles
        delete props[KEY_STYLE];
      }
    }
    // ok
    return props;
  }
  // nothing to return
  return UNDEFINED;
}

export function styleToReact(
  aStyle: CSSStyleDeclaration
): Record<string, string> {
  // flag to tell if the reduction is empty
  let isEmpty = true;
  /** Reduce */
  const result = reduceArray(
    STYLE_KEYS,
    (aStyles: Record<string, string>, aKey: string) => {
      // check if we have the style
      const value = aStyle[aKey];
      if (isString(value) && isNotEmpty(value)) {
        aStyles[STYLE_MAP[aKey]] = value;
        isEmpty = false;
      }
      // done
      return aStyles;
    },
    {}
  );
  // returns the result or nothing
  return isEmpty ? undefined : result;
}

/**
 * Tests if a node is an SVG element
 *
 * @param aNode - the node
 * @returns true if the node is an SVG element
 */
function isSVGElement(aNode: Node): aNode is SVGElement {
  return aNode instanceof SVGElement;
}

const IGNORED_NODES: Set<number> = new Set<number>([
  Node.COMMENT_NODE,
  Node.PROCESSING_INSTRUCTION_NODE,
  Node.ATTRIBUTE_NODE
]);

/**
 * Converts a DOM node to a react node
 */
function nodeToReact(aNode: Node): ReactNode {
  // nodes to ignore
  const { nodeType } = aNode;
  if (IGNORED_NODES.has(nodeType)) {
    return UNDEFINED;
  }
  // check for text
  if (isTextNode(aNode)) {
    // check for the type of the
    const { textContent } = aNode;
    if (
      isWhitespaceText(textContent) &&
      NO_WHITESPACE_CHILDREN.has(aNode.parentNode.nodeName)
    ) {
      return UNDEFINED;
    }
    // returns the full content
    return textContent;
  }
  // handle the element case
  if (isElement(aNode)) {
    // extract the node name
    const reactName = getReactElementName(aNode);
    if (isNotNil(reactName)) {
      // wrap into a react node
      return createReactElement(
        reactName,
        attrToReact(aNode),
        nodesToReact(aNode.childNodes)
      );
    }
  }
  // nothing
  return null;
}

/** Converts a list of nodes to react */
function rxNodeToReactDeep(
  aElement: Element,
  aAttr: ReactAttr,
  aCtx: RenderContext
): Observable<ReactNode> {
  // access the attribute
  const reactName = getReactElementName(aElement);
  if (isNotNil(reactName)) {
    // default, just assemble the children
    const children$ = rxNodesToReact(aElement.childNodes, aCtx);
    // wrap into a react node
    return rxPipe(
      children$,
      map((children) => createReactElement(reactName, aAttr, children))
    );
  }
  // nothing to return
  return UNDEFINED$;
}

/**
 * Expression that locates PZN tokens
 */
const PZN_REGEXP = /(?:%%([^%]+)%%)/gm;

/**
 * Replaces the PZN tokens by a special markup annotation
 *
 * @param aMarkup - the markup string
 * @returns the replaced tokens
 */
function escapePznTokens(aMarkup: string): string {
  return aMarkup.replace(
    PZN_REGEXP,
    '<span class="personalization-token" contenteditable="false">$1</span>'
  );
}

/** Converts a formatted text item to react, by setting the formatted text as inner HTML */
function rxNodeToReactFormatted(
  aElement: Element,
  aAttr: ReactAttr,
  aCtx: RenderContext
): Observable<ReactNode> {
  // extract the node name
  const reactName = getReactElementName(aElement);
  if (isNotNil(reactName)) {
    // scheduler
    const { scheduler } = aCtx;
    const { innerHTML } = aElement;
    const id = getAttribute(aElement, DATA_CONTENT_ITEM_ID);
    const accessor = getAttribute(aElement, DATA_WCH_EDITABLE);
    // use the dangerous flag
    const attr = {
      ...aAttr,
      key: hashToIdentifier(
        hashString(hashString(hashString(longHash(), id), accessor), innerHTML)
      ),
      dangerouslySetInnerHTML: {
        __html: escapePznTokens(aElement.innerHTML)
      }
    };
    // the new object
    return of(createElement(reactName, attr), scheduler);
  }
  // nothing
  return UNDEFINED$;
}

/**
 * Converts a DOM node to a react node
 *
 * @param aNode - the node to convert
 * @param aCtx - the conversion context
 *
 * @returns observable of the react node
 */
function rxNodeToReact(
  aNode: Node,
  aCtx: RenderContext
): Observable<ReactNode> {
  // decompose
  const { scheduler, logger } = aCtx;
  // next logger
  const log: <T>(...v: any[]) => MonoTypeOperatorFunction<T> = rxNext(
    logger,
    'rxNodeToReact'
  );
  // nodes to ignore
  const { nodeType } = aNode;
  if (IGNORED_NODES.has(nodeType)) {
    // nothing to return
    return UNDEFINED$;
  }
  // check for text
  if (isTextNode(aNode)) {
    // check for the type of the
    const { textContent } = aNode;
    return isWhitespaceText(textContent) &&
      NO_WHITESPACE_CHILDREN.has(aNode.parentNode.nodeName)
      ? UNDEFINED$
      : of(textContent, scheduler);
  }
  // handle the element case
  if (isElement(aNode)) {
    // attributes
    const attr = attrToReact(aNode);
    // check if this is an annotated element
    const id = getProperty(attr, DATA_CONTENT_ITEM_ID);
    const accessor = getProperty(attr, DATA_WCH_EDITABLE);
    /**
     * If we have information about the item, decide based on the authoring type
     */
    if (isString(id) && isString(accessor)) {
      // quick sanity check
      if (isNotEmpty(id) && isNotEmpty(accessor)) {
        // access the callbacks to resolve the type
        const { elementType } = aCtx;
        // actual type and context
        const elementType$ = rxPipe(
          elementType(id, accessor),
          opDistinctUntilChanged
        );
        // for formatted text use a special attribute
        return rxPipe(
          elementType$,
          log(id, accessor),
          switchMap((type) =>
            type === ELEMENT_TYPE_FORMATTED_TEXT
              ? rxNodeToReactFormatted(aNode, attr, aCtx)
              : rxNodeToReactDeep(aNode, attr, aCtx)
          )
        );
      }
      // log some warning
      console.warn(
        '\u{1F6A8} The ID',
        id,
        'or accessor',
        accessor,
        'are undefined on the node',
        aNode
      );
    }
    // deep react copy
    return rxNodeToReactDeep(aNode, attr, aCtx);
  }
  // nothing
  return UNDEFINED$;
}

/** Converts a list of nodes to react */
function nodesToReact(aNodes: ArrayLike<Node>): ReactNode[] {
  // performance improvement to ignore empty children
  if (isNotEmpty(aNodes)) {
    // map and filter ignored nodes
    const nodes = mapArray(aNodes, nodeToReact).filter(isNotNil);
    return isNotEmpty(nodes) ? nodes : UNDEFINED;
  }
  // nothing to return
  return UNDEFINED;
}

/**
 * Converts a list of nodes to react.
 *
 * @param aNodes - the DOM nodes to convert
 * @param aCtx - our context object with the callbacks
 *
 * @returns an observable of the react nodes to convert
 */
function rxNodesToReact(
  aNodes: ArrayLike<Node>,
  aCtx: RenderContext
): Observable<ReactNode[]> {
  // performance improvement to ignore empty children
  if (isNotEmpty(aNodes)) {
    // access the scheduler
    const { scheduler } = aCtx;
    // map and filter ignored nodes
    const nodes = mapArray(aNodes, (node) => rxNodeToReact(node, aCtx));
    // assemble
    const nodes$ = combineLatest(nodes, scheduler);
    // wrap
    return rxPipe(
      nodes$,
      // remove ignored children from the list
      map((children) => children.filter(isNotNil)),
      // make sure to map empty arrays to undefined, better for react
      map((children) => (isNotEmpty(children) ? children : UNDEFINED))
    );
  }
  // nothing to return
  return UNDEFINED$;
}

/**
 * Renderer that converts a markup string into a react DOM representation. The react representation
 * might differ dependening on the content types
 *
 * @param aDocument - the target document
 * @returns the conversion function
 */
export function rxCreateReactRenderer(
  elementType: ElementTypeCallback,
  aDoc: Document = document,
  aLoggerService: LoggerService = NOOP_LOGGER_SERVICE,
  scheduler: SchedulerLike = queueScheduler
): UnaryFunction<string, Observable<ReactNode>> {
  // construct a logger
  const logger = aLoggerService.get('rxCreateReactRenderer');
  // render context
  const ctx: RenderContext = {
    elementType,
    scheduler,
    logger
  };
  // some root key
  const key = hashRandomIdentifier();
  const rootProps = { key };
  // export the renderer function
  return (aMarkup: string) => {
    /**
     * We need to hold a root markup element for the lifetime
     * of this observable, because we might have multiple calls
     * in parallel and the node references are needed during the
     * complete lifetime.
     */
    const root = getTemplateRoot(aDoc);
    // update the template markup
    root.innerHTML = aMarkup;
    // get the children
    const children$ = rxNodesToReact(root.content.childNodes, ctx);
    // augment
    return rxPipe(
      children$,
      map((children) => createReactElement('div', rootProps, children))
    );
  };
}
