import { AuthoringContentItem } from "@acoustic-content-sdk/api";
import { hashRandomIdentifier } from "@acoustic-content-sdk/utils";
import { UnaryFunction } from "rxjs";

// defines the state of the delivery content items
export type AuthoringContentTemplateState = Record<
  string,
  AuthoringContentItem
>;

export type PrefixedId = string;

/**
 * Some arbitrary prefix
 */
const PREFIX = hashRandomIdentifier();

const PREFIX_IDX = PREFIX.length + 1;

/**
 * Adds a prefix to the ID
 *
 * @param id - the ID
 * @returns the ID without prefix
 */
export const addPrefix: UnaryFunction<string, PrefixedId> = id =>
  `${PREFIX}:${id}`;

/**
 * Removes the prefix from the ID
 *
 * @param id  - the ID
 * @returns the ID without prefix
 */
export const removePrefix: UnaryFunction<PrefixedId, string> = id =>
  id.substr(PREFIX_IDX);
