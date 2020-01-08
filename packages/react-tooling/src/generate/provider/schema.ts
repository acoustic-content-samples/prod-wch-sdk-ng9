export interface GenerateProviderSchema {
  /**
   * Name of the schema
   */
  name: string;
  /**
   * Add support for a redux store
   */
  store?: boolean;
  /**
   * Suffix for the service class, default is 'Service'
   */
  suffix?: string;
}
