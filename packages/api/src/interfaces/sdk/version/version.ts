/* Copyright IBM Corp. 2018 */

/**
 * Defines the version number and the build date of the SDK.
*/
export interface WchSdkVersion {
    // version number of the SDK
    readonly version:  {readonly major: string,  readonly minor: string, readonly patch: string};
    // build data of the SDK
    readonly build: Date;
}
