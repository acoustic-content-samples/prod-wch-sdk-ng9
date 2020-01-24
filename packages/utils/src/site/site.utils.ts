import {
  DeliveryContentItem,
  RenderingContextV2,
  Site,
  SiteChild,
  SiteContext,
  SitePage
} from '@acoustic-content-sdk/api';
import { BehaviorSubject, Observable, Observer, UnaryFunction } from 'rxjs';

import { composeAll } from '../js/js.core';
import { createSingleSubject } from '../rx/rx.utils';
import {
  anyToString,
  arrayEquals,
  cloneDeep,
  deepEquals,
  lastElement
} from './../js/js.utils';
import { parsePath, pluckPath } from './../path/path';
import { isNil, isNotNil } from './../predicates/predicates';
import { urlSlashes } from './../url/url.utils';
import { UNDEFINED_SITE_CONTEXT } from './sites.constants';

/** Copyright IBM Corp. 2018 */
const _decodeURIComponent = decodeURIComponent;
const _encodeURIComponent = encodeURIComponent;

// access the breadcrumb trail
const _getBreadcrumb = pluckPath(parsePath('$context.breadcrumb'));

/**
 * Extracts the selected page from the rendering context
 *
 * @param aRenderingContextV2 - the context
 * @returns the selected page
 */
const _getPage: UnaryFunction<
  RenderingContextV2,
  DeliveryContentItem
> = composeAll(_getBreadcrumb, lastElement);

/**
 * Tests if two pages are equal
 *
 * @param aLeft - left page
 * @param aRight - right page
 * @returns true if the pages are equal, else false
 */
function _pageEquals(
  aLeft: DeliveryContentItem,
  aRight: DeliveryContentItem
): boolean {
  // test for equal page
  return (
    aLeft === aRight ||
    (isNotNil(aLeft) &&
      isNotNil(aRight) &&
      aLeft.id === aRight.id &&
      aLeft.route === aRight.route &&
      aLeft.decodedRoute === aRight.decodedRoute &&
      aLeft.name === aRight.name &&
      !!aLeft.hideFromNavigation === !!aRight.hideFromNavigation &&
      aLeft.contentId === aRight.contentId &&
      aLeft.parentId === aRight.parentId &&
      deepEquals(aLeft.externalContext, aRight.externalContext))
  );
}

/**
 * Make sure we use a consistent encoding
 *
 * @param aPath - the original, encoded path
 * @returns the encoded path, using our canonical encoding
 */
function _getEncodedPath(aPath: string): string {
  return isNotNil(aPath)
    ? urlSlashes(
        aPath
          .split('/')
          .map(_decodeURIComponent)
          .map(_encodeURIComponent)
          .join('/')
      )
    : aPath;
}

/**
 * Tests if two page arrays are equal
 *
 * @param aLeft - left page
 * @param aRight - right page
 * @returns true if the pages are equal, else false
 */
function _pageArrayEquals(
  aLeft: DeliveryContentItem[],
  aRight: DeliveryContentItem[]
): boolean {
  // test for equal page
  return arrayEquals(aLeft, aRight, _pageEquals);
}

/** Copyright IBM Corp. 2017 */
const LOGGER = 'SiteUtils';

// define our map to subject
interface AsyncMapping<T> {
  [key: string]: BehaviorSubject<T>;
}

// define our map to subject
interface SyncMapping<T> {
  [key: string]: T;
}

/**
 * Constant to represent the unknown ID
 */
const UNKNKOWN_ID: string = undefined;

/**
 * Constant to represent no ID
 */
const NO_ID: string = null;

// change notification callback
type ChangeNotification = () => void;

// keeps the mappings
class InternalSiteInformation {
  // decodes from URL slug to child
  _pathToId: AsyncMapping<string> = {};

  // decodes from page ID to site context
  _idToContext: SyncMapping<SiteContext> = {};

  // site context for non-pages
  _siteContext: SiteContext = cloneDeep(UNDEFINED_SITE_CONTEXT);
}

// helper context to avoid polluting the stack
interface AnalysisContext {
  _site: Site;
  _oldInfo: InternalSiteInformation;
  _newInfo: InternalSiteInformation;
  // the change notifications
  _notifications: ChangeNotification[];
}

/**
 * Tests if two site contexts are equal
 *
 * @param aLeft - left context
 * @param aRight - right context
 * @returns true if the contexts are equal, else false
 */
function _siteContextEquals(aLeft: SiteContext, aRight: SiteContext): boolean {
  // test for equal page
  return deepEquals(aLeft, aRight);
}

function cloneSiteInfo(
  aInfo: InternalSiteInformation
): InternalSiteInformation {
  return {
    _pathToId: { ...aInfo._pathToId },
    _idToContext: { ...aInfo._idToContext },
    _siteContext: aInfo._siteContext
  };
}

/**
 * Registers a key-value pair in form of a subject. If an old subject
 * exists, we simply dispatch the new value and reuse the subject, else
 * we create a new Subject. Any reused mapping is removed from the old
 * mapping record, so the remaining records will be the superflous mappings.
 *
 * @param aKey - the key
 * @param aContext - the context
 * @param aOldMap - the old mapping
 * @param aNewMap - the new mapping
 * @param aNotification - array that will receive the change notifications
 */
function registerAsync<T>(
  aKey: string,
  aContext: T,
  aOldMap: AsyncMapping<T>,
  aNewMap: AsyncMapping<T>,
  aNotifications: ChangeNotification[]
) {
  // check if we know the subject
  let subject = aNewMap[aKey];
  if (subject) {
    // register a notification
    const oldValue = subject.getValue();
    aNotifications.push(() => {
      // only notify if changed
      if (oldValue !== aContext) {
        // update only when changed
        subject.next(aContext);
      }
    });
    // delete it from the map
    delete aOldMap[aKey];
  } else {
    // add a new subject
    subject = new BehaviorSubject<T>(aContext);
    // register the new subject
    aNewMap[aKey] = subject;
  }
}

/**
 * Registers a key-value pair in form of a subject. If an old subject
 * exists, we simply dispatch the new value and reuse the subject, else
 * we create a new subject. Any reused mapping is removed from the old
 * mapping record, so the remaining records will be the superflous mappings.
 *
 * @param aKey - the key
 * @param aContext - the context
 * @param aOldMap - the old mapping
 * @param aNewMap - the new mapping
 */
function registerSync<T>(
  aKey: string,
  aContext: T,
  aOldMap: SyncMapping<T>,
  aNewMap: SyncMapping<T>
) {
  // check if we know the subject
  delete aOldMap[aKey];
  // register the new _Subject
  aNewMap[aKey] = aContext;
}

/** Listing of fields NOT copy from a site page */
const IGNORED_SITE_PAGE_FIELDS = ['children'];

/**
 * Performs a shallow clone of a site page
 *
 * @param aSitePage - the site page
 * @returns the cloned page
 */
function _cloneSitePage(aSitePage: SitePage): SitePage {
  // prepare the data
  const path = _getEncodedPath(aSitePage.route);
  // make a shallow copy
  const sitePage = { ...aSitePage };
  // remove the dedicate
  let idx = IGNORED_SITE_PAGE_FIELDS.length;
  while (--idx >= 0) {
    const name = IGNORED_SITE_PAGE_FIELDS[idx];
    delete sitePage[name];
  }
  // override
  sitePage.route = path;
  sitePage.decodedRoute = _decodeURIComponent(path);
  // ok
  return sitePage as SitePage;
}

function analyzeSite(
  aBreadcrumb: SitePage[],
  aParentPage: SitePage,
  aChildren: SiteChild[],
  aContext: AnalysisContext
): SitePage[] {
  // the constructed children
  const children: SitePage[] = [];
  // iterate over the children
  if (aChildren) {
    // iterate
    let lenChildren = aChildren.length;
    while (lenChildren-- > 0) {
      // register
      const child = aChildren[lenChildren];
      const path = _getEncodedPath(child.route);
      const contentId = child.contentId;
      const pageId = child.id;
      // make a shallow copy
      const sitePage: SitePage = _cloneSitePage(child);
      // breadcrumb for the children
      aBreadcrumb.push(sitePage);
      const currentBreadcrumb = aBreadcrumb.slice();
      const currentChildren = analyzeSite(
        aBreadcrumb,
        sitePage,
        child.children,
        aContext
      );
      aBreadcrumb.pop();
      // the site page
      const currentSiteContext: SiteContext = {
        parent: aParentPage,
        sibling: children,
        children: currentChildren,
        breadcrumb: currentBreadcrumb,
        site: aContext._site
      };
      // add to the result array
      children[lenChildren] = sitePage;
      // register
      registerSync(
        pageId,
        currentSiteContext,
        aContext._oldInfo._idToContext,
        aContext._newInfo._idToContext
      );
      registerSync(
        contentId,
        currentSiteContext,
        aContext._oldInfo._idToContext,
        aContext._newInfo._idToContext
      );
      registerAsync(
        path,
        contentId,
        aContext._oldInfo._pathToId,
        aContext._newInfo._pathToId,
        aContext._notifications
      );
    }
  }
  // ok
  return children;
}

function doMarkUnused<T>(
  aMapping: AsyncMapping<T>,
  aValue: T | null | undefined
) {
  // release these mappings
  // tslint:disable-next-line:forin
  for (const key in aMapping) {
    aMapping[key].next(aValue);
  }
}

function markUnused(aInfo: InternalSiteInformation) {
  // complete
  doMarkUnused(aInfo._pathToId, NO_ID);
}

function doMarkComplete<T>(aMapping: AsyncMapping<T>) {
  // release these mappings
  // tslint:disable-next-line:forin
  for (const key in aMapping) {
    aMapping[key].complete();
  }
}

function markComplete(aInfo: InternalSiteInformation) {
  // complete
  doMarkComplete(aInfo._pathToId);
}

function doDispatchError<T>(aMapping: AsyncMapping<T>, aError: any) {
  // release these mappings
  // tslint:disable-next-line:forin
  for (const key in aMapping) {
    aMapping[key].error(aError);
  }
}

function dispatchError(aInfo: InternalSiteInformation, aError: any) {
  // dispatch
  doDispatchError(aInfo._pathToId, aError);
}

function access<T>(
  aKey: string,
  aDefault: T | null | undefined,
  aMapping: AsyncMapping<T>
): BehaviorSubject<T | null | undefined> {
  // access the subject directly from the mapping
  let subject = aMapping[aKey];
  if (isNil(subject)) {
    // create a new, empty object
    subject = aMapping[aKey] = new BehaviorSubject<T>(aDefault);
  }
  // ok
  return subject;
}

export class SiteInformation {
  /**
   * Flag that indicates if the site has been initialized
   */
  private bInitialized = false;

  /**
   * notifies about changes to the site
   */
  private siteSubject = createSingleSubject<Site>();

  /**
   * The current information about the site
   */
  private siteInfo = new InternalSiteInformation();

  public observer: Observer<Site>;

  constructor() {
    // pointer to the site
    const _this = this;

    _this.observer = {
      next(value: Site) {
        // check for initialization
        _this.bInitialized = isNotNil(value);
        // check if the site has changed
        if (!deepEquals(_this.siteInfo._siteContext.site, value)) {
          // update the generic context
          const frozenSite = value;
          const siteContext = (_this.siteInfo._siteContext = cloneDeep(
            UNDEFINED_SITE_CONTEXT
          ));
          siteContext.site = frozenSite;
          // init the analysis information
          const context: AnalysisContext = {
            _site: frozenSite,
            _oldInfo: cloneSiteInfo(_this.siteInfo),
            _newInfo: _this.siteInfo,
            _notifications: []
          };
          // perform the analysis
          analyzeSite([], undefined, frozenSite.pages, context);
          // notify all
          const notifications = context._notifications;
          let len = context._notifications.length;
          while (len-- > 0) {
            notifications[len]();
          }
          // mark the unused elements
          markUnused(context._oldInfo);
          // update
          _this.siteSubject.next(frozenSite);
        }
      },

      error(err: any) {
        // dispatch the error
        dispatchError(_this.siteInfo, err);
        _this.siteSubject.error(err);
        // done
        _this.clear();
      },

      complete() {
        // complete the site info
        markComplete(_this.siteInfo);
        _this.siteSubject.complete();
        // done
        _this.clear();
      }
    };
  }

  private clear() {
    // done
    delete this.siteInfo;
    // done with the subject
    delete this.siteSubject;
    // done
    this.bInitialized = false;
  }

  /**
   * Returns an observable that communicates the content IDs of items for a particular path. If the mapping
   * changes, the change will be propagated. If the mapping is unknown (because the site has not been loaded, yet)
   * the mapping will be communicated as undefined. If the mapping is known to not exist it will be
   * communicated as null.
   *
   * @param path - the path to listen for
   * @returns an observable of the result
   *
   * See {@link https://github.com/angular/angular/issues/16051}
   */
  getIdByPath(path: string): Observable<string | null | undefined> {
    // compute the default ID
    const defaultID = this.bInitialized ? NO_ID : UNKNKOWN_ID;
    // fix the path
    const key = urlSlashes(path);
    // returns the result
    return access(key, defaultID, this.siteInfo._pathToId);
  }

  /**
   * Returns the site context for an ID
   *
   * @param aID - ID of the content item or the page
   * @returns the site context
   */
  getSiteContextById(aID: string | null): SiteContext {
    // returns the result
    const key = anyToString(aID);
    // update
    return this.siteInfo._idToContext[key] || this.siteInfo._siteContext;
  }

  /**
   * Attaches the modifications on the current site
   */
  get site(): Observable<Site> {
    return this.siteSubject;
  }
}

/**
 * Returns the partial rendering context for a site page
 *
 * @param aPage - the site page
 * @param aSite - the site
 * @returns the context
 */
function _createPartialSiteContextForSitePage(
  aPage: SitePage,
  aSite: Site
): SiteContext {
  // site context is not to be messed with
  return {
    breadcrumb: [aPage],
    sibling: [aPage],
    children: [],
    parent: undefined,
    site: aSite
  };
}

/**
 * Decomposes a search result into a site context structure
 *
 * @param aPage - the page in question
 * @param aSearchResult - the search result
 * @param aSite - the site object
 *
 * @returns the site context
 */
function _createSiteContextFromSearchResult(
  aPage: SitePage,
  aSearchResult: SitePage[],
  aSite: Site
): SiteContext {
  // the context
  const siteContext: SiteContext = {
    breadcrumb: [aPage],
    sibling: [],
    children: [],
    parent: undefined,
    site: aSite
  };
  // ID
  const parentId = aPage.parentId;
  const pageId = aPage.id;
  // augment based on the search results
  const len = aSearchResult.length;
  for (let i = 0; i < len; ++i) {
    // current page to consider
    const currentPage: SitePage = _cloneSitePage(aSearchResult[i]);
    // parent
    if (currentPage.id === parentId) {
      // the parent
      siteContext.parent = currentPage;
      // update the breadcrumb
      siteContext.breadcrumb = [currentPage, aPage];
    } else if (currentPage.parentId === parentId) {
      // sibling
      siteContext.sibling.push(currentPage);
    } else if (currentPage.parentId === pageId) {
      // child
      siteContext.children.push(currentPage);
    }
  }
  // ok
  return siteContext;
}

/**
 * Returns the URI path for the site
 *
 * @returns the path
 */
const _getSiteURL: UnaryFunction<string, string> = (aBaseUrl) =>
  `${aBaseUrl}sites/@current`;

export {
  _getSiteURL as wchGetSiteURL,
  _cloneSitePage as pageCloneSitePage,
  _siteContextEquals as siteContextEquals,
  _createPartialSiteContextForSitePage as pageCreatePartialSiteContextForSitePage,
  _createSiteContextFromSearchResult as pageCreateSiteContextFromSearchResult,
  _getPage as pageFromRenderingContext,
  _pageEquals as pageEquals,
  _pageArrayEquals as pageArrayEquals,
  _getEncodedPath as pageGetEncodedPath
};
