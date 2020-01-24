/* Copyright IBM Corp. 2017 */
/**
 * Exposes information required to access the content hub REST API. This
 * information can be obtained via the 'Watson Content Hub information' section.
 */
export interface HubInfo {
  /**
   * URL to access the API layer, e.g. 'https://my.digitalexperience.ibm.com/api/345563cf-a83c-40e5-a065-1d6ff36b05c1'
   *
   * Naming of this field according to the field in the rendering context
   */
  readonly apiUrl: URL | string;

  /**
   * URL to access the delivery , e.g. 'https://my.digitalexperience.ibm.com/345563cf-a83c-40e5-a065-1d6ff36b05c1'
   *
   * Naming of this field according to the field in the rendering context
   */
  readonly resourceUrl: URL | string;
}
