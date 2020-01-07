import { Layout } from '../../../delivery/v1/layout/layout';

export interface AuthoringLayoutItem extends Layout {
  id: string;
  classification: 'layout';
  name: string;
  path?: string;
  prerender?: boolean;
  urlTemplate?: string;
}

export interface AuthoringLayout {
  id: string;
  classification: 'layout';
  name?: string;
  path?: string;
}

export interface AuthoringSelectedLayout {
  layoutMode?: string;
  layout: AuthoringLayout;
}
