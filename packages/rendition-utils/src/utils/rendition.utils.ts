/** Copyright IBM Corp. 2017 */
import { Image, Logger, Rendition } from '@acoustic-content-sdk/api';
import { cmpNumbers, getProperty, isNotEmpty, isNotNil, isPlainObject, objectKeys } from '@acoustic-content-sdk/utils';

const LOGGER = 'RenditionDirective';

const DEFAULT_RENDITION = 'default';

/**
 * Exposes the concept of a dimension
 */
export interface Dimension {
  w: number;
  h: number;
}

/**
 * Constructs a dimensions object based on width and height
 *
 * @param aWidth -    the width
 * @param aHeight -   the height
 *
 * @returns the dimension object
 */
export function createDimension(aWidth: number, aHeight: number): Dimension {
  return {
    w: aWidth,
    h: aHeight
  };
}

// helper bean representing the scaled image
export interface ScaledImage {
  image: Image;
  img: Dimension;
  container: Dimension;
  url: string;
}

interface RenditionBean {
  image: Image;
  rendition: Rendition;
  aspect: number;
  width: number;
  height: number;
  diff: number;
}

// some functions
const _mathFloor = Math.floor;
const _mathRound = Math.round;

/**
 * Appends a query string to a base URL that may or may not have a query part. If it has a query, the previous query is removed
 *
 * @param aBaseUrl - current base URL
 * @param aQueryString - string to append
 *
 * @returns the resulting URL
 */
function _appendQueryString(aBaseUrl: string, aQueryString: string): string {
  // locate an existing part
  const idx = aBaseUrl.indexOf('?');
  const baseURL = idx >= 0 ? aBaseUrl.substr(0, idx) : aBaseUrl;
  // append
  return `${baseURL}?${aQueryString}`;
}

/**
 * Approximate a floating number to a fixed number of decimals
 *
 * @param aNumber -   number to approximate
 * @returns the approximated number
 */
function _approx(aNumber: number): number {
  return _mathRound(aNumber * 100) / 100;
}

/**
 * Constructs the rendition bean based on the actual rendition
 *
 * @param aTargetAspect -     desired target aspect
 * @param aRendition -        the rendition
 *
 * @returns the bean
 */
function _createRenditionBean(
  aTargetAspect: number,
  aRendition: Rendition,
  aImage: Image
): RenditionBean {
  // some hack, because the type is incorrect
  const w: number = aRendition.width;
  const h: number = aRendition.height;
  // protect against missing dimensions
  if (w > 0 && h > 0) {
    // use an approximated aspect to make the selection algorithm somewhat lenient
    const aspect: number = _approx(w / h);
    // returns the bean
    return {
      image: aImage,
      rendition: aRendition,
      aspect,
      width: w,
      height: h,
      diff: Math.abs(aTargetAspect - aspect)
    };
  }
  // nothing to return
  return undefined;
}

/**
 * Executes a binary search for an element
 *
 * @param aSearchElement -    element to look for
 * @param aArray -    array to search
 * @param aCmp -  comparision function
 *
 * @returns the index
 */
function _binaryIndexOf<T, K>(
  aSearchElement: K,
  aArray: T[],
  aCmp: (aLeft: K, aRight: T) => number
): number {
  let minIndex = 0;
  let maxIndex = aArray.length - 1;

  while (minIndex <= maxIndex) {
    const currentIndex = _mathFloor((minIndex + maxIndex) / 2);
    const currentElement = aArray[currentIndex];
    const cmp = aCmp(aSearchElement, currentElement);

    if (cmp > 0) {
      minIndex = currentIndex + 1;
    } else if (cmp < 0) {
      maxIndex = currentIndex - 1;
    } else {
      return currentIndex;
    }
  }

  return -maxIndex - 1;
}

/**
 * Compares renditions by aspect
 *
 * @param aLeft -   left value to compare
 * @param aRight -   right value to compare
 * @returns comparison result
 */
function _compareByAspect(aLeft: RenditionBean, aRight: RenditionBean): number {
  return cmpNumbers(aLeft.diff, aRight.diff);
}

/**
 * Compares renditions by width
 *
 * @param aLeft -   left value to compare
 * @param aRight -   right value to compare
 * @returns comparison result
 */
function _compareByWidth(
  aLeft: Rendition | RenditionBean,
  aRight: Rendition | RenditionBean
): number {
  return cmpNumbers(aLeft.width, aRight.width);
}

/**
 * Compares renditions by width
 *
 * @param aLeft -   left value to compare
 * @param aRight -   right value to compare
 *
 * @returns comparison result
 */
function _compareByWidthAndHeight(
  aLeft: Rendition | RenditionBean,
  aRight: Rendition | RenditionBean
): number {
  const c = cmpNumbers(aLeft.width, aRight.width);
  return c === 0 ? cmpNumbers(aLeft.height, aRight.height) : c;
}

/**
 * Tests if the width of two renditions is equal
 *
 * @param aLeft -     left rendition
 * @param aRight -    right rendition
 * @returns true if equal
 */
function _equalsWidth(
  aLeft: Rendition | RenditionBean,
  aRight: Rendition | RenditionBean
): boolean {
  return aLeft.width === aRight.width;
}

/**
 * Compares renditions by width
 *
 * @param aLeft -   left value to compare
 * @param aRight -   right value to compare
 * @returns comparison result
 */
function _findByWidth(
  aLeft: number,
  aRight: Rendition | RenditionBean
): number {
  return cmpNumbers(aLeft, aRight.width);
}

/**
 * Returns a list of renditions with the best matching aspect ratio
 *
 * @param aRenditions -  the renditions
 * @param aLogger - the logger
 * @returns the renditions with the best matching aspect ratio
 */
function _findBestAspects(
  aRenditions: RenditionBean[],
  aLogger: Logger
): RenditionBean[] {
  // protect against an empty array
  if (isNotEmpty(aRenditions)) {
    // sort by aspect
    const r = aRenditions.sort(_compareByAspect);
    // log this
    aLogger.info(LOGGER, '_findBestAspects', r);
    // use only the lowest aspects
    const smallest = r[0].diff;
    return r.filter((rendition) => rendition.diff === smallest);
  }
  // noting to select
  return aRenditions;
}

/**
 * Find the rendition with the best width, i.e. the closest width that is larger than the given width
 *
 * @param aWidth -        desired width
 * @param aRenditions -   renditions
 * @param aLogger -       the logger
 *
 * @returns the selected rendition
 */
function _findBestWidth(
  aWidth: number,
  aRenditions: RenditionBean[],
  aLogger: Logger
): RenditionBean | undefined {
  // protect against an empty array
  if (aRenditions && aRenditions.length > 0) {
    // order by width
    const r = aRenditions.sort(_compareByWidth);
    // locate the index
    let idx = _binaryIndexOf(aWidth, r, _findByWidth);
    if (idx < 0) {
      // find the next best match
      idx = -idx - 1;
      if (idx === r.length) {
        idx--;
      }
    }
    // log this
    aLogger.info(LOGGER, '_findBestWidth', idx, r);
    // returns the matching object
    return r[idx];
  }
  // nothing to select
  return undefined;
}

/**
 * Regular expression to detect the renditions settings. Make sure to not use the 'g' flag!
 */
const RENDITION_REGEXP = /resize=(\d+)(?:px)?:(\d+)(?:px)?&crop=(\d+)(?:px)?:(\d+)(?:px)?;(\d+)(?:px)?,(\d+)(?:px)?/;

/**
 * Checks if the URL has a query string and decodes it if so.
 *
 * @param aUrl -  the URL
 * @returns the decoded query string or undefined
 */
function getDecodedQueryString(aUrl: string): string | undefined {
  // find the '?'
  const idx = aUrl.indexOf('?');
  if (idx >= 0) {
    // extract
    return decodeURIComponent(aUrl.substr(idx + 1));
  }
  // no query
  return undefined;
}

/**
 * Parses a string into a number
 *
 * @param aValue -  the value to parse
 * @returns the decoded string
 */
function _parseNumber(aValue: string): number {
  return Number.parseFloat(aValue);
}

/**
 * Rounding function
 *
 * @param aValue -  the value to round
 * @returns the rounded value
 */
function _round(aValue: number): number {
  return _mathRound(aValue);
}

/**
 * Clips a value against the given boundaries
 *
 * @param aValue -  the value to clip
 * @param aMin -    the min value
 * @param aMax -  the max value
 * @returns the clipped value
 */
function _clip(aValue: number, aMin: number, aMax: number): number {
  return aValue < aMin ? aMin : aValue > aMax ? aMax : aValue;
}

/**
 * Builds a query string for the Akamai rendition service such that the resulting image matches the desired
 * dimensions. The algorithm first finds the renditions with the best matching aspect ratio. Out of the result
 * set it then selects the nearest rendition that is large or equal in size, because that most likely represents the desired
 * excerpt best. It then fixes the aspect ration and computes the new transform.
 *
 * In case the image would be scaled up, we return the identity scaling and let the browser scale the image.
 *
 * @param aDstWidth -   desired image width
 * @param aDstHeight -  desired image height
 * @param aBean -   the rendition bean
 * @param aLogger - the logger
 *
 * @returns the URL string
 */
export function getScaledImageFromRenditionBean(
  aDstWidth: number,
  aDstHeight: number,
  aBean: RenditionBean,
  aLogger: Logger
): ScaledImage {
  // the bean
  const rendition = aBean;
  const image = aBean.image;
  // base URL, we will add the Akamai transform to this URL
  let baseURL = image.url;
  // dimensions relative to the original image
  const asset: any = image.asset;
  const imgWidth = asset.width,
    imgHeight = asset.height;
  let origWidth = imgWidth,
    origHeight = imgHeight,
    origX = 0,
    origY = 0;
  // check if we have a rendition
  if (rendition) {
    // check if we have a query string and if that string contains the desired coordinates
    const renditionUrl = rendition.rendition.url;
    const query = getDecodedQueryString(renditionUrl);
    if (query) {
      aLogger.info(LOGGER, query);
      // test if the query matches our pattern
      const m = RENDITION_REGEXP.exec(query);
      if (m) {
        aLogger.info(LOGGER, m, imgWidth, imgHeight);
        // convert to numbers and extract
        const [
          total,
          scaleWidth,
          scaleHeight,
          cropWidth,
          cropHeight,
          cropX,
          cropY
        ] = m.map(_parseNumber);
        // compute the dimensions relative to the original image
        origWidth = (cropWidth * imgWidth) / scaleWidth;
        origHeight = (cropHeight * imgHeight) / scaleHeight;
        origX = (cropX * imgWidth) / scaleWidth;
        origY = (cropY * imgHeight) / scaleHeight;
        // base URL is now the rendition URL
        baseURL = renditionUrl;
      } else {
        // rendition not in a supported format
        aLogger.warn(LOGGER, 'Rendition query not supported.', query);
      }
    } else {
      // no way to tell the sector that the rendition cuts out
      aLogger.warn(
        LOGGER,
        'Rendition URL does not contain a query.',
        renditionUrl
      );
    }
  } else {
    // no rendition available
    aLogger.warn(LOGGER, 'No rendition available.', image);
  }
  // some info on the dimensions
  aLogger.info(LOGGER, 'orig', origWidth, origHeight, origX, origY);
  // adjust the aspect
  let newWidth, newHeight;
  if (aDstWidth * origHeight > aDstHeight * origWidth) {
    newWidth = origWidth;
    newHeight = (aDstHeight * newWidth) / aDstWidth;
  } else {
    newHeight = origHeight;
    newWidth = (aDstWidth * newHeight) / aDstHeight;
  }
  // adjust
  const newX = origX + (origWidth - newWidth) / 2;
  const newY = origY + (origHeight - newHeight) / 2;
  /** Now we have the coordinates in the original coordinate system with the desired aspect.
   * Convert into scaled coordinates.
   */
  aLogger.info(LOGGER, 'new', newWidth, newHeight, newX, newY);
  // the new coordinates
  let scaleX, scaleY, dX, dY, dW, dH;
  if (aDstWidth >= newWidth) {
    // identity scale
    scaleX = imgWidth;
    scaleY = imgHeight;
    dX = newX;
    dY = newY;
    // size of the rectangle
    dW = newWidth;
    dH = newHeight;
  } else {
    // scale down
    scaleX = (imgWidth * aDstWidth) / newWidth;
    scaleY = (imgHeight * aDstHeight) / newHeight;
    dX = (aDstWidth * newX) / newWidth;
    dY = (aDstHeight * newY) / newHeight;
    dW = aDstWidth;
    dH = aDstHeight;
  }
  aLogger.info(LOGGER, 'scale', scaleX, scaleY, dX, dY);
  // generate the query
  const resultQuery = `resize=${_round(scaleX)}px:${_round(
    scaleY
  )}px&crop=${_round(dW)}:${_round(dH)};${_round(dX)},${_round(dY)}`;
  // append the query to the base URL
  const resultUrl = _appendQueryString(baseURL, resultQuery);
  aLogger.info(LOGGER, 'result', resultUrl);
  // done
  return {
    image,
    img: createDimension(dW, dH),
    container: createDimension(aDstWidth, aDstHeight),
    url: resultUrl
  };
}

/**
 * Returns the scaled image given the rendition name explicitly
 *
 * @param aRenditionName - the name of the rendition
 * @param aImage - the image
 * @param aLogger - the actual logger
 *
 * @returns the scaled image
 */
export function getScaledImageFromRendition(
  aRenditionName: string,
  aImage: Image,
  aLogger: Logger
): ScaledImage {
  // try to access the rendition
  const renditions = aImage.renditions;
  const rendition = renditions[aRenditionName] || renditions[DEFAULT_RENDITION];
  // target ration
  const w = rendition.width;
  const h = rendition.height;
  const aspect = w / h;
  // dispatch
  return getScaledImageFromRenditionBean(
    w,
    h,
    _createRenditionBean(aspect, rendition, aImage),
    aLogger
  );
}

/**
 * Builds a query string for the Akamai rendition service such that the resulting image matches the desired
 * dimensions. The algorithm first finds the renditions with the best matching aspect ratio. Out of the result
 * set it then selects the nearest rendition that is large or equal in size, because that most likely represents the desired
 * excerpt best. It then fixes the aspect ration and computes the new transform.
 *
 * In case the image would be scaled up, we return the identity scaling and let the browser scale the image.
 *
 * @param aDstWidth -   desired image width
 * @param aDstHeight -  desired image height
 * @param aImage -  the image
 * @param aLogger - the logger
 *
 * @returns the URL string
 */
export function getRendition(
  aDstWidth: number,
  aDstHeight: number,
  aImage: Image,
  aLogger: Logger
): ScaledImage {
  // sanity check
  if (aDstWidth > 0 && aDstHeight > 0 && aImage && isPlainObject(aImage.renditions)) {
    // desired aspect
    const aspect = aDstWidth / aDstHeight;
    aLogger.info(LOGGER, 'targetAspect', aspect, aDstWidth, aDstHeight);
    // find the best matching rendition
    const renditions = aImage.renditions;
    const rendition = _findBestWidth(
      aDstWidth,
      _findBestAspects(
        objectKeys(renditions)
          .map((key) => renditions[key])
          .map((r) => _createRenditionBean(aspect, r, aImage))
          .filter(isNotNil),
        aLogger
      ),
      aLogger
    );
    // dispatch
    return getScaledImageFromRenditionBean(
      aDstWidth,
      aDstHeight,
      rendition,
      aLogger
    );
  }
  // dimensions relative to the original image
  const asset = aImage.asset;
  // fallback
  return {
    image: aImage,
    img: createDimension(
      getProperty(asset, 'width', 0),
      getProperty(asset, 'height', 0)
    ),
    container: createDimension(aDstWidth, aDstHeight),
    url: getProperty(aImage, 'url')
  };
}

/**
 * Computes the source set from the available renditions
 *
 * @param aImage -    the image
 * @param aOrigin -   the origin
 *
 * @returns the source set
 */
export function getSourceSet(aImage: Image, aOrigin: string): string {
  // order the renditions by width
  const renditions = aImage.renditions;
  const r = objectKeys(renditions)
    .map((key) => renditions[key])
    .sort(_compareByWidthAndHeight);
  // delete renditions with duplicate sizes
  let idx = r.length - 1;
  let next = r[idx--];
  while (idx > 0) {
    // current
    const current = r[idx];
    if (_equalsWidth(current, next)) {
      // remove current
      r.splice(idx, 1);
    } else {
      next = current;
    }
    idx--;
  }
  // produce a source set
  return r.map((rd) => `${aOrigin}${rd.url} ${rd.width}w`).join(', ');
}

export { getRendition as getScaledImageFromSize };
