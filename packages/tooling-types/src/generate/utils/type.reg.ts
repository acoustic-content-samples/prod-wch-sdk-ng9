import {
  AuthoringType,
  AuthoringReferenceElement,
  AuthoringReferenceValue,
  AuthoringGroupElement
} from '@acoustic-content-sdk/api';
import {
  camelCase,
  classCase,
  constantCase,
  dotCase,
  kebabCase
} from '@acoustic-content-sdk/tooling';
import {
  rxPipe,
  isNotEmpty,
  isNil,
  UNDEFINED$,
  isNotNil
} from '@acoustic-content-sdk/utils';
import emojiRegex from 'emoji-regex';
import { toWords } from 'number-to-words';
import { Observable, OperatorFunction, pipe } from 'rxjs';
import { first, map, shareReplay } from 'rxjs/operators';

import { ReadFile, rxFindDir } from './rx.dir';

const RENDERING_CONTEXT_SUFFIX = 'RenderingContext';

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

function cleanUp(aName: string): string {
  const trimmedName = aName.replace(emojiRegex(), ' ').trim();
  return trimmedName.replace(LEADING_DIGIT, (m, p) =>
    p && p.length > 0 ? toWords(p) + ' ' : ''
  );
}

function _createTypeInterfaceName(aTypeName: string): string {
  // trim
  const fixed = cleanUp(aTypeName);
  const name = classCase(_camelCase(fixed));
  return name.endsWith(RENDERING_CONTEXT_SUFFIX)
    ? name
    : name + RENDERING_CONTEXT_SUFFIX;
}

function createTypeComponentName(aName: string): string {
  // trim
  const fixed = cleanUp(aName);
  /** check if the layout component starts with a number, in this case
   * convert the number to a string
   */
  const name = classCase(_camelCase(fixed));
  return name.endsWith(TYPE_SUFFIX) ? name : name + TYPE_SUFFIX;
}

function createElementComponentName(aName: string): string {
  // trim
  const fixed = cleanUp(aName);
  /** check if the layout component starts with a number, in this case
   * convert the number to a string
   */
  const name = classCase(_camelCase(fixed));
  return name.endsWith(TYPE_SUFFIX)
    ? name.substr(0, name.length - TYPE_SUFFIX.length) + ELEMENT_SUFFIX
    : name + ELEMENT_SUFFIX;
}

function createConstantPrefix(aName: string): string {
  // trim
  const fixed = createTypeComponentName(aName);
  return constantCase(
    fixed.endsWith(TYPE_SUFFIX)
      ? fixed.substr(0, fixed.length - TYPE_SUFFIX.length)
      : fixed
  );
}

function _getPathForType(aType: AuthoringType, aOptions: TypeOptions): string {
  // name of the layout folder segment
  let typeName = createTypeComponentName(aType.name);
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
  return `/${segments.join('/')}`;
}

function getTypePath(aType: AuthoringType, aOptions: TypeOptions): string {
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
  typeInterfaceClass: string;

  // constant prefix
  constantPrefix: string;

  // file names
  typeElementFile: string;
  typeInterfaceFile: string;

  // file references
  typeElementRef: string;
  typeInterfaceRef: string;
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
  const typePath = getTypePath(aType, aOptions);

  const type = aType;
  const typeName = type.name;

  // component names
  const typeClass = createTypeComponentName(typeName);
  const simpleTypeClass = typeClass;
  const typeElementClass =
    (typeClass.endsWith(TYPE_SUFFIX)
      ? typeClass.substr(0, typeClass.length - TYPE_SUFFIX.length)
      : typeClass) + TYPE_SUFFIX;
  const baseElementClass = createElementComponentName(typeName);
  const singleElementClass = SINGLE_PREFIX + baseElementClass;
  const multiElementClass = MULTI_PREFIX + baseElementClass;

  const constantPrefix = createConstantPrefix(typeName);

  const typeInterfaceClass = _createTypeInterfaceName(typeName);

  // references
  const typeElementRef = _dotCase(typeClass);
  const typeInterfaceRef = _dotCase(typeInterfaceClass);

  // file names
  const typeElementFile = typeElementRef + '.ts';
  const typeInterfaceFile = typeInterfaceRef + '.ts';

  // the base path for the layout
  const folder = `${aDir}${typePath}`;

  return {
    type,
    folder,
    typeInterfaceClass,
    typeInterfaceFile,
    typeInterfaceRef,
    constantPrefix,
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
const getTypesDir = (
  aType: AuthoringType,
  aOptions: TypeOptions,
  aTree: ReadFile
): OperatorFunction<string[], string> => {
  // check for the path suffix
  const typePath = getTypePath(aType, aOptions);
  const className = createTypeComponentName(aType.name);
  const relPath = `${typePath}/${_camelCase(className)}.ts`;
  // map each source to a check
  return rxFindDir(relPath, aTree);
};

const createTypeClass = (
  aType: AuthoringType,
  aOptions: TypeOptions,
  aTree: ReadFile
): OperatorFunction<string[], TypeClass> =>
  pipe(
    getTypesDir(aType, aOptions, aTree),
    first(),
    map((dir) => _initTypeClass(dir, aType, aOptions)),
    shareReplay()
  );

export class TypeRegistry {
  private typeRegistry: { [typeId: string]: Observable<TypeClass> } = {};

  private typeMap: { [typeId: string]: AuthoringType } = {};

  constructor(
    private aBaseFolder$: Observable<string[]>,
    private aOptions: TypeOptions,
    private aTree: ReadFile,
    private aAllTypes: Record<string, AuthoringType>
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

  findAuthoringTypeById(aId: string): AuthoringType {
    return isNotEmpty(aId) ? this.aAllTypes[aId] : undefined;
  }

  findTypeClassById(aId: string): Observable<TypeClass> {
    return this.findTypeClass(this.findAuthoringTypeById(aId));
  }

  findTypeClassByGroup(aElement: AuthoringGroupElement): Observable<TypeClass> {
    // type ref
    const { id } = aElement.typeRef;
    // locate by ID
    return this.findTypeClass(
      this.findAuthoringTypeById(id) || (aElement.typeRef as AuthoringType)
    );
  }

  findTypeClass(aType: AuthoringType): Observable<TypeClass> {
    // bail out
    if (isNil(aType)) {
      return UNDEFINED$;
    }
    // the name
    const typeId = aType.id;
    // check if we are already searching
    let rxRunning = this.typeRegistry[typeId];
    if (!rxRunning) {
      // try to find the folder
      rxRunning = this.typeRegistry[typeId] = rxPipe(
        this.aBaseFolder$,
        createTypeClass(aType, this.aOptions, this.aTree)
      );
    }
    // ok
    return rxRunning;
  }
}
