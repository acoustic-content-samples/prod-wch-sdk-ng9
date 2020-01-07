export const CSS_STYLE = 'css';
export const SCSS_STYLE = 'scss';

export function getStyleExtension(aValue: string): string {
  return aValue === CSS_STYLE ? '.css' : '.scss';
}
