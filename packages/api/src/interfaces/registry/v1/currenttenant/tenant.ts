export enum TENANT_TIER {
  TRIAL = 'Trial',
  BASE = 'Base',
  STANDARD = 'Standard',
  PLUS = 'Plus'
}

export interface AssetPublishApproval {
  // True if mandatory approval is enabled
  enabled?: boolean;
  exemptAssetTypes: string[];
}

export interface ContentPublishApproval {
  // True if mandatory approval is enabled
  enabled?: boolean;
  exemptContentTypes: string[];
}

export interface DeliveryAccess {
  secureAlways?: boolean;
  content?: string;
  assets?: string;
}

export interface IbmCommerce {
  tenantId?: string;
  apiGatewayHost?: string;
  previewSearchHost?: string;
  previewTransactionHost?: string;
  liveSearchHost?: string;
  liveTransactionHost?: string;
  environmentType?: string;
}

export interface Tenant {
  name?: string;
  // read-only - UUID of the domain
  id?: string;
  /* DEPRECATED - read-only - UUID of the domain.  Use 'id' instead of _id
   *
   * @deprectated
   */
  _id: string;
  // The locale the UI is shown in
  locale?: string;
  // The default locale for content
  defaultContentLocale?: string;
  // set to true if the tenant is 'locked' and should not have access to the system
  locked?: boolean;
  watsonConfidenceLevel?: number;
  // Max upload size - should apply to files/images/audio/video unless useSingleUploadSize is false in which case the individual max uploads apply
  maxUploadSize?: number;
  maxBulkUploadSize?: number;
  // Use the maxUploadSize to cover all uploads or use the individual max upload sizes
  useSingleUploadSize?: boolean;
  // Max upload size for files (if useSingleUploadSize is false)
  maxUploadSizeFiles?: number;
  // Max upload size for images (if useSingleUploadSize is false)
  maxUploadSizeImage?: number;
  // Max upload size for videos (if useSingleUploadSize is false)
  maxUploadSizeVideo?: number;
  maxAuthors?: number;
  // Max content items the tenant can have based on plan purchased
  maxContentItems?: number;
  // Max amount of storage the tenant has, based on plan purchased
  maxStorageSize?: number;
  // Max amount of data transfer the tenant has per month, based on plan purchased
  maxDataTransfer?: number;
  isDAMEnabled?: boolean;
  // Which tier of the product the tenant has purchased, set by sbs-provisioning to one of these values; Trial, Base, Standard, Plus
  tier?: TENANT_TIER;
  ibmUniqueId?: string;
  isEdgeSideEnabled?: boolean;
  // Max number of User sessions
  maxUserSessions?: number;
  // indicates the capabilities supported by a tenant
  capability?: string;
  corsWhitelist?: string[];
  mandatoryAssetPublishApproval?: AssetPublishApproval;
  mandatoryContentPublishApproval?: ContentPublishApproval;
  deliveryAccess?: DeliveryAccess;
  ibmCommerce?: IbmCommerce;
}
