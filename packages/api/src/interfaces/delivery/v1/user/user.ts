/** Copyright IBM Corp. 2018 */

/**
 * Representation of a user
 */
export interface User {
  /**
   * The unique internal identifier of the user
   */
  id: string;

  /**
   * The unique external identifier of the user (e.g. BlueID). Although, this field can store email addresses, other types of unique identifiers may be stored too. Do not use this field as a replacement for the user attribute email address.
   */
  externalId: string;

  /**
   * The first name of the user
   */
  firstName?: string;

  /**
   * The last name of the user
   */
  lastName?: string;

  /**
   * The name of the user that can be displayed in the UI
   */
  displayName?: string;

  /**
   * The roles of the user that will be used for access control (empty for the anonymous user)
   */
  roles: string[];

  /**
   * Date when this user logged in for the last time before current session
   */
  lastLogin?: string;

  /**
   * Date when this item was created
   */
  created?: string;

  creator?: string;

  /**
   * Date when this item was modified for the last time
   */
  lastModified?: string;

  lastModifier?: string;
}
