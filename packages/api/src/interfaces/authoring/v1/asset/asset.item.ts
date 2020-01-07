import { BaseAuthoringItem } from '../base.item';

export interface AuthoringAssetMetadata {
  readonly width?: number;
  readonly heigth?: number;
  readonly camera?: any;
  readonly coverage?;
  readonly creator?: string;
  readonly description?: string;
  readonly publisher?: string;
  readonly rights?: string;
  readonly source?: string;
  readonly subject?: string[];
  readonly title?: string;
  readonly headline?: string;
}

export interface AuthoringAssetProfileRendition {
  readonly profileId: string;
  readonly key: string;
  readonly uri: string;
  readonly width: number;
  readonly height: number;
  readonly transform: any;
}

export interface AuthoringAsset extends BaseAuthoringItem {
  /**
   * The classification defines the document type. For content items, all documents are classified as \"content\".
   */
  readonly classification: 'asset';
  readonly assetType?: string;
  readonly fileName?: string;
  readonly fileSize?: number;
  readonly mediaType?: string;
  readonly resource: string;
  readonly digest?: string;
  readonly metadata?: AuthoringAssetMetadata;
  readonly profileRenditions?: AuthoringAssetProfileRendition[];
  readonly altText?: string;
  readonly path: string;
  readonly isManaged;

  readonly caption?: string;
}
