export interface FontVariant {
  id: string;
  eot: string;
  fontFamily: string;
  fontStyle: string;
  fontWeight: string;
  woff: string;
  local: string[];
  ttf: string;
  svg: string;
  woff2: string;
}

export interface FontDetails {
  id: string;
  family: string;
  variants: FontVariant[];
  category: string;
  version: string;
  subsets: string[];
}
