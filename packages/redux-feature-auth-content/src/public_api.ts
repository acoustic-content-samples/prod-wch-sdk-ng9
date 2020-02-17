/**
 * Implementation of a redux feature to manage authoring content.
 *
 * @packageDocumentation
 */

export * from './state/auth-content/index';
export { migrateContentItems } from './utils/auth.content.migrate';
export { isAuthoringContentItem } from './utils/auth.content.utils';
export * from './version';
