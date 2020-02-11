[![npm](https://img.shields.io/npm/v/@acoustic-content-sdk/ng-app.svg?style=flat-square)](https://www.npmjs.com/package/@acoustic-content-sdk/ng-app)

Module to pull in application dependencies for live mode.

## Table of Contents

- [API Documentation](./markdown/ng-app.md)

## General Concepts

Applications on Acoustic Content can run in preview mode and in live mode. In preview mode they are augmented with inline edit capabilities and optimited for inline edit experience, in live mode they run in read-only mode optimized for size and performance.

The difference in runtime behaviour is achieved by building the application twice with different [dependency providers](https://angular.io/guide/dependency-injection) for services that the application relies on.

Providers for preview mode are supplied by the `ng-app-preview` module, for live mode via the `ng-app-live` module and general purpose providers that apply to both modes by the `ng-app-base` module.
