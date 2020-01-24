/* Copyright IBM Corp. 2017 */

/**
 * acceptable values for
 */
export type QueryValue = string | number | boolean;

export interface Query {
  [key: string]: QueryValue | QueryValue[];
}
