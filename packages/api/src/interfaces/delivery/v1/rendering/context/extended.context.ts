/* Copyright IBM Corp. 2018 */
import { SiteContext } from './../../site/site.context';
import { HubContext } from './hub.context';

export interface ExtendedContext extends SiteContext {
  readonly hub?: HubContext;
}
