import {
  arrayPush,
  isNil,
  isNotEmpty,
  isNotNil,
  isString,
  lastElement
} from '@acoustic-content-sdk/utils';
import {
  ClassDeclaration,
  createSourceFile,
  Expression,
  ImportDeclaration,
  ImportSpecifier,
  isArrayLiteralExpression,
  isCallExpression,
  isIdentifier,
  isImportDeclaration,
  isNamedImports,
  isObjectLiteralExpression,
  isPropertyAssignment,
  isSpreadElement,
  NodeArray,
  ObjectLiteralElementLike,
  PropertyAssignment,
  ScriptTarget,
  SourceFile,
  SpreadElement,
  Statement,
  TextRange
} from 'typescript';

import { isNgModule, isNgModuleDecorator } from '../../utilities/ng.module';
import {
  applyReplacements,
  insertAtEnd,
  replace,
  Replacement,
  Replacements
} from '../../utilities/updates';

const MODULE_SPECIFIER = 'MODULES';

function isModuleSpecifier(aSpec: ImportSpecifier): boolean {
  const { name } = aSpec;
  return name.text === MODULE_SPECIFIER;
}

function isModuleImport(
  aStatement: Statement
): aStatement is ImportDeclaration {
  if (isImportDeclaration(aStatement)) {
    const namedBindings = aStatement.importClause.namedBindings;
    if (isNamedImports(namedBindings)) {
      const { elements } = namedBindings;
      return isNotEmpty(elements) && isNotNil(elements.find(isModuleSpecifier));
    }
  }
  return false;
}

function isImportAssignment(
  aIn: ObjectLiteralElementLike
): aIn is PropertyAssignment {
  return (
    isPropertyAssignment(aIn) &&
    isIdentifier(aIn.name) &&
    aIn.name.text === 'imports' &&
    isArrayLiteralExpression(aIn.initializer)
  );
}

const MODULE_SPREAD = `...${MODULE_SPECIFIER}`;

function createFullImport(aRange: TextRange): Replacement {
  const pos = aRange.pos + 1;
  return replace(pos, pos, `imports: [${MODULE_SPREAD}],`);
}

function createSpreadImport(aRange: NodeArray<Expression>): Replacement {
  const data = aRange.hasTrailingComma ? MODULE_SPREAD : `, ${MODULE_SPREAD}`;
  return insertAtEnd(aRange, data);
}

function isModulesSpread(aElement: any): aElement is SpreadElement {
  return (
    isSpreadElement(aElement) &&
    isIdentifier(aElement.expression) &&
    aElement.expression.text === MODULE_SPECIFIER
  );
}

function insertDecoratorImport(aModule: ClassDeclaration): Replacements {
  // the result
  const repl: Replacements = [];
  // find the decorator
  const dec = aModule.decorators.find(isNgModuleDecorator);
  if (
    isCallExpression(dec.expression) &&
    isNotEmpty(dec.expression.arguments)
  ) {
    // locate the first object expression
    const objExpr = dec.expression.arguments.find(isObjectLiteralExpression);
    if (isNotNil(objExpr)) {
      const { properties } = objExpr;
      if (isNotEmpty(properties)) {
        // get the import
        const impAssign = properties.find(isImportAssignment);
        if (
          isNotNil(impAssign) &&
          isArrayLiteralExpression(impAssign.initializer)
        ) {
          const { elements } = impAssign.initializer;
          if (isNotEmpty(elements)) {
            // locate an existing spread import
            const spreadImport = elements.find(isModulesSpread);
            if (isNil(spreadImport)) {
              arrayPush(createSpreadImport(elements), repl);
            }
          } else {
            arrayPush(createSpreadImport(elements), repl);
          }
        } else {
          arrayPush(createFullImport(objExpr), repl);
        }
      } else {
        arrayPush(createFullImport(objExpr), repl);
      }
    }
  }
  // nothing
  return repl;
}

const MODULE_IMPORT = `import { ${MODULE_SPECIFIER} } from './modules';`;

function createModuleImport(aRange: TextRange): Replacement {
  return replace(aRange.end, aRange.end, `\n${MODULE_IMPORT}`);
}

function insertModulesImport(
  aDeclaration: ImportDeclaration,
  aSrc: SourceFile
): Replacements {
  // the result
  const repl: Replacements = [];
  // only if we do not have an import
  if (isNil(aDeclaration)) {
    // find the last import
    const imports = aSrc.statements.filter(isImportDeclaration);
    if (isNotEmpty(imports)) {
      // get the last one
      const last = lastElement(imports);
      arrayPush(createModuleImport(last), repl);
    } else {
      arrayPush(replace(0, 0, MODULE_IMPORT), repl);
    }
  }
  // the replacements
  return repl;
}

/**
 * Inserts the correct modules import into the application module
 *
 * @param aPath - path to the application module
 * @param aSource - the app module source
 *
 * @returns the modified source
 */
export function addModulesToAppModule(aPath: string, aSource: string): string;
/**
 * Inserts the correct modules import into the application module
 *
 * @param aSource - the app module source
 *
 * @returns the modified source
 */
export function addModulesToAppModule(aSource: SourceFile): string;

/**
 * Inserts the correct modules import into the application module
 *
 * @param aPath - path to the application module
 * @param aSource - the app module source if the first argument is a path
 *
 * @returns the modified source
 */
export function addModulesToAppModule(
  aPathOrSource: string | SourceFile,
  aSource?: string
): string {
  // deconstruct
  const src = isString(aPathOrSource)
    ? createSourceFile(aPathOrSource, aSource, ScriptTarget.Latest, true)
    : aPathOrSource;
  // the file content
  const content = src.text;
  // statements
  const { statements } = src;
  // find the import
  const moduleImport = statements.find(isModuleImport);
  // modules
  const ngModule = statements.find(isNgModule);
  // check if we would have to update
  if (isNotNil(ngModule)) {
    // replacements
    return applyReplacements(content, [
      ...insertModulesImport(moduleImport, src),
      ...insertDecoratorImport(ngModule)
    ]);
  }
  // nothing to do
  return content;
}

export const APP_MODULE = 'app.module.ts';
