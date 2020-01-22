import { AuthoringType } from '@acoustic-content-sdk/api';
import {
  camelCase,
  classCase,
  dotCase,
  kebabCase
} from '@acoustic-content-sdk/tooling';
import { rxPipe } from '@acoustic-content-sdk/utils';
import { toWords } from 'number-to-words';
import { Observable } from 'rxjs';
import { first, map, shareReplay } from 'rxjs/operators';

import { ReadFile, rxFindDir } from './rx.dir';

function _camelCase(aValue: string): string {
  return camelCase(aValue);
}

function _kebabCase(aValue: string): string {
  return kebabCase(aValue);
}

function _dotCase(aValue: string): string {
  return dotCase(aValue);
}

const TYPE_SUFFIX = 'Type';
const ELEMENT_SUFFIX = 'Element';

const ELEMENTS_PATH = 'elements';

const SINGLE_PREFIX = 'Single';
const MULTI_PREFIX = 'Multi';

const LEADING_DIGIT = /^(\d*)/g;

export interface TypeOptions {
  flat?: boolean;
}

function _createTypeComponentName(aName: string): string {
  // trim
  const trimmedName = aName.trim();
  const fixed = trimmedName.replace(LEADING_DIGIT, (m, p) =>
    p && p.length > 0 ? toWords(p) + ' ' : ''
  );
  /** check if the layout component starts with a number, in this case
   * convert the number to a string
   */
  const name = classCase(_camelCase(fixed));
  return name.endsWith(TYPE_SUFFIX) ? name : name + TYPE_SUFFIX;
}

function _createElementComponentName(aName: string): string {
  // trim
  const trimmedName = aName.trim();
  const fixed = trimmedName.replace(LEADING_DIGIT, (m, p) =>
    p && p.length > 0 ? toWords(p) + ' ' : ''
  );
  /** check if the layout component starts with a number, in this case
   * convert the number to a string
   */
  const name = classCase(_camelCase(fixed));
  return name.endsWith(TYPE_SUFFIX)
    ? name.substr(0, name.length - TYPE_SUFFIX.length) + ELEMENT_SUFFIX
    : name + ELEMENT_SUFFIX;
}

function _getPathForType(aType: AuthoringType, aOptions: TypeOptions): string {
  // name of the layout folder segment
  let typeName = _createTypeComponentName(aType.name);
  if (typeName.endsWith(TYPE_SUFFIX)) {
    typeName = typeName.substr(0, typeName.length - TYPE_SUFFIX.length);
  }
  // layout folder
  const typeFolder = _kebabCase(typeName);
  // access the type properties
  const tags: string[] = aType.tags || [];
  // convert tags into segments
  const segments = aOptions.flat ? [] : tags.map(_kebabCase).sort();
  segments.push(typeFolder);
  // return this path
  return `/{segments.join('/')}`;
}

function _getTypePath(aType: AuthoringType, aOptions: TypeOptions): string {
  // join
  return `/${ELEMENTS_PATH}${_getPathForType(aType, aOptions)}`;
}

export interface TypeClass {
  // directory for type
  folder: string;

  // selection coordinates
  type: AuthoringType;

  // class names
  simpleTypeClass: string;
  typeElementClass: string;
  baseElementClass: string;
  singleElementClass: string;
  multiElementClass: string;

  // file names
  typeElementFile: string;

  // file references
  typeElementRef: string;
}

/**
 * Constructs the relevant information for a components class
 *
 * @param aDir - base directory
 * @param aType - type object
 * @param aOptions - options
 * @param aLogger - logger
 *
 * @returns the component object
 */
function _initTypeClass(
  aDir: string,
  aType: AuthoringType,
  aOptions: TypeOptions
): TypeClass {
  // check for the path suffix
  const typePath = _getTypePath(aType, aOptions);

  const type = aType;
  const typeName = type.name;

  // component names
  const typeClass = _createTypeComponentName(typeName);
  const simpleTypeClass = typeClass;
  const typeElementClass =
    (typeClass.endsWith(TYPE_SUFFIX)
      ? typeClass.substr(0, typeClass.length - TYPE_SUFFIX.length)
      : typeClass) + TYPE_SUFFIX;
  const baseElementClass = _createElementComponentName(typeName);
  const singleElementClass = SINGLE_PREFIX + baseElementClass;
  const multiElementClass = MULTI_PREFIX + baseElementClass;

  // references
  const typeElementRef = _dotCase(typeClass);

  // file names
  const typeElementFile = typeElementRef + '.ts';

  // the base path for the layout
  const folder = `${aDir}${typePath}`;

  return {
    type,
    folder,
    simpleTypeClass,
    typeElementClass,
    baseElementClass,
    singleElementClass,
    multiElementClass,
    typeElementFile,
    typeElementRef
  };
}

/**
 * Finds the directory tha the component should be created in. Tests
 * each potential source directory for an existing component file. If non exists, uses the
 * first source directory
 *
 * @param aType - type
 * @param aSources - sources directory
 *
 * @returns the selected source directory
 */
function _getTypesDir(
  aType: AuthoringType,
  aSources: Observable<string[]>,
  aOptions: TypeOptions,
  aTree: ReadFile
): Observable<string> {
  // check for the path suffix
  const typePath = _getTypePath(aType, aOptions);
  const className = _createTypeComponentName(aType.name);
  const relPath = `${typePath}/${_camelCase(className)}.ts`;
  // map each source to a check
  return rxFindDir(aSources, relPath, aTree);
}

function _createTypeClass(
  aType: AuthoringType,
  aSources: Observable<string[]>,
  aOptions: TypeOptions,
  aTree: ReadFile
): Observable<TypeClass> {
  // locate the component directory
  return rxPipe(
    _getTypesDir(aType, aSources, aOptions, aTree),
    first(),
    map((dir) => _initTypeClass(dir, aType, aOptions)),
    shareReplay()
  );
}

export class TypeRegistry {
  private typeRegistry: { [typeId: string]: Observable<TypeClass> } = {};

  private typeMap: { [typeId: string]: AuthoringType } = {};

  constructor(
    private aBaseFolders: Observable<string[]>,
    private aOptions: TypeOptions,
    private aTree: ReadFile
  ) {}

  registerType(aType: AuthoringType): boolean {
    const type = aType;
    const id = type.id;

    if (this.typeMap[id]) {
      // do not create a type, twice
      return false;
    }

    // register
    this.typeMap[id] = type;

    // ok
    return true;
  }

  findTypeClass(aType: AuthoringType): Observable<TypeClass> {
    // the name
    const typeId = aType.id;
    // check if we are already searching
    let rxRunning = this.typeRegistry[typeId];
    if (!rxRunning) {
      // try to find the folder
      rxRunning = this.typeRegistry[typeId] = _createTypeClass(
        aType,
        this.aBaseFolders,
        this.aOptions,
        this.aTree
      );
    }
    // ok
    return rxRunning;
  }
}
