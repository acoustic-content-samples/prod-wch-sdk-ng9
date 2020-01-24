import { RenderingContext } from './../rendering/context/rendering.context';
import { SitePage } from './../site/site.page';

/** Copyright IBM Corp. 2017 */
export interface SearchResult<T> {
  document: T;
}

export interface RenderingContextSearchResult extends SearchResult<RenderingContext> {
  document: RenderingContext;
}

export interface PageSearchResult extends SearchResult<SitePage> {
  document: SitePage;
}

export interface SearchResults<T> {
  numFound: number;
  documents?: T[];
}

export interface RenderingContextQueryResult {

  numFound: number;

  renderingContexts: RenderingContext[];
}

export interface SitePagesQueryResult {

  numFound: number;

  sitePages: SitePage[];
}
