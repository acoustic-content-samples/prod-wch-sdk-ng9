import { BaseAuthoringItem } from '../base.item';

export interface AuthoringLayoutMappingLayout {
  id: string;
  name?: string;
}

export interface AuthoringLayoutMappingType {
  id?: string;
  name?: string;
}

export interface AuthoringLayoutMappingMapping {
  defaultLayout: AuthoringLayoutMappingLayout;
  layoutMode?: string;
  layouts: AuthoringLayoutMappingLayout[];
}

export interface AuthoringLayoutMapping extends BaseAuthoringItem {
  _revisions?: Record<string, string>;
  classification: 'layout-mapping';
  created?: string;
  creatorId?: string;
  id?: string;
  lastModified?: string;
  lastModifierId?: string;
  mappings: AuthoringLayoutMappingMapping[];
  name: string;
  path?: string;
  rev?: string;
  tags?: string[];
  type: AuthoringLayoutMappingType;
}
