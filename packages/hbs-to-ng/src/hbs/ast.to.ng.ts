import {
  Program,
  PathExpression,
  MustacheStatement,
  ContentStatement,
  BlockStatement,
  AST,
  parse
} from 'handlebars/dist/handlebars';
import { Visitor } from 'handlebars';

class AstVisitor extends Visitor {
  private buffer: string[] = [];

  private scope: string[] = ['_s0'];

  private scopeCount = 1;

  constructor() {
    super();
  }

  Program(program: Program) {
    // recurse
    super.Program(program);
  }

  BlockStatement(block: BlockStatement) {
    if (block.path.original === 'each') {
      this.handleLoop(block);
    }
  }

  PathExpression(path: PathExpression) {
    const scope = this.getCurrent();
    const { original } = path;
    if (original === 'this') {
      this.push(scope);
    } else {
      this.push(`${scope}.${path.original}`);
    }
  }

  MustacheStatement(mustache: MustacheStatement) {
    this.push('{{');
    super.MustacheStatement(mustache);
    this.push('}}');
  }

  ContentStatement(content: ContentStatement) {
    // log this
    this.push(content.value);
    // recurse
    super.ContentStatement(content);
  }

  toString() {
    return `<ng-container *ngIf="renderingContext$ | async as ${this.getCurrent()}">${this.buffer.join(
      ''
    )}</ng-container>`;
  }

  private handleLoop(block: BlockStatement) {
    const name = `_s${this.scopeCount++}`;
    const scope = this.getCurrent();
    this.push(
      `<ng-container *ngFor='let ${name}=${scope}.${block.params[0].original}'>`
    );
    this.scope.push(name);
    // loop
    this.acceptKey(block, 'program');

    this.popScope();
    this.push(`</ng-container/>`);
  }

  private getCurrent() {
    return this.scope[this.scope.length - 1];
  }

  private push(aValue: string) {
    this.buffer.push(aValue);
  }

  private pushScope(aValue: string) {
    const { scope } = this;
    if (scope.length === 0) {
      scope.push(aValue);
    } else {
      scope.push(`${scope[scope.length - 1]}.${aValue}`);
    }
  }

  private popScope() {
    this.scope.pop();
  }
}

export function astToNg(aAst: AST): string {
  // visit the AST
  const visitor = new AstVisitor();
  visitor.accept(aAst);

  return visitor.toString();
}
