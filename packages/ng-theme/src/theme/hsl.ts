import { LoggerService } from '@acoustic-content-sdk/api';
import {
  boxLoggerService,
  constGenerator,
  isNil,
  isNotNil,
  Maybe,
  UNDEFINED_TYPE
} from '@acoustic-content-sdk/utils';
import { UnaryFunction } from 'rxjs';

function RGBToHSL(r: number, g: number, b: number): Record<string, number> {
  // Make r, g, and b fractions of 1
  r /= 255;
  g /= 255;
  b /= 255;

  // Find greatest and smallest channel values
  let cmin = Math.min(r, g, b),
    cmax = Math.max(r, g, b),
    delta = cmax - cmin,
    h = 0,
    s = 0,
    l = 0;

  // Calculate hue
  // No difference
  if (delta == 0) h = 0;
  // Red is max
  else if (cmax == r) h = ((g - b) / delta) % 6;
  // Green is max
  else if (cmax == g) h = (b - r) / delta + 2;
  // Blue is max
  else h = (r - g) / delta + 4;

  h = Math.round(h * 60);

  // Make negative hues positive behind 360°
  if (h < 0) h += 360;

  // Calculate lightness
  l = (cmax + cmin) / 2;

  // Calculate saturation
  s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));

  // Multiply l and s by 100
  s = s * 100;
  l = l * 100;

  return { h, s, l };
}

function getDocument(aDocument?: Document): Maybe<Document> {
  return isNotNil(aDocument)
    ? aDocument
    : typeof aDocument !== UNDEFINED_TYPE
    ? document
    : undefined;
}

const DEFAULT_HSL = { h: 0, s: 0, l: 0 };

const LOGGER = 'colorToHSL';

export function colorToHSL(
  aDocument?: Document,
  aLogSvc?: LoggerService
): UnaryFunction<string, Record<string, number>> {
  // the logger
  const logSvc = boxLoggerService(aLogSvc);
  const logger = logSvc.get(LOGGER);
  // check if we have a doc
  const document = getDocument(aDocument);
  if (isNil(document)) {
    // warn
    logger.warn('No document available for color conversion');
    // just a noop
    return constGenerator(DEFAULT_HSL);
  }
  // canvas size, should be odd
  const size = 5;
  const center = Math.floor(size / 2);
  // create the required canvas
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  // returns the conversion function
  return (aValue: string) => {
    ctx.fillStyle = aValue;
    ctx.fillRect(0, 0, size, size);
    // get the pixel from the center
    const {
      data: [r, g, b]
    } = ctx.getImageData(center, center, 1, 1);
    // perform the actual conversion
    const result = RGBToHSL(r, g, b);
    logger.info('Converting', aValue, result);
    // ok
    return result;
  };
}
