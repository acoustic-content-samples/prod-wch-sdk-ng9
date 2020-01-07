import { Predicate } from '@acoustic-content-sdk/utils';
import { NamedDeclaration, Node, SyntaxKind } from 'typescript';

export function byType(aType: SyntaxKind): Predicate<Node> {
  return node => node && node.kind === aType;
}

export function byText(aText: string): Predicate<Node> {
  return node => node && node.getText() === aText;
}

export function byName(aText: string): Predicate<NamedDeclaration> {
  return node => !!(node && node.name && node.name.getText() === aText);
}

export function byTypeAndName(
  aType: SyntaxKind,
  aName: string
): Predicate<Node> {
  return node => node && node.kind === aType && node.getText() === aName;
}

export function byIdentifier(aName: string): Predicate<Node> {
  return byTypeAndName(SyntaxKind.Identifier, aName);
}
