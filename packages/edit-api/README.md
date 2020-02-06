[![npm](https://img.shields.io/npm/v/@acoustic-content-sdk/edit-api.svg?style=flat-square)](https://www.npmjs.com/package/@acoustic-content-sdk/edit-api)

# Table of Contents

- [Inline Edit Provider](./src/v2/provider/README.md)
- [Inline Edit Service](./src/v2/interfaces/README.md)
- [API Documentation](./markdown/edit-api.md)

## General Concepts

The inline edit APIs define how an application can register DOM elements to be inline editable and also an API how an implementor of inline edit functionality can hook into the system. The purpose of the consumer facing interface `WchInlineEditServiceV2` is to make it convenient to use the service, the purpose of the provider facing interface `WchInlineEditProviderV2` to implement the service. The glue layer between both is a generic implementation by the SDK.

Refer to the framework specific modules to learn how to access the services.
