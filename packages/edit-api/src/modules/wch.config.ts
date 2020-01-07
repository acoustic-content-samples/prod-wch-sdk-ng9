/**
 * Exposes server side configuration for the current tenant
 */
export interface WchConfig {
  /** API URL for the non-preview host */
  readonly apiUrl: URL;

  /** URL of the authoring host */
  readonly authoringUIBaseUrl: URL;

  /** delivery URL for the non-preview host */
  readonly deliveryUrl: URL;

  /** API URL for the preview host */
  readonly previewApiUrl: URL;

  /** delivery URL for the preview host */
  readonly previewDeliveryUrl: URL;
}
