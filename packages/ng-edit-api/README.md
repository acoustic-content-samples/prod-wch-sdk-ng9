[![npm](https://img.shields.io/npm/v/@acoustic-content-sdk/ng-edit-api.svg?style=flat-square)](https://www.npmjs.com/package/@acoustic-content-sdk/ng-edit-api)

Collection of APIs and constants for the Angular SDK in edit mode.

## Table of Contents

- [API Documentation](./markdown/ng-edit-api.md)

## General Concepts

This module defines [Dependency Injection](https://angular.io/guide/dependency-injection#dependency-injection-tokens) tokens for all relevant services. An application would typically select an appropriate [ngModule](https://angular.io/guide/ngmodules) to provide an implementation of the tokens. The tokens are typically consumed by directives or components of the SDK, but they may also be consumed by custom components or services, directly.
