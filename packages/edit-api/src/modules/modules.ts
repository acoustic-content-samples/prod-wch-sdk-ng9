/* Copyright IBM Corp. 2018 */

/**
 * Token used to access the http service
 *
 * @see PromiseLike<HttpService>
 */
export const ACOUSTIC_HTTP_MODULE = 'wch-http';

/**
 * @deprecated use {@link ACOUSTIC_HTTP_MODULE} instead
 */
export const WCH_HTTP_MODULE = ACOUSTIC_HTTP_MODULE;

/**
 * Token used to require the active page service
 *
 * @see PromiseLike<ActivePage>
 */
export const ACOUSTIC_ACTIVE_PAGE_MODULE = 'wch-active-page';

/**
 * @deprecated use {@link ACOUSTIC_ACTIVE_PAGE_MODULE} instead
 */
export const WCH_ACTIVE_PAGE_MODULE = ACOUSTIC_ACTIVE_PAGE_MODULE;

/**
 * Token used to require the [[LoggerService]]
 *
 * @see PromiseLike<LoggerService>
 */
export const ACOUSTIC_LOGGER_MODULE = 'wch-logger';

/**
 * @deprecated use {@link ACOUSTIC_LOGGER_MODULE} instead
 */
export const WCH_LOGGER_MODULE = ACOUSTIC_LOGGER_MODULE;

/**
 * Token used to require the [[WchInfo]] service
 *
 * @see PromiseLike<UrlConfig>
 */
export const ACOUSTIC_INFO_MODULE = 'wch-info';

/**
 * @deprecated use {@link ACOUSTIC_INFO_MODULE} instead
 */
export const WCH_INFO_MODULE = ACOUSTIC_INFO_MODULE;

/**
 * Token used to require the [[WchConfig]] service
 *
 * @see PromiseLike<WchConfig>
 */
export const ACOUSTIC_CONFIG_MODULE = 'wch-config';

/**
 * @deprecated use {@link ACOUSTIC_CONFIG_MODULE} instead
 */
export const WCH_CONFIG_MODULE = ACOUSTIC_CONFIG_MODULE;
