/* Copyright IBM Corp. 2018 */
/**
 * The edit API defines interfaces for consumers and providers of inline edit functionality.
 *
 * @packageDocumentation
 */

export * from './dnd/dnd';
export {
  AccessorType,
  WchInlineEditService
} from './interfaces/inline.edit.service';
export {
  ACOUSTIC_ACTIVE_PAGE_MODULE,
  ACOUSTIC_CONFIG_MODULE,
  ACOUSTIC_HTTP_MODULE,
  ACOUSTIC_INFO_MODULE,
  ACOUSTIC_LOGGER_MODULE
} from './modules/modules';
export {
  WchInlineEditRequire,
  WchInlineEditRequireMap
} from './modules/require';
export { WchConfig } from './modules/wch.config';
export { Disposable } from './provider/disposable';
export { WchEditableEvent } from './provider/editable.event';
export * from './provider/inline.edit.event';
export {
  EventTargetLike,
  WchInlineEditProvider,
  WchInlineEditRegistration,
  WchInlineEditRegistrationResult
} from './provider/inline.edit.provider';
export * from './selection/attr';
export * from './services/inline.edit.provider';
export { WchInlineEditServiceV2 } from './v2/interfaces/inline.edit.service';
export {
  WchInlineEditRequireMapV2,
  WchInlineEditRequireV2
} from './v2/modules/require';
export {
  WchInlineEditProviderV2,
  WchInlineEditRegistrationV2
} from './v2/provider/inline.edit.provider';
export * from './v2/provider/provider.id';
export { VERSION } from './version';
