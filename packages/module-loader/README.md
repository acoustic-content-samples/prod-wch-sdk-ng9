[![npm](https://img.shields.io/npm/v/@acoustic-content-sdk/module-loader.svg?style=flat-square)](https://www.npmjs.com/package/@acoustic-content-sdk/module-loader)

Implementation of a simple module loader that resolves NPM modules from [unpkg](https://unpkg.com/). Resolution works as long as modules only require global modules it is not implemented for local imports.

## Supported Modules

The following list some commonly used modules, the list not not complete, though:

| Module     | Support | Comment                       |
| ---------- | :-----: | ----------------------------- |
| lodash     |   yes   |                               |
| d3         |   yes   |                               |
| chart.js   |   yes   |                               |
| handlebars |   no    | use lodash templating instead |

## Table of Contents

- [API Documentation](./markdown/module-loader.md)
