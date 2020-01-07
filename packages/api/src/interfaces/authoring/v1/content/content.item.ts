import { BaseAuthoringItem } from '../base.item';
import { AuthoringSelectedLayout } from '../layout/layout';
import { AuthoringThumbnail } from '../types/type';
import { Status, DraftStatus } from '../../../status';

export type AUTHORING_CONTENT_ITEM_KIND =
  | 'page'
  | 'landing-page'
  | 'catalog-page'
  | 'email'
  | 'sample';

export interface AuthoringContentItemThumbnail extends AuthoringThumbnail {
  id: string;
}

export interface AuthoringContentItem extends BaseAuthoringItem {
  id: string;
  projectId?: string;
  classification: 'content';
  typeId: string;
  type?: string;
  thumbnail?: AuthoringContentItemThumbnail;
  locale?: string;
  lastModifierId?: string;
  lastModifier?: string;
  lastModified?: string;
  systemModified?: string;
  linkedDocId?: string;
  tags?: string[];
  keywords?: string[];
  status: Status;
  draftStatus?: DraftStatus;
  selectedLayouts?: AuthoringSelectedLayout[];
  links?: Record<string, any>;
  schema?: Record<string, any>;
  form?: any[];
  elements?: Record<string, any>;
  valid?: boolean;
  review?: Record<string, any>;
  kind?: AUTHORING_CONTENT_ITEM_KIND[];
  publishing?: Record<string, any>;
  deliveryAccess?: 'secured';
  reviewId?: string;
  reviewHistory?: string[];
  projects?: string[];
}
