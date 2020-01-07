/**
 * Simple logger interface that this library used to print debug logs
 */
export type Logger = (...optionalParams: any[]) => void;

/**
 * Contextual options
 */
export interface Options {
  /**
   * If set to true, print debug logs
   */
  debug?: boolean;
  /**
   * If provided, the logger to be used to print debug logs
   */
  logger?: Logger;
}

/**
 * WCH credentials
 */
export interface Credentials {
  /**
   * The WCH username, typically an email or the string 'apikey'
   */
  username: string;
  /**
   * The WCH password
   */
  password: string;
}

/**
 * Extension of the credentials to also carry the API URL that the credentials apply to
 */
export interface WchToolsOptions extends Credentials {
  /**
   * The WCH AP URL
   */
  baseUrl: string;
}
