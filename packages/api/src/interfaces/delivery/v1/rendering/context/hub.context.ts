/* Copyright Acoustic 2021 */

export interface HubContext {

    /**
     * URL to access the API layer, e.g. 'https://content-us-1.content-cms.com/api/345563cf-a83c-40e5-a065-1d6ff36b05c1'
     *
     * Naming of this field according to the field in the rendering context
     */
    readonly apiUrl: URL;

    /**
     * URL to access the delivery , e.g. 'https://content-us-1.content-cms.com/345563cf-a83c-40e5-a065-1d6ff36b05c1'
     *
     * Naming of this field according to the field in the rendering context
     */
    readonly resourceUrl: URL;

    /**
     * Flag that indicates if the system is in preview mode.
     */
    readonly isPreviewMode?: boolean;
}
